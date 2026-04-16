package firecrawl

import "encoding/json"

// Document represents a scraped web page.
type Document struct {
	Markdown       string                   `json:"markdown,omitempty"`
	HTML           string                   `json:"html,omitempty"`
	RawHTML        string                   `json:"rawHtml,omitempty"`
	JSON           interface{}              `json:"json,omitempty"`
	Summary        string                   `json:"summary,omitempty"`
	Metadata       map[string]interface{}   `json:"metadata,omitempty"`
	Links          []string                 `json:"links,omitempty"`
	Images         []string                 `json:"images,omitempty"`
	Screenshot     string                   `json:"screenshot,omitempty"`
	Audio          string                   `json:"audio,omitempty"`
	Attributes     []map[string]interface{} `json:"attributes,omitempty"`
	Actions        map[string]interface{}   `json:"actions,omitempty"`
	Warning        string                   `json:"warning,omitempty"`
	ChangeTracking map[string]interface{}   `json:"changeTracking,omitempty"`
	Branding       map[string]interface{}   `json:"branding,omitempty"`
}

// CrawlResponse is returned when starting an async crawl.
type CrawlResponse struct {
	ID  string `json:"id"`
	URL string `json:"url,omitempty"`
}

// CrawlJob represents the status and results of a crawl job.
type CrawlJob struct {
	ID          string     `json:"id,omitempty"`
	Status      string     `json:"status"`
	Total       int        `json:"total"`
	Completed   int        `json:"completed"`
	CreditsUsed *int       `json:"creditsUsed,omitempty"`
	ExpiresAt   string     `json:"expiresAt,omitempty"`
	Next        string     `json:"next,omitempty"`
	Data        []Document `json:"data,omitempty"`
}

// IsDone returns true if the crawl job has finished (completed, failed, or cancelled).
func (c *CrawlJob) IsDone() bool {
	return c.Status == "completed" || c.Status == "failed" || c.Status == "cancelled"
}

// BatchScrapeResponse is returned when starting an async batch scrape.
type BatchScrapeResponse struct {
	ID          string   `json:"id"`
	URL         string   `json:"url,omitempty"`
	InvalidURLs []string `json:"invalidURLs,omitempty"`
}

// BatchScrapeJob represents the status and results of a batch scrape job.
type BatchScrapeJob struct {
	ID          string     `json:"id,omitempty"`
	Status      string     `json:"status"`
	Total       int        `json:"total"`
	Completed   int        `json:"completed"`
	CreditsUsed *int       `json:"creditsUsed,omitempty"`
	ExpiresAt   string     `json:"expiresAt,omitempty"`
	Next        string     `json:"next,omitempty"`
	Data        []Document `json:"data,omitempty"`
}

// IsDone returns true if the batch scrape job has finished.
func (b *BatchScrapeJob) IsDone() bool {
	return b.Status == "completed" || b.Status == "failed" || b.Status == "cancelled"
}

// LinkResult represents a discovered URL from a map request.
// The API may return links as plain strings or as objects with url/title/description.
type LinkResult struct {
	URL         string `json:"url,omitempty"`
	Title       string `json:"title,omitempty"`
	Description string `json:"description,omitempty"`
}

// UnmarshalJSON handles both string and object link elements from the API.
func (l *LinkResult) UnmarshalJSON(data []byte) error {
	// Try as a plain string first.
	var s string
	if err := json.Unmarshal(data, &s); err == nil {
		l.URL = s
		return nil
	}

	// Otherwise unmarshal as an object.
	type linkAlias LinkResult
	var alias linkAlias
	if err := json.Unmarshal(data, &alias); err != nil {
		return err
	}
	*l = LinkResult(alias)
	return nil
}

// MapData represents the result of a map (URL discovery) request.
type MapData struct {
	Links []LinkResult `json:"links,omitempty"`
}

// SearchData represents the result of a search request.
type SearchData struct {
	Web    []map[string]interface{} `json:"web,omitempty"`
	News   []map[string]interface{} `json:"news,omitempty"`
	Images []map[string]interface{} `json:"images,omitempty"`
}

// AgentResponse is returned when starting an async agent task.
type AgentResponse struct {
	Success bool   `json:"success"`
	ID      string `json:"id,omitempty"`
	Error   string `json:"error,omitempty"`
}

// AgentStatusResponse represents the status and results of an agent task.
type AgentStatusResponse struct {
	Success     bool        `json:"success"`
	Status      string      `json:"status"`
	Error       string      `json:"error,omitempty"`
	Data        interface{} `json:"data,omitempty"`
	Model       string      `json:"model,omitempty"`
	ExpiresAt   string      `json:"expiresAt,omitempty"`
	CreditsUsed *int        `json:"creditsUsed,omitempty"`
}

// IsDone returns true if the agent task has finished.
func (a *AgentStatusResponse) IsDone() bool {
	return a.Status == "completed" || a.Status == "failed" || a.Status == "cancelled"
}

// BrowserCreateResponse is returned when creating a browser session.
type BrowserCreateResponse struct {
	Success     bool   `json:"success"`
	ID          string `json:"id,omitempty"`
	CDPUrl      string `json:"cdpUrl,omitempty"`
	LiveViewURL string `json:"liveViewUrl,omitempty"`
	ExpiresAt   string `json:"expiresAt,omitempty"`
	Error       string `json:"error,omitempty"`
}

// BrowserExecuteResponse is returned when executing code in a browser session.
type BrowserExecuteResponse struct {
	Success  bool    `json:"success"`
	Stdout   string  `json:"stdout,omitempty"`
	Result   string  `json:"result,omitempty"`
	Stderr   string  `json:"stderr,omitempty"`
	ExitCode *int    `json:"exitCode,omitempty"`
	Killed   *bool   `json:"killed,omitempty"`
	Error    string  `json:"error,omitempty"`
}

// BrowserDeleteResponse is returned when deleting a browser session.
type BrowserDeleteResponse struct {
	Success           bool   `json:"success"`
	SessionDurationMs *int64 `json:"sessionDurationMs,omitempty"`
	CreditsBilled     *int   `json:"creditsBilled,omitempty"`
	Error             string `json:"error,omitempty"`
}

// BrowserListResponse is returned when listing browser sessions.
type BrowserListResponse struct {
	Success  bool             `json:"success"`
	Sessions []BrowserSession `json:"sessions,omitempty"`
	Error    string           `json:"error,omitempty"`
}

// BrowserSession represents a browser session.
type BrowserSession struct {
	ID            string `json:"id"`
	Status        string `json:"status"`
	CDPUrl        string `json:"cdpUrl,omitempty"`
	LiveViewURL   string `json:"liveViewUrl,omitempty"`
	StreamWebView bool   `json:"streamWebView,omitempty"`
	CreatedAt     string `json:"createdAt,omitempty"`
	LastActivity  string `json:"lastActivity,omitempty"`
}

// ConcurrencyCheck represents concurrency usage information.
type ConcurrencyCheck struct {
	Concurrency    int `json:"concurrency"`
	MaxConcurrency int `json:"maxConcurrency"`
}

// CreditUsage represents credit usage information.
type CreditUsage struct {
	RemainingCredits   int    `json:"remainingCredits"`
	PlanCredits        int    `json:"planCredits"`
	BillingPeriodStart string `json:"billingPeriodStart,omitempty"`
	BillingPeriodEnd   string `json:"billingPeriodEnd,omitempty"`
}
