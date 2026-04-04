"""Gmail integration utility helpers."""

from __future__ import annotations

import re
from email.header import Header
from email.utils import formataddr, parseaddr
from functools import wraps
from typing import Any, Callable


def authenticate(func: Callable[..., Any]) -> Callable[..., Any]:
    """Decorator to ensure Gmail API authentication before executing a function.

    The decorated function's ``self`` must expose:
    - ``self.creds`` – current OAuth credentials (or ``None``).
    - ``self._auth()`` – method that performs the OAuth flow.
    - ``self.service`` – cached Gmail API service object (or ``None``).
    """

    @wraps(func)
    def wrapper(self: Any, *args: Any, **kwargs: Any) -> Any:
        if not self.creds or not self.creds.valid:
            self._auth()
        if not self.service:
            from googleapiclient.discovery import build
            self.service = build("gmail", "v1", credentials=self.creds)
        return func(self, *args, **kwargs)

    return wrapper


def extract_email_address(email_string: str) -> str:
    """Extract the actual email address from a potentially formatted string.

    Handles formats like:
    - "Display Name" <user@example.com>
    - Display Name <user@example.com>
    - user@example.com

    Args:
        email_string: The email string which may contain a display name.

    Returns:
        The extracted email address.
    """
    email_string = email_string.strip()
    angle_bracket_match = re.search(r'<([^>]+)>', email_string)
    if angle_bracket_match:
        return angle_bracket_match.group(1).strip()
    return email_string


def validate_email(email: str) -> bool:
    """Validate email format.

    Handles both plain emails and emails with display names.

    Args:
        email: Email string (can include display name).

    Returns:
        True if valid email format, False otherwise.
    """
    extracted_email = extract_email_address(email)
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return bool(re.match(pattern, extracted_email))


def encode_email_address(email_string: str) -> str:
    """Encode an email address with proper RFC 2047 encoding for non-ASCII characters.

    The display name is encoded using RFC 2047 if it contains non-ASCII characters,
    while the email address itself is kept as-is.

    Args:
        email_string: The email string which may contain a display name with non-ASCII chars.

    Returns:
        Properly encoded email address string safe for email headers.
    """
    email_string = email_string.strip()
    display_name, email_addr = parseaddr(email_string)

    if not display_name:
        return email_addr if email_addr else email_string

    try:
        display_name.encode('ascii')
        return formataddr((display_name, email_addr))
    except UnicodeEncodeError:
        encoded_name = Header(display_name, 'utf-8').encode()
        return formataddr((encoded_name, email_addr))
