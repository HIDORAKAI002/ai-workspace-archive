from typing import Any

from pydantic import BaseModel


class DgApiAlertPolicyDocument(BaseModel):
    alert_policies: list[dict[str, Any]]


class DgApiAlertPolicySyncResult(BaseModel):
    synced_policies: list[str]
