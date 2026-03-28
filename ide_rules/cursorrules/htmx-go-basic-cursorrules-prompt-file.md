---
name: "htmx-go-basic-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for htmx-go-basic-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
// HTMX with Go (Basic Setup) .cursorrules

// HTMX and Go best practices

const htmxGoBestPractices = [
  "Use html/template for server-side rendering",
  "Implement http.HandlerFunc for handling HTMX requests",
  "Utilize gorilla/mux for routing if needed",
  "Use encoding/json for JSON responses",
  "Implement proper error handling and logging",
  "Utilize context for request cancellation and timeouts",
];

// Folder structure

const folderStructure = `
cmd/
  main.go
internal/
  handlers/
  models/
  templates/
static/
  css/
  js/
go.mod
go.sum
`;

// Additional instructions

const additionalInstructions = `
1. Use semantic HTML5 elements with HTMX attributes
2. Implement proper CSRF protection
3. Utilize HTMX extensions when needed
4. Use hx-boost for full page navigation
5. Follow Go's idiomatic error handling
6. Implement graceful shutdown for the server
7. Use Go modules for dependency management
`;


```