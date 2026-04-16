using System.Text.Json;
using Firecrawl.Exceptions;
using Firecrawl.Models;

namespace Firecrawl;

/// <summary>
/// Client for the Firecrawl v2 API.
///
/// <example>
/// <code>
/// var client = new FirecrawlClient("fc-your-api-key");
///
/// // Scrape a single page
/// var doc = await client.ScrapeAsync("https://example.com",
///     new ScrapeOptions { Formats = new List&lt;object&gt; { "markdown" } });
///
/// // Crawl a website
/// var job = await client.CrawlAsync("https://example.com",
///     new CrawlOptions { Limit = 50 });
/// </code>
/// </example>
/// </summary>
public class FirecrawlClient
{
    private const string DefaultApiUrl = "https://api.firecrawl.dev";
    private static readonly TimeSpan DefaultTimeout = TimeSpan.FromMinutes(5);
    private const int DefaultMaxRetries = 3;
    private const double DefaultBackoffFactor = 0.5;
    private const int DefaultPollIntervalSec = 2;
    private const int DefaultJobTimeoutSec = 300;

    private readonly FirecrawlHttpClient _http;

    /// <summary>
    /// Creates a new FirecrawlClient with the specified API key.
    /// </summary>
    /// <param name="apiKey">The Firecrawl API key.</param>
    /// <param name="apiUrl">Optional API base URL (defaults to https://api.firecrawl.dev).</param>
    /// <param name="timeout">Optional HTTP request timeout.</param>
    /// <param name="maxRetries">Optional maximum number of retries for transient failures.</param>
    /// <param name="backoffFactor">Optional exponential backoff factor in seconds.</param>
    /// <param name="httpClient">Optional pre-configured HttpClient instance.</param>
    public FirecrawlClient(
        string? apiKey = null,
        string? apiUrl = null,
        TimeSpan? timeout = null,
        int maxRetries = DefaultMaxRetries,
        double backoffFactor = DefaultBackoffFactor,
        HttpClient? httpClient = null)
    {
        var resolvedKey = ResolveApiKey(apiKey);
        var resolvedUrl = ResolveApiUrl(apiUrl);

        _http = new FirecrawlHttpClient(
            resolvedKey,
            resolvedUrl,
            timeout ?? DefaultTimeout,
            maxRetries,
            backoffFactor,
            httpClient);
    }

    // ================================================================
    // SCRAPE
    // ================================================================

    /// <summary>
    /// Scrapes a single URL and returns the document.
    /// </summary>
    public async Task<Document> ScrapeAsync(
        string url,
        ScrapeOptions? options = null,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(url);

        var body = BuildBody(options);
        body["url"] = url;

        var response = await _http.PostAsync<ApiResponse<Document>>(
            "/v2/scrape", body, cancellationToken: cancellationToken);

        return response.Data ?? throw new FirecrawlException("Scrape response contained no data");
    }

    // ================================================================
    // CRAWL
    // ================================================================

    /// <summary>
    /// Starts an async crawl job and returns immediately.
    /// </summary>
    public async Task<CrawlResponse> StartCrawlAsync(
        string url,
        CrawlOptions? options = null,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(url);

        var body = BuildBody(options);
        body["url"] = url;

        return await _http.PostAsync<CrawlResponse>(
            "/v2/crawl", body, cancellationToken: cancellationToken);
    }

    /// <summary>
    /// Gets the status and results of a crawl job.
    /// </summary>
    public async Task<CrawlJob> GetCrawlStatusAsync(
        string jobId,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(jobId);

        return await _http.GetAsync<CrawlJob>(
            $"/v2/crawl/{jobId}", cancellationToken);
    }

    /// <summary>
    /// Crawls a website and waits for completion (auto-polling).
    /// </summary>
    public async Task<CrawlJob> CrawlAsync(
        string url,
        CrawlOptions? options = null,
        int pollIntervalSec = DefaultPollIntervalSec,
        int timeoutSec = DefaultJobTimeoutSec,
        CancellationToken cancellationToken = default)
    {
        var start = await StartCrawlAsync(url, options, cancellationToken);
        return await PollCrawlAsync(
            start.Id ?? throw new FirecrawlException("Crawl start did not return a job ID"),
            pollIntervalSec, timeoutSec, cancellationToken);
    }

    /// <summary>
    /// Cancels a running crawl job.
    /// </summary>
    public async Task<Dictionary<string, object>> CancelCrawlAsync(
        string jobId,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(jobId);

        return await _http.DeleteAsync<Dictionary<string, object>>(
            $"/v2/crawl/{jobId}", cancellationToken);
    }

    /// <summary>
    /// Gets errors from a crawl job.
    /// </summary>
    public async Task<Dictionary<string, object>> GetCrawlErrorsAsync(
        string jobId,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(jobId);

        return await _http.GetAsync<Dictionary<string, object>>(
            $"/v2/crawl/{jobId}/errors", cancellationToken);
    }

    // ================================================================
    // BATCH SCRAPE
    // ================================================================

    /// <summary>
    /// Starts an async batch scrape job.
    /// </summary>
    public async Task<BatchScrapeResponse> StartBatchScrapeAsync(
        List<string> urls,
        BatchScrapeOptions? options = null,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(urls);

        var body = BuildBody(options);
        body["urls"] = urls;

        // The API expects scrape options flattened at the top level
        if (body.TryGetValue("options", out var nested) && nested is JsonElement nestedElement)
        {
            body.Remove("options");
            var nestedDict = JsonSerializer.Deserialize<Dictionary<string, object>>(
                nestedElement.GetRawText(), FirecrawlHttpClient.JsonOptions);
            if (nestedDict != null)
            {
                var batchFields = new Dictionary<string, object>(body);
                foreach (var kv in nestedDict)
                    body.TryAdd(kv.Key, kv.Value);
                foreach (var kv in batchFields)
                    body[kv.Key] = kv.Value;
            }
        }

        Dictionary<string, string>? extraHeaders = null;
        if (options?.IdempotencyKey is { Length: > 0 } idempotencyKey)
        {
            extraHeaders = new Dictionary<string, string>
            {
                ["x-idempotency-key"] = idempotencyKey
            };
        }

        return await _http.PostAsync<BatchScrapeResponse>(
            "/v2/batch/scrape", body, extraHeaders, cancellationToken);
    }

    /// <summary>
    /// Gets the status and results of a batch scrape job.
    /// </summary>
    public async Task<BatchScrapeJob> GetBatchScrapeStatusAsync(
        string jobId,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(jobId);

        return await _http.GetAsync<BatchScrapeJob>(
            $"/v2/batch/scrape/{jobId}", cancellationToken);
    }

    /// <summary>
    /// Batch-scrapes URLs and waits for completion (auto-polling).
    /// </summary>
    public async Task<BatchScrapeJob> BatchScrapeAsync(
        List<string> urls,
        BatchScrapeOptions? options = null,
        int pollIntervalSec = DefaultPollIntervalSec,
        int timeoutSec = DefaultJobTimeoutSec,
        CancellationToken cancellationToken = default)
    {
        var start = await StartBatchScrapeAsync(urls, options, cancellationToken);
        return await PollBatchScrapeAsync(
            start.Id ?? throw new FirecrawlException("Batch scrape start did not return a job ID"),
            pollIntervalSec, timeoutSec, cancellationToken);
    }

    /// <summary>
    /// Cancels a running batch scrape job.
    /// </summary>
    public async Task<Dictionary<string, object>> CancelBatchScrapeAsync(
        string jobId,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(jobId);

        return await _http.DeleteAsync<Dictionary<string, object>>(
            $"/v2/batch/scrape/{jobId}", cancellationToken);
    }

    // ================================================================
    // MAP
    // ================================================================

    /// <summary>
    /// Discovers URLs on a website.
    /// </summary>
    public async Task<MapData> MapAsync(
        string url,
        MapOptions? options = null,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(url);

        var body = BuildBody(options);
        body["url"] = url;

        var response = await _http.PostAsync<ApiResponse<MapData>>(
            "/v2/map", body, cancellationToken: cancellationToken);

        return response.Data ?? throw new FirecrawlException("Map response contained no data");
    }

    // ================================================================
    // SEARCH
    // ================================================================

    /// <summary>
    /// Performs a web search.
    /// </summary>
    public async Task<SearchData> SearchAsync(
        string query,
        SearchOptions? options = null,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(query);

        var body = BuildBody(options);
        body["query"] = query;

        var response = await _http.PostAsync<ApiResponse<SearchData>>(
            "/v2/search", body, cancellationToken: cancellationToken);

        return response.Data ?? throw new FirecrawlException("Search response contained no data");
    }

    // ================================================================
    // USAGE & METRICS
    // ================================================================

    /// <summary>
    /// Gets current concurrency usage.
    /// </summary>
    public async Task<ConcurrencyCheck> GetConcurrencyAsync(
        CancellationToken cancellationToken = default)
    {
        return await _http.GetAsync<ConcurrencyCheck>(
            "/v2/concurrency-check", cancellationToken);
    }

    /// <summary>
    /// Gets current credit usage.
    /// </summary>
    public async Task<CreditUsage> GetCreditUsageAsync(
        CancellationToken cancellationToken = default)
    {
        return await _http.GetAsync<CreditUsage>(
            "/v2/team/credit-usage", cancellationToken);
    }

    // ================================================================
    // INTERNAL POLLING HELPERS
    // ================================================================

    private async Task<CrawlJob> PollCrawlAsync(
        string jobId,
        int pollIntervalSec,
        int timeoutSec,
        CancellationToken cancellationToken)
    {
        var deadline = DateTime.UtcNow.AddSeconds(timeoutSec);

        while (DateTime.UtcNow < deadline)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var job = await GetCrawlStatusAsync(jobId, cancellationToken);
            if (job.IsDone)
                return await PaginateCrawlAsync(job, cancellationToken);

            await Task.Delay(TimeSpan.FromSeconds(pollIntervalSec), cancellationToken);
        }

        throw new JobTimeoutException(jobId, timeoutSec, "Crawl");
    }

    private async Task<BatchScrapeJob> PollBatchScrapeAsync(
        string jobId,
        int pollIntervalSec,
        int timeoutSec,
        CancellationToken cancellationToken)
    {
        var deadline = DateTime.UtcNow.AddSeconds(timeoutSec);

        while (DateTime.UtcNow < deadline)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var job = await GetBatchScrapeStatusAsync(jobId, cancellationToken);
            if (job.IsDone)
                return await PaginateBatchScrapeAsync(job, cancellationToken);

            await Task.Delay(TimeSpan.FromSeconds(pollIntervalSec), cancellationToken);
        }

        throw new JobTimeoutException(jobId, timeoutSec, "Batch scrape");
    }

    private async Task<CrawlJob> PaginateCrawlAsync(
        CrawlJob job,
        CancellationToken cancellationToken)
    {
        job.Data ??= new List<Document>();
        var current = job;

        while (!string.IsNullOrEmpty(current.Next))
        {
            var nextPage = await _http.GetAbsoluteAsync<CrawlJob>(
                current.Next, cancellationToken);

            if (nextPage.Data is { Count: > 0 })
                job.Data.AddRange(nextPage.Data);

            current = nextPage;
        }

        job.Next = null;
        return job;
    }

    private async Task<BatchScrapeJob> PaginateBatchScrapeAsync(
        BatchScrapeJob job,
        CancellationToken cancellationToken)
    {
        job.Data ??= new List<Document>();
        var current = job;

        while (!string.IsNullOrEmpty(current.Next))
        {
            var nextPage = await _http.GetAbsoluteAsync<BatchScrapeJob>(
                current.Next, cancellationToken);

            if (nextPage.Data is { Count: > 0 })
                job.Data.AddRange(nextPage.Data);

            current = nextPage;
        }

        job.Next = null;
        return job;
    }

    // ================================================================
    // INTERNAL UTILITIES
    // ================================================================

    private static Dictionary<string, object> BuildBody(object? options)
    {
        if (options == null)
            return new Dictionary<string, object>();

        var json = JsonSerializer.Serialize(options, FirecrawlHttpClient.JsonOptions);
        return JsonSerializer.Deserialize<Dictionary<string, object>>(json, FirecrawlHttpClient.JsonOptions)
            ?? new Dictionary<string, object>();
    }

    private static string ResolveApiKey(string? apiKey)
    {
        if (!string.IsNullOrWhiteSpace(apiKey))
            return apiKey;

        var envKey = Environment.GetEnvironmentVariable("FIRECRAWL_API_KEY");
        if (!string.IsNullOrWhiteSpace(envKey))
            return envKey;

        throw new FirecrawlException(
            "API key is required. Pass it to the constructor or set the FIRECRAWL_API_KEY environment variable.");
    }

    private static string ResolveApiUrl(string? apiUrl)
    {
        if (!string.IsNullOrWhiteSpace(apiUrl))
            return apiUrl;

        var envUrl = Environment.GetEnvironmentVariable("FIRECRAWL_API_URL");
        if (!string.IsNullOrWhiteSpace(envUrl))
            return envUrl;

        return DefaultApiUrl;
    }
}
