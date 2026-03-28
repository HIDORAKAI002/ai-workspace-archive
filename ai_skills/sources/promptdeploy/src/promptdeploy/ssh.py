"""SSH transport for remote target deployment via rsync."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path
from typing import Optional, Sequence

# SSH options that prevent interactive hangs:
# - BatchMode=yes: fail immediately instead of prompting for passwords/keys
# - ConnectTimeout=10: don't wait forever for unreachable hosts
# - StrictHostKeyChecking=accept-new: accept new keys, reject changed keys
_SSH_OPTS = [
    "-o",
    "BatchMode=yes",
    "-o",
    "ConnectTimeout=10",
    "-o",
    "StrictHostKeyChecking=accept-new",
]

# rsync uses -e to pass SSH options
_RSYNC_SSH = ["ssh"] + _SSH_OPTS


class SSHError(Exception):
    """Raised when an SSH or rsync operation fails."""


def _check_tools() -> None:
    """Verify that rsync and ssh are available on PATH."""
    for tool in ("rsync", "ssh"):
        if shutil.which(tool) is None:
            raise SSHError(
                f"'{tool}' not found on PATH; required for remote deployment"
            )


def ssh_exists(host: str, remote_path: Path) -> bool:
    """Check if a directory exists on a remote host.

    Raises SSHError if the host is unreachable (returncode 255).
    Returns False only when the host is reachable but the directory
    does not exist.
    """
    _check_tools()
    result = subprocess.run(
        ["ssh", *_SSH_OPTS, host, "test", "-d", str(remote_path)],
        capture_output=True,
    )
    if result.returncode == 255:
        stderr = result.stderr.decode(errors="replace").strip() if result.stderr else ""
        raise SSHError(f"SSH connection to {host} failed: {stderr}")
    return result.returncode == 0


def _rsync_filter_args(includes: Optional[Sequence[str]]) -> list[str]:
    """Build rsync include/exclude filter arguments."""
    if not includes:
        return []
    args: list[str] = []
    for pattern in includes:
        args.extend(["--include", pattern])
    args.extend(["--exclude", "*"])
    return args


def ssh_pull(
    host: str,
    remote_path: Path,
    local_path: Path,
    *,
    verbose: bool = False,
    includes: Optional[Sequence[str]] = None,
) -> None:
    """Sync a remote directory to a local staging directory.

    If the remote directory does not exist, the local path is left empty
    (treated as a fresh deployment target).
    """
    _check_tools()
    local_path.mkdir(parents=True, exist_ok=True)

    if not ssh_exists(host, remote_path):
        return

    # Trailing slash on source means "contents of", so local_path gets
    # the contents of remote_path rather than a nested subdirectory.
    src = f"{host}:{remote_path}/"
    cmd = [
        "rsync",
        "-az",
        "--delete",
        *(["-v"] if verbose else []),
        *_rsync_filter_args(includes),
        "-e",
        " ".join(_RSYNC_SSH),
        src,
        str(local_path) + "/",
    ]
    result = subprocess.run(
        cmd,
        stdout=None if verbose else subprocess.PIPE,
        stderr=sys.stderr if verbose else subprocess.PIPE,
        text=True,
    )
    if result.returncode != 0:
        stderr = result.stderr or ""
        raise SSHError(f"rsync pull from {host}:{remote_path} failed: {stderr}")


def ssh_push(
    host: str,
    remote_path: Path,
    local_path: Path,
    *,
    verbose: bool = False,
    includes: Optional[Sequence[str]] = None,
) -> None:
    """Sync a local staging directory to a remote directory.

    Creates the remote parent directory if it does not exist.
    """
    _check_tools()
    # Ensure remote parent directory exists
    parent = str(remote_path.parent)
    subprocess.run(
        ["ssh", *_SSH_OPTS, host, "mkdir", "-p", parent],
        capture_output=True,
        check=False,
    )

    src = str(local_path) + "/"
    dst = f"{host}:{remote_path}/"
    cmd = [
        "rsync",
        "-az",
        "--delete",
        *(["-v"] if verbose else []),
        *_rsync_filter_args(includes),
        "-e",
        " ".join(_RSYNC_SSH),
        src,
        dst,
    ]
    result = subprocess.run(
        cmd,
        stdout=None if verbose else subprocess.PIPE,
        stderr=sys.stderr if verbose else subprocess.PIPE,
        text=True,
    )
    if result.returncode != 0:
        stderr = result.stderr or ""
        raise SSHError(f"rsync push to {host}:{remote_path} failed: {stderr}")
