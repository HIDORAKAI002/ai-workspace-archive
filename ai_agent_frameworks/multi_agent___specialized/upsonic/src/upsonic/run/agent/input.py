from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING, Any, Dict, List, Optional, Union

if TYPE_CHECKING:
    from pydantic import BaseModel
    from upsonic.messages.messages import (
        BinaryContent,
        DocumentUrl,
        ImageUrl,
        ModelRequest,
    )


@dataclass
class AgentRunInput:
    """Input data for an agent run.
    
    Handles user prompts, images, and documents. URL types (ImageUrl, DocumentUrl)
    are automatically converted to BinaryContent for unified handling.
    """
    
    user_prompt: Union[str, "ModelRequest", "BaseModel", List["ModelRequest"]]
    images: Optional[Union[List["BinaryContent"], List[str]]] = None
    documents: Optional[Union[List["BinaryContent"], List[str]]] = None
    input: Optional[Union[str, List[Union[str, "BinaryContent"]]]] = None
    
    def __post_init__(self):
        """Convert any URL types to BinaryContent after initialization."""
        if self.images:
            self.images = [
                self._convert_url_to_binary(img) if self._is_url_type(img) else img
                for img in self.images
            ]
        if self.documents:
            self.documents = [
                self._convert_url_to_binary(doc) if self._is_url_type(doc) else doc
                for doc in self.documents
            ]
    
    @staticmethod
    def _is_url_type(content: Any) -> bool:
        """Check if content is a URL type that needs conversion."""
        from upsonic.messages.messages import DocumentUrl, ImageUrl
        return isinstance(content, (ImageUrl, DocumentUrl))
    
    @staticmethod
    def _convert_url_to_binary(url_content: Union["ImageUrl", "DocumentUrl"]) -> "BinaryContent":
        """Download URL content and convert to BinaryContent."""
        import httpx
        from upsonic.messages.messages import BinaryContent
        
        response = httpx.get(url_content.url)
        response.raise_for_status()
        return BinaryContent(
            data=response.content,
            media_type=url_content.media_type,
            identifier=url_content.identifier
        )
    
    @staticmethod
    async def _aconvert_url_to_binary(url_content: Union["ImageUrl", "DocumentUrl"]) -> "BinaryContent":
        """Async download URL content and convert to BinaryContent."""
        import httpx
        from upsonic.messages.messages import BinaryContent
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url_content.url)
            response.raise_for_status()
            return BinaryContent(
                data=response.content,
                media_type=url_content.media_type,
                identifier=url_content.identifier
            )
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convert to dictionary.
        
        Uses TypeAdapters for proper serialization:
        - user_prompt: str as-is, ModelRequest uses ModelMessagesTypeAdapter, BaseModel uses model_dump
        - images: List of BinaryContent uses BinaryContentTypeAdapter
        - documents: List of BinaryContent uses BinaryContentTypeAdapter
        """
        from pydantic import BaseModel
        from upsonic.messages.messages import (
            BinaryContentTypeAdapter,
            ModelMessagesTypeAdapter,
            ModelRequest,
        )
        
        # Handle user_prompt
        if self.user_prompt is None:
            user_prompt_data = None
        elif isinstance(self.user_prompt, str):
            user_prompt_data = self.user_prompt
        elif isinstance(self.user_prompt, list):
            # List of ModelRequest
            user_prompt_data = ModelMessagesTypeAdapter.dump_python(self.user_prompt, mode="json")
        elif isinstance(self.user_prompt, ModelRequest):
            user_prompt_data = ModelMessagesTypeAdapter.dump_python([self.user_prompt], mode="json")
        elif isinstance(self.user_prompt, BaseModel):
            user_prompt_data = {
                "__pydantic__": True,
                "class": self.user_prompt.__class__.__name__,
                "module": self.user_prompt.__class__.__module__,
                "data": self.user_prompt.model_dump()
            }
        else:
            user_prompt_data = self.user_prompt
        
        # Handle images (List of BinaryContent)
        if self.images:
            images_data = BinaryContentTypeAdapter.dump_python(
                [img for img in self.images if not isinstance(img, str)], mode="json"
            )
        else:
            images_data = None
        
        # Handle documents (List of BinaryContent)
        if self.documents:
            documents_data = BinaryContentTypeAdapter.dump_python(
                [doc for doc in self.documents if not isinstance(doc, str)], mode="json"
            )
        else:
            documents_data = None
        
        return {
            "user_prompt": user_prompt_data,
            "images": images_data,
            "documents": documents_data,
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "AgentRunInput":
        """
        Reconstruct from dictionary.
        
        Uses TypeAdapters for proper deserialization:
        - user_prompt: str as-is, list uses ModelMessagesTypeAdapter, dict with __pydantic__ uses model_validate
        - images: Uses BinaryContentTypeAdapter
        - documents: Uses BinaryContentTypeAdapter
        """
        from upsonic.messages.messages import (
            BinaryContentTypeAdapter,
            ModelMessagesTypeAdapter,
        )
        
        # Handle user_prompt
        user_prompt_data = data.get("user_prompt")
        if user_prompt_data is None:
            user_prompt = None
        elif isinstance(user_prompt_data, str):
            user_prompt = user_prompt_data
        elif isinstance(user_prompt_data, list):
            # List of ModelRequest/ModelResponse
            from upsonic.messages.messages import ModelRequest
            deserialized_messages = ModelMessagesTypeAdapter.validate_python(user_prompt_data)
            # If it's a single ModelRequest that was wrapped, extract it
            if len(deserialized_messages) == 1 and isinstance(deserialized_messages[0], ModelRequest):
                user_prompt = deserialized_messages[0]
            else:
                user_prompt = deserialized_messages
        elif isinstance(user_prompt_data, dict) and user_prompt_data.get("__pydantic__"):
            # BaseModel instance
            import importlib
            module_name = user_prompt_data.get("module")
            class_name = user_prompt_data.get("class")
            data_dict = user_prompt_data.get("data", {})
            try:
                module = importlib.import_module(module_name)
                model_class = getattr(module, class_name)
                user_prompt = model_class.model_validate(data_dict)
            except (ImportError, AttributeError):
                user_prompt = data_dict
        else:
            user_prompt = user_prompt_data
        
        # Handle images (List of BinaryContent)
        images_data = data.get("images")
        if images_data and isinstance(images_data, list):
            images = BinaryContentTypeAdapter.validate_python(images_data)
        else:
            images = None
        
        # Handle documents (List of BinaryContent)
        documents_data = data.get("documents")
        if documents_data and isinstance(documents_data, list):
            documents = BinaryContentTypeAdapter.validate_python(documents_data)
        else:
            documents = None
        
        return cls(
            user_prompt=user_prompt,
            images=images,
            documents=documents
        )
    
    def build_input(self, context_formatted: Optional[str] = None) -> None:
        """
        Build the final input list from user_prompt, images, and documents.
        
        Processes file paths in images and documents into BinaryContent,
        combines with user_prompt, and sets self.input attribute.
        
        Args:
            context_formatted: Optional formatted context string to append to user_prompt
        """
        from upsonic.messages.messages import BinaryContent
        
        final_description = self.user_prompt
        if context_formatted and isinstance(context_formatted, str):
            if isinstance(final_description, str):
                final_description += "\n" + context_formatted
            else:
                final_description = str(final_description) + "\n" + context_formatted
        
        processed_images: List[BinaryContent] = []
        processed_documents: List[BinaryContent] = []
        
        if self.images:
            for img in self.images:
                if isinstance(img, str):
                    try:
                        with open(img, 'rb') as f:
                            data = f.read()
                        
                        import mimetypes
                        mime_type, _ = mimetypes.guess_type(img)
                        if mime_type is None:
                            mime_type = "application/octet-stream"
                        
                        binary_content = BinaryContent(
                            data=data,
                            media_type=mime_type,
                            identifier=img
                        )
                        processed_images.append(binary_content)
                    except Exception as e:
                        from upsonic.utils.printing import warning_log
                        warning_log(f"Failed to load image {img}: {e}", "AgentRunInput")
                elif isinstance(img, BinaryContent):
                    processed_images.append(img)
        
        if self.documents:
            for doc in self.documents:
                if isinstance(doc, str):
                    try:
                        with open(doc, 'rb') as f:
                            data = f.read()
                        
                        import mimetypes
                        mime_type, _ = mimetypes.guess_type(doc)
                        if mime_type is None:
                            mime_type = "application/octet-stream"
                        
                        binary_content = BinaryContent(
                            data=data,
                            media_type=mime_type,
                            identifier=doc
                        )
                        processed_documents.append(binary_content)
                    except Exception as e:
                        from upsonic.utils.printing import warning_log
                        warning_log(f"Failed to load document {doc}: {e}", "AgentRunInput")
                elif isinstance(doc, BinaryContent):
                    processed_documents.append(doc)
        
        if not processed_images and not processed_documents:
            self.input = final_description
        else:
            input_list: List[Union[str, BinaryContent]] = [final_description]
            input_list.extend(processed_images)
            input_list.extend(processed_documents)
            self.input = input_list
    
    async def abuild_input(self, context_formatted: Optional[str] = None) -> None:
        """
        Async version of build_input.
        
        Args:
            context_formatted: Optional formatted context string to append to user_prompt
        """
        from upsonic.messages.messages import BinaryContent
        
        final_description = self.user_prompt
        if context_formatted and isinstance(context_formatted, str):
            if isinstance(final_description, str):
                final_description += "\n" + context_formatted
            else:
                final_description = str(final_description) + "\n" + context_formatted
        
        processed_images: List[BinaryContent] = []
        processed_documents: List[BinaryContent] = []
        
        if self.images:
            for img in self.images:
                if isinstance(img, str):
                    try:
                        import aiofiles
                        async with aiofiles.open(img, 'rb') as f:
                            data = await f.read()
                        
                        import mimetypes
                        mime_type, _ = mimetypes.guess_type(img)
                        if mime_type is None:
                            mime_type = "application/octet-stream"
                        
                        binary_content = BinaryContent(
                            data=data,
                            media_type=mime_type,
                            identifier=img
                        )
                        processed_images.append(binary_content)
                    except Exception as e:
                        from upsonic.utils.printing import warning_log
                        warning_log(f"Failed to load image {img}: {e}", "AgentRunInput")
                elif isinstance(img, BinaryContent):
                    processed_images.append(img)
        
        if self.documents:
            for doc in self.documents:
                if isinstance(doc, str):
                    try:
                        import aiofiles
                        async with aiofiles.open(doc, 'rb') as f:
                            data = await f.read()
                        
                        import mimetypes
                        mime_type, _ = mimetypes.guess_type(doc)
                        if mime_type is None:
                            mime_type = "application/octet-stream"
                        
                        binary_content = BinaryContent(
                            data=data,
                            media_type=mime_type,
                            identifier=doc
                        )
                        processed_documents.append(binary_content)
                    except Exception as e:
                        from upsonic.utils.printing import warning_log
                        warning_log(f"Failed to load document {doc}: {e}", "AgentRunInput")
                elif isinstance(doc, BinaryContent):
                    processed_documents.append(doc)
        
        if not processed_images and not processed_documents:
            self.input = final_description
        else:
            input_list: List[Union[str, BinaryContent]] = [final_description]
            input_list.extend(processed_images)
            input_list.extend(processed_documents)
            self.input = input_list

