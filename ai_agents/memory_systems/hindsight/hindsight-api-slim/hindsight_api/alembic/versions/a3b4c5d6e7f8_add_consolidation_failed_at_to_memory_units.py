"""Add consolidation_failed_at column to memory_units for tracking persistent LLM failures.

When all LLM retries are exhausted on a single-memory batch, the memory is marked
with consolidation_failed_at instead of consolidated_at, so it is not silently lost
and can be retried later via the API.

Revision ID: a3b4c5d6e7f8
Revises: g7h8i9j0k1l2
Create Date: 2026-03-17
"""

from collections.abc import Sequence

from alembic import context, op

revision: str = "a3b4c5d6e7f8"
down_revision: str | Sequence[str] | None = "g7h8i9j0k1l2"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def _get_schema_prefix() -> str:
    """Get schema prefix for table names (required for multi-tenant support)."""
    schema = context.config.get_main_option("target_schema")
    return f'"{schema}".' if schema else ""


def upgrade() -> None:
    schema = _get_schema_prefix()

    op.execute(
        f"""
        ALTER TABLE {schema}memory_units
        ADD COLUMN IF NOT EXISTS consolidation_failed_at TIMESTAMPTZ DEFAULT NULL
        """
    )

    # Index to efficiently query memories that failed consolidation for a given bank
    op.execute(
        f"""
        CREATE INDEX IF NOT EXISTS idx_memory_units_consolidation_failed
        ON {schema}memory_units (bank_id, consolidation_failed_at)
        WHERE consolidation_failed_at IS NOT NULL AND fact_type IN ('experience', 'world')
        """
    )


def downgrade() -> None:
    schema = _get_schema_prefix()

    op.execute(f"DROP INDEX IF EXISTS {schema}idx_memory_units_consolidation_failed")
    op.execute(f"ALTER TABLE {schema}memory_units DROP COLUMN IF EXISTS consolidation_failed_at")
