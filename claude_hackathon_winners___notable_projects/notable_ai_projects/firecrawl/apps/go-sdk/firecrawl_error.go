package firecrawl

import "fmt"

// FirecrawlError represents an error returned by the Firecrawl API.
type FirecrawlError struct {
	// StatusCode is the HTTP status code (0 if not an HTTP error).
	StatusCode int
	// ErrorCode is the API error code, if any.
	ErrorCode string
	// Message is the human-readable error message.
	Message string
}

func (e *FirecrawlError) Error() string {
	if e.ErrorCode != "" {
		return fmt.Sprintf("firecrawl: HTTP %d [%s]: %s", e.StatusCode, e.ErrorCode, e.Message)
	}
	if e.StatusCode != 0 {
		return fmt.Sprintf("firecrawl: HTTP %d: %s", e.StatusCode, e.Message)
	}
	return fmt.Sprintf("firecrawl: %s", e.Message)
}

// AuthenticationError is returned when the API key is invalid (HTTP 401).
type AuthenticationError struct {
	FirecrawlError
}

// RateLimitError is returned when the rate limit is exceeded (HTTP 429).
type RateLimitError struct {
	FirecrawlError
}

// JobTimeoutError is returned when an async job exceeds its timeout.
type JobTimeoutError struct {
	FirecrawlError
	// JobID is the ID of the timed-out job.
	JobID string
	// TimeoutSeconds is the timeout that was exceeded.
	TimeoutSeconds int
}

func (e *JobTimeoutError) Error() string {
	return fmt.Sprintf("firecrawl: job %s timed out after %d seconds", e.JobID, e.TimeoutSeconds)
}
