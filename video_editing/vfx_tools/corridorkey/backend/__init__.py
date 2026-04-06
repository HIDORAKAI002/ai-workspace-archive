"""Backend service layer for ez-CorridorKey."""

from .clip_state import (
    ClipAsset,
    ClipEntry,
    ClipState,
    InOutRange,
    scan_clips_dir,
    scan_project_clips,
)
from .errors import CorridorKeyError
from .job_queue import GPUJob, GPUJobQueue, JobStatus, JobType
from .natural_sort import natsorted, natural_sort_key
from .project import (
    VIDEO_FILE_FILTER,
    add_clips_to_project,
    create_project,
    get_clip_dirs,
    get_display_name,
    is_image_file,
    is_v2_project,
    is_video_file,
    projects_root,
    read_clip_json,
    read_project_json,
    sanitize_stem,
    set_display_name,
    write_clip_json,
    write_project_json,
)
from .service import CorridorKeyService, InferenceParams, OutputConfig

__all__ = [
    # Service
    "CorridorKeyService",
    "InferenceParams",
    "OutputConfig",
    # Clip state
    "ClipAsset",
    "ClipEntry",
    "ClipState",
    "InOutRange",
    "scan_clips_dir",
    "scan_project_clips",
    # Job queue
    "GPUJob",
    "GPUJobQueue",
    "JobType",
    "JobStatus",
    # Errors
    "CorridorKeyError",
    # Project utilities
    "projects_root",
    "create_project",
    "add_clips_to_project",
    "sanitize_stem",
    "get_clip_dirs",
    "is_v2_project",
    "write_project_json",
    "read_project_json",
    "write_clip_json",
    "read_clip_json",
    "get_display_name",
    "set_display_name",
    "is_video_file",
    "is_image_file",
    "VIDEO_FILE_FILTER",
    # Natural sort
    "natural_sort_key",
    "natsorted",
]
