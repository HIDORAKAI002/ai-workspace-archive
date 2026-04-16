using Firecrawl.Exceptions;
using Firecrawl.Models;
using Xunit;

namespace Firecrawl.Tests;

public class FirecrawlClientTests
{
    [Fact]
    public void Constructor_RequiresApiKey()
    {
        // Clear env variable in case it's set
        Environment.SetEnvironmentVariable("FIRECRAWL_API_KEY", null);

        var ex = Assert.Throws<FirecrawlException>(() => new FirecrawlClient(apiKey: ""));
        Assert.Contains("API key is required", ex.Message);
    }

    [Fact]
    public void Constructor_RequiresApiKey_WhenNull()
    {
        Environment.SetEnvironmentVariable("FIRECRAWL_API_KEY", null);

        var ex = Assert.Throws<FirecrawlException>(() => new FirecrawlClient(apiKey: null));
        Assert.Contains("API key is required", ex.Message);
    }

    [Fact]
    public void Constructor_AcceptsApiKey()
    {
        var client = new FirecrawlClient(apiKey: "fc-test-key");
        Assert.NotNull(client);
    }

    [Fact]
    public void Constructor_AcceptsCustomHttpClient()
    {
        var httpClient = new HttpClient { Timeout = TimeSpan.FromSeconds(10) };

        var client = new FirecrawlClient(
            apiKey: "fc-test-key",
            httpClient: httpClient);
        Assert.NotNull(client);
    }

    [Fact]
    public void Constructor_AcceptsCustomApiUrl()
    {
        var client = new FirecrawlClient(
            apiKey: "fc-test-key",
            apiUrl: "https://custom-api.firecrawl.dev");
        Assert.NotNull(client);
    }

    [Fact]
    public void Constructor_ReadsFromEnvironmentVariable()
    {
        Environment.SetEnvironmentVariable("FIRECRAWL_API_KEY", "fc-env-key");
        try
        {
            var client = new FirecrawlClient();
            Assert.NotNull(client);
        }
        finally
        {
            Environment.SetEnvironmentVariable("FIRECRAWL_API_KEY", null);
        }
    }

    [Fact]
    public async Task ScrapeAsync_RequiresUrl()
    {
        var client = new FirecrawlClient(apiKey: "fc-test-key");

        await Assert.ThrowsAsync<ArgumentNullException>(
            () => client.ScrapeAsync(null!));
    }

    [Fact]
    public async Task StartCrawlAsync_RequiresUrl()
    {
        var client = new FirecrawlClient(apiKey: "fc-test-key");

        await Assert.ThrowsAsync<ArgumentNullException>(
            () => client.StartCrawlAsync(null!));
    }

    [Fact]
    public async Task MapAsync_RequiresUrl()
    {
        var client = new FirecrawlClient(apiKey: "fc-test-key");

        await Assert.ThrowsAsync<ArgumentNullException>(
            () => client.MapAsync(null!));
    }

    [Fact]
    public async Task SearchAsync_RequiresQuery()
    {
        var client = new FirecrawlClient(apiKey: "fc-test-key");

        await Assert.ThrowsAsync<ArgumentNullException>(
            () => client.SearchAsync(null!));
    }

    [Fact]
    public async Task StartBatchScrapeAsync_RequiresUrls()
    {
        var client = new FirecrawlClient(apiKey: "fc-test-key");

        await Assert.ThrowsAsync<ArgumentNullException>(
            () => client.StartBatchScrapeAsync(null!));
    }

    [Fact]
    public async Task CancelCrawlAsync_RequiresJobId()
    {
        var client = new FirecrawlClient(apiKey: "fc-test-key");

        await Assert.ThrowsAsync<ArgumentNullException>(
            () => client.CancelCrawlAsync(null!));
    }

    [Fact]
    public async Task GetCrawlStatusAsync_RequiresJobId()
    {
        var client = new FirecrawlClient(apiKey: "fc-test-key");

        await Assert.ThrowsAsync<ArgumentNullException>(
            () => client.GetCrawlStatusAsync(null!));
    }
}
