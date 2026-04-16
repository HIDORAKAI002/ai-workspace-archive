using System.Text.Json.Serialization;

namespace Firecrawl.Models;

/// <summary>
/// URL discovery (map) results.
/// </summary>
public class MapData
{
    [JsonPropertyName("links")]
    public List<string>? Links { get; set; }
}
