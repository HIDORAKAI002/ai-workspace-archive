"""
Gmail Toolkit for interacting with Gmail API

Required Environment Variables:
-----------------------------
- GOOGLE_CLIENT_ID: Google OAuth client ID
- GOOGLE_CLIENT_SECRET: Google OAuth client secret
- GOOGLE_PROJECT_ID: Google Cloud project ID
- GOOGLE_REDIRECT_URI: Google OAuth redirect URI (default: http://localhost)

How to Get These Credentials:
---------------------------
1. Go to Google Cloud Console (https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Gmail API:
   - Go to "APIs & Services" > "Enable APIs and Services"
   - Search for "Gmail API"
   - Click "Enable"

4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Go through the OAuth consent screen setup
   - Give it a name and click "Create"
   - You'll receive:
     * Client ID (GOOGLE_CLIENT_ID)
     * Client Secret (GOOGLE_CLIENT_SECRET)
   - The Project ID (GOOGLE_PROJECT_ID) is visible in the project dropdown at the top of the page

5. Add auth redirect URI:
   - Go to https://console.cloud.google.com/auth/clients and add the redirect URI as http://127.0.0.1/

6. Set up environment variables:
   Create a .envrc file in your project root with:
   ```
   export GOOGLE_CLIENT_ID=your_client_id_here
   export GOOGLE_CLIENT_SECRET=your_client_secret_here
   export GOOGLE_PROJECT_ID=your_project_id_here
   export GOOGLE_REDIRECT_URI=http://127.0.0.1/  # Default value
   ```

Note: The first time you run the application, it will open a browser window for OAuth authentication.
A token.json file will be created to store the authentication credentials for future use.
"""

import asyncio
import base64
import functools
import mimetypes
from datetime import datetime, timedelta
from os import getenv
from pathlib import Path
from typing import Any, List, Optional, Union

from upsonic.tools.base import ToolKit
from upsonic.tools.config import tool
from upsonic.utils.integrations.gmail import (
    authenticate,
    encode_email_address,
    validate_email,
)

try:
    from email.mime.application import MIMEApplication
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText

    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build
    from googleapiclient.errors import HttpError
    _GOOGLE_API_AVAILABLE = True
except ImportError:
    Request = None
    Credentials = None
    InstalledAppFlow = None
    build = None
    HttpError = None
    _GOOGLE_API_AVAILABLE = False


class GmailTools(ToolKit):
    """Gmail API toolkit providing email read, compose, and label management tools."""

    DEFAULT_SCOPES: List[str] = [
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/gmail.modify",
        "https://www.googleapis.com/auth/gmail.compose",
    ]

    def __init__(
        self,
        creds: Optional[Any] = None,
        credentials_path: Optional[str] = None,
        token_path: Optional[str] = None,
        scopes: Optional[List[str]] = None,
        port: Optional[int] = None,
        **kwargs: Any,
    ) -> None:
        """Initialize GmailTools and authenticate with Gmail API.

        Args:
            creds: Pre-fetched OAuth credentials. Use this to skip a new auth flow.
            credentials_path: Path to credentials file.
            token_path: Path to token file.
            scopes: Custom OAuth scopes. If None, uses DEFAULT_SCOPES.
            port: Port to use for OAuth authentication.
            **kwargs: ToolKit params (include_tools, exclude_tools, timeout, etc.).
        """
        super().__init__(**kwargs)

        if not _GOOGLE_API_AVAILABLE:
            from upsonic.utils.printing import import_error
            import_error(
                package_name="upsonic[gmail-tool]",
                install_command="pip install upsonic[gmail-tool]",
                feature_name="Gmail tools"
            )

        self.creds: Optional[Any] = creds
        self.credentials_path: Optional[str] = credentials_path
        self.token_path: Optional[str] = token_path
        self.service: Optional[Any] = None
        self.scopes: List[str] = scopes or self.DEFAULT_SCOPES
        self.port: Optional[int] = port

        self._validate_scopes_for_config()


    def _validate_scopes_for_config(self) -> None:
        """Validate that required scopes match the tools selected via include/exclude."""
        include: Optional[List[str]] = self._toolkit_include_tools
        exclude: Optional[List[str]] = self._toolkit_exclude_tools

        all_tool_names: List[str] = [
            "get_latest_emails", "get_emails_from_user", "get_unread_emails",
            "get_starred_emails", "get_emails_by_context", "get_emails_by_date",
            "get_emails_by_thread", "search_emails", "mark_email_as_read",
            "mark_email_as_unread", "create_draft_email", "send_email",
            "send_email_reply", "list_custom_labels", "apply_label",
            "remove_label", "delete_custom_label",
        ]

        if include is not None:
            enabled: List[str] = [t for t in include if t in all_tool_names]
        elif exclude is not None:
            enabled = [t for t in all_tool_names if t not in exclude]
        else:
            enabled = all_tool_names

        self._validate_scopes(enabled)

    def _auth(self) -> None:
        """Authenticate with Gmail API."""
        token_file = Path(self.token_path or "token.json")
        creds_file = Path(self.credentials_path or "credentials.json")

        if token_file.exists():
            self.creds = Credentials.from_authorized_user_file(str(token_file), self.scopes)

        if not self.creds or not self.creds.valid:
            if self.creds and self.creds.expired and self.creds.refresh_token:
                self.creds.refresh(Request())
            else:
                client_config = {
                    "installed": {
                        "client_id": getenv("GOOGLE_CLIENT_ID"),
                        "client_secret": getenv("GOOGLE_CLIENT_SECRET"),
                        "project_id": getenv("GOOGLE_PROJECT_ID"),
                        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                        "token_uri": "https://oauth2.googleapis.com/token",
                        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                        "redirect_uris": [getenv("GOOGLE_REDIRECT_URI", "http://localhost")],
                    }
                }
                if creds_file.exists():
                    flow = InstalledAppFlow.from_client_secrets_file(str(creds_file), self.scopes)
                else:
                    flow = InstalledAppFlow.from_client_config(client_config, self.scopes)
                self.creds = flow.run_local_server(port=self.port or 8080)

            if self.creds and self.creds.valid:
                token_file.write_text(self.creds.to_json())

    def _format_emails(self, emails: List[dict]) -> str:
        """Format list of email dictionaries into a readable string."""
        if not emails:
            return "No emails found"

        formatted_emails: List[str] = []
        for email in emails:
            formatted_email = (
                f"From: {email['from']}\n"
                f"Subject: {email['subject']}\n"
                f"Date: {email['date']}\n"
                f"Body: {email['body']}\n"
                f"Message ID: {email['id']}\n"
                f"In-Reply-To: {email['in-reply-to']}\n"
                f"References: {email['references']}\n"
                f"Thread ID: {email['thread_id']}\n"
                "----------------------------------------"
            )
            formatted_emails.append(formatted_email)

        return "\n\n".join(formatted_emails)

    def _validate_email_params(self, to: str, subject: str, body: str) -> None:
        """Validate email parameters."""
        if not to:
            raise ValueError("Recipient email cannot be empty")

        for email in to.split(","):
            if not validate_email(email.strip()):
                raise ValueError(f"Invalid recipient email format: {email}")

        if not subject or not subject.strip():
            raise ValueError("Subject cannot be empty")

        if body is None:
            raise ValueError("Email body cannot be None")

    def _create_message(
        self,
        to: List[str],
        subject: str,
        body: str,
        cc: Optional[List[str]] = None,
        thread_id: Optional[str] = None,
        message_id: Optional[str] = None,
        attachments: Optional[List[str]] = None,
    ) -> dict:
        body = body.replace("\\n", "\n")

        message: Union[MIMEMultipart, MIMEText]
        if attachments:
            message = MIMEMultipart()
            text_part = MIMEText(body, "html")
            message.attach(text_part)

            for file_path in attachments:
                file_path_obj = Path(file_path)
                if not file_path_obj.exists():
                    continue
                content_type, encoding = mimetypes.guess_type(file_path)
                if content_type is None or encoding is not None:
                    content_type = "application/octet-stream"
                _main_type, sub_type = content_type.split("/", 1)

                with open(file_path, "rb") as file:
                    attachment_data = file.read()

                attachment = MIMEApplication(attachment_data, _subtype=sub_type)
                attachment.add_header("Content-Disposition", "attachment", filename=file_path_obj.name)
                message.attach(attachment)
        else:
            message = MIMEText(body, "html")

        encoded_to = [encode_email_address(addr.strip()) for addr in to]
        message["to"] = ", ".join(encoded_to)
        message["from"] = "me"
        message["subject"] = subject

        if cc:
            encoded_cc = [encode_email_address(addr.strip()) for addr in cc]
            message["Cc"] = ", ".join(encoded_cc)

        if thread_id and message_id:
            message["In-Reply-To"] = message_id
            message["References"] = message_id

        raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
        email_data: dict = {"raw": raw_message}

        if thread_id:
            email_data["threadId"] = thread_id

        return email_data

    def _get_message_details(self, messages: List[dict]) -> List[dict]:
        """Get details for list of messages."""
        details: List[dict] = []
        for msg in messages:
            msg_data = self.service.users().messages().get(userId="me", id=msg["id"], format="full").execute()  # type: ignore
            details.append(
                {
                    "id": msg_data["id"],
                    "thread_id": msg_data.get("threadId"),
                    "subject": next(
                        (header["value"] for header in msg_data["payload"]["headers"] if header["name"] == "Subject"),
                        None,
                    ),
                    "from": next(
                        (header["value"] for header in msg_data["payload"]["headers"] if header["name"] == "From"), None
                    ),
                    "date": next(
                        (header["value"] for header in msg_data["payload"]["headers"] if header["name"] == "Date"), None
                    ),
                    "in-reply-to": next(
                        (
                            header["value"]
                            for header in msg_data["payload"]["headers"]
                            if header["name"] == "In-Reply-To"
                        ),
                        None,
                    ),
                    "references": next(
                        (
                            header["value"]
                            for header in msg_data["payload"]["headers"]
                            if header["name"] == "References"
                        ),
                        None,
                    ),
                    "body": self._get_message_body(msg_data),
                }
            )
        return details

    def _get_message_body(self, msg_data: dict) -> str:
        """Extract message body from message data."""
        body = ""
        attachments: List[str] = []
        try:
            if "parts" in msg_data["payload"]:
                for part in msg_data["payload"]["parts"]:
                    if part["mimeType"] == "text/plain":
                        if "data" in part["body"]:
                            body = base64.urlsafe_b64decode(part["body"]["data"]).decode()
                    elif "filename" in part:
                        attachments.append(part["filename"])
            elif "body" in msg_data["payload"] and "data" in msg_data["payload"]["body"]:
                body = base64.urlsafe_b64decode(msg_data["payload"]["body"]["data"]).decode()
        except Exception:
            return "Unable to decode message body"

        if attachments:
            return f"{body}\n\nAttachments: {', '.join(attachments)}"
        return body

    def _validate_scopes(self, function_names: List[str]) -> None:
        """Validate that required scopes are present for requested operations."""
        if (
            "create_draft_email" in function_names or "send_email" in function_names
        ) and "https://www.googleapis.com/auth/gmail.compose" not in self.scopes:
            raise ValueError(
                "The scope https://www.googleapis.com/auth/gmail.compose is required for email composition operations"
            )
        read_operations = [
            "get_latest_emails", "get_emails_from_user", "get_unread_emails",
            "get_starred_emails", "get_emails_by_context", "get_emails_by_date",
            "get_emails_by_thread", "search_emails", "list_custom_labels",
        ]
        modify_operations = ["mark_email_as_read", "mark_email_as_unread"]
        if any(op in function_names for op in read_operations):
            read_scope = "https://www.googleapis.com/auth/gmail.readonly"
            write_scope = "https://www.googleapis.com/auth/gmail.modify"
            if read_scope not in self.scopes and write_scope not in self.scopes:
                raise ValueError(f"The scope {read_scope} is required for email reading operations")

        if any(op in function_names for op in modify_operations):
            modify_scope = "https://www.googleapis.com/auth/gmail.modify"
            if modify_scope not in self.scopes:
                raise ValueError(f"The scope {modify_scope} is required for email modification operations")


    @authenticate
    def get_unread_messages_raw(self, count: int) -> List[dict]:
        """Get the latest unread emails as raw dictionaries (not an LLM tool).

        Args:
            count: Maximum number of unread emails to retrieve.

        Returns:
            List of email details dictionaries.
        """
        try:
            results = self.service.users().messages().list(userId="me", q="is:unread", maxResults=count).execute()  # type: ignore
            return self._get_message_details(results.get("messages", []))
        except Exception as error:
            print(f"Error retrieving unread emails raw: {error}")
            return []


    @tool
    @authenticate
    def get_latest_emails(self, count: int) -> str:
        """Get the latest X emails from the user's inbox.

        Args:
            count: Number of latest emails to retrieve.

        Returns:
            Formatted string containing email details.
        """
        try:
            results = self.service.users().messages().list(userId="me", maxResults=count).execute()  # type: ignore
            emails = self._get_message_details(results.get("messages", []))
            return self._format_emails(emails)
        except HttpError as error:
            return f"Error retrieving latest emails: {error}"
        except Exception as error:
            return f"Unexpected error retrieving latest emails: {type(error).__name__}: {error}"

    @authenticate
    async def aget_latest_emails(self, count: int) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.get_latest_emails, count)
        )

    @tool
    @authenticate
    def get_emails_from_user(self, user: str, count: int) -> str:
        """Get X number of emails from a specific user (name or email).

        Args:
            user: Name or email address of the sender.
            count: Maximum number of emails to retrieve.

        Returns:
            Formatted string containing email details.
        """
        try:
            query = f"from:{user}" if "@" in user else f"from:{user}*"
            results = self.service.users().messages().list(userId="me", q=query, maxResults=count).execute()  # type: ignore
            emails = self._get_message_details(results.get("messages", []))
            return self._format_emails(emails)
        except HttpError as error:
            return f"Error retrieving emails from {user}: {error}"
        except Exception as error:
            return f"Unexpected error retrieving emails from {user}: {type(error).__name__}: {error}"

    @authenticate
    async def aget_emails_from_user(self, user: str, count: int) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.get_emails_from_user, user, count)
        )

    @tool
    @authenticate
    def get_unread_emails(self, count: int) -> str:
        """Get the X number of latest unread emails from the user's inbox.

        Args:
            count: Maximum number of unread emails to retrieve.

        Returns:
            Formatted string containing email details.
        """
        try:
            results = self.service.users().messages().list(userId="me", q="is:unread", maxResults=count).execute()  # type: ignore
            emails = self._get_message_details(results.get("messages", []))
            return self._format_emails(emails)
        except HttpError as error:
            return f"Error retrieving unread emails: {error}"
        except Exception as error:
            return f"Unexpected error retrieving unread emails: {type(error).__name__}: {error}"

    @authenticate
    async def aget_unread_emails(self, count: int) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.get_unread_emails, count)
        )

    @tool
    @authenticate
    def get_starred_emails(self, count: int) -> str:
        """Get X number of starred emails from the user's inbox.

        Args:
            count: Maximum number of starred emails to retrieve.

        Returns:
            Formatted string containing email details.
        """
        try:
            results = self.service.users().messages().list(userId="me", q="is:starred", maxResults=count).execute()  # type: ignore
            emails = self._get_message_details(results.get("messages", []))
            return self._format_emails(emails)
        except HttpError as error:
            return f"Error retrieving starred emails: {error}"
        except Exception as error:
            return f"Unexpected error retrieving starred emails: {type(error).__name__}: {error}"

    @authenticate
    async def aget_starred_emails(self, count: int) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.get_starred_emails, count)
        )

    @tool
    @authenticate
    def get_emails_by_context(self, context: str, count: int) -> str:
        """Get X number of emails matching a specific context or search term.

        Args:
            context: Search term or context to match in emails.
            count: Maximum number of emails to retrieve.

        Returns:
            Formatted string containing email details.
        """
        try:
            results = self.service.users().messages().list(userId="me", q=context, maxResults=count).execute()  # type: ignore
            emails = self._get_message_details(results.get("messages", []))
            return self._format_emails(emails)
        except HttpError as error:
            return f"Error retrieving emails by context '{context}': {error}"
        except Exception as error:
            return f"Unexpected error retrieving emails by context '{context}': {type(error).__name__}: {error}"

    @authenticate
    async def aget_emails_by_context(self, context: str, count: int) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.get_emails_by_context, context, count)
        )

    @tool
    @authenticate
    def get_emails_by_date(
        self, start_date: int, range_in_days: Optional[int] = None, num_emails: Optional[int] = 10
    ) -> str:
        """Get emails based on date range. start_date is a unix timestamp.

        Args:
            start_date: Start date as a unix timestamp.
            range_in_days: Number of days to include in the range.
            num_emails: Maximum number of emails to retrieve.

        Returns:
            Formatted string containing email details.
        """
        try:
            start_date_dt = datetime.fromtimestamp(start_date)
            if range_in_days:
                end_date = start_date_dt + timedelta(days=range_in_days)
                query = f"after:{start_date_dt.strftime('%Y/%m/%d')} before:{end_date.strftime('%Y/%m/%d')}"
            else:
                query = f"after:{start_date_dt.strftime('%Y/%m/%d')}"

            results = self.service.users().messages().list(userId="me", q=query, maxResults=num_emails).execute()  # type: ignore
            emails = self._get_message_details(results.get("messages", []))
            return self._format_emails(emails)
        except HttpError as error:
            return f"Error retrieving emails by date: {error}"
        except Exception as error:
            return f"Unexpected error retrieving emails by date: {type(error).__name__}: {error}"

    @authenticate
    async def aget_emails_by_date(
        self, start_date: int, range_in_days: Optional[int] = None, num_emails: Optional[int] = 10
    ) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.get_emails_by_date, start_date, range_in_days, num_emails)
        )

    @tool
    @authenticate
    def get_emails_by_thread(self, thread_id: str) -> str:
        """Retrieve all emails from a specific thread.

        Args:
            thread_id: The ID of the email thread.

        Returns:
            Formatted string containing email thread details.
        """
        try:
            thread = self.service.users().threads().get(userId="me", id=thread_id).execute()  # type: ignore
            messages = thread.get("messages", [])
            emails = self._get_message_details(messages)
            return self._format_emails(emails)
        except HttpError as error:
            return f"Error retrieving emails from thread {thread_id}: {error}"
        except Exception as error:
            return f"Unexpected error retrieving emails from thread {thread_id}: {type(error).__name__}: {error}"

    @authenticate
    async def aget_emails_by_thread(self, thread_id: str) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.get_emails_by_thread, thread_id)
        )

    @tool
    @authenticate
    def search_emails(self, query: str, count: int) -> str:
        """Get X number of emails based on a given natural text query.

        Args:
            query: Natural language query to search for.
            count: Number of emails to retrieve.

        Returns:
            Formatted string containing email details.
        """
        try:
            results = self.service.users().messages().list(userId="me", q=query, maxResults=count).execute()  # type: ignore
            emails = self._get_message_details(results.get("messages", []))
            return self._format_emails(emails)
        except HttpError as error:
            return f"Error retrieving emails with query '{query}': {error}"
        except Exception as error:
            return f"Unexpected error retrieving emails with query '{query}': {type(error).__name__}: {error}"

    @authenticate
    async def asearch_emails(self, query: str, count: int) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.search_emails, query, count)
        )

    @tool
    @authenticate
    def mark_email_as_read(self, message_id: str) -> str:
        """Mark a specific email as read by removing the 'UNREAD' label.

        Args:
            message_id: The ID of the message to mark as read.

        Returns:
            Success message or error description.
        """
        try:
            modify_request = {"removeLabelIds": ["UNREAD"]}
            self.service.users().messages().modify(userId="me", id=message_id, body=modify_request).execute()  # type: ignore
            return f"Successfully marked email {message_id} as read. Labels removed: UNREAD"
        except HttpError as error:
            return f"HTTP Error marking email {message_id} as read: {error}"
        except Exception as error:
            return f"Error marking email {message_id} as read: {type(error).__name__}: {error}"

    @authenticate
    async def amark_email_as_read(self, message_id: str) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.mark_email_as_read, message_id)
        )

    @tool
    @authenticate
    def mark_email_as_unread(self, message_id: str) -> str:
        """Mark a specific email as unread by adding the 'UNREAD' label.

        Args:
            message_id: The ID of the message to mark as unread.

        Returns:
            Success message or error description.
        """
        try:
            modify_request = {"addLabelIds": ["UNREAD"]}
            self.service.users().messages().modify(userId="me", id=message_id, body=modify_request).execute()  # type: ignore
            return f"Successfully marked email {message_id} as unread. Labels added: UNREAD"
        except HttpError as error:
            return f"HTTP Error marking email {message_id} as unread: {error}"
        except Exception as error:
            return f"Error marking email {message_id} as unread: {type(error).__name__}: {error}"

    @authenticate
    async def amark_email_as_unread(self, message_id: str) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.mark_email_as_unread, message_id)
        )

    @tool
    @authenticate
    def create_draft_email(
        self,
        to: str,
        subject: str,
        body: str,
        cc: Optional[str] = None,
        attachments: Optional[Union[str, List[str]]] = None,
    ) -> str:
        """Create and save a draft email.

        Args:
            to: Comma separated string of recipient email addresses.
            subject: Email subject.
            body: Email body content.
            cc: Comma separated string of CC email addresses.
            attachments: File path(s) for attachments.

        Returns:
            Stringified dictionary containing draft email details including id.
        """
        self._validate_email_params(to, subject, body)

        attachment_files: List[str] = []
        if attachments:
            if isinstance(attachments, str):
                attachment_files = [attachments]
            else:
                attachment_files = list(attachments)
            for file_path in attachment_files:
                if not Path(file_path).exists():
                    raise ValueError(f"Attachment file not found: {file_path}")

        message = self._create_message(
            to.split(","), subject, body, cc.split(",") if cc else None, attachments=attachment_files
        )
        draft = {"message": message}
        draft = self.service.users().drafts().create(userId="me", body=draft).execute()  # type: ignore
        return str(draft)

    @authenticate
    async def acreate_draft_email(
        self,
        to: str,
        subject: str,
        body: str,
        cc: Optional[str] = None,
        attachments: Optional[Union[str, List[str]]] = None,
    ) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.create_draft_email, to, subject, body, cc, attachments)
        )

    @tool
    @authenticate
    def send_email(
        self,
        to: str,
        subject: str,
        body: str,
        cc: Optional[str] = None,
        attachments: Optional[Union[str, List[str]]] = None,
    ) -> str:
        """Send an email immediately.

        Args:
            to: Comma separated string of recipient email addresses.
            subject: Email subject.
            body: Email body content.
            cc: Comma separated string of CC email addresses.
            attachments: File path(s) for attachments.

        Returns:
            Stringified dictionary containing sent email details including id.
        """
        self._validate_email_params(to, subject, body)

        attachment_files: List[str] = []
        if attachments:
            if isinstance(attachments, str):
                attachment_files = [attachments]
            else:
                attachment_files = list(attachments)
            for file_path in attachment_files:
                if not Path(file_path).exists():
                    raise ValueError(f"Attachment file not found: {file_path}")

        body = body.replace("\n", "<br>")
        message = self._create_message(
            to.split(","), subject, body, cc.split(",") if cc else None, attachments=attachment_files
        )
        message = self.service.users().messages().send(userId="me", body=message).execute()  # type: ignore
        return str(message)

    @authenticate
    async def asend_email(
        self,
        to: str,
        subject: str,
        body: str,
        cc: Optional[str] = None,
        attachments: Optional[Union[str, List[str]]] = None,
    ) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.send_email, to, subject, body, cc, attachments)
        )

    @tool
    @authenticate
    def send_email_reply(
        self,
        thread_id: str,
        message_id: str,
        to: str,
        subject: str,
        body: str,
        cc: Optional[str] = None,
        attachments: Optional[Union[str, List[str]]] = None,
    ) -> str:
        """Respond to an existing email thread.

        Args:
            thread_id: The ID of the email thread to reply to.
            message_id: The ID of the email being replied to.
            to: Comma-separated recipient email addresses.
            subject: Email subject (prefixed with "Re:" if not already).
            body: Email body content.
            cc: Comma-separated CC email addresses.
            attachments: File path(s) for attachments.

        Returns:
            Stringified dictionary containing sent email details including id.
        """
        self._validate_email_params(to, subject, body)

        if not subject.lower().startswith("re:"):
            subject = f"Re: {subject}"

        attachment_files: List[str] = []
        if attachments:
            if isinstance(attachments, str):
                attachment_files = [attachments]
            else:
                attachment_files = list(attachments)
            for file_path in attachment_files:
                if not Path(file_path).exists():
                    raise ValueError(f"Attachment file not found: {file_path}")

        body = body.replace("\n", "<br>")
        message = self._create_message(
            to.split(","),
            subject,
            body,
            cc.split(",") if cc else None,
            thread_id,
            message_id,
            attachments=attachment_files,
        )
        message = self.service.users().messages().send(userId="me", body=message).execute()  # type: ignore
        return str(message)

    @authenticate
    async def asend_email_reply(
        self,
        thread_id: str,
        message_id: str,
        to: str,
        subject: str,
        body: str,
        cc: Optional[str] = None,
        attachments: Optional[Union[str, List[str]]] = None,
    ) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.send_email_reply, thread_id, message_id, to, subject, body, cc, attachments)
        )

    @tool
    @authenticate
    def list_custom_labels(self) -> str:
        """List only user-created custom labels (filters out system labels).

        Returns:
            A numbered list of custom labels only.
        """
        try:
            results = self.service.users().labels().list(userId="me").execute()  # type: ignore
            labels = results.get("labels", [])
            custom_labels = [label["name"] for label in labels if label.get("type") == "user"]

            if not custom_labels:
                return "No custom labels found.\nCreate labels using apply_label function!"

            numbered_labels = [f"{i}. {name}" for i, name in enumerate(custom_labels, 1)]
            return f"Your Custom Labels ({len(custom_labels)} total):\n\n" + "\n".join(numbered_labels)
        except HttpError as e:
            return f"Error fetching labels: {e}"
        except Exception as e:
            return f"Unexpected error: {type(e).__name__}: {e}"

    @authenticate
    async def alist_custom_labels(self) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, self.list_custom_labels
        )

    @tool
    @authenticate
    def apply_label(self, context: str, label_name: str, count: int = 10) -> str:
        """Find emails matching a context and apply a label, creating it if necessary.

        Args:
            context: Gmail search query (e.g., 'is:unread category:promotions').
            label_name: Name of the label to apply.
            count: Maximum number of emails to process.

        Returns:
            Summary of labeled emails.
        """
        try:
            results = self.service.users().messages().list(userId="me", q=context, maxResults=count).execute()  # type: ignore
            messages = results.get("messages", [])
            if not messages:
                return f"No emails found matching: '{context}'"

            labels = self.service.users().labels().list(userId="me").execute().get("labels", [])  # type: ignore
            label_id: Optional[str] = None
            for label in labels:
                if label["name"].lower() == label_name.lower():
                    label_id = label["id"]
                    break

            if not label_id:
                label = (
                    self.service.users()  # type: ignore
                    .labels()
                    .create(
                        userId="me",
                        body={"name": label_name, "labelListVisibility": "labelShow", "messageListVisibility": "show"},
                    )
                    .execute()
                )
                label_id = label["id"]

            for msg in messages:
                self.service.users().messages().modify(  # type: ignore
                    userId="me", id=msg["id"], body={"addLabelIds": [label_id]}
                ).execute()  # type: ignore

            return f"Applied label '{label_name}' to {len(messages)} emails matching '{context}'."
        except HttpError as e:
            return f"Error applying label '{label_name}': {e}"
        except Exception as e:
            return f"Unexpected error: {type(e).__name__}: {e}"

    @authenticate
    async def aapply_label(self, context: str, label_name: str, count: int = 10) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.apply_label, context, label_name, count)
        )

    @tool
    @authenticate
    def remove_label(self, context: str, label_name: str, count: int = 10) -> str:
        """Remove a label from emails matching a context.

        Args:
            context: Gmail search query (e.g., 'is:unread category:promotions').
            label_name: Name of the label to remove.
            count: Maximum number of emails to process.

        Returns:
            Summary of emails with label removed.
        """
        try:
            labels = self.service.users().labels().list(userId="me").execute().get("labels", [])  # type: ignore
            label_id: Optional[str] = None

            for label in labels:
                if label["name"].lower() == label_name.lower():
                    label_id = label["id"]
                    break

            if not label_id:
                return f"Label '{label_name}' not found."

            results = (
                self.service.users()  # type: ignore
                .messages()
                .list(userId="me", q=f"{context} label:{label_name}", maxResults=count)
                .execute()
            )
            messages = results.get("messages", [])
            if not messages:
                return f"No emails found matching: '{context}' with label '{label_name}'"

            removed_count = 0
            for msg in messages:
                self.service.users().messages().modify(  # type: ignore
                    userId="me", id=msg["id"], body={"removeLabelIds": [label_id]}
                ).execute()  # type: ignore
                removed_count += 1

            return f"Removed label '{label_name}' from {removed_count} emails matching '{context}'."
        except HttpError as e:
            return f"Error removing label '{label_name}': {e}"
        except Exception as e:
            return f"Unexpected error: {type(e).__name__}: {e}"

    @authenticate
    async def aremove_label(self, context: str, label_name: str, count: int = 10) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.remove_label, context, label_name, count)
        )

    @tool
    @authenticate
    def delete_custom_label(self, label_name: str, confirm: bool = False) -> str:
        """Delete a custom label (with safety confirmation).

        Args:
            label_name: Name of the label to delete.
            confirm: Must be True to actually delete the label.

        Returns:
            Confirmation message or warning.
        """
        if not confirm:
            return (
                f"LABEL DELETION REQUIRES CONFIRMATION. This will permanently delete "
                f"the label '{label_name}' from all emails. Set confirm=True to proceed."
            )

        try:
            labels = self.service.users().labels().list(userId="me").execute().get("labels", [])  # type: ignore
            target_label: Optional[dict] = None

            for label in labels:
                if label["name"].lower() == label_name.lower():
                    target_label = label
                    break

            if not target_label:
                return f"Label '{label_name}' not found."

            if target_label.get("type") != "user":
                return f"Cannot delete system label '{label_name}'. Only user-created labels can be deleted."

            self.service.users().labels().delete(userId="me", id=target_label["id"]).execute()  # type: ignore
            return f"Successfully deleted label '{label_name}'. This label has been removed from all emails."
        except HttpError as e:
            return f"Error deleting label '{label_name}': {e}"
        except Exception as e:
            return f"Unexpected error: {type(e).__name__}: {e}"

    @authenticate
    async def adelete_custom_label(self, label_name: str, confirm: bool = False) -> str:
        loop: asyncio.AbstractEventLoop = asyncio.get_running_loop()
        return await loop.run_in_executor(
            None, functools.partial(self.delete_custom_label, label_name, confirm)
        )
