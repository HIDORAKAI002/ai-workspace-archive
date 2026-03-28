"""Tests for promptdeploy output formatting."""

from promptdeploy.output import Output, Verbosity


class TestVerbosity:
    def test_enum_ordering(self) -> None:
        assert Verbosity.QUIET < Verbosity.NORMAL < Verbosity.VERBOSE

    def test_enum_values(self) -> None:
        assert Verbosity.QUIET == 0
        assert Verbosity.NORMAL == 1
        assert Verbosity.VERBOSE == 2


class TestOutputAction:
    def test_normal_prints(self, capsys) -> None:
        out = Output(Verbosity.NORMAL)
        out.action("A", "agent", "helper", "local")
        captured = capsys.readouterr()
        assert "A" in captured.out
        assert "agent" in captured.out
        assert "helper" in captured.out
        assert "local" in captured.out

    def test_quiet_suppresses(self, capsys) -> None:
        out = Output(Verbosity.QUIET)
        out.action("A", "agent", "helper", "local")
        captured = capsys.readouterr()
        assert captured.out == ""

    def test_prefix(self, capsys) -> None:
        out = Output(Verbosity.NORMAL)
        out.action("A", "agent", "helper", "local", prefix="[dry-run] ")
        captured = capsys.readouterr()
        assert "[dry-run]" in captured.out

    def test_diff_hidden_in_normal(self, capsys) -> None:
        out = Output(Verbosity.NORMAL)
        out.action("M", "agent", "helper", "local", diff="+ added line")
        captured = capsys.readouterr()
        assert "added line" not in captured.out

    def test_diff_shown_in_verbose(self, capsys) -> None:
        out = Output(Verbosity.VERBOSE)
        out.action("M", "agent", "helper", "local", diff="+ added line\n- removed line")
        captured = capsys.readouterr()
        assert "+ added line" in captured.out
        assert "- removed line" in captured.out


class TestOutputWarning:
    def test_warning_to_stderr(self, capsys) -> None:
        out = Output(Verbosity.NORMAL)
        out.warning("something is off")
        captured = capsys.readouterr()
        assert "WARNING: something is off" in captured.err

    def test_warning_suppressed_in_quiet(self, capsys) -> None:
        out = Output(Verbosity.QUIET)
        out.warning("something is off")
        captured = capsys.readouterr()
        assert captured.err == ""


class TestOutputError:
    def test_error_always_shown(self, capsys) -> None:
        out = Output(Verbosity.QUIET)
        out.error("fatal problem")
        captured = capsys.readouterr()
        assert "ERROR: fatal problem" in captured.err


class TestOutputSummary:
    def test_normal_summary(self, capsys) -> None:
        out = Output(Verbosity.NORMAL)
        out.summary(1, 2, 3, 4)
        captured = capsys.readouterr()
        assert "1 created" in captured.out
        assert "2 updated" in captured.out
        assert "3 removed" in captured.out
        assert "4 unchanged" in captured.out

    def test_quiet_suppresses_summary(self, capsys) -> None:
        out = Output(Verbosity.QUIET)
        out.summary(1, 2, 3, 4)
        captured = capsys.readouterr()
        assert captured.out == ""

    def test_verbose_shows_timing(self, capsys) -> None:
        out = Output(Verbosity.VERBOSE)
        out.start_timer()
        out.summary(0, 0, 0, 0)
        captured = capsys.readouterr()
        # Should contain timing like "(0.00s)"
        assert "s)" in captured.out

    def test_prefix_in_summary(self, capsys) -> None:
        out = Output(Verbosity.NORMAL)
        out.summary(1, 0, 0, 0, prefix="[dry-run] ")
        captured = capsys.readouterr()
        assert "[dry-run]" in captured.out

    def test_pre_existing_shown_when_nonzero(self, capsys) -> None:
        out = Output(Verbosity.NORMAL)
        out.summary(1, 0, 0, 2, pre_existing=3)
        captured = capsys.readouterr()
        assert "3 pre-existing" in captured.out

    def test_pre_existing_hidden_when_zero(self, capsys) -> None:
        out = Output(Verbosity.NORMAL)
        out.summary(1, 0, 0, 2, pre_existing=0)
        captured = capsys.readouterr()
        assert "pre-existing" not in captured.out


class TestTimer:
    def test_elapsed_none_without_start(self) -> None:
        out = Output()
        assert out.elapsed() is None

    def test_elapsed_returns_float(self) -> None:
        out = Output()
        out.start_timer()
        elapsed = out.elapsed()
        assert isinstance(elapsed, float)
        assert elapsed >= 0
