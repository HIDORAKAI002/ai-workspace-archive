"""Layer 0: Document to images conversion.

Converts any supported document (PDF, image) into a list of
optimized PIL Images ready for OCR engine processing.
"""
from __future__ import annotations

import asyncio
import os
import tempfile
from pathlib import Path
from typing import List, Optional, Union

from PIL import Image, ImageOps

from upsonic.ocr.exceptions import (
    OCRError,
    OCRFileNotFoundError,
    OCRUnsupportedFormatError,
    OCRProcessingError,
)


IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".bmp", ".tiff", ".tif", ".gif", ".webp"}
PDF_EXTENSIONS = {".pdf"}
ALL_EXTENSIONS = IMAGE_EXTENSIONS | PDF_EXTENSIONS

# Only optimize images larger than this (3 MB)
MAX_FILE_SIZE = 3 * 1024 * 1024


def _is_pdf(file_path: Union[str, Path]) -> bool:
    return Path(file_path).suffix.lower() in PDF_EXTENSIONS


def _is_image(file_path: Union[str, Path]) -> bool:
    return Path(file_path).suffix.lower() in IMAGE_EXTENSIONS


def _validate(file_path: Union[str, Path]) -> Path:
    path = Path(file_path)
    if not path.exists():
        raise OCRFileNotFoundError(
            f"File not found: {file_path}", error_code="FILE_NOT_FOUND"
        )
    if not path.is_file():
        raise OCRFileNotFoundError(
            f"Path is not a file: {file_path}", error_code="NOT_A_FILE"
        )
    ext = path.suffix.lower()
    if ext not in ALL_EXTENSIONS:
        raise OCRUnsupportedFormatError(
            f"Unsupported format: {ext}. Supported: {', '.join(ALL_EXTENSIONS)}",
            error_code="UNSUPPORTED_FORMAT",
        )
    return path


# ---------------------------------------------------------------------------
# PDF → images  (PyMuPDF, no poppler needed)
# ---------------------------------------------------------------------------

def _pdf_to_images(pdf_path: Path, dpi: int = 300) -> List[Image.Image]:
    try:
        import fitz  # PyMuPDF
    except ImportError:
        raise OCRError(
            "PyMuPDF (fitz) is required for PDF processing. "
            "Install with: pip install pymupdf",
            error_code="MISSING_DEPENDENCY",
        )

    images: List[Image.Image] = []
    try:
        doc = fitz.open(str(pdf_path))
        for page_num in range(doc.page_count):
            page = doc[page_num]
            mat = fitz.Matrix(dpi / 72, dpi / 72)
            pix = page.get_pixmap(matrix=mat)

            img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
            images.append(img)
        doc.close()
    except Exception as e:
        if isinstance(e, OCRError):
            raise
        raise OCRProcessingError(
            f"Failed to convert PDF to images: {e}",
            error_code="PDF_CONVERSION_FAILED",
            original_error=e,
        )
    return images


# ---------------------------------------------------------------------------
# Image loading (EXIF transpose + mode normalisation)
# ---------------------------------------------------------------------------

def _load_image(file_path: Path) -> Image.Image:
    try:
        img = Image.open(file_path)
        # Apply EXIF orientation (phone photos)
        img = ImageOps.exif_transpose(img)

        if img.mode == "P":
            img = img.convert("RGB")
        elif img.mode == "RGBA":
            bg = Image.new("RGB", img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[3])
            img = bg
        elif img.mode not in ("RGB", "L"):
            img = img.convert("RGB")
        return img
    except Exception as e:
        raise OCRProcessingError(
            f"Failed to load image: {file_path}",
            error_code="IMAGE_LOAD_FAILED",
            original_error=e,
        )


# ---------------------------------------------------------------------------
# Image size optimisation (iterative scale-down for oversized images)
# ---------------------------------------------------------------------------

def _optimize_image(
    img: Image.Image,
    max_bytes: int = MAX_FILE_SIZE,
) -> Image.Image:
    """Scale down an image in memory until it fits under *max_bytes* as JPEG."""
    import io

    # Quick check – encode once to see if optimisation is needed
    buf = io.BytesIO()
    rgb = img.convert("RGB") if img.mode != "RGB" else img
    rgb.save(buf, "JPEG", quality=90, optimize=True)
    if buf.tell() <= max_bytes:
        return img  # already small enough

    scale = 1.0
    for _ in range(20):
        scale -= 0.1
        scale = max(0.1, scale)
        w = max(200, int(img.width * scale))
        h = max(200, int(img.height * scale))
        resized = rgb.resize((w, h), Image.Resampling.LANCZOS)

        buf = io.BytesIO()
        resized.save(buf, "JPEG", quality=90, optimize=True)
        if buf.tell() <= max_bytes:
            return resized

    # Return the smallest we could get
    return resized


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def convert_document(
    file_path: Union[str, Path],
    pdf_dpi: int = 300,
    max_image_bytes: Optional[int] = None,
) -> List[Image.Image]:
    """Convert any supported document into a list of PIL Images.

    This is the Layer 0 entry-point used by the OCR orchestrator.

    Args:
        file_path: Path to an image or PDF file.
        pdf_dpi: Resolution for PDF page rendering (default 300).
        max_image_bytes: Optimise images exceeding this size.
            ``None`` means use the module default (3 MB).

    Returns:
        List of PIL Image objects (one per page / one for images).
    """
    path = _validate(file_path)
    limit = max_image_bytes if max_image_bytes is not None else MAX_FILE_SIZE

    # --- convert to raw images ---
    if _is_pdf(path):
        images = _pdf_to_images(path, dpi=pdf_dpi)
    else:
        images = [_load_image(path)]

    # --- optimise oversized images ---
    optimized: List[Image.Image] = []
    for img in images:
        optimized.append(_optimize_image(img, max_bytes=limit))

    return optimized


async def convert_document_async(
    file_path: Union[str, Path],
    pdf_dpi: int = 300,
    max_image_bytes: Optional[int] = None,
) -> List[Image.Image]:
    """Convert any supported document into a list of PIL Images (async).

    Runs the sync convert_document in a thread pool to avoid blocking.

    Args:
        file_path: Path to an image or PDF file.
        pdf_dpi: Resolution for PDF page rendering (default 300).
        max_image_bytes: Optimise images exceeding this size.

    Returns:
        List of PIL Image objects (one per page / one for images).
    """
    return await asyncio.to_thread(
        convert_document, file_path, pdf_dpi=pdf_dpi, max_image_bytes=max_image_bytes
    )
