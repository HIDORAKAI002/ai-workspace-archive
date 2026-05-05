package firecrawl

import (
	"encoding/json"
	"strings"
	"testing"
)

func TestScrapeOptionsSerializesQueryFormatMode(t *testing.T) {
	payload, err := json.Marshal(ScrapeOptions{
		FormatOptions: []interface{}{
			QueryFormat{
				Prompt: "What is Firecrawl?",
				Mode:   QueryModeDirectQuote,
			},
		},
	})
	if err != nil {
		t.Fatalf("Marshal ScrapeOptions: %v", err)
	}

	jsonBody := string(payload)
	for _, want := range []string{
		`"formats":[{"type":"query","prompt":"What is Firecrawl?","mode":"directQuote"}]`,
	} {
		if !strings.Contains(jsonBody, want) {
			t.Fatalf("serialized query format = %s, want to contain %s", jsonBody, want)
		}
	}
}

func TestScrapeOptionsPreservesStringFormats(t *testing.T) {
	payload, err := json.Marshal(ScrapeOptions{
		Formats: []string{"markdown"},
	})
	if err != nil {
		t.Fatalf("Marshal ScrapeOptions: %v", err)
	}

	if !strings.Contains(string(payload), `"formats":["markdown"]`) {
		t.Fatalf("serialized string formats = %s", payload)
	}
}
