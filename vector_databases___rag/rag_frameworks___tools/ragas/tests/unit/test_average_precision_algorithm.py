"""
Unit tests for Average Precision algorithm.
"""

from typing import List

import numpy as np
import pytest


def calculate_average_precision_original(verdict_list: List[int]) -> float:
    """Original implementation for comparison."""
    if not verdict_list:
        return 0.0

    numerator = sum(
        [
            (sum(verdict_list[: i + 1]) / (i + 1)) * verdict_list[i]
            for i in range(len(verdict_list))
        ]
    )
    denominator = sum(verdict_list) + 1e-10
    return numerator / denominator


def calculate_average_precision_optimized(verdict_list: List[int]) -> float:
    """Optimized implementation matching the codebase."""
    cumsum = 0
    numerator = 0.0
    for i, v in enumerate(verdict_list):
        cumsum += v
        if v:
            numerator += cumsum / (i + 1)

    denominator = cumsum + 1e-10
    return numerator / denominator


class TestAveragePrecisionAlgorithm:
    """Test suite for Average Precision algorithm correctness."""

    @pytest.mark.parametrize(
        "verdict_list",
        [
            [],  # empty
            [1],  # single positive
            [0],  # single negative
            [1, 1, 1, 1, 1],  # all ones
            [0, 0, 0, 0, 0],  # all zeros
            [1, 0, 1],  # alternating
            [1, 1, 0, 1],  # mixed
            [0, 0, 1, 1, 1],  # late positives
            [1, 1, 0, 0, 1, 1, 0, 1],  # realistic pattern
        ],
    )
    def test_optimized_matches_original(self, verdict_list):
        """Test that optimized algorithm produces identical results to original."""
        original = calculate_average_precision_original(verdict_list)
        optimized = calculate_average_precision_optimized(verdict_list)
        assert np.isclose(original, optimized, rtol=1e-10, atol=1e-10)

    def test_known_example_1_0_1(self):
        """Test [1,0,1]: score = (1 + 2/3) / 2 = 5/6."""
        assert np.isclose(
            calculate_average_precision_optimized([1, 0, 1]), 5 / 6, rtol=1e-10
        )

    def test_known_example_1_1_0_1(self):
        """Test [1,1,0,1]: score = (1 + 1 + 3/4) / 3 = 11/12."""
        assert np.isclose(
            calculate_average_precision_optimized([1, 1, 0, 1]), 11 / 12, rtol=1e-10
        )

    def test_early_positives_score_higher(self):
        """Earlier positives should score higher than later positives."""
        early = calculate_average_precision_optimized([1, 1, 0, 0, 0])
        late = calculate_average_precision_optimized([0, 0, 0, 1, 1])
        assert early > late

    @pytest.mark.parametrize("seed", [42, 123, 456])
    def test_random_inputs(self, seed):
        """Test with random inputs for robustness."""
        np.random.seed(seed)
        for length in [10, 50, 100]:
            verdict_list = np.random.choice([0, 1], size=length).tolist()
            original = calculate_average_precision_original(verdict_list)
            optimized = calculate_average_precision_optimized(verdict_list)
            assert np.isclose(original, optimized, rtol=1e-10, atol=1e-10)
