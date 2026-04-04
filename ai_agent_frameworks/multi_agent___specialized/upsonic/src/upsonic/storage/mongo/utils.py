"""Utility functions for MongoDB storage implementations."""
from typing import Any, Dict, List, Optional, Tuple

from upsonic.storage.mongo.schemas import get_collection_indexes


def remove_mongo_id(doc: Dict[str, Any]) -> Dict[str, Any]:
    """
    Remove MongoDB's _id field from a document.
    
    Args:
        doc: MongoDB document dictionary
    
    Returns:
        Document dictionary with _id removed
    """
    return {k: v for k, v in doc.items() if k != "_id"}


def create_collection_indexes(
    collection: Any,
    collection_type: str,
) -> None:
    """
    Create indexes for a MongoDB collection synchronously.
    
    Args:
        collection: MongoDB collection object (PyMongo sync)
        collection_type: Type of collection ('sessions' or 'user_memories')
    
    Raises:
        Exception: If there is an error creating indexes
    """
    indexes = get_collection_indexes(collection_type)
    
    for index_spec in indexes:
        try:
            collection.create_index(
                index_spec["keys"],
                unique=index_spec.get("unique", False),
                background=True,
            )
        except Exception:
            pass


async def create_collection_indexes_async(
    collection: Any,
    collection_type: str,
) -> None:
    """
    Create indexes for a MongoDB collection asynchronously.
    
    Args:
        collection: MongoDB collection object (Motor or PyMongo async)
        collection_type: Type of collection ('sessions' or 'user_memories')
    
    Raises:
        Exception: If there is an error creating indexes
    """
    indexes = get_collection_indexes(collection_type)
    
    for index_spec in indexes:
        try:
            await collection.create_index(
                index_spec["keys"],
                unique=index_spec.get("unique", False),
                background=True,
            )
        except Exception:
            # Index may already exist, ignore
            pass


def apply_sorting(
    query_args: Dict[str, Any],
    sort_by: Optional[str],
    sort_order: Optional[str],
) -> List[Tuple[str, int]]:
    """
    Apply sorting to MongoDB query.
    
    Args:
        query_args: Query arguments dictionary
        sort_by: Field to sort by
        sort_order: Sort order ('asc' or 'desc')
    
    Returns:
        List of (field, direction) tuples for MongoDB sort
    """
    if sort_by:
        direction = -1 if sort_order and sort_order.lower() == "desc" else 1
        return [(sort_by, direction)]
    
    # Default sort by created_at desc
    return [("created_at", -1)]


def apply_pagination(
    cursor: Any,
    limit: Optional[int],
    offset: Optional[int],
) -> Any:
    """
    Apply pagination to MongoDB cursor.
    
    Args:
        cursor: MongoDB cursor object
        limit: Maximum number of results
        offset: Number of records to skip
    
    Returns:
        Updated cursor with skip and limit applied
    """
    if offset is not None and offset > 0:
        cursor = cursor.skip(offset)
    if limit is not None:
        cursor = cursor.limit(limit)
    
    return cursor




