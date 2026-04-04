"""Utility functions for the sequential thinking package.

This module contains common utilities used across the package.
"""

import re
from typing import Dict, Any


def to_camel_case(snake_str: str) -> str:
    """Convert a snake_case string to camelCase.
    
    Args:
        snake_str: A string in snake_case format
        
    Returns:
        The string converted to camelCase
    """
    components = snake_str.split('_')
    # Join with the first component lowercase and the rest with their first letter capitalized
    return components[0] + ''.join(x.title() for x in components[1:])


def to_snake_case(camel_str: str) -> str:
    """Convert a camelCase string to snake_case.
    
    Args:
        camel_str: A string in camelCase format
        
    Returns:
        The string converted to snake_case
    """
    # Insert underscore before uppercase letters and convert to lowercase
    s1 = re.sub(r'(.)([A-Z][a-z]+)', r'\1_\2', camel_str)
    return re.sub(r'([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


def convert_dict_keys(data: Dict[str, Any], converter: callable) -> Dict[str, Any]:
    """Convert all keys in a dictionary using the provided converter function.
    
    Args:
        data: Dictionary with keys to convert
        converter: Function to convert the keys (e.g. to_camel_case or to_snake_case)
        
    Returns:
        A new dictionary with converted keys
    """
    if not isinstance(data, dict):
        return data
        
    result = {}
    for key, value in data.items():
        # Convert key
        new_key = converter(key)
        
        # If value is a dict, recursively convert its keys too
        if isinstance(value, dict):
            result[new_key] = convert_dict_keys(value, converter)
        # If value is a list, check if items are dicts and convert them
        elif isinstance(value, list):
            result[new_key] = [
                convert_dict_keys(item, converter) if isinstance(item, dict) else item
                for item in value
            ]
        else:
            result[new_key] = value
            
    return result