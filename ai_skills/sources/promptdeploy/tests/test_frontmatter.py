"""Tests for YAML frontmatter parsing and serialization."""

import pytest

from promptdeploy.frontmatter import (
    FrontmatterError,
    parse_frontmatter,
    serialize_frontmatter,
    strip_deployment_fields,
    transform_for_target,
)


class TestParseFrontmatter:
    def test_standard_frontmatter(self):
        content = b"---\nname: test\ndescription: a test\n---\nBody content here.\n"
        metadata, body = parse_frontmatter(content)
        assert metadata == {"name": "test", "description": "a test"}
        assert body == b"Body content here.\n"

    def test_no_frontmatter(self):
        content = b"Just plain body content.\n"
        metadata, body = parse_frontmatter(content)
        assert metadata is None
        assert body == content

    def test_empty_frontmatter(self):
        content = b"---\n\n---\nBody after empty frontmatter.\n"
        metadata, body = parse_frontmatter(content)
        assert metadata == {}
        assert body == b"Body after empty frontmatter.\n"

    def test_multiline_yaml_values(self):
        content = b"---\ndescription: |\n  This is a\n  multi-line value.\ntags:\n  - one\n  - two\n---\nBody.\n"
        metadata, body = parse_frontmatter(content)
        assert metadata["description"] == "This is a\nmulti-line value.\n"
        assert metadata["tags"] == ["one", "two"]
        assert body == b"Body.\n"

    def test_unicode_content(self):
        content = "---\ntitle: \u6d4b\u8bd5\nauthor: \u00e9l\u00e8ve\n---\nBody with \u00fcnicode.\n".encode(
            "utf-8"
        )
        metadata, body = parse_frontmatter(content)
        assert metadata["title"] == "\u6d4b\u8bd5"
        assert metadata["author"] == "\u00e9l\u00e8ve"
        assert "Body with \u00fcnicode.".encode("utf-8") in body

    def test_invalid_yaml_raises_error(self):
        content = b"---\ninvalid: yaml: content: [broken\n---\nBody.\n"
        with pytest.raises(FrontmatterError, match="Invalid YAML"):
            parse_frontmatter(content)

    def test_frontmatter_with_boolean_and_numeric(self):
        content = b"---\nenabled: true\ncount: 42\nratio: 3.14\n---\nBody.\n"
        metadata, body = parse_frontmatter(content)
        assert metadata["enabled"] is True
        assert metadata["count"] == 42
        assert metadata["ratio"] == 3.14

    def test_no_closing_delimiter(self):
        content = b"---\nname: test\nNo closing delimiter.\n"
        metadata, body = parse_frontmatter(content)
        assert metadata is None
        assert body == content


class TestStripDeploymentFields:
    def test_strip_only(self):
        metadata = {"name": "test", "only": ["target-a"]}
        result = strip_deployment_fields(metadata)
        assert result == {"name": "test"}

    def test_strip_except(self):
        metadata = {"name": "test", "except": ["target-b"]}
        result = strip_deployment_fields(metadata)
        assert result == {"name": "test"}

    def test_strip_both(self):
        metadata = {"name": "test", "only": ["a"], "except": ["b"], "description": "hi"}
        result = strip_deployment_fields(metadata)
        assert result == {"name": "test", "description": "hi"}

    def test_no_deployment_fields(self):
        metadata = {"name": "test", "description": "hi"}
        result = strip_deployment_fields(metadata)
        assert result == metadata

    def test_does_not_mutate_original(self):
        metadata = {"name": "test", "only": ["a"]}
        strip_deployment_fields(metadata)
        assert "only" in metadata


class TestSerializeFrontmatter:
    def test_basic_serialize(self):
        metadata = {"name": "test"}
        body = b"Body content.\n"
        result = serialize_frontmatter(metadata, body)
        assert result.startswith(b"---\n")
        assert b"name: test" in result
        assert result.endswith(b"---\nBody content.\n")

    def test_empty_metadata_returns_body(self):
        body = b"Just the body.\n"
        result = serialize_frontmatter({}, body)
        assert result == body

    def test_unicode_serialize(self):
        metadata = {"title": "\u6d4b\u8bd5"}
        body = b"Body.\n"
        result = serialize_frontmatter(metadata, body)
        assert "\u6d4b\u8bd5".encode("utf-8") in result

    def test_round_trip(self):
        original_meta = {"name": "test", "tags": ["a", "b"]}
        original_body = b"Some body content.\n"
        serialized = serialize_frontmatter(original_meta, original_body)
        parsed_meta, parsed_body = parse_frontmatter(serialized)
        assert parsed_meta == original_meta
        assert parsed_body == original_body


class TestTransformForTarget:
    def test_strips_deployment_fields(self):
        content = b"---\nname: test\nonly:\n  - target-a\n---\nBody.\n"
        result = transform_for_target(content, "target-a")
        meta, body = parse_frontmatter(result)
        assert "only" not in meta
        assert meta["name"] == "test"
        assert body == b"Body.\n"

    def test_no_frontmatter_returns_original(self):
        content = b"No frontmatter here.\n"
        result = transform_for_target(content, "target-a")
        assert result == content

    def test_idempotent(self):
        content = b"---\nname: test\nonly:\n  - target-a\n---\nBody.\n"
        first = transform_for_target(content, "target-a")
        second = transform_for_target(first, "target-a")
        assert first == second

    def test_all_deployment_fields_removed(self):
        content = b"---\nname: test\nonly:\n  - a\nexcept:\n  - b\n---\nBody.\n"
        result = transform_for_target(content, "any")
        meta, _ = parse_frontmatter(result)
        assert "only" not in meta
        assert "except" not in meta
        assert meta == {"name": "test"}

    def test_empty_metadata_after_strip(self):
        content = b"---\nonly:\n  - target-a\n---\nBody.\n"
        result = transform_for_target(content, "target-a")
        assert result == b"Body.\n"
