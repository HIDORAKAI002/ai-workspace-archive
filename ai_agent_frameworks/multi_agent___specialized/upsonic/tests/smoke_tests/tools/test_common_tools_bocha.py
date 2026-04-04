"""Unit tests for BoCha search tool."""

import pytest
from unittest.mock import Mock, AsyncMock, patch

from upsonic.tools.common_tools.bochasearch import bocha_search_tool


class TestBochaSearch:
    """Test suite for BoCha search tool."""

    @pytest.fixture
    def mock_api_response(self):
        """Create a mock API response."""
        response_data = {
            "code": 200,
            "data": {
                "webPages": {
                    "value": [
                        {
                            "name": "Test Result",
                            "url": "http://example.com",
                            "summary": "Test description",
                            "siteName": "Example Site",
                            "siteIcon": "http://example.com/icon.png",
                            "dateLastCrawled": "2024-01-01T00:00:00Z",
                        }
                    ]
                }
            }
        }
        return response_data

    @pytest.fixture
    def mock_http_response(self, mock_api_response):
        """Create a mock HTTP response."""
        response = AsyncMock()
        response.status = 200
        response.json = AsyncMock(return_value=mock_api_response)
        response.__aenter__ = AsyncMock(return_value=response)
        response.__aexit__ = AsyncMock(return_value=None)
        return response

    @pytest.fixture
    def mock_session(self, mock_http_response):
        """Create a mock aiohttp session."""
        session = AsyncMock()
        session.post = Mock(return_value=mock_http_response)
        session.__aenter__ = AsyncMock(return_value=session)
        session.__aexit__ = AsyncMock(return_value=None)
        return session

    @pytest.mark.asyncio
    async def test_bocha_search(self, mock_session, mock_api_response):
        """Test BoCha search tool."""
        with patch("aiohttp.ClientSession", return_value=mock_session):
            tool = bocha_search_tool(api_key="test_api_key")
            result = await tool("test query")

        assert isinstance(result, list)
        assert len(result) > 0
        assert isinstance(result[0], dict)
        assert result[0]["title"] == "Test Result"
        assert result[0]["url"] == "http://example.com"
        mock_session.post.assert_called_once()

    @pytest.mark.asyncio
    async def test_bocha_search_error_handling_http_status(self):
        """Test error handling for HTTP status errors."""
        mock_response = AsyncMock()
        mock_response.status = 500
        mock_response.__aenter__ = AsyncMock(return_value=mock_response)
        mock_response.__aexit__ = AsyncMock(return_value=None)
        
        mock_session = AsyncMock()
        mock_session.post = Mock(return_value=mock_response)
        mock_session.__aenter__ = AsyncMock(return_value=mock_session)
        mock_session.__aexit__ = AsyncMock(return_value=None)

        with patch("aiohttp.ClientSession", return_value=mock_session):
            tool = bocha_search_tool(api_key="test_api_key")
            with pytest.raises(RuntimeError, match="Bocha API request failed with status 500"):
                await tool("test query")

    @pytest.mark.asyncio
    async def test_bocha_search_error_handling_api_error(self):
        """Test error handling for API errors."""
        mock_response = AsyncMock()
        mock_response.status = 200
        mock_response.json = AsyncMock(
            return_value={"code": 400, "msg": "Invalid query"}
        )
        mock_response.__aenter__ = AsyncMock(return_value=mock_response)
        mock_response.__aexit__ = AsyncMock(return_value=None)
        
        mock_session = AsyncMock()
        mock_session.post = Mock(return_value=mock_response)
        mock_session.__aenter__ = AsyncMock(return_value=mock_session)
        mock_session.__aexit__ = AsyncMock(return_value=None)

        with patch("aiohttp.ClientSession", return_value=mock_session):
            tool = bocha_search_tool(api_key="test_api_key")
            with pytest.raises(RuntimeError, match="Bocha API error: Invalid query"):
                await tool("test query")

    def test_bocha_search_tool_creation(self):
        """Test creating BoCha search tool."""
        tool = bocha_search_tool(api_key="test_api_key")

        assert tool is not None
        assert callable(tool)

    @pytest.mark.asyncio
    async def test_bocha_search_with_parameters(self, mock_session, mock_api_response):
        """Test search with various parameters."""
        with patch("aiohttp.ClientSession", return_value=mock_session):
            tool = bocha_search_tool(api_key="test_api_key")
            result = await tool(
                query="test query",
                freshness="oneWeek",
                summary=False,
                count=5,
                include="example.com",
                exclude="spam.com"
            )

        assert isinstance(result, list)
        call_args = mock_session.post.call_args
        assert call_args[1]["json"]["query"] == "test query"
        assert call_args[1]["json"]["freshness"] == "oneWeek"
        assert call_args[1]["json"]["summary"] is False
        assert call_args[1]["json"]["count"] == 5
        assert call_args[1]["json"]["include"] == "example.com"
        assert call_args[1]["json"]["exclude"] == "spam.com"

    @pytest.mark.asyncio
    async def test_bocha_search_result_format(self):
        """Test search result format."""
        mock_api_response = {
            "code": 200,
            "data": {
                "webPages": {
                    "value": [
                        {
                            "name": "Result 1",
                            "url": "http://example.com/1",
                            "summary": "Description 1",
                            "siteName": "Site 1",
                            "siteIcon": "http://example.com/icon1.png",
                            "dateLastCrawled": "2024-01-01T00:00:00Z",
                        },
                        {
                            "name": "Result 2",
                            "url": "http://example.com/2",
                            "summary": "Description 2",
                            "siteName": "Site 2",
                            "siteIcon": None,
                            "dateLastCrawled": None,
                        },
                    ]
                }
            }
        }
        mock_response = AsyncMock()
        mock_response.status = 200
        mock_response.json = AsyncMock(return_value=mock_api_response)
        mock_response.__aenter__ = AsyncMock(return_value=mock_response)
        mock_response.__aexit__ = AsyncMock(return_value=None)
        
        mock_session = AsyncMock()
        mock_session.post = Mock(return_value=mock_response)
        mock_session.__aenter__ = AsyncMock(return_value=mock_session)
        mock_session.__aexit__ = AsyncMock(return_value=None)

        with patch("aiohttp.ClientSession", return_value=mock_session):
            tool = bocha_search_tool(api_key="test_api_key")
            result = await tool("test")

        assert len(result) == 2
        assert all(isinstance(r, dict) for r in result)
        assert all("title" in r and "url" in r for r in result)
        assert result[0]["title"] == "Result 1"
        assert result[0]["url"] == "http://example.com/1"
        assert result[0]["summary"] == "Description 1"
        assert result[1]["summary"] == "Description 2"
        assert result[1]["site_icon"] is None
        assert result[1]["date_last_crawled"] is None

    @pytest.mark.asyncio
    async def test_bocha_search_authorization_header(self, mock_session, mock_api_response):
        """Test that authorization header is set correctly."""
        with patch("aiohttp.ClientSession", return_value=mock_session):
            tool = bocha_search_tool(api_key="test_api_key_123")
            await tool("test query")

        call_args = mock_session.post.call_args
        headers = call_args[1]["headers"]
        assert headers["Authorization"] == "Bearer test_api_key_123"
        assert headers["Content-Type"] == "application/json"
