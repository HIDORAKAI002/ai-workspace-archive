from __future__ import annotations
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from .easyocr import EasyOCREngine
    from .rapidocr import RapidOCREngine
    from .tesseract import TesseractOCREngine
    from .deepseek import DeepSeekOCREngine
    from .deepseek_ollama import DeepSeekOllamaOCREngine
    try:
        from .paddleocr import (
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


def _get_engine_classes():
    """Lazy import of engine classes."""
    from .easyocr import EasyOCREngine
    from .rapidocr import RapidOCREngine
    from .tesseract import TesseractOCREngine
    from .deepseek import DeepSeekOCREngine
    from .deepseek_ollama import DeepSeekOllamaOCREngine

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
        from .paddleocr import (
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
    """Lazy loading of engine classes."""
    engine_classes = _get_engine_classes()
    if name in engine_classes:
        return engine_classes[name]

    paddleocr_classes = _get_paddleocr_classes()
    if name in paddleocr_classes:
        return paddleocr_classes[name]

    raise AttributeError(
        f"module '{__name__}' has no attribute '{name}'. "
        f"Available engines: EasyOCREngine, RapidOCREngine, TesseractOCREngine, "
        f"DeepSeekOCREngine, DeepSeekOllamaOCREngine, PaddleOCREngine, "
        f"PPStructureV3Engine, PPChatOCRv4Engine, PaddleOCRVLEngine"
    )


__all__ = [
    "EasyOCREngine",
    "RapidOCREngine",
    "TesseractOCREngine",
    "DeepSeekOCREngine",
    "DeepSeekOllamaOCREngine",
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
