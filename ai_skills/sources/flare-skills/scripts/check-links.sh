#!/usr/bin/env bash
# Check all external links in markdown files across all skills.
# Exits with code 1 if any link returns a non-2xx status.
set -e

REPO_ROOT="${REPO_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$REPO_ROOT"

FAILED=0
CHECKED=0
BROKEN=0
SKIPPED=0
TIMEOUT=10
BROKEN_LIST=""

# Ignore list: RPC endpoints, API endpoints, and sites that block automated requests.
# Add URLs or patterns (one per line) to skip during link checking.
IGNORE_LIST=(
  "https://fdc-verifiers-testnet.flare.network"
  "https://fdc-verifiers-testnet.flare.network/"
  "https://fdc-verifiers-mainnet.flare.network"
  "https://fdc-verifiers-mainnet.flare.network/"
  "https://{network}-explorer.flare.network/api"
  "https://coston2-explorer.flare.network/api"
  "https://dune.com/flare/flare-network-overview"
)

# Sites that block automated requests (matched as substring)
IGNORE_PATTERNS=(
  "npmjs.com"
  "github.com/anthropics"
)

is_ignored() {
  local url="$1"
  for ignored in "${IGNORE_LIST[@]}"; do
    [ "$url" = "$ignored" ] && return 0
  done
  for pattern in "${IGNORE_PATTERNS[@]}"; do
    case "$url" in *"$pattern"*) return 0 ;; esac
  done
  return 1
}

echo "Checking external links in skills..."
echo ""

# Collect all unique external URLs from markdown files
urls_file=$(mktemp)
trap 'rm -f "$urls_file"' EXIT

# Extract markdown links [text](url) and bare https:// URLs from all .md and .ts files
for file in $(find skills -type f \( -name "*.md" -o -name "*.ts" \)); do
  # Markdown links: [text](https://...)
  grep -oE '\[([^]]*)\]\((https?://[^)]+)\)' "$file" 2>/dev/null | \
    sed -E 's/\[([^]]*)\]\(([^)]+)\)/\2/' | while read -r url; do
      echo "$url $file"
    done >> "$urls_file"

  # Bare URLs in comments or text: https://...
  grep -oE 'https?://[^ )"<>]+' "$file" 2>/dev/null | while read -r url; do
    # Strip trailing backticks, punctuation, and markdown artifacts
    url=$(echo "$url" | sed 's/[.,;:)`]*$//')
    echo "$url $file"
  done >> "$urls_file"
done

# Deduplicate URLs (keep first file reference for reporting)
unique_urls=$(mktemp)
trap 'rm -f "$urls_file" "$unique_urls"' EXIT
sort -u -k1,1 "$urls_file" > "$unique_urls"

total=$(wc -l < "$unique_urls" | tr -d ' ')
echo "Found $total unique URLs to check"
echo ""
echo "── Checking links ──────────────────────────────────────"

while read -r url file; do
  [ -z "$url" ] && continue
  CHECKED=$((CHECKED + 1))

  # Skip URLs in the ignore list
  if is_ignored "$url"; then
    echo "  [SKIP] $url"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  status=$(curl -sS -o /dev/null -w '%{http_code}' \
    --max-time "$TIMEOUT" \
    --retry 1 \
    --retry-max-time "$TIMEOUT" \
    -A "Mozilla/5.0 (compatible; link-checker/1.0)" \
    -L "$url" 2>/dev/null || echo "000")

  if [ "$status" -ge 200 ] && [ "$status" -lt 400 ]; then
    echo "  [OK]   $status $url"
  else
    echo "  [FAIL] $status $url (in $file)"
    BROKEN_LIST="${BROKEN_LIST}    $status $url (in $file)\n"
    BROKEN=$((BROKEN + 1))
    FAILED=1
  fi
done < "$unique_urls"

echo ""
echo "── Summary ─────────────────────────────────────────────"
echo "  Checked: $CHECKED"
echo "  Skipped: $SKIPPED"
echo "  Broken:  $BROKEN"

if [ $FAILED -eq 1 ]; then
  echo ""
  echo "── Broken links ────────────────────────────────────────"
  printf "$BROKEN_LIST"
  echo ""
  echo "Link check failed — $BROKEN broken link(s) found."
  exit 1
fi

echo ""
echo "All links are valid."
