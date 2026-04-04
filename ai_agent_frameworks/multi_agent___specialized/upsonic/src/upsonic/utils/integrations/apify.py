"""Apify integration utility helpers."""

from __future__ import annotations

import string
from typing import Any, Dict, List, Optional, Tuple

import requests


# Constants
MAX_DESCRIPTION_LEN = 350
REQUESTS_TIMEOUT_SECS = 300
APIFY_API_ENDPOINT_GET_DEFAULT_BUILD = "https://api.apify.com/v2/acts/{actor_id}/builds/default"


def create_apify_client(token: str):
    """Create an Apify client instance with a custom user-agent.

    Args:
        token: Apify API token.

    Returns:
        An ApifyClient instance.
    """
    from apify_client import ApifyClient

    client = ApifyClient(token)
    if http_client := getattr(client.http_client, "httpx_client", None):
        http_client.headers["user-agent"] += "; Origin/upsonic"
    return client


def actor_id_to_tool_name(actor_id: str) -> str:
    """Turn actor_id into a valid tool/method name.

    Args:
        actor_id: Actor ID from Apify store (e.g. 'apify/web-scraper').

    Returns:
        A valid Python identifier for use as a tool name.
    """
    valid_chars = string.ascii_letters + string.digits + "_"
    return "apify_actor_" + "".join(char if char in valid_chars else "_" for char in actor_id)


def get_actor_latest_build(apify_client, actor_id: str) -> Dict[str, Any]:
    """Get the latest build of an Actor from the default build tag.

    Args:
        apify_client: An ApifyClient instance.
        actor_id: Actor ID from Apify store.

    Returns:
        The latest build data dict of the Actor.
    """
    actor = apify_client.actor(actor_id).get()
    if not actor:
        raise ValueError(f"Actor {actor_id} not found.")

    actor_obj_id = actor.get("id")
    if not actor_obj_id:
        raise ValueError(f"Failed to get the Actor object ID for {actor_id}.")

    url = APIFY_API_ENDPOINT_GET_DEFAULT_BUILD.format(actor_id=actor_obj_id)
    response = requests.request("GET", url, timeout=REQUESTS_TIMEOUT_SECS)

    build = response.json()
    if not isinstance(build, dict):
        raise TypeError(f"Failed to get the latest build of the Actor {actor_id}.")

    data = build.get("data")
    if data is None:
        raise ValueError(f"Failed to get the latest build data of the Actor {actor_id}.")

    return data


def prune_actor_input_schema(input_schema: Dict[str, Any]) -> Tuple[Dict[str, Any], List[str]]:
    """Get the input schema from the Actor build and trim descriptions.

    Args:
        input_schema: The input schema dict from the Actor build.

    Returns:
        A tuple of (pruned properties dict, required field names list).
    """
    properties = input_schema.get("properties", {})
    required = input_schema.get("required", [])

    properties_out: Dict[str, Any] = {}
    for item, meta in properties.items():
        properties_out[item] = {}
        if desc := meta.get("description"):
            properties_out[item]["description"] = (
                desc[:MAX_DESCRIPTION_LEN] + "..." if len(desc) > MAX_DESCRIPTION_LEN else desc
            )
        for key_name in ("type", "default", "prefill", "enum", "editor", "items", "properties"):
            if value := meta.get(key_name):
                properties_out[item][key_name] = value

    return properties_out, required


def _infer_array_item_type(prop: Dict[str, Any]) -> str:
    """Infer the item type for an array property from schema hints."""
    type_map = {
        "string": "string",
        "int": "number",
        "float": "number",
        "dict": "object",
        "list": "array",
        "bool": "boolean",
        "none": "null",
    }
    if prop.get("items", {}).get("type"):
        return prop["items"]["type"]
    if "prefill" in prop and prop["prefill"] and len(prop["prefill"]) > 0:
        return type_map.get(type(prop["prefill"][0]).__name__.lower(), "string")
    if "default" in prop and prop["default"] and len(prop["default"]) > 0:
        return type_map.get(type(prop["default"][0]).__name__.lower(), "string")
    return "string"


def props_to_json_schema(
    input_dict: Dict[str, Any],
    required_fields: Optional[List[str]] = None,
) -> Dict[str, Any]:
    """Convert pruned Apify actor properties to a proper JSON schema.

    Handles Apify-specific editors (proxy, requestListSources), array item
    types, nested object properties, and enum values — producing a richer
    schema than basic Python type-hint mapping alone.

    Args:
        input_dict: Pruned properties dict from ``prune_actor_input_schema``.
        required_fields: List of required field names.

    Returns:
        A JSON schema dict suitable for LLM tool definitions.
    """
    schema: Dict[str, Any] = {
        "type": "object",
        "properties": {},
        "required": required_fields or [],
    }

    for key, value in input_dict.items():
        prop_schema: Dict[str, Any] = {}
        prop_type = value.get("type")

        if "enum" in value:
            prop_schema["enum"] = value["enum"]

        if "default" in value:
            prop_schema["default"] = value["default"]
        elif "prefill" in value:
            prop_schema["default"] = value["prefill"]

        if "description" in value:
            prop_schema["description"] = value["description"]

        # Handle Apify special editor types
        if prop_type == "object" and value.get("editor") == "proxy":
            prop_schema["type"] = "object"
            prop_schema["properties"] = {
                "useApifyProxy": {
                    "type": "boolean",
                    "description": "Whether to use Apify Proxy - ALWAYS SET TO TRUE.",
                    "default": True,
                }
            }
            prop_schema["required"] = ["useApifyProxy"]
            if "default" in value:
                prop_schema["default"] = value["default"]

        elif prop_type == "array" and value.get("editor") == "requestListSources":
            prop_schema["type"] = "array"
            prop_schema["items"] = {
                "type": "object",
                "description": "Request list source",
                "properties": {
                    "url": {
                        "type": "string",
                        "description": "URL of the request list source",
                    }
                },
            }

        elif prop_type == "array":
            prop_schema["type"] = "array"
            prop_schema["items"] = {
                "type": _infer_array_item_type(value),
                "description": "Item",
            }

        elif prop_type == "object":
            prop_schema["type"] = "object"
            if "default" in value:
                prop_schema["default"] = value["default"]
                prop_schema["properties"] = {}
                for k, v in value.get("properties", value["default"]).items():
                    inner_type = v["type"] if isinstance(v, dict) else type(v).__name__.lower()
                    if inner_type == "bool":
                        inner_type = "boolean"
                    prop_schema["properties"][k] = {"type": inner_type}

        else:
            prop_schema["type"] = prop_type

        schema["properties"][key] = prop_schema

    return schema
