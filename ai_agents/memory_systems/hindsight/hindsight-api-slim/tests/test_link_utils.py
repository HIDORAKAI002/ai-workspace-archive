"""Tests for link_utils datetime handling and temporal link computation."""
import pytest
from datetime import datetime, timezone, timedelta

from hindsight_api.engine.retain.link_utils import (
    _normalize_datetime,
    compute_temporal_links,
    compute_temporal_query_bounds,
)


class TestNormalizeDatetime:
    """Tests for the _normalize_datetime helper function."""

    def test_none_returns_none(self):
        """Test that None input returns None."""
        assert _normalize_datetime(None) is None

    def test_naive_datetime_becomes_utc(self):
        """Test that naive datetimes are converted to UTC."""
        naive_dt = datetime(2024, 6, 15, 10, 30, 0)
        result = _normalize_datetime(naive_dt)

        assert result.tzinfo is not None
        assert result.tzinfo == timezone.utc
        assert result.year == 2024
        assert result.month == 6
        assert result.day == 15
        assert result.hour == 10
        assert result.minute == 30

    def test_aware_datetime_unchanged(self):
        """Test that timezone-aware datetimes are returned unchanged."""
        aware_dt = datetime(2024, 6, 15, 10, 30, 0, tzinfo=timezone.utc)
        result = _normalize_datetime(aware_dt)

        assert result == aware_dt
        assert result.tzinfo == timezone.utc

    def test_mixed_datetimes_can_be_compared(self):
        """Test that normalized naive and aware datetimes can be compared."""
        naive_dt = datetime(2024, 6, 15, 10, 30, 0)
        aware_dt = datetime(2024, 6, 15, 10, 30, 0, tzinfo=timezone.utc)

        normalized_naive = _normalize_datetime(naive_dt)
        normalized_aware = _normalize_datetime(aware_dt)

        # Should be able to compare without TypeError
        assert normalized_naive == normalized_aware


class TestComputeTemporalQueryBounds:
    """Tests for compute_temporal_query_bounds function."""

    def test_empty_units_returns_none(self):
        """Test that empty input returns (None, None)."""
        min_date, max_date = compute_temporal_query_bounds({})
        assert min_date is None
        assert max_date is None

    def test_single_unit_normal_date(self):
        """Test bounds for a single unit with normal date."""
        units = {"unit-1": datetime(2024, 6, 15, 12, 0, 0, tzinfo=timezone.utc)}
        min_date, max_date = compute_temporal_query_bounds(units, time_window_hours=24)

        assert min_date == datetime(2024, 6, 14, 12, 0, 0, tzinfo=timezone.utc)
        assert max_date == datetime(2024, 6, 16, 12, 0, 0, tzinfo=timezone.utc)

    def test_multiple_units(self):
        """Test bounds span across multiple units."""
        units = {
            "unit-1": datetime(2024, 6, 10, 12, 0, 0, tzinfo=timezone.utc),
            "unit-2": datetime(2024, 6, 15, 12, 0, 0, tzinfo=timezone.utc),
            "unit-3": datetime(2024, 6, 20, 12, 0, 0, tzinfo=timezone.utc),
        }
        min_date, max_date = compute_temporal_query_bounds(units, time_window_hours=24)

        # min should be Jun 10 - 24h = Jun 9
        assert min_date == datetime(2024, 6, 9, 12, 0, 0, tzinfo=timezone.utc)
        # max should be Jun 20 + 24h = Jun 21
        assert max_date == datetime(2024, 6, 21, 12, 0, 0, tzinfo=timezone.utc)

    def test_mixed_naive_and_aware_datetimes(self):
        """Test that mixed naive/aware datetimes work correctly."""
        units = {
            "unit-1": datetime(2024, 6, 10, 12, 0, 0),  # naive
            "unit-2": datetime(2024, 6, 15, 12, 0, 0, tzinfo=timezone.utc),  # aware
        }
        # Should not raise TypeError
        min_date, max_date = compute_temporal_query_bounds(units, time_window_hours=24)

        assert min_date is not None
        assert max_date is not None
        assert min_date.tzinfo is not None
        assert max_date.tzinfo is not None

    def test_overflow_near_datetime_min(self):
        """Test overflow protection near datetime.min."""
        units = {"unit-1": datetime(1, 1, 2, 0, 0, tzinfo=timezone.utc)}
        min_date, max_date = compute_temporal_query_bounds(units, time_window_hours=48)

        # Should handle overflow gracefully
        assert min_date == datetime.min.replace(tzinfo=timezone.utc)
        assert max_date is not None

    def test_overflow_near_datetime_max(self):
        """Test overflow protection near datetime.max."""
        units = {"unit-1": datetime(9999, 12, 30, 0, 0, tzinfo=timezone.utc)}
        min_date, max_date = compute_temporal_query_bounds(units, time_window_hours=48)

        # Should handle overflow gracefully
        assert min_date is not None
        assert max_date == datetime.max.replace(tzinfo=timezone.utc)


class TestComputeTemporalLinks:
    """Tests for compute_temporal_links function."""

    def test_empty_units_returns_empty(self):
        """Test that empty input returns empty list."""
        links = compute_temporal_links({}, [])
        assert links == []

    def test_no_candidates_returns_empty(self):
        """Test that no candidates means no links."""
        units = {"unit-1": datetime(2024, 6, 15, 12, 0, 0, tzinfo=timezone.utc)}
        links = compute_temporal_links(units, [])
        assert links == []

    def test_candidate_within_window_creates_link(self):
        """Test that candidates within time window create links."""
        units = {"unit-1": datetime(2024, 6, 15, 12, 0, 0, tzinfo=timezone.utc)}
        candidates = [
            {"id": "candidate-1", "event_date": datetime(2024, 6, 15, 10, 0, 0, tzinfo=timezone.utc)},
        ]

        links = compute_temporal_links(units, candidates, time_window_hours=24)

        assert len(links) == 1
        assert links[0][0] == "unit-1"
        assert links[0][1] == "candidate-1"
        assert links[0][2] == "temporal"
        assert links[0][4] is None
        # Weight should be high since they're close (2 hours apart)
        assert links[0][3] > 0.9

    def test_candidate_outside_window_no_link(self):
        """Test that candidates outside time window don't create links."""
        units = {"unit-1": datetime(2024, 6, 15, 12, 0, 0, tzinfo=timezone.utc)}
        candidates = [
            {"id": "candidate-1", "event_date": datetime(2024, 6, 10, 12, 0, 0, tzinfo=timezone.utc)},
        ]

        links = compute_temporal_links(units, candidates, time_window_hours=24)

        assert len(links) == 0

    def test_weight_decreases_with_distance(self):
        """Test that weight decreases as time difference increases."""
        units = {"unit-1": datetime(2024, 6, 15, 12, 0, 0, tzinfo=timezone.utc)}
        candidates = [
            {"id": "close", "event_date": datetime(2024, 6, 15, 11, 0, 0, tzinfo=timezone.utc)},  # 1 hour
            {"id": "far", "event_date": datetime(2024, 6, 14, 18, 0, 0, tzinfo=timezone.utc)},  # 18 hours
        ]

        links = compute_temporal_links(units, candidates, time_window_hours=24)

        assert len(links) == 2
        close_link = next(l for l in links if l[1] == "close")
        far_link = next(l for l in links if l[1] == "far")

        assert close_link[3] > far_link[3]

    def test_max_10_links_per_unit(self):
        """Test that at most 10 links are created per unit."""
        units = {"unit-1": datetime(2024, 6, 15, 12, 0, 0, tzinfo=timezone.utc)}
        # Create 15 candidates all within window
        candidates = [
            {"id": f"candidate-{i}", "event_date": datetime(2024, 6, 15, 11, 0, 0, tzinfo=timezone.utc)}
            for i in range(15)
        ]

        links = compute_temporal_links(units, candidates, time_window_hours=24)

        assert len(links) == 10

    def test_multiple_units_multiple_candidates(self):
        """Test with multiple units and candidates."""
        units = {
            "unit-1": datetime(2024, 6, 15, 12, 0, 0, tzinfo=timezone.utc),
            "unit-2": datetime(2024, 6, 20, 12, 0, 0, tzinfo=timezone.utc),
        }
        candidates = [
            {"id": "c1", "event_date": datetime(2024, 6, 15, 10, 0, 0, tzinfo=timezone.utc)},  # near unit-1
            {"id": "c2", "event_date": datetime(2024, 6, 20, 10, 0, 0, tzinfo=timezone.utc)},  # near unit-2
            {"id": "c3", "event_date": datetime(2024, 6, 17, 12, 0, 0, tzinfo=timezone.utc)},  # between, near neither
        ]

        links = compute_temporal_links(units, candidates, time_window_hours=24)

        # unit-1 should link to c1 only
        # unit-2 should link to c2 only
        unit1_links = [l for l in links if l[0] == "unit-1"]
        unit2_links = [l for l in links if l[0] == "unit-2"]

        assert len(unit1_links) == 1
        assert unit1_links[0][1] == "c1"

        assert len(unit2_links) == 1
        assert unit2_links[0][1] == "c2"

    def test_mixed_naive_and_aware_datetimes(self):
        """Test that mixed naive/aware datetimes work correctly."""
        units = {"unit-1": datetime(2024, 6, 15, 12, 0, 0)}  # naive
        candidates = [
            {"id": "c1", "event_date": datetime(2024, 6, 15, 10, 0, 0, tzinfo=timezone.utc)},  # aware
        ]

        # Should not raise TypeError
        links = compute_temporal_links(units, candidates, time_window_hours=24)
        assert len(links) == 1

    def test_overflow_near_datetime_min(self):
        """Test overflow protection when unit date is near datetime.min."""
        units = {"unit-1": datetime(1, 1, 2, 0, 0, tzinfo=timezone.utc)}
        candidates = [
            {"id": "c1", "event_date": datetime(1, 1, 1, 12, 0, 0, tzinfo=timezone.utc)},
        ]

        # Should not raise OverflowError
        links = compute_temporal_links(units, candidates, time_window_hours=48)
        assert len(links) == 1

    def test_overflow_near_datetime_max(self):
        """Test overflow protection when unit date is near datetime.max."""
        units = {"unit-1": datetime(9999, 12, 30, 0, 0, tzinfo=timezone.utc)}
        candidates = [
            {"id": "c1", "event_date": datetime(9999, 12, 31, 12, 0, 0, tzinfo=timezone.utc)},
        ]

        # Should not raise OverflowError
        links = compute_temporal_links(units, candidates, time_window_hours=48)
        assert len(links) == 1

    def test_weight_minimum_is_0_3(self):
        """Test that weight doesn't go below 0.3."""
        units = {"unit-1": datetime(2024, 6, 15, 12, 0, 0, tzinfo=timezone.utc)}
        candidates = [
            # 23 hours apart - should be just within 24h window but low weight
            {"id": "c1", "event_date": datetime(2024, 6, 14, 13, 0, 0, tzinfo=timezone.utc)},
        ]

        links = compute_temporal_links(units, candidates, time_window_hours=24)

        assert len(links) == 1
        assert links[0][3] >= 0.3
