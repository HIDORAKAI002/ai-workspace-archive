package firecrawl

import (
	"context"
	"io"
	"mime"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/firecrawl/firecrawl/apps/go-sdk/option"
)

func TestParseSendsMultipartRequest(t *testing.T) {
	var (
		gotOptions  string
		gotFilename string
		gotFileBody string
		gotFileType string
	)

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost || r.URL.Path != "/v2/parse" {
			t.Fatalf("unexpected request: %s %s", r.Method, r.URL.Path)
		}

		mediaType, params, err := mime.ParseMediaType(r.Header.Get("Content-Type"))
		if err != nil {
			t.Fatalf("parse content-type: %v", err)
		}
		if mediaType != "multipart/form-data" {
			t.Fatalf("expected multipart/form-data, got %q", mediaType)
		}

		mr := multipart.NewReader(r.Body, params["boundary"])
		for {
			part, err := mr.NextPart()
			if err == io.EOF {
				break
			}
			if err != nil {
				t.Fatalf("read part: %v", err)
			}
			data, _ := io.ReadAll(part)
			switch part.FormName() {
			case "options":
				gotOptions = string(data)
			case "file":
				gotFilename = part.FileName()
				gotFileBody = string(data)
				gotFileType = part.Header.Get("Content-Type")
			}
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"success":true,"data":{"markdown":"# Hello"}}`))
	}))
	defer server.Close()

	client, err := NewClient(
		option.WithAPIKey("fc-test"),
		option.WithAPIURL(server.URL),
	)
	if err != nil {
		t.Fatalf("NewClient: %v", err)
	}

	file := NewParseFileFromBytes("upload.html", []byte("<html>hi</html>"))
	file.ContentType = "text/html"

	doc, err := client.Parse(context.Background(), file, &ParseOptions{
		Formats:         []string{"markdown"},
		OnlyMainContent: Bool(true),
	})
	if err != nil {
		t.Fatalf("Parse: %v", err)
	}

	if doc.Markdown != "# Hello" {
		t.Errorf("markdown = %q, want %q", doc.Markdown, "# Hello")
	}
	if !strings.Contains(gotOptions, `"formats":["markdown"]`) {
		t.Errorf("options missing formats: %q", gotOptions)
	}
	if !strings.Contains(gotOptions, `"onlyMainContent":true`) {
		t.Errorf("options missing onlyMainContent: %q", gotOptions)
	}
	if gotFilename != "upload.html" {
		t.Errorf("filename = %q, want upload.html", gotFilename)
	}
	if gotFileBody != "<html>hi</html>" {
		t.Errorf("file body = %q", gotFileBody)
	}
	if gotFileType != "text/html" {
		t.Errorf("file content-type = %q, want text/html", gotFileType)
	}
}

func TestParseRejectsEmptyFilename(t *testing.T) {
	client, err := NewClient(
		option.WithAPIKey("fc-test"),
		option.WithAPIURL("http://localhost:0"),
	)
	if err != nil {
		t.Fatalf("NewClient: %v", err)
	}

	_, err = client.Parse(context.Background(), &ParseFile{Filename: "  ", Content: []byte("x")}, nil)
	if err == nil {
		t.Fatalf("expected error for empty filename")
	}
}

func TestParseRejectsEmptyContent(t *testing.T) {
	client, err := NewClient(
		option.WithAPIKey("fc-test"),
		option.WithAPIURL("http://localhost:0"),
	)
	if err != nil {
		t.Fatalf("NewClient: %v", err)
	}

	_, err = client.Parse(context.Background(), &ParseFile{Filename: "doc.pdf"}, nil)
	if err == nil {
		t.Fatalf("expected error for empty content")
	}
}
