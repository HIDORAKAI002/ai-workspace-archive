"""Tests for sample_python.py - used to verify TESTED_BY edge detection."""

from tests.fixtures.sample_python import AuthService, process_request


def test_authenticate_valid():
    service = AuthService("test", "secret123")
    assert service.authenticate("secret123") is True


def test_authenticate_invalid():
    service = AuthService("test", "secret123")
    assert service.authenticate("wrong") is False


def test_process_request_ok():
    service = AuthService("test", "secret123")
    result = process_request(service, "secret123")
    assert result["status"] == "ok"
