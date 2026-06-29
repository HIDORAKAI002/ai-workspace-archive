"""Regression tests for issue #638.

``AttachmentService.save_upload_file`` joined the client-supplied multipart
filename onto a freshly created temp directory without sanitization. A filename
containing ``../`` segments escaped that directory, so the upload wrote
attacker-controlled bytes to an arbitrary host path and the cleanup ``unlink``
then deleted that same traversed path -- arbitrary file write and delete behind
an unauthenticated endpoint.

These tests pin the basename normalisation and prove a traversal filename can no
longer reach a victim file outside the temp/WareHouse area.
"""

import asyncio
import io

import pytest
from fastapi import UploadFile

from server.services.attachment_service import AttachmentService


@pytest.mark.parametrize(
    "raw, expected",
    [
        ("report.pdf", "report.pdf"),
        ("../../../etc/passwd", "passwd"),
        ("..\\..\\windows\\system32\\drivers\\etc\\hosts", "hosts"),
        ("/abs/path/secret.key", "secret.key"),
        ("nested/dir/photo.png", "photo.png"),
        ("", "upload.bin"),
        (None, "upload.bin"),
        ("..", "upload.bin"),
        (".", "upload.bin"),
        ("   ", "upload.bin"),
    ],
)
def test_safe_upload_filename_strips_directory_components(raw, expected):
    assert AttachmentService._safe_upload_filename(raw) == expected


def _make_upload(filename: str, data: bytes = b"payload") -> UploadFile:
    return UploadFile(filename=filename, file=io.BytesIO(data))


def test_traversal_filename_cannot_touch_file_outside_temp_dir(tmp_path):
    """A traversal filename must neither overwrite nor delete a victim file."""
    service = AttachmentService(root=tmp_path / "WareHouse")

    victim = tmp_path / "victim.txt"
    victim.write_text("do-not-touch")

    # Enough parent segments to climb to the filesystem root from any mkdtemp
    # location, then descend back to the absolute victim path. Pre-fix this
    # resolved onto the victim and the cleanup unlinked it.
    traversal = "../" * 16 + str(victim).lstrip("/")
    record = asyncio.run(service.save_upload_file("sess1", _make_upload(traversal)))

    # Victim survived untouched.
    assert victim.exists()
    assert victim.read_text() == "do-not-touch"

    # The stored attachment used the sanitized basename, not the traversal path.
    assert record.ref.name == "victim.txt"
    assert "victim.txt" in record.ref.local_path


def test_normal_upload_still_round_trips(tmp_path):
    service = AttachmentService(root=tmp_path / "WareHouse")
    record = asyncio.run(
        service.save_upload_file("sess2", _make_upload("notes.txt", b"hello world"))
    )
    assert record.ref.name == "notes.txt"
    assert record.ref.size == len(b"hello world")
