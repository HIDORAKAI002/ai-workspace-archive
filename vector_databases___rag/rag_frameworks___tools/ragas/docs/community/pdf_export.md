# PDF Export

## Purpose
The PDF export feature builds the complete Ragas documentation as a single PDF file using MkDocs with the `mkdocs-to-pdf` plugin.

## Usage

The implementation uses two separate MkDocs configurations:
- `mkdocs.yml` for standard HTML builds (no PDF dependencies required)
- `mkdocs-pdf.yml` which inherits from the main config and adds the PDF plugin

Build PDF documentation:
```bash
make build-docs-pdf
```

The generated PDF will be available at `site/pdf/document.pdf`.

Build HTML documentation only:
```bash
make build-docs
```

The `make build-docs-pdf` command automatically checks for system dependencies before building.

## Mermaid diagrams in PDF (offline)
Mermaid diagrams are rendered **offline** during the PDF build (converted to SVG before WeasyPrint runs). This requires a few additional dependencies besides WeasyPrint.

### Required tools
- Node.js (needed to run Mermaid tooling).
- Mermaid CLI (`mmdc`), installed via `@mermaid-js/mermaid-cli`. 
- A headless browser for Puppeteer (recommended: `chrome-headless-shell`).


## Current Limitations

**System Dependencies**: WeasyPrint requires OS-specific system libraries (Pango, Cairo) that must be installed separately. If you encounter issues, refer to the [WeasyPrint setup instructions](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html) and [troubleshooting guide](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html#troubleshooting).

**ReadTheDocs**: PDF generation is not currently enabled in the ReadTheDocs build configuration.