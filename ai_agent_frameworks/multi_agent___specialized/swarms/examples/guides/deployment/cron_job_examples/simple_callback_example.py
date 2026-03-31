"""
Simple Callback CronJob Example

This example shows the basic usage of the new callback functionality
in CronJob to customize output while the job is running.
"""

import json
from datetime import datetime
from loguru import logger

from swarms import Agent, CronJob


def create_simple_agent():
    """Create a simple agent for demonstration."""
    return Agent(
        agent_name="Simple-Analysis-Agent",
        system_prompt="You are a simple analysis agent. Provide brief insights on the given topic.",
        model_name="gpt-5.4",
        max_loops=1,
        print_on=False,
    )


def simple_callback(output, task, metadata):
    """Simple callback that adds metadata to the output.

    Args:
        output: The original output from the agent
        task: The task that was executed
        metadata: Job metadata (execution count, timestamp, etc.)

    Returns:
        dict: Enhanced output with metadata
    """
    return {
        "agent_output": output,
        "execution_number": metadata["execution_count"],
        "timestamp": datetime.fromtimestamp(
            metadata["timestamp"]
        ).isoformat(),
        "task": task,
        "job_id": metadata["job_id"],
    }


def main():
    """Demonstrate basic callback usage."""
    logger.info("🚀 Starting Simple Callback Example")

    # Create agent and cron job with callback
    agent = create_simple_agent()

    cron_job = CronJob(
        agent=agent,
        interval="10seconds",
        job_id="simple-callback-example",
        callback=simple_callback,
    )

    logger.info("▶️  Starting cron job with callback...")
    logger.info(
        "📝 The callback will enhance each output with metadata"
    )
    logger.info("⏹️  Press Ctrl+C to stop")

    try:
        # Start the cron job
        cron_job.run(
            task="What are the key trends in artificial intelligence today?"
        )
    except KeyboardInterrupt:
        logger.info("⏹️  Stopping cron job...")
        cron_job.stop()

        # Show execution statistics
        stats = cron_job.get_execution_stats()
        logger.info("📊 Final Statistics:")
        logger.info(json.dumps(stats, indent=2))


if __name__ == "__main__":
    main()
