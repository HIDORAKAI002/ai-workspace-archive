"""Tests for filetag parsing."""

from promptdeploy.filetags import parse_filetags


class TestParseFiletags:
    def test_no_tags(self):
        assert parse_filetags("heavy") == ("heavy", [])

    def test_single_tag(self):
        assert parse_filetags("heavy -- positron") == ("heavy", ["positron"])

    def test_multiple_tags(self):
        assert parse_filetags("heavy -- positron local") == (
            "heavy",
            ["positron", "local"],
        )

    def test_rsplit_behavior(self):
        """Rightmost ` -- ` is the tag separator, preserving ` -- ` in basename."""
        assert parse_filetags("foo -- bar -- positron") == (
            "foo -- bar",
            ["positron"],
        )

    def test_no_separator(self):
        assert parse_filetags("simple-name") == ("simple-name", [])

    def test_separator_with_no_tags(self):
        """Empty tag part returns original name with no tags."""
        assert parse_filetags("heavy --  ") == ("heavy --  ", [])

    def test_separator_with_empty_base(self):
        """Empty base returns original name with no tags."""
        assert parse_filetags(" -- positron") == (" -- positron", [])

    def test_hyphens_in_name(self):
        """Regular hyphens don't trigger parsing."""
        assert parse_filetags("my-cool-agent") == ("my-cool-agent", [])

    def test_double_dash_without_spaces(self):
        """Double dash without spaces doesn't trigger parsing."""
        assert parse_filetags("heavy--positron") == ("heavy--positron", [])
