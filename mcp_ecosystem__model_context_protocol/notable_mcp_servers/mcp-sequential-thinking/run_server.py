#!/usr/bin/env python
"""
Run script for the Sequential Thinking MCP server.
This script makes it easy to run the server directly from the root directory.
"""
import os
import sys

# Set environment variables for proper encoding
os.environ['PYTHONIOENCODING'] = 'utf-8'
os.environ['PYTHONUNBUFFERED'] = '1'

# Ensure stdout is clean before importing any modules
sys.stdout.flush()

# Import and run the server
from mcp_sequential_thinking.server import main
from mcp_sequential_thinking.logging_conf import configure_logging

# Configure logging for this script
logger = configure_logging("sequential-thinking.runner")

if __name__ == "__main__":
    try:
        logger.info("Starting Sequential Thinking MCP server from runner script")
        main()
    except Exception as e:
        logger.error(f"Fatal error in MCP server: {e}", exc_info=True)
        sys.exit(1)
