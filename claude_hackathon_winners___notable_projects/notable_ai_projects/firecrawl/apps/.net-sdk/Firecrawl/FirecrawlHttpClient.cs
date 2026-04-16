using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Firecrawl.Exceptions;

namespace Firecrawl;

/// <summary>
/// Internal HTTP client for making authenticated requests to the Firecrawl API.
/// Handles retry logic with exponential backoff.
/// </summary>
internal class FirecrawlHttpClient
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _baseUrl;
    private readonly int _maxRetries;
    private readonly double _backoffFactor;

    internal static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        PropertyNameCaseInsensitive = true
    };

    internal FirecrawlHttpClient(
        string apiKey,
        string baseUrl,
        TimeSpan timeout,
        int maxRetries,
        double backoffFactor,
        HttpClient? httpClient = null)
    {
        _apiKey = apiKey;
        _baseUrl = baseUrl.TrimEnd('/');
        _maxRetries = maxRetries;
        _backoffFactor = backoffFactor;

        if (httpClient != null)
        {
            _httpClient = httpClient;
        }
        else
        {
            _httpClient = new HttpClient { Timeout = timeout };
        }
    }

    internal async Task<T> PostAsync<T>(
        string path,
        object body,
        Dictionary<string, string>? extraHeaders = null,
        CancellationToken cancellationToken = default)
    {
        var url = _baseUrl + path;
        var json = JsonSerializer.Serialize(body, JsonOptions);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var request = new HttpRequestMessage(HttpMethod.Post, url) { Content = content };
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        if (extraHeaders != null)
        {
            foreach (var header in extraHeaders)
            {
                request.Headers.TryAddWithoutValidation(header.Key, header.Value);
            }
        }

        return await ExecuteWithRetryAsync<T>(request, cancellationToken);
    }

    internal async Task<T> GetAsync<T>(string path, CancellationToken cancellationToken = default)
    {
        var url = _baseUrl + path;
        var request = new HttpRequestMessage(HttpMethod.Get, url);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        return await ExecuteWithRetryAsync<T>(request, cancellationToken);
    }

    internal async Task<T> GetAbsoluteAsync<T>(string absoluteUrl, CancellationToken cancellationToken = default)
    {
        // Validate that the pagination URL belongs to the same host to prevent API key exfiltration
        var targetUri = new Uri(absoluteUrl);
        var baseUri = new Uri(_baseUrl);
        if (!string.Equals(targetUri.Scheme, baseUri.Scheme, StringComparison.OrdinalIgnoreCase) ||
            !string.Equals(targetUri.Host, baseUri.Host, StringComparison.OrdinalIgnoreCase) ||
            targetUri.Port != baseUri.Port)
        {
            throw new FirecrawlException(
                $"Pagination URL origin '{targetUri.Scheme}://{targetUri.Host}:{targetUri.Port}' does not match API base URL origin '{baseUri.Scheme}://{baseUri.Host}:{baseUri.Port}'. " +
                "Refusing to send credentials to a different origin.");
        }

        var request = new HttpRequestMessage(HttpMethod.Get, absoluteUrl);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        return await ExecuteWithRetryAsync<T>(request, cancellationToken);
    }

    internal async Task<T> DeleteAsync<T>(string path, CancellationToken cancellationToken = default)
    {
        var url = _baseUrl + path;
        var request = new HttpRequestMessage(HttpMethod.Delete, url);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        return await ExecuteWithRetryAsync<T>(request, cancellationToken);
    }

    private async Task<T> ExecuteWithRetryAsync<T>(
        HttpRequestMessage originalRequest,
        CancellationToken cancellationToken)
    {
        var attempt = 0;

        while (true)
        {
            // Clone the request for each attempt (HttpRequestMessage can only be sent once)
            using var request = await CloneRequestAsync(originalRequest);

            HttpResponseMessage? response = null;
            try
            {
                response = await _httpClient.SendAsync(request, cancellationToken);
                var bodyStr = await response.Content.ReadAsStringAsync(cancellationToken);

                if (response.IsSuccessStatusCode)
                {
                    return JsonSerializer.Deserialize<T>(bodyStr, JsonOptions)
                        ?? throw new FirecrawlException("Failed to deserialize response");
                }

                var code = (int)response.StatusCode;
                var errorMessage = ExtractErrorMessage(bodyStr, code);
                var errorCode = ExtractErrorCode(bodyStr);

                // Non-retryable client errors
                if (code == 401)
                    throw new AuthenticationException(errorMessage, errorCode);
                if (code == 429)
                    throw new RateLimitException(errorMessage, errorCode);
                if (code >= 400 && code < 500 && code != 408 && code != 409)
                    throw new FirecrawlException(errorMessage, code, errorCode, null);

                // Retryable errors: 408, 409, 502, 5xx
                if (attempt < _maxRetries)
                {
                    attempt++;
                    await SleepWithBackoffAsync(attempt, cancellationToken);
                    continue;
                }

                throw new FirecrawlException(errorMessage, code, errorCode, null);
            }
            catch (FirecrawlException)
            {
                throw;
            }
            catch (OperationCanceledException)
            {
                throw;
            }
            catch (HttpRequestException ex)
            {
                if (attempt < _maxRetries)
                {
                    attempt++;
                    await SleepWithBackoffAsync(attempt, cancellationToken);
                    continue;
                }

                throw new FirecrawlException($"Request failed: {ex.Message}", ex);
            }
            finally
            {
                response?.Dispose();
            }
        }
    }

    private static async Task<HttpRequestMessage> CloneRequestAsync(HttpRequestMessage original)
    {
        var clone = new HttpRequestMessage(original.Method, original.RequestUri);

        if (original.Content != null)
        {
            var content = await original.Content.ReadAsStringAsync();
            clone.Content = new StringContent(content, Encoding.UTF8, "application/json");
        }

        foreach (var header in original.Headers)
        {
            clone.Headers.TryAddWithoutValidation(header.Key, header.Value);
        }

        return clone;
    }

    private static string ExtractErrorMessage(string body, int statusCode)
    {
        try
        {
            using var doc = JsonDocument.Parse(body);
            var root = doc.RootElement;

            if (root.TryGetProperty("error", out var errorProp))
                return errorProp.GetString() ?? $"HTTP {statusCode} error";
            if (root.TryGetProperty("message", out var messageProp))
                return messageProp.GetString() ?? $"HTTP {statusCode} error";
        }
        catch
        {
            // ignored
        }

        return $"HTTP {statusCode} error";
    }

    private static string? ExtractErrorCode(string body)
    {
        try
        {
            using var doc = JsonDocument.Parse(body);
            if (doc.RootElement.TryGetProperty("code", out var codeProp))
                return codeProp.GetString();
        }
        catch
        {
            // ignored
        }

        return null;
    }

    private async Task SleepWithBackoffAsync(int attempt, CancellationToken cancellationToken)
    {
        var delayMs = (int)(_backoffFactor * 1000 * Math.Pow(2, attempt - 1));
        await Task.Delay(delayMs, cancellationToken);
    }
}
