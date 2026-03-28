"""Test file to verify AWS integration setup works correctly."""

import asyncio
import os
import subprocess
import time
import uuid
from unittest.mock import AsyncMock, patch

import pytest

from aws_mcp_server.server import aws_cli_pipeline


def test_aws_cli_installed():
    """Test that AWS CLI is installed."""
    result = subprocess.run(["aws", "--version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
    assert result.returncode == 0, "AWS CLI is not installed or not in PATH"


@pytest.mark.integration
def test_aws_credentials_exist():
    """Test that AWS credentials exist.

    This test is marked as integration because it requires AWS credentials.
    """
    result = subprocess.run(["aws", "sts", "get-caller-identity"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
    assert result.returncode == 0, f"AWS credentials check failed: {result.stderr.decode('utf-8')}"


@pytest.mark.asyncio
@pytest.mark.integration
async def test_aws_execute_command():
    """Test that we can execute a basic AWS command.

    This test is marked as integration because it requires AWS credentials.
    """
    # Test a simple S3 bucket listing command
    result = await aws_cli_pipeline(command="aws s3 ls", timeout=None, ctx=None)

    # Verify the result
    assert isinstance(result, dict)
    assert "status" in result
    assert result["status"] == "success", f"Command failed: {result.get('output', '')}"


@pytest.mark.asyncio
@pytest.mark.integration
async def test_aws_bucket_creation():
    """Test that we can create and delete a bucket.

    This test is marked as integration because it requires AWS credentials.
    """
    # Generate a bucket name
    timestamp = int(time.time())
    random_id = str(uuid.uuid4())[:8]
    bucket_name = f"aws-mcp-test-{timestamp}-{random_id}"

    # Get region from environment or use default
    region = os.environ.get("AWS_TEST_REGION", os.environ.get("AWS_REGION", "us-east-1"))

    try:
        # Create bucket with region specification
        create_result = await aws_cli_pipeline(command=f"aws s3 mb s3://{bucket_name} --region {region}", timeout=None, ctx=None)
        assert create_result["status"] == "success", f"Failed to create bucket: {create_result['output']}"

        # Verify bucket exists
        await asyncio.sleep(3)  # Wait for bucket to be fully available
        list_result = await aws_cli_pipeline(command="aws s3 ls", timeout=None, ctx=None)
        assert bucket_name in list_result["output"], "Bucket was not found in bucket list"

    finally:
        # Clean up - delete the bucket
        await aws_cli_pipeline(command=f"aws s3 rb s3://{bucket_name} --region {region}", timeout=None, ctx=None)


@pytest.mark.asyncio
async def test_aws_command_mocked():
    """Test executing an AWS command with mocked execution.

    This test is mocked so it doesn't require AWS credentials, suitable for CI.
    """
    # We need to patch the correct module path
    with patch("aws_mcp_server.server.execute_aws_command", new_callable=AsyncMock) as mock_execute:
        # Set up mock return value
        mock_execute.return_value = {"status": "success", "output": "Mock bucket list output"}

        # Execute the command
        result = await aws_cli_pipeline(command="aws s3 ls", timeout=None, ctx=None)

        # Verify the mock was called correctly
        mock_execute.assert_called_once()

        # Check the results
        assert result["status"] == "success"
        assert "Mock bucket list output" in result["output"]
