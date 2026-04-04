from typing import Literal, Optional, List
import aiohttp
from typing_extensions import TypedDict

from upsonic.tools import tool

__all__ = ('bocha_search_tool',)

class BoChaSearchResult(TypedDict):
    title: str  # Webpage title, used to quickly identify the content of the page
    url: str  # Webpage URL, can be used to directly access the page
    summary: Optional[str]  # Text summary provided by Bocha, may be None
    site_name: Optional[str]  # Name of the website hosting the page
    site_icon: Optional[str]  # URL of the website's favicon or icon
    date_last_crawled: Optional[str]  # Timestamp of when the page was last crawled by Bocha, helps assess recency


def bocha_search_tool(api_key: str):
    """Creates a BoCha search tool.

    Args:
        api_key: The BoCha API key.
    """
    @tool
    async def bocha_search(
            query: str,
            freshness: Literal[
                "noLimit", "oneDay", "oneWeek", "oneMonth", "oneYear", "YYYY-MM-DD", "YYYY-MM-DD..YYYY-MM-DD"
            ] = "noLimit",
            summary: bool = True,
            count: int = 10,
            include: Optional[str] = None,
            exclude: Optional[str] = None
    ) -> List[BoChaSearchResult]:
        """
        Searches BoCha for the given query and returns structured results.

        Args:
            query: Search keywords.
            freshness: Time range for search. Default "noLimit".
            summary: Whether to include text summary. Default True.
            count: Number of results to return (1-50). Default 10.
            include: Optional domains to include, separated by | or ,.
            exclude: Optional domains to exclude, separated by | or ,.

        Returns:
            A list of BoChaSearchResult objects.
        """
        url = "https://api.bochaai.com/v1/web-search"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "query": query,
            "freshness": freshness,
            "summary": summary,
            "count": count
        }
        if include:
            payload["include"] = include
        if exclude:
            payload["exclude"] = exclude

        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=headers, json=payload) as resp:
                if resp.status != 200:
                    raise RuntimeError(f"Bocha API request failed with status {resp.status}")
                json_response = await resp.json()
                if json_response.get("code") != 200 or not json_response.get("data"):
                    raise RuntimeError(f"Bocha API error: {json_response.get('msg', 'Unknown error')}")

                webpages = json_response["data"]["webPages"]["value"]
                results = []
                for page in webpages:
                    results.append(
                        BoChaSearchResult(
                            title=page.get("name", ""),
                            url=page.get("url", ""),
                            summary=page.get("summary"),
                            site_name=page.get("siteName"),
                            site_icon=page.get("siteIcon"),
                            date_last_crawled=page.get("dateLastCrawled")
                        )
                    )
                return results
    return bocha_search