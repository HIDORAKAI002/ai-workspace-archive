"""Test for creating and managing S3 buckets directly."""

import asyncio
import os
import time
import uuid

import pytest

from aws_mcp_server.config import AWS_REGION
from aws_mcp_server.server import aws_cli_pipeline


@pytest.mark.integration
@pytest.mark.asyncio
async def test_create_and_delete_s3_bucket():
    """Test creating and deleting an S3 bucket using AWS MCP server."""
    # Get region from environment or use default
    region = os.environ.get("AWS_TEST_REGION", AWS_REGION)
    print(f"Using AWS region: {region}")

    # Generate a unique bucket name
    timestamp = int(time.time())
    random_id = str(uuid.uuid4())[:8]
    bucket_name = f"aws-mcp-test-{timestamp}-{random_id}"

    try:
        # Create the bucket
        create_cmd = f"aws s3 mb s3://{bucket_name} --region {region}"
        result = await aws_cli_pipeline(command=create_cmd, timeout=None, ctx=None)

        # Check if bucket was created successfully
        assert result["status"] == "success", f"Failed to create bucket: {result['output']}"

        # Wait for bucket to be fully available
        await asyncio.sleep(3)

        # List buckets to verify it exists
        list_result = await aws_cli_pipeline(command="aws s3 ls", timeout=None, ctx=None)
        assert bucket_name in list_result["output"], "Bucket not found in bucket list"

        # Try to create a test file
        test_content = "Test content"
        with open("test_file.txt", "w") as f:
            f.write(test_content)

        # Upload the file
        upload_result = await aws_cli_pipeline(command=f"aws s3 cp test_file.txt s3://{bucket_name}/test_file.txt --region {region}", timeout=None, ctx=None)
        assert upload_result["status"] == "success", f"Failed to upload file: {upload_result['output']}"

        # List bucket contents
        list_files_result = await aws_cli_pipeline(command=f"aws s3 ls s3://{bucket_name}/ --region {region}", timeout=None, ctx=None)
        assert "test_file.txt" in list_files_result["output"], "Uploaded file not found in bucket"

    finally:
        # Clean up
        # Remove test file
        if os.path.exists("test_file.txt"):
            os.remove("test_file.txt")

        # Delete all objects in the bucket
        await aws_cli_pipeline(command=f"aws s3 rm s3://{bucket_name} --recursive --region {region}", timeout=None, ctx=None)

        # Delete the bucket
        delete_result = await aws_cli_pipeline(command=f"aws s3 rb s3://{bucket_name} --region {region}", timeout=None, ctx=None)
        assert delete_result["status"] == "success", f"Failed to delete bucket: {delete_result['output']}"
