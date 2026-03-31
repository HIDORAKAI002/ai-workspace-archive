from __future__ import annotations
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from .ocr import OCR, infer_provider
    from .base import (
        OCRProvider,
        OCRConfig,
        OCRResult,
        OCRMetrics,
        OCRTextBlock,
        BoundingBox,
    )
    from .exceptions import (
        OCRError,
        OCRProviderError,
        OCRFileNotFoundError,
        OCRUnsupportedFormatError,
        OCRProcessingError,
        OCRTimeoutError,
    )
    from .layer_1.engines import (
        EasyOCREngine,
        RapidOCREngine,
        TesseractOCREngine,
        DeepSeekOCREngine,
        DeepSeekOllamaOCREngine,
    )
    try:
        from .layer_1.engines.paddleocr import (
            PaddleOCRConfig,
            PaddleOCREngine,
            PPStructureV3Engine,
            PPChatOCRv4Engine,
            PaddleOCRVLEngine,
            PaddleOCR,
            PPStructureV3,
            PPChatOCRv4,
            PaddleOCRVL,
        )
    except ImportError:
        pass

def _get_base_classes():
    """Lazy import of base OCR classes."""
    from .ocr import OCR, infer_provider
    from .base import (
        OCRProvider,
        OCRConfig,
        OCRResult,
        OCRMetrics,
        OCRTextBlock,
        BoundingBox,
    )

    return {
        'OCR': OCR,
        'infer_provider': infer_provider,
        'OCRProvider': OCRProvider,
        'OCRConfig': OCRConfig,
        'OCRResult': OCRResult,
        'OCRMetrics': OCRMetrics,
        'OCRTextBlock': OCRTextBlock,
        'BoundingBox': BoundingBox,
    }

def _get_exception_classes():
    """Lazy import of exception classes."""
    from .exceptions import (
        OCRError,
        OCRProviderError,
        OCRFileNotFoundError,
        OCRUnsupportedFormatError,
        OCRProcessingError,
        OCRTimeoutError,
    )

    return {
        'OCRError': OCRError,
        'OCRProviderError': OCRProviderError,
        'OCRFileNotFoundError': OCRFileNotFoundError,
        'OCRUnsupportedFormatError': OCRUnsupportedFormatError,
        'OCRProcessingError': OCRProcessingError,
        'OCRTimeoutError': OCRTimeoutError,
    }

def _get_engine_classes():
    """Lazy import of engine classes."""
    from .layer_1.engines import (
        EasyOCREngine,
        RapidOCREngine,
        TesseractOCREngine,
        DeepSeekOCREngine,
        DeepSeekOllamaOCREngine,
    )

    return {
        'EasyOCREngine': EasyOCREngine,
        'RapidOCREngine': RapidOCREngine,
        'TesseractOCREngine': TesseractOCREngine,
        'DeepSeekOCREngine': DeepSeekOCREngine,
        'DeepSeekOllamaOCREngine': DeepSeekOllamaOCREngine,
    }

def _get_paddleocr_classes():
    """Lazy import of PaddleOCR classes (optional dependency)."""
    try:
        from .layer_1.engines.paddleocr import (
            PaddleOCRConfig,
            PaddleOCREngine,
            PPStructureV3Engine,
            PPChatOCRv4Engine,
            PaddleOCRVLEngine,
            PaddleOCR,
            PPStructureV3,
            PPChatOCRv4,
            PaddleOCRVL,
        )

        return {
            'PaddleOCRConfig': PaddleOCRConfig,
            'PaddleOCREngine': PaddleOCREngine,
            'PPStructureV3Engine': PPStructureV3Engine,
            'PPChatOCRv4Engine': PPChatOCRv4Engine,
            'PaddleOCRVLEngine': PaddleOCRVLEngine,
            'PaddleOCR': PaddleOCR,
            'PPStructureV3': PPStructureV3,
            'PPChatOCRv4': PPChatOCRv4,
            'PaddleOCRVL': PaddleOCRVL,
        }
    except ImportError:
        return {}

def __getattr__(name: str) -> Any:
    """Lazy loading of heavy modules and classes."""
    # Base classes
    base_classes = _get_base_classes()
    if name in base_classes:
        return base_classes[name]

    # Exception classes
    exception_classes = _get_exception_classes()
    if name in exception_classes:
        return exception_classes[name]

    # Engine classes
    engine_classes = _get_engine_classes()
    if name in engine_classes:
        return engine_classes[name]

    # PaddleOCR classes (optional)
    paddleocr_classes = _get_paddleocr_classes()
    if name in paddleocr_classes:
        return paddleocr_classes[name]

    raise AttributeError(
        f"module '{__name__}' has no attribute '{name}'. "
        f"Please import from the appropriate sub-module."
    )

__all__ = [
    "OCR",
    "infer_provider",
    "OCRProvider",
    "OCRConfig",
    "OCRResult",
    "OCRMetrics",
    "OCRTextBlock",
    "BoundingBox",
    "OCRError",
    "OCRProviderError",
    "OCRFileNotFoundError",
    "OCRUnsupportedFormatError",
    "OCRProcessingError",
    "OCRTimeoutError",
    # Engine classes
    "EasyOCREngine",
    "RapidOCREngine",
    "TesseractOCREngine",
    "DeepSeekOCREngine",
    "DeepSeekOllamaOCREngine",
    # PaddleOCR classes (optional, available if paddleocr is installed)
    "PaddleOCRConfig",
    "PaddleOCREngine",
    "PPStructureV3Engine",
    "PPChatOCRv4Engine",
    "PaddleOCRVLEngine",
    "PaddleOCR",
    "PPStructureV3",
    "PPChatOCRv4",
    "PaddleOCRVL",
]
