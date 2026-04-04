from __future__ import annotations

import asyncio
import concurrent.futures
import time
from typing import Union, Optional, Dict, Any, List
from pathlib import Path

from upsonic.ocr.base import OCRProvider, OCRConfig, OCRResult, OCRMetrics, OCRTextBlock
from upsonic.ocr.exceptions import OCRError, OCRTimeoutError


class OCR:
    """Unified OCR orchestrator that coordinates multiple processing layers.

    Layer 0 (document_converter): file → list of PIL Images
    Layer 1 (ocr_engine):         PIL Image → text / OCRResult

    Example:
        >>> from upsonic import OCR
        >>> from upsonic.ocr.engines import EasyOCREngine
        >>>
        >>> engine = EasyOCREngine(languages=['en', 'tr'], gpu=True)
        >>> ocr = OCR(layer_1_ocr_engine=engine)
        >>> text = ocr.get_text("document.pdf")
    """

    def __init__(
        self,
        layer_1_ocr_engine: OCRProvider,
        layer_1_timeout: Optional[float] = None,
    ):
        """Initialize OCR orchestrator.

        Args:
            layer_1_ocr_engine: An instantiated OCR engine object
                (e.g., EasyOCREngine(...), RapidOCREngine(...))
            layer_1_timeout: Hard timeout in seconds for each page's
                Layer 1 OCR processing.  ``None`` means no timeout.

        Raises:
            OCRError: If the engine is not a valid OCRProvider instance
        """
        if not isinstance(layer_1_ocr_engine, OCRProvider):
            raise OCRError(
                f"layer_1_ocr_engine must be an OCRProvider instance, "
                f"got {type(layer_1_ocr_engine)}",
                error_code="INVALID_PROVIDER",
            )

        self.layer_1_ocr_engine = layer_1_ocr_engine
        self.layer_1_timeout = layer_1_timeout

    # ------------------------------------------------------------------
    # Public API (async-first)
    # ------------------------------------------------------------------

    async def get_text_async(self, file_path: Union[str, Path], **kwargs) -> str:
        """Extract text from an image or PDF file (async).

        Pipeline: file → layer 0 (images) → layer 1 (text)

        Args:
            file_path: Path to the image or PDF file.
            **kwargs: Extra arguments forwarded to the OCR engine.

        Returns:
            Extracted text as a string.
        """
        result = await self.process_file_async(file_path, **kwargs)
        return result.text

    def get_text(self, file_path: Union[str, Path], **kwargs) -> str:
        """Extract text from an image or PDF file (sync wrapper).

        Args:
            file_path: Path to the image or PDF file.
            **kwargs: Extra arguments forwarded to the OCR engine.

        Returns:
            Extracted text as a string.
        """
        return asyncio.run(self.get_text_async(file_path, **kwargs))

    async def _run_with_timeout(self, image, page_num: int, **kwargs) -> OCRResult:
        """Run Layer 1 OCR on a single page with a hard thread-level timeout.

        Uses a dedicated thread so that on timeout the main flow
        raises immediately.  The orphaned worker thread will eventually
        finish on its own but its result is discarded.
        """
        loop = asyncio.get_running_loop()
        executor = concurrent.futures.ThreadPoolExecutor(max_workers=1)
        try:
            future = loop.run_in_executor(
                executor,
                self.layer_1_ocr_engine._process_image,
                image,
            )
            return await asyncio.wait_for(future, timeout=self.layer_1_timeout)
        except asyncio.TimeoutError:
            raise OCRTimeoutError(
                f"Layer 1 OCR timed out after {self.layer_1_timeout}s on page {page_num}",
                error_code="LAYER1_TIMEOUT",
            )
        finally:
            executor.shutdown(wait=False)

    async def process_file_async(self, file_path: Union[str, Path], **kwargs) -> OCRResult:
        """Process a file and return detailed OCR results (async).

        Pipeline: file → layer 0 (images) → layer 1 (text per page) → combined result

        Args:
            file_path: Path to the image or PDF file.
            **kwargs: Extra arguments forwarded to the OCR engine.

        Returns:
            OCRResult object with detailed information.
        """
        from upsonic.ocr.layer_0.document_converter import convert_document

        start_time = time.time()

        # --- Layer 0: document → images (run in thread) ---
        config = self.layer_1_ocr_engine.config
        images = await asyncio.to_thread(
            convert_document,
            file_path,
            pdf_dpi=config.pdf_dpi,
        )

        # --- Layer 1: images → text ---
        all_blocks: List[OCRTextBlock] = []
        all_text_parts: List[str] = []
        total_confidence = 0.0

        for page_num, image in enumerate(images, start=1):
            if self.layer_1_timeout is not None:
                page_result = await self._run_with_timeout(image, page_num, **kwargs)
            else:
                page_result = await self.layer_1_ocr_engine._process_image_async(image, **kwargs)

            for block in page_result.blocks:
                block.page_number = page_num
                all_blocks.append(block)

            all_text_parts.append(page_result.text)
            total_confidence += page_result.confidence

        # --- Combine ---
        combined_text = (
            "\n\n".join(all_text_parts)
            if len(all_text_parts) > 1
            else (all_text_parts[0] if all_text_parts else "")
        )
        avg_confidence = total_confidence / len(images) if images else 0.0
        processing_time = (time.time() - start_time) * 1000

        result = OCRResult(
            text=combined_text,
            blocks=all_blocks,
            confidence=avg_confidence,
            page_count=len(images),
            processing_time_ms=processing_time,
            provider=self.layer_1_ocr_engine.name,
            metadata={
                "file_path": str(file_path),
                "config": config.model_dump(),
            },
        )

        # Update engine metrics
        metrics = self.layer_1_ocr_engine._metrics
        metrics.total_pages += len(images)
        metrics.total_characters += len(combined_text)
        metrics.processing_time_ms += processing_time
        metrics.files_processed += 1
        if all_blocks:
            metrics.average_confidence = (
                sum(b.confidence for b in all_blocks) / len(all_blocks)
            )

        return result

    def process_file(self, file_path: Union[str, Path], **kwargs) -> OCRResult:
        """Process a file and return detailed OCR results (sync wrapper).

        Args:
            file_path: Path to the image or PDF file.
            **kwargs: Extra arguments forwarded to the OCR engine.

        Returns:
            OCRResult object with detailed information.
        """
        return asyncio.run(self.process_file_async(file_path, **kwargs))

    # ------------------------------------------------------------------
    # Convenience accessors
    # ------------------------------------------------------------------

    def get_metrics(self) -> OCRMetrics:
        return self.layer_1_ocr_engine.get_metrics()

    def reset_metrics(self) -> None:
        self.layer_1_ocr_engine.reset_metrics()

    def get_info(self) -> Dict[str, Any]:
        return self.layer_1_ocr_engine.get_info()

    @property
    def name(self) -> str:
        return self.layer_1_ocr_engine.name

    @property
    def supported_languages(self) -> list[str]:
        return self.layer_1_ocr_engine.supported_languages

    @property
    def config(self) -> OCRConfig:
        return self.layer_1_ocr_engine.config

    def __repr__(self) -> str:
        return f"OCR(layer_1={self.layer_1_ocr_engine.name})"


def infer_provider(provider_name: str, **kwargs) -> OCR:
    """Create an OCR instance by provider name.

    Args:
        provider_name: Name of the provider ('easyocr', 'rapidocr', etc.)
        **kwargs: Arguments forwarded to the engine constructor.

    Returns:
        OCR instance.
    """
    provider_map = {
        'easyocr': 'upsonic.ocr.layer_1.engines.easyocr.EasyOCREngine',
        'rapidocr': 'upsonic.ocr.layer_1.engines.rapidocr.RapidOCREngine',
        'tesseract': 'upsonic.ocr.layer_1.engines.tesseract.TesseractOCREngine',
        'deepseek': 'upsonic.ocr.layer_1.engines.deepseek.DeepSeekOCREngine',
        'deepseek_ocr': 'upsonic.ocr.layer_1.engines.deepseek.DeepSeekOCREngine',
        'deepseek_ollama': 'upsonic.ocr.layer_1.engines.deepseek_ollama.DeepSeekOllamaOCREngine',
        'paddleocr': 'upsonic.ocr.layer_1.engines.paddleocr.PaddleOCREngine',
        'paddle': 'upsonic.ocr.layer_1.engines.paddleocr.PaddleOCREngine',
        'ppstructurev3': 'upsonic.ocr.layer_1.engines.paddleocr.PPStructureV3Engine',
        'pp_structure_v3': 'upsonic.ocr.layer_1.engines.paddleocr.PPStructureV3Engine',
        'ppchatocrv4': 'upsonic.ocr.layer_1.engines.paddleocr.PPChatOCRv4Engine',
        'pp_chat_ocr_v4': 'upsonic.ocr.layer_1.engines.paddleocr.PPChatOCRv4Engine',
        'paddleocr_vl': 'upsonic.ocr.layer_1.engines.paddleocr.PaddleOCRVLEngine',
        'paddleocrvl': 'upsonic.ocr.layer_1.engines.paddleocr.PaddleOCRVLEngine',
    }

    provider_name_lower = provider_name.lower()
    if provider_name_lower not in provider_map:
        raise OCRError(
            f"Unknown provider: {provider_name}. "
            f"Available: {', '.join(provider_map.keys())}",
            error_code="UNKNOWN_PROVIDER",
        )

    module_path, class_name = provider_map[provider_name_lower].rsplit('.', 1)
    module = __import__(module_path, fromlist=[class_name])
    provider_class = getattr(module, class_name)

    engine = provider_class(**kwargs)
    return OCR(layer_1_ocr_engine=engine)
