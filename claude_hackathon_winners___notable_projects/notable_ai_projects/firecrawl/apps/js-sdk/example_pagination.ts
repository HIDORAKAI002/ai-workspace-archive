import { config } from "dotenv";
import { Firecrawl } from "./firecrawl/src/index";

config();

async function main() {
  const apiKey = process.env.FIRECRAWL_API_KEY || "fc-YOUR_API_KEY";
  const firecrawl = new Firecrawl({ apiKey });

  // --- Crawl examples ---
  
  // Method 1: Simple crawl - automatically waits for completion and returns all results
  // Use this when you want all the data and don't need to control pagination
  const crawlAll = await firecrawl.crawl("https://docs.firecrawl.dev", { limit: 5 });
  console.log("crawl auto (default):", crawlAll.status, "docs:", crawlAll.data.length, "next:", crawlAll.next);

  // Method 2: Manual crawl with pagination control
  // Use this when you need to control how many pages to fetch or want to process results incrementally
  const crawlStart = await firecrawl.startCrawl("https://docs.firecrawl.dev", { limit: 5 });
  const crawlJobId = crawlStart.id;

  // Get just the first page of results (useful for large crawls where you want to process incrementally)
  const crawlSingle = await firecrawl.getCrawlStatus(crawlJobId, { autoPaginate: false });
  console.log("crawl single page:", crawlSingle.status, "docs:", crawlSingle.data.length, "next:", crawlSingle.next);

  // Get multiple pages with custom limits (useful for controlling memory usage or processing time)
  const crawlLimited = await firecrawl.getCrawlStatus(crawlJobId, {
    autoPaginate: true,
    maxPages: 2,        // Only fetch 2 pages maximum
    maxResults: 50,     // Only fetch 50 results maximum
    maxWaitTime: 15,    // Spend at most 15 seconds fetching additional pages
  });
  console.log("crawl limited:", crawlLimited.status, "docs:", crawlLimited.data.length, "next:", crawlLimited.next);

  // --- Batch scrape examples ---
  
  // Method 1: Simple batch scrape - automatically waits for completion and returns all results
  // Use this when you want all the data from multiple URLs and don't need to control pagination
  const batchAll = await firecrawl.batchScrape([
    "https://docs.firecrawl.dev",
    "https://firecrawl.dev",
  ], { options: { formats: ["markdown"] } });
  console.log("batch auto (default):", batchAll.status, "docs:", batchAll.data.length, "next:", batchAll.next);

  // Method 2: Manual batch scrape with pagination control
  // Use this when you need to control how many pages to fetch or want to process results incrementally
  const batchStart = await firecrawl.startBatchScrape([
    "https://docs.firecrawl.dev",
    "https://firecrawl.dev",
  ], { options: { formats: ["markdown"] } });
  const batchJobId = batchStart.id;

  // Get just the first page of results
  const batchSingle = await firecrawl.getBatchScrapeStatus(batchJobId, { autoPaginate: false });
  console.log("batch single page:", batchSingle.status, "docs:", batchSingle.data.length, "next:", batchSingle.next);

  // Get multiple pages with custom limits
  const batchLimited = await firecrawl.getBatchScrapeStatus(batchJobId, {
    autoPaginate: true,
    maxPages: 2,        // Only fetch 2 pages maximum
    maxResults: 100,    // Only fetch 100 results maximum
    maxWaitTime: 20,    // Spend at most 20 seconds fetching additional pages
  });
  console.log("batch limited:", batchLimited.status, "docs:", batchLimited.data.length, "next:", batchLimited.next);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


