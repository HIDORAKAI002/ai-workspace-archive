"""
Firecrawl Web Scraping & Crawling Toolkit for Upsonic Framework.

This module provides comprehensive Firecrawl API integration with support for:
- Scraping single URLs into markdown, HTML, or structured JSON
- Crawling entire websites with configurable depth and limits
- Mapping website URLs for discovery
- Searching the web with content scraping
- Batch scraping multiple URLs simultaneously
- Extracting structured data using LLM-powered extraction
- Async operations with job management (start, status, cancel)

Required Environment Variables:
-----------------------------
- FIRECRAWL_API_KEY: Firecrawl API key from https://firecrawl.dev

Example Usage:
    ```python
    from upsonic.tools.custom_tools.firecrawl import FirecrawlTools

    tools = FirecrawlTools(api_key="fc-YOUR-API-KEY")
    result = tools.scrape_url("https://example.com")
    ```
"""

import json
from os import getenv
from typing import Any, Dict, List, Optional

from upsonic.tools.base import ToolKit
from upsonic.tools.config import tool
from upsonic.utils.integrations.firecrawl import serialize_firecrawl_response
from upsonic.utils.printing import error_log

try:
    from firecrawl import AsyncFirecrawl, Firecrawl
    _FIRECRAWL_AVAILABLE = True
except ImportError:
    AsyncFirecrawl = None
    Firecrawl = None
    _FIRECRAWL_AVAILABLE = False


class FirecrawlTools(ToolKit):
    """Firecrawl web scraping, crawling, and data extraction toolkit."""

    def __init__(
        self,
        api_key: Optional[str] = None,
        api_url: Optional[str] = None,
        default_formats: Optional[List[str]] = None,
        default_scrape_limit: int = 100,
        default_search_limit: int = 5,
        fc_timeout: int = 120,
        poll_interval: int = 2,
        **kwargs: Any,
    ) -> None:
        """Initialize the FirecrawlTools toolkit.

        Args:
            api_key: Firecrawl API key. Falls back to FIRECRAWL_API_KEY env var.
            api_url: Custom API base URL for self-hosted Firecrawl instances.
            default_formats: Default output formats for scrape operations.
            default_scrape_limit: Default page limit for crawl operations.
            default_search_limit: Default result limit for search operations.
            fc_timeout: Default timeout for blocking operations in seconds.
            poll_interval: Default poll interval for job status checks in seconds.
            **kwargs: ToolKit params (include_tools, exclude_tools, timeout, etc.).
        """
        super().__init__(**kwargs)

        if not _FIRECRAWL_AVAILABLE:
            from upsonic.utils.printing import import_error
            import_error(
                package_name="firecrawl-py",
                install_command='pip install firecrawl-py',
                feature_name="Firecrawl tools"
            )

        self.api_key: str = api_key or getenv("FIRECRAWL_API_KEY", "")
        if not self.api_key:
            raise ValueError(
                "Firecrawl API key is required. Set FIRECRAWL_API_KEY environment "
                "variable or pass api_key parameter."
            )

        self.api_url: Optional[str] = api_url
        self.default_formats: List[str] = default_formats or ["markdown"]
        self.default_scrape_limit: int = default_scrape_limit
        self.default_search_limit: int = default_search_limit
        self.fc_timeout: int = fc_timeout
        self.poll_interval: int = poll_interval

        client_kwargs: Dict[str, Any] = {"api_key": self.api_key}
        if self.api_url:
            client_kwargs["api_url"] = self.api_url

        self.sync_client: Any = Firecrawl(**client_kwargs)
        self.async_client: Any = AsyncFirecrawl(**client_kwargs)

    # ------------------------------------------------------------------
    # Async implementations (public counterparts for use_async mode)
    # ------------------------------------------------------------------

    async def ascrape_url(
        self,
        url: str,
        formats: Optional[List[str]] = None,
        only_main_content: Optional[bool] = None,
        include_tags: Optional[List[str]] = None,
        exclude_tags: Optional[List[str]] = None,
        wait_for: Optional[int] = None,
        timeout: Optional[int] = None,
        json_schema: Optional[Dict[str, Any]] = None,
        json_prompt: Optional[str] = None,
        location: Optional[str] = None,
        mobile: Optional[bool] = None,
        skip_tls_verification: Optional[bool] = None,
        remove_base64_images: Optional[bool] = None,
    ) -> str:
        try:
            scrape_formats: List[Any] = list(formats or self.default_formats)
            if json_schema:
                json_format: Dict[str, Any] = {"type": "json", "schema": json_schema}
                if json_prompt:
                    json_format["prompt"] = json_prompt
                scrape_formats.append(json_format)

            kwargs: Dict[str, Any] = {"formats": scrape_formats}
            if only_main_content is not None:
                kwargs["only_main_content"] = only_main_content
            if include_tags is not None:
                kwargs["include_tags"] = include_tags
            if exclude_tags is not None:
                kwargs["exclude_tags"] = exclude_tags
            if wait_for is not None:
                kwargs["wait_for"] = wait_for
            if timeout is not None:
                kwargs["timeout"] = timeout
            if location is not None:
                kwargs["location"] = location
            if mobile is not None:
                kwargs["mobile"] = mobile
            if skip_tls_verification is not None:
                kwargs["skip_tls_verification"] = skip_tls_verification
            if remove_base64_images is not None:
                kwargs["remove_base64_images"] = remove_base64_images

            result = await self.async_client.scrape(url, **kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl async scrape error: {e}")
            return json.dumps({"error": str(e)})

    async def acrawl_website(
        self,
        url: str,
        limit: Optional[int] = None,
        scrape_formats: Optional[List[str]] = None,
        exclude_paths: Optional[List[str]] = None,
        include_paths: Optional[List[str]] = None,
        max_discovery_depth: Optional[int] = None,
        sitemap: Optional[str] = None,
        poll_interval: Optional[int] = None,
        timeout: Optional[int] = None,
    ) -> str:
        try:
            kwargs: Dict[str, Any] = {}
            kwargs["limit"] = limit or self.default_scrape_limit
            kwargs["poll_interval"] = poll_interval or self.poll_interval
            kwargs["timeout"] = timeout or self.fc_timeout
            if scrape_formats:
                kwargs["scrape_options"] = {"formats": scrape_formats}
            if exclude_paths is not None:
                kwargs["exclude_paths"] = exclude_paths
            if include_paths is not None:
                kwargs["include_paths"] = include_paths
            if max_discovery_depth is not None:
                kwargs["max_discovery_depth"] = max_discovery_depth
            if sitemap is not None:
                kwargs["sitemap"] = sitemap

            result = await self.async_client.crawl(url=url, **kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl async crawl error: {e}")
            return json.dumps({"error": str(e)})

    async def astart_crawl(
        self,
        url: str,
        limit: Optional[int] = None,
        scrape_formats: Optional[List[str]] = None,
        exclude_paths: Optional[List[str]] = None,
        include_paths: Optional[List[str]] = None,
        max_discovery_depth: Optional[int] = None,
        sitemap: Optional[str] = None,
    ) -> str:
        try:
            kwargs: Dict[str, Any] = {}
            kwargs["limit"] = limit or self.default_scrape_limit
            if scrape_formats:
                kwargs["scrape_options"] = {"formats": scrape_formats}
            if exclude_paths is not None:
                kwargs["exclude_paths"] = exclude_paths
            if include_paths is not None:
                kwargs["include_paths"] = include_paths
            if max_discovery_depth is not None:
                kwargs["max_discovery_depth"] = max_discovery_depth
            if sitemap is not None:
                kwargs["sitemap"] = sitemap

            result = await self.async_client.start_crawl(url=url, **kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl async start_crawl error: {e}")
            return json.dumps({"error": str(e)})

    async def aget_crawl_status(self, job_id: str) -> str:
        try:
            result = await self.async_client.get_crawl_status(job_id)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl async get_crawl_status error: {e}")
            return json.dumps({"error": str(e)})

    async def acancel_crawl(self, job_id: str) -> str:
        try:
            result = await self.async_client.cancel_crawl(job_id)
            return json.dumps({"cancelled": result}, default=str)
        except Exception as e:
            error_log(f"Firecrawl async cancel_crawl error: {e}")
            return json.dumps({"error": str(e)})

    async def amap_website(self, url: str, limit: Optional[int] = None) -> str:
        try:
            kwargs: Dict[str, Any] = {}
            if limit is not None:
                kwargs["limit"] = limit
            result = await self.async_client.map(url=url, **kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl async map error: {e}")
            return json.dumps({"error": str(e)})

    async def asearch_web(
        self,
        query: str,
        limit: Optional[int] = None,
        scrape_options: Optional[Dict[str, Any]] = None,
        location: Optional[str] = None,
        tbs: Optional[str] = None,
        timeout: Optional[int] = None,
        sources: Optional[List[str]] = None,
        categories: Optional[List[str]] = None,
    ) -> str:
        try:
            kwargs: Dict[str, Any] = {"query": query}
            kwargs["limit"] = limit or self.default_search_limit
            if scrape_options is not None:
                kwargs["scrape_options"] = scrape_options
            if location is not None:
                kwargs["location"] = location
            if tbs is not None:
                kwargs["tbs"] = tbs
            if timeout is not None:
                kwargs["timeout"] = timeout
            if sources is not None:
                kwargs["sources"] = sources
            if categories is not None:
                kwargs["categories"] = categories
            result = await self.async_client.search(**kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl async search error: {e}")
            return json.dumps({"error": str(e)})

    async def abatch_scrape(
        self, urls: List[str], formats: Optional[List[str]] = None, poll_interval: Optional[int] = None,
    ) -> str:
        try:
            kwargs: Dict[str, Any] = {}
            kwargs["formats"] = formats or self.default_formats
            kwargs["poll_interval"] = poll_interval or self.poll_interval
            result = await self.async_client.batch_scrape(urls, **kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl async batch_scrape error: {e}")
            return json.dumps({"error": str(e)})

    async def astart_batch_scrape(self, urls: List[str], formats: Optional[List[str]] = None) -> str:
        try:
            kwargs: Dict[str, Any] = {}
            kwargs["formats"] = formats or self.default_formats
            result = await self.async_client.start_batch_scrape(urls, **kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl async start_batch_scrape error: {e}")
            return json.dumps({"error": str(e)})

    async def aget_batch_scrape_status(self, job_id: str) -> str:
        try:
            result = await self.async_client.get_batch_scrape_status(job_id)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl async get_batch_scrape_status error: {e}")
            return json.dumps({"error": str(e)})

    async def aextract_data(
        self,
        urls: Optional[List[str]] = None,
        prompt: Optional[str] = None,
        schema: Optional[Dict[str, Any]] = None,
        enable_web_search: Optional[bool] = None,
        scrape_options: Optional[Dict[str, Any]] = None,
    ) -> str:
        try:
            kwargs: Dict[str, Any] = {}
            if urls is not None:
                kwargs["urls"] = urls
            if prompt is not None:
                kwargs["prompt"] = prompt
            if schema is not None:
                kwargs["schema"] = schema
            if enable_web_search is not None:
                kwargs["enable_web_search"] = enable_web_search
            if scrape_options is not None:
                from firecrawl.types import ScrapeOptions as _ScrapeOptions
                kwargs["scrape_options"] = _ScrapeOptions(**scrape_options) if isinstance(scrape_options, dict) else scrape_options
            result = await self.async_client.extract(**kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl async extract error: {e}")
            return json.dumps({"error": str(e)})

    async def astart_extract(
        self,
        urls: Optional[List[str]] = None,
        prompt: Optional[str] = None,
        schema: Optional[Dict[str, Any]] = None,
        enable_web_search: Optional[bool] = None,
    ) -> str:
        try:
            kwargs: Dict[str, Any] = {}
            if prompt is not None:
                kwargs["prompt"] = prompt
            if schema is not None:
                kwargs["schema"] = schema
            if enable_web_search is not None:
                kwargs["enable_web_search"] = enable_web_search
            result = await self.async_client.start_extract(urls or [], **kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl async start_extract error: {e}")
            return json.dumps({"error": str(e)})

    async def aget_extract_status(self, job_id: str) -> str:
        try:
            result = await self.async_client.get_extract_status(job_id)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl async get_extract_status error: {e}")
            return json.dumps({"error": str(e)})

    # ------------------------------------------------------------------
    # Tool methods (sync, exposed to LLM)
    # ------------------------------------------------------------------

    @tool
    def scrape_url(
        self,
        url: str,
        formats: Optional[List[str]] = None,
        only_main_content: Optional[bool] = None,
        include_tags: Optional[List[str]] = None,
        exclude_tags: Optional[List[str]] = None,
        wait_for: Optional[int] = None,
        timeout: Optional[int] = None,
        json_schema: Optional[Dict[str, Any]] = None,
        json_prompt: Optional[str] = None,
        location: Optional[str] = None,
        mobile: Optional[bool] = None,
        skip_tls_verification: Optional[bool] = None,
        remove_base64_images: Optional[bool] = None,
    ) -> str:
        """Scrape a single URL and extract its content.

        Args:
            url: The URL to scrape.
            formats: Output formats (markdown, html, rawHtml, links, summary, images).
            only_main_content: Extract only the main content, excluding headers/footers/navs.
            include_tags: HTML tags to include in extraction.
            exclude_tags: HTML tags to exclude from extraction.
            wait_for: Time in ms to wait for page to load before scraping.
            timeout: Timeout in ms for the scrape operation.
            json_schema: JSON schema for structured data extraction via LLM.
            json_prompt: Prompt for LLM-based JSON extraction.
            location: Country/location for geo-targeted scraping.
            mobile: Scrape as mobile device.
            skip_tls_verification: Skip TLS certificate verification.
            remove_base64_images: Remove base64 images from output.

        Returns:
            JSON string containing the scraped content.
        """
        try:
            scrape_formats: List[Any] = list(formats or self.default_formats)
            if json_schema:
                json_format: Dict[str, Any] = {"type": "json", "schema": json_schema}
                if json_prompt:
                    json_format["prompt"] = json_prompt
                scrape_formats.append(json_format)

            kwargs: Dict[str, Any] = {"formats": scrape_formats}
            if only_main_content is not None:
                kwargs["only_main_content"] = only_main_content
            if include_tags is not None:
                kwargs["include_tags"] = include_tags
            if exclude_tags is not None:
                kwargs["exclude_tags"] = exclude_tags
            if wait_for is not None:
                kwargs["wait_for"] = wait_for
            if timeout is not None:
                kwargs["timeout"] = timeout
            if location is not None:
                kwargs["location"] = location
            if mobile is not None:
                kwargs["mobile"] = mobile
            if skip_tls_verification is not None:
                kwargs["skip_tls_verification"] = skip_tls_verification
            if remove_base64_images is not None:
                kwargs["remove_base64_images"] = remove_base64_images

            result = self.sync_client.scrape(url, **kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl scrape error: {e}")
            return json.dumps({"error": str(e)})

    @tool
    def crawl_website(
        self,
        url: str,
        limit: Optional[int] = None,
        scrape_formats: Optional[List[str]] = None,
        exclude_paths: Optional[List[str]] = None,
        include_paths: Optional[List[str]] = None,
        max_discovery_depth: Optional[int] = None,
        sitemap: Optional[str] = None,
        poll_interval: Optional[int] = None,
        timeout: Optional[int] = None,
    ) -> str:
        """Crawl an entire website (blocking). Waits for the crawl to complete.

        Args:
            url: The starting URL to crawl.
            limit: Maximum number of pages to crawl.
            scrape_formats: Output formats for scraped pages.
            exclude_paths: URL path patterns to exclude.
            include_paths: URL path patterns to include.
            max_discovery_depth: Maximum crawl depth from the starting URL.
            sitemap: Sitemap mode ('skip', 'include', or 'only').
            poll_interval: Polling interval in seconds for job status checks.
            timeout: Timeout in seconds for the entire crawl operation.

        Returns:
            JSON string containing the crawl results.
        """
        try:
            kwargs: Dict[str, Any] = {}
            kwargs["limit"] = limit or self.default_scrape_limit
            kwargs["poll_interval"] = poll_interval or self.poll_interval
            kwargs["timeout"] = timeout or self.fc_timeout
            if scrape_formats:
                kwargs["scrape_options"] = {"formats": scrape_formats}
            if exclude_paths is not None:
                kwargs["exclude_paths"] = exclude_paths
            if include_paths is not None:
                kwargs["include_paths"] = include_paths
            if max_discovery_depth is not None:
                kwargs["max_discovery_depth"] = max_discovery_depth
            if sitemap is not None:
                kwargs["sitemap"] = sitemap

            result = self.sync_client.crawl(url=url, **kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl crawl error: {e}")
            return json.dumps({"error": str(e)})

    @tool
    def start_crawl(
        self,
        url: str,
        limit: Optional[int] = None,
        scrape_formats: Optional[List[str]] = None,
        exclude_paths: Optional[List[str]] = None,
        include_paths: Optional[List[str]] = None,
        max_discovery_depth: Optional[int] = None,
        sitemap: Optional[str] = None,
    ) -> str:
        """Start a non-blocking crawl job. Returns a job ID for status tracking.

        Args:
            url: The starting URL to crawl.
            limit: Maximum number of pages to crawl.
            scrape_formats: Output formats for scraped pages.
            exclude_paths: URL path patterns to exclude.
            include_paths: URL path patterns to include.
            max_discovery_depth: Maximum crawl depth from the starting URL.
            sitemap: Sitemap mode ('skip', 'include', or 'only').

        Returns:
            JSON string containing the job ID and initial status.
        """
        try:
            kwargs: Dict[str, Any] = {}
            kwargs["limit"] = limit or self.default_scrape_limit
            if scrape_formats:
                kwargs["scrape_options"] = {"formats": scrape_formats}
            if exclude_paths is not None:
                kwargs["exclude_paths"] = exclude_paths
            if include_paths is not None:
                kwargs["include_paths"] = include_paths
            if max_discovery_depth is not None:
                kwargs["max_discovery_depth"] = max_discovery_depth
            if sitemap is not None:
                kwargs["sitemap"] = sitemap

            result = self.sync_client.start_crawl(url=url, **kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl start_crawl error: {e}")
            return json.dumps({"error": str(e)})

    @tool
    def get_crawl_status(self, job_id: str) -> str:
        """Check the status of an active crawl job.

        Args:
            job_id: The crawl job ID returned by start_crawl.

        Returns:
            JSON string containing the crawl status, completed pages, and data.
        """
        try:
            result = self.sync_client.get_crawl_status(job_id)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl get_crawl_status error: {e}")
            return json.dumps({"error": str(e)})

    @tool
    def cancel_crawl(self, job_id: str) -> str:
        """Cancel an ongoing crawl job.

        Args:
            job_id: The crawl job ID to cancel.

        Returns:
            JSON string indicating cancellation success.
        """
        try:
            result = self.sync_client.cancel_crawl(job_id)
            return json.dumps({"cancelled": result}, default=str)
        except Exception as e:
            error_log(f"Firecrawl cancel_crawl error: {e}")
            return json.dumps({"error": str(e)})

    @tool
    def map_website(self, url: str, limit: Optional[int] = None) -> str:
        """Generate a list of URLs from a website for discovery.

        Args:
            url: The website URL to map.
            limit: Maximum number of URLs to return.

        Returns:
            JSON string containing the list of discovered URLs.
        """
        try:
            kwargs: Dict[str, Any] = {}
            if limit is not None:
                kwargs["limit"] = limit
            result = self.sync_client.map(url=url, **kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl map error: {e}")
            return json.dumps({"error": str(e)})

    @tool
    def search_web(
        self,
        query: str,
        limit: Optional[int] = None,
        scrape_options: Optional[Dict[str, Any]] = None,
        location: Optional[str] = None,
        tbs: Optional[str] = None,
        timeout: Optional[int] = None,
        sources: Optional[List[str]] = None,
        categories: Optional[List[str]] = None,
    ) -> str:
        """Search the web and optionally scrape search result content.

        Args:
            query: The search query string.
            limit: Maximum number of results to return.
            scrape_options: Options for scraping search results (e.g. {"formats": ["markdown"]}).
            location: Country/region for geo-targeted search results.
            tbs: Time-based search filter (e.g. 'qdr:d' for past day, 'qdr:w' for past week).
            timeout: Timeout in milliseconds for the search operation.
            sources: Result types to include ('web', 'news', 'images').
            categories: Filter by categories ('pdf', 'research', 'github').

        Returns:
            JSON string containing the search results.
        """
        try:
            kwargs: Dict[str, Any] = {"query": query}
            kwargs["limit"] = limit or self.default_search_limit
            if scrape_options is not None:
                kwargs["scrape_options"] = scrape_options
            if location is not None:
                kwargs["location"] = location
            if tbs is not None:
                kwargs["tbs"] = tbs
            if timeout is not None:
                kwargs["timeout"] = timeout
            if sources is not None:
                kwargs["sources"] = sources
            if categories is not None:
                kwargs["categories"] = categories

            result = self.sync_client.search(**kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl search error: {e}")
            return json.dumps({"error": str(e)})

    @tool
    def batch_scrape(
        self, urls: List[str], formats: Optional[List[str]] = None, poll_interval: Optional[int] = None,
    ) -> str:
        """Batch scrape multiple URLs (blocking). Waits for all results.

        Args:
            urls: List of URLs to scrape.
            formats: Output formats for the scraped content.
            poll_interval: Polling interval in seconds for status checks.

        Returns:
            JSON string containing the batch scrape results.
        """
        try:
            kwargs: Dict[str, Any] = {}
            kwargs["formats"] = formats or self.default_formats
            kwargs["poll_interval"] = poll_interval or self.poll_interval
            result = self.sync_client.batch_scrape(urls, **kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl batch_scrape error: {e}")
            return json.dumps({"error": str(e)})

    @tool
    def start_batch_scrape(self, urls: List[str], formats: Optional[List[str]] = None) -> str:
        """Start a non-blocking batch scrape job. Returns a job ID for tracking.

        Args:
            urls: List of URLs to scrape.
            formats: Output formats for the scraped content.

        Returns:
            JSON string containing the job ID and initial status.
        """
        try:
            kwargs: Dict[str, Any] = {}
            kwargs["formats"] = formats or self.default_formats
            result = self.sync_client.start_batch_scrape(urls, **kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl start_batch_scrape error: {e}")
            return json.dumps({"error": str(e)})

    @tool
    def get_batch_scrape_status(self, job_id: str) -> str:
        """Check the status of a batch scrape job.

        Args:
            job_id: The batch scrape job ID returned by start_batch_scrape.

        Returns:
            JSON string containing the batch status, completed count, and data.
        """
        try:
            result = self.sync_client.get_batch_scrape_status(job_id)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl get_batch_scrape_status error: {e}")
            return json.dumps({"error": str(e)})

    @tool
    def extract_data(
        self,
        urls: Optional[List[str]] = None,
        prompt: Optional[str] = None,
        schema: Optional[Dict[str, Any]] = None,
        enable_web_search: Optional[bool] = None,
        scrape_options: Optional[Dict[str, Any]] = None,
    ) -> str:
        """Extract structured data from URLs using LLM-powered extraction (blocking).

        Args:
            urls: List of URLs to extract from. Supports wildcards (e.g. 'example.com/*').
            prompt: Natural language prompt describing what data to extract.
            schema: JSON schema defining the structure of data to extract.
            enable_web_search: Allow extraction to follow links outside specified domains.
            scrape_options: Additional scrape options for the extraction.

        Returns:
            JSON string containing the extracted structured data.
        """
        try:
            kwargs: Dict[str, Any] = {}
            if urls is not None:
                kwargs["urls"] = urls
            if prompt is not None:
                kwargs["prompt"] = prompt
            if schema is not None:
                kwargs["schema"] = schema
            if enable_web_search is not None:
                kwargs["enable_web_search"] = enable_web_search
            if scrape_options is not None:
                from firecrawl.types import ScrapeOptions as _ScrapeOptions
                kwargs["scrape_options"] = _ScrapeOptions(**scrape_options) if isinstance(scrape_options, dict) else scrape_options

            result = self.sync_client.extract(**kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl extract error: {e}")
            return json.dumps({"error": str(e)})

    @tool
    def start_extract(
        self,
        urls: Optional[List[str]] = None,
        prompt: Optional[str] = None,
        schema: Optional[Dict[str, Any]] = None,
        enable_web_search: Optional[bool] = None,
    ) -> str:
        """Start a non-blocking extraction job. Returns a job ID for tracking.

        Args:
            urls: List of URLs to extract from. Supports wildcards.
            prompt: Natural language prompt describing what data to extract.
            schema: JSON schema defining the structure of data to extract.
            enable_web_search: Allow extraction to follow links outside specified domains.

        Returns:
            JSON string containing the job ID and initial status.
        """
        try:
            kwargs: Dict[str, Any] = {}
            if prompt is not None:
                kwargs["prompt"] = prompt
            if schema is not None:
                kwargs["schema"] = schema
            if enable_web_search is not None:
                kwargs["enable_web_search"] = enable_web_search

            result = self.sync_client.start_extract(urls or [], **kwargs)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl start_extract error: {e}")
            return json.dumps({"error": str(e)})

    @tool
    def get_extract_status(self, job_id: str) -> str:
        """Check the status of an extraction job.

        Args:
            job_id: The extraction job ID returned by start_extract.

        Returns:
            JSON string containing the extraction status and data.
        """
        try:
            result = self.sync_client.get_extract_status(job_id)
            return serialize_firecrawl_response(result)
        except Exception as e:
            error_log(f"Firecrawl get_extract_status error: {e}")
            return json.dumps({"error": str(e)})
