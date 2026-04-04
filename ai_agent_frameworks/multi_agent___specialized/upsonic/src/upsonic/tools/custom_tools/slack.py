"""Slack integration toolkit for the Upsonic framework."""

import json
from os import getenv
from typing import Any, Dict, List, Optional

from upsonic.tools.base import ToolKit
from upsonic.tools.config import tool
from upsonic.utils.printing import error_log

try:
    from slack_sdk import WebClient
    from slack_sdk.web.async_client import AsyncWebClient
    from slack_sdk.errors import SlackApiError
    _SLACK_SDK_AVAILABLE = True
except ImportError:
    WebClient = None
    AsyncWebClient = None
    SlackApiError = None
    _SLACK_SDK_AVAILABLE = False


class SlackTools(ToolKit):
    """Comprehensive Slack integration toolkit."""

    def __init__(
        self,
        token: Optional[str] = None,
        markdown: bool = True,
        **kwargs: Any,
    ) -> None:
        """Initialize the SlackTools class.

        Args:
            token: The Slack API token. Defaults to the SLACK_TOKEN environment variable.
            markdown: Whether to enable Slack markdown formatting.
            **kwargs: ToolKit params (include_tools, exclude_tools, timeout, etc.).
        """
        super().__init__(**kwargs)

        if not _SLACK_SDK_AVAILABLE:
            from upsonic.utils.printing import import_error
            import_error(
                package_name="slack_sdk",
                install_command='pip install slack-sdk',
                feature_name="Slack tools"
            )

        self.token: Optional[str] = token or getenv("SLACK_TOKEN")
        if self.token is None or self.token == "":
            raise ValueError("SLACK_TOKEN is not set")
        self.client: Any = WebClient(token=self.token)
        self.async_client: Any = AsyncWebClient(token=self.token)
        self.markdown: bool = markdown

    # ------------------------------------------------------------------
    # Non-tool public helpers (not exposed to LLM)
    # ------------------------------------------------------------------

    def update_message(self, channel: str, ts: str, text: str) -> str:
        """Update an existing message in a Slack channel.

        Args:
            channel: The channel ID where the message was posted.
            ts: The timestamp of the message to update.
            text: The new text for the message.

        Returns:
            A JSON string containing the response from the Slack API.
        """
        try:
            response = self.client.chat_update(
                channel=channel, ts=ts, text=text, mrkdwn=self.markdown
            )
            return json.dumps(response.data)
        except SlackApiError as e:
            error_log(f"Error updating message: {e}")
            return json.dumps({"error": str(e)})

    # ------------------------------------------------------------------
    # Tool methods
    # ------------------------------------------------------------------

    @tool
    def send_message(self, channel: str, text: str) -> str:
        """Send a message to a Slack channel.

        Args:
            channel: The channel ID or name to send the message to.
            text: The text of the message to send.

        Returns:
            A JSON string containing the response from the Slack API.
        """
        try:
            response = self.client.chat_postMessage(channel=channel, text=text, mrkdwn=self.markdown)
            return json.dumps(response.data)
        except SlackApiError as e:
            error_log(f"Error sending message: {e}")
            return json.dumps({"error": str(e)})

    async def asend_message(self, channel: str, text: str) -> str:
        try:
            response = await self.async_client.chat_postMessage(channel=channel, text=text, mrkdwn=self.markdown)
            return json.dumps(response.data)
        except SlackApiError as e:
            error_log(f"Error sending message: {e}")
            return json.dumps({"error": str(e)})

    @tool
    def send_message_thread(self, channel: str, text: str, thread_ts: str) -> str:
        """Send a threaded reply to a Slack channel.

        Args:
            channel: The channel ID or name to send the message to.
            text: The text of the message to send.
            thread_ts: The thread timestamp to reply to.

        Returns:
            A JSON string containing the response from the Slack API.
        """
        try:
            response = self.client.chat_postMessage(
                channel=channel, text=text, thread_ts=thread_ts, mrkdwn=self.markdown
            )
            return json.dumps(response.data)
        except SlackApiError as e:
            error_log(f"Error sending message: {e}")
            return json.dumps({"error": str(e)})

    async def asend_message_thread(self, channel: str, text: str, thread_ts: str) -> str:
        try:
            response = await self.async_client.chat_postMessage(
                channel=channel, text=text, thread_ts=thread_ts, mrkdwn=self.markdown
            )
            return json.dumps(response.data)
        except SlackApiError as e:
            error_log(f"Error sending message: {e}")
            return json.dumps({"error": str(e)})

    @tool
    def list_channels(self) -> str:
        """List all channels in the Slack workspace.

        Returns:
            A JSON string containing the list of channels.
        """
        try:
            response = self.client.conversations_list()
            channels = [{"id": channel["id"], "name": channel["name"]} for channel in response["channels"]]
            return json.dumps(channels)
        except SlackApiError as e:
            error_log(f"Error listing channels: {e}")
            return json.dumps({"error": str(e)})

    async def alist_channels(self) -> str:
        try:
            response = await self.async_client.conversations_list()
            channels = [{"id": channel["id"], "name": channel["name"]} for channel in response["channels"]]
            return json.dumps(channels)
        except SlackApiError as e:
            error_log(f"Error listing channels: {e}")
            return json.dumps({"error": str(e)})

    @tool
    def get_channel_history(self, channel: str, limit: int = 100) -> str:
        """Get the message history of a Slack channel.

        Args:
            channel: The channel ID to fetch history from.
            limit: The maximum number of messages to fetch.

        Returns:
            A JSON string containing the channel's message history.
        """
        try:
            response = self.client.conversations_history(channel=channel, limit=limit)
            messages: List[Dict[str, Any]] = [  # type: ignore
                {
                    "text": msg.get("text", ""),
                    "user": "webhook" if msg.get("subtype") == "bot_message" else msg.get("user", "unknown"),
                    "ts": msg.get("ts", ""),
                    "sub_type": msg.get("subtype", "unknown"),
                    "attachments": msg.get("attachments", []) if msg.get("subtype") == "bot_message" else "n/a",
                }
                for msg in response.get("messages", [])
            ]
            return json.dumps(messages)
        except SlackApiError as e:
            error_log(f"Error getting channel history: {e}")
            return json.dumps({"error": str(e)})

    async def aget_channel_history(self, channel: str, limit: int = 100) -> str:
        try:
            response = await self.async_client.conversations_history(channel=channel, limit=limit)
            messages: List[Dict[str, Any]] = [  # type: ignore
                {
                    "text": msg.get("text", ""),
                    "user": "webhook" if msg.get("subtype") == "bot_message" else msg.get("user", "unknown"),
                    "ts": msg.get("ts", ""),
                    "sub_type": msg.get("subtype", "unknown"),
                    "attachments": msg.get("attachments", []) if msg.get("subtype") == "bot_message" else "n/a",
                }
                for msg in response.get("messages", [])
            ]
            return json.dumps(messages)
        except SlackApiError as e:
            error_log(f"Error getting channel history: {e}")
            return json.dumps({"error": str(e)})
