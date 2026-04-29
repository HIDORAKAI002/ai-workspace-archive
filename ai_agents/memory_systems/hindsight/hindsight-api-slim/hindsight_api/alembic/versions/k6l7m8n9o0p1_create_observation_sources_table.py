"""No-op: observation_sources table is Oracle-only

Originally created the observation_sources junction table for all backends,
but PG uses native array ops on the source_memory_ids column (faster at scale).
Oracle creates this table via migrations_oracle.py instead.

Kept as a no-op to preserve the Alembic revision chain.

Revision ID: k6l7m8n9o0p1
Revises: i4j5k6l7m8n9
Create Date: 2026-04-24
"""

from collections.abc import Sequence

revision: str = "k6l7m8n9o0p1"
down_revision: str | Sequence[str] | None = "i4j5k6l7m8n9"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # Oracle creates observation_sources via migrations_oracle.py.
    # PG uses source_memory_ids array column directly — no junction table needed.
    pass


def downgrade() -> None:
    pass
