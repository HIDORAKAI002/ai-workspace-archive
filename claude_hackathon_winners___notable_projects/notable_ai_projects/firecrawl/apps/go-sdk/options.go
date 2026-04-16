package firecrawl

// ScrapeOptions configures a single-page scrape request.
type ScrapeOptions struct {
	Formats             []string                 `json:"formats,omitempty"`
	Headers             map[string]string        `json:"headers,omitempty"`
	IncludeTags         []string                 `json:"includeTags,omitempty"`
	ExcludeTags         []string                 `json:"excludeTags,omitempty"`
	OnlyMainContent     *bool                    `json:"onlyMainContent,omitempty"`
	Timeout             *int                     `json:"timeout,omitempty"`
	WaitFor             *int                     `json:"waitFor,omitempty"`
	Mobile              *bool                    `json:"mobile,omitempty"`
	Parsers             []interface{}            `json:"parsers,omitempty"`
	Actions             []map[string]interface{} `json:"actions,omitempty"`
	Location            *LocationConfig          `json:"location,omitempty"`
	SkipTLSVerification *bool                    `json:"skipTlsVerification,omitempty"`
	RemoveBase64Images  *bool                    `json:"removeBase64Images,omitempty"`
	BlockAds            *bool                    `json:"blockAds,omitempty"`
	Proxy               *string                  `json:"proxy,omitempty"`
	MaxAge              *int64                   `json:"maxAge,omitempty"`
	StoreInCache        *bool                    `json:"storeInCache,omitempty"`
	Integration         *string                  `json:"integration,omitempty"`
	JsonOptions         *JsonOptions             `json:"jsonOptions,omitempty"`
}

// CrawlOptions configures a crawl request.
type CrawlOptions struct {
	Prompt                 *string        `json:"prompt,omitempty"`
	ExcludePaths           []string       `json:"excludePaths,omitempty"`
	IncludePaths           []string       `json:"includePaths,omitempty"`
	MaxDiscoveryDepth      *int           `json:"maxDiscoveryDepth,omitempty"`
	Sitemap                *string        `json:"sitemap,omitempty"`
	IgnoreQueryParameters  *bool          `json:"ignoreQueryParameters,omitempty"`
	DeduplicateSimilarURLs *bool          `json:"deduplicateSimilarURLs,omitempty"`
	Limit                  *int           `json:"limit,omitempty"`
	CrawlEntireDomain     *bool          `json:"crawlEntireDomain,omitempty"`
	AllowExternalLinks     *bool          `json:"allowExternalLinks,omitempty"`
	AllowSubdomains        *bool          `json:"allowSubdomains,omitempty"`
	Delay                  *int           `json:"delay,omitempty"`
	MaxConcurrency         *int           `json:"maxConcurrency,omitempty"`
	Webhook                interface{}    `json:"webhook,omitempty"`
	ScrapeOptions          *ScrapeOptions `json:"scrapeOptions,omitempty"`
	RegexOnFullURL         *bool          `json:"regexOnFullURL,omitempty"`
	ZeroDataRetention      *bool          `json:"zeroDataRetention,omitempty"`
	Integration            *string        `json:"integration,omitempty"`
}

// BatchScrapeOptions configures a batch scrape request.
type BatchScrapeOptions struct {
	ScrapeOptions     *ScrapeOptions `json:"options,omitempty"`
	Webhook           interface{}    `json:"webhook,omitempty"`
	AppendToID        *string        `json:"appendToId,omitempty"`
	IgnoreInvalidURLs *bool          `json:"ignoreInvalidURLs,omitempty"`
	MaxConcurrency    *int           `json:"maxConcurrency,omitempty"`
	ZeroDataRetention *bool          `json:"zeroDataRetention,omitempty"`
	IdempotencyKey    *string        `json:"-"` // Sent as HTTP header, not in body
	Integration       *string        `json:"integration,omitempty"`
}

// MapOptions configures a map (URL discovery) request.
type MapOptions struct {
	Search                *string         `json:"search,omitempty"`
	Sitemap               *string         `json:"sitemap,omitempty"`
	IncludeSubdomains     *bool           `json:"includeSubdomains,omitempty"`
	IgnoreQueryParameters *bool           `json:"ignoreQueryParameters,omitempty"`
	Limit                 *int            `json:"limit,omitempty"`
	Timeout               *int            `json:"timeout,omitempty"`
	Integration           *string         `json:"integration,omitempty"`
	Location              *LocationConfig `json:"location,omitempty"`
}

// SearchOptions configures a search request.
type SearchOptions struct {
	Sources           []interface{}  `json:"sources,omitempty"`
	Categories        []interface{}  `json:"categories,omitempty"`
	Limit             *int           `json:"limit,omitempty"`
	TBS               *string        `json:"tbs,omitempty"`
	Location          *string        `json:"location,omitempty"`
	IgnoreInvalidURLs *bool          `json:"ignoreInvalidURLs,omitempty"`
	Timeout           *int           `json:"timeout,omitempty"`
	ScrapeOptions     *ScrapeOptions `json:"scrapeOptions,omitempty"`
	Integration       *string        `json:"integration,omitempty"`
}

// AgentOptions configures an agent request.
type AgentOptions struct {
	URLs                   []string               `json:"urls,omitempty"`
	Prompt                 string                 `json:"prompt"`
	Schema                 map[string]interface{} `json:"schema,omitempty"`
	Integration            *string                `json:"integration,omitempty"`
	MaxCredits             *int                   `json:"maxCredits,omitempty"`
	StrictConstrainToURLs  *bool                  `json:"strictConstrainToURLs,omitempty"`
	Model                  *string                `json:"model,omitempty"`
	Webhook                *WebhookConfig         `json:"webhook,omitempty"`
}

// LocationConfig specifies geolocation for requests.
type LocationConfig struct {
	Country   string   `json:"country,omitempty"`
	Languages []string `json:"languages,omitempty"`
}

// WebhookConfig configures webhook notifications.
type WebhookConfig struct {
	URL      string            `json:"url"`
	Headers  map[string]string `json:"headers,omitempty"`
	Metadata map[string]string `json:"metadata,omitempty"`
	Events   []string          `json:"events,omitempty"`
}

// JsonOptions configures JSON extraction within formats.
type JsonOptions struct {
	Prompt string                 `json:"prompt,omitempty"`
	Schema map[string]interface{} `json:"schema,omitempty"`
}

// Pointer helpers for optional fields.

// Bool returns a pointer to the given bool value.
func Bool(v bool) *bool { return &v }

// Int returns a pointer to the given int value.
func Int(v int) *int { return &v }

// Int64 returns a pointer to the given int64 value.
func Int64(v int64) *int64 { return &v }

// String returns a pointer to the given string value.
func String(v string) *string { return &v }

// Float64 returns a pointer to the given float64 value.
func Float64(v float64) *float64 { return &v }
