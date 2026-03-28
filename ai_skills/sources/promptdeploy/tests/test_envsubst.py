"""Tests for environment variable expansion."""

from pathlib import Path

from promptdeploy.envsubst import expand_env_in_dict, expand_env_vars, load_dotenv


class TestExpandEnvVars:
    def test_basic_expansion(self, monkeypatch):
        monkeypatch.setenv("MY_VAR", "hello")
        assert expand_env_vars("${MY_VAR}") == "hello"

    def test_multiple_vars(self, monkeypatch):
        monkeypatch.setenv("A", "alpha")
        monkeypatch.setenv("B", "beta")
        assert expand_env_vars("${A}-${B}") == "alpha-beta"

    def test_unset_var_preserved(self, monkeypatch):
        monkeypatch.delenv("UNSET_VAR_XYZ", raising=False)
        assert expand_env_vars("${UNSET_VAR_XYZ}") == "${UNSET_VAR_XYZ}"

    def test_no_vars_returns_unchanged(self):
        assert expand_env_vars("plain string") == "plain string"

    def test_empty_string(self):
        assert expand_env_vars("") == ""

    def test_mixed_set_and_unset(self, monkeypatch):
        monkeypatch.setenv("SET_ONE", "yes")
        monkeypatch.delenv("NOT_SET_ONE", raising=False)
        result = expand_env_vars("${SET_ONE}:${NOT_SET_ONE}")
        assert result == "yes:${NOT_SET_ONE}"

    def test_var_with_surrounding_text(self, monkeypatch):
        monkeypatch.setenv("KEY", "secret")
        assert expand_env_vars("prefix-${KEY}-suffix") == "prefix-secret-suffix"


class TestExpandEnvInDict:
    def test_string_values_expanded(self, monkeypatch):
        monkeypatch.setenv("VAL", "expanded")
        result = expand_env_in_dict({"key": "${VAL}"})
        assert result == {"key": "expanded"}

    def test_nested_dicts_expanded(self, monkeypatch):
        monkeypatch.setenv("INNER", "deep")
        result = expand_env_in_dict({"outer": {"inner": "${INNER}"}})
        assert result == {"outer": {"inner": "deep"}}

    def test_lists_with_strings_expanded(self, monkeypatch):
        monkeypatch.setenv("ITEM", "value")
        result = expand_env_in_dict({"items": ["${ITEM}", "literal"]})
        assert result == {"items": ["value", "literal"]}

    def test_non_string_values_passed_through(self):
        data = {"count": 42, "flag": True, "empty": None}
        result = expand_env_in_dict(data)
        assert result == {"count": 42, "flag": True, "empty": None}

    def test_mixed_dict_with_all_types(self, monkeypatch):
        monkeypatch.setenv("NAME", "test")
        data = {
            "name": "${NAME}",
            "count": 5,
            "enabled": False,
            "tags": ["${NAME}", "fixed"],
            "nested": {"ref": "${NAME}"},
            "nothing": None,
        }
        result = expand_env_in_dict(data)
        assert result == {
            "name": "test",
            "count": 5,
            "enabled": False,
            "tags": ["test", "fixed"],
            "nested": {"ref": "test"},
            "nothing": None,
        }

    def test_list_with_non_string_elements(self, monkeypatch):
        monkeypatch.setenv("X", "val")
        data = {"items": ["${X}", 123, True, None]}
        result = expand_env_in_dict(data)
        assert result == {"items": ["val", 123, True, None]}

    def test_empty_dict(self):
        assert expand_env_in_dict({}) == {}


class TestLoadDotenv:
    def test_basic(self, tmp_path: Path, monkeypatch):
        monkeypatch.delenv("DOTENV_TEST_A", raising=False)
        (tmp_path / ".env").write_text("DOTENV_TEST_A=hello\n")
        load_dotenv(tmp_path / ".env")
        import os

        assert os.environ.get("DOTENV_TEST_A") == "hello"
        monkeypatch.delenv("DOTENV_TEST_A")

    def test_skips_comments_and_blanks(self, tmp_path: Path, monkeypatch):
        monkeypatch.delenv("DOTENV_REAL", raising=False)
        (tmp_path / ".env").write_text("# comment\n\n  \nDOTENV_REAL=yes\n")
        load_dotenv(tmp_path / ".env")
        import os

        assert os.environ.get("DOTENV_REAL") == "yes"
        monkeypatch.delenv("DOTENV_REAL")

    def test_no_overwrite(self, tmp_path: Path, monkeypatch):
        monkeypatch.setenv("DOTENV_EXISTING", "original")
        (tmp_path / ".env").write_text("DOTENV_EXISTING=replaced\n")
        load_dotenv(tmp_path / ".env")
        import os

        assert os.environ["DOTENV_EXISTING"] == "original"

    def test_missing_file(self, tmp_path: Path):
        load_dotenv(tmp_path / "nonexistent")  # should not raise

    def test_quoted_values(self, tmp_path: Path, monkeypatch):
        monkeypatch.delenv("DOTENV_DQ", raising=False)
        monkeypatch.delenv("DOTENV_SQ", raising=False)
        (tmp_path / ".env").write_text(
            "DOTENV_DQ=\"double quoted\"\nDOTENV_SQ='single quoted'\n"
        )
        load_dotenv(tmp_path / ".env")
        import os

        assert os.environ.get("DOTENV_DQ") == "double quoted"
        assert os.environ.get("DOTENV_SQ") == "single quoted"
        monkeypatch.delenv("DOTENV_DQ")
        monkeypatch.delenv("DOTENV_SQ")

    def test_skips_lines_without_equals(self, tmp_path: Path, monkeypatch):
        monkeypatch.delenv("DOTENV_GOOD", raising=False)
        (tmp_path / ".env").write_text("no-equals-here\nDOTENV_GOOD=ok\n")
        load_dotenv(tmp_path / ".env")
        import os

        assert os.environ.get("DOTENV_GOOD") == "ok"
        monkeypatch.delenv("DOTENV_GOOD")

    def test_empty_key_skipped(self, tmp_path: Path):
        (tmp_path / ".env").write_text("=value\n")
        load_dotenv(tmp_path / ".env")  # should not raise or set empty key
