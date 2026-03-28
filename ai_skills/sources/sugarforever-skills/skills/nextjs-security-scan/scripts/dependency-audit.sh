#!/bin/bash
#
# Dependency Audit Script for Next.js Projects
# Checks for known vulnerabilities in npm/yarn dependencies
#

set -e

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PROJECT_DIR="${1:-.}"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Dependency Security Audit${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

cd "$PROJECT_DIR"

# Detect package manager
if [ -f "yarn.lock" ]; then
    PKG_MANAGER="yarn"
elif [ -f "pnpm-lock.yaml" ]; then
    PKG_MANAGER="pnpm"
elif [ -f "package-lock.json" ]; then
    PKG_MANAGER="npm"
else
    echo -e "${RED}Error: No lock file found. Run npm install, yarn, or pnpm install first.${NC}"
    exit 1
fi

echo -e "Detected package manager: ${GREEN}$PKG_MANAGER${NC}"
echo ""

# Check Next.js version
echo -e "${BLUE}--- Next.js Version Check ---${NC}"
if [ -f "package.json" ]; then
    NEXT_VERSION=$(grep -o '"next": *"[^"]*"' package.json | grep -o '[0-9][^"]*' || echo "not found")
    echo -e "Next.js version: ${GREEN}$NEXT_VERSION${NC}"

    # Check for known vulnerable versions
    if [[ "$NEXT_VERSION" == 14.* ]] || [[ "$NEXT_VERSION" == 15.* ]] || [[ "$NEXT_VERSION" == 16.* ]]; then
        echo -e "${YELLOW}Warning: Check if this version is patched for CVE-2025-29927 and CVE-2025-55182${NC}"
    fi
fi
echo ""

# Run audit based on package manager
echo -e "${BLUE}--- Running Security Audit ---${NC}"
echo ""

AUDIT_EXIT_CODE=0

case $PKG_MANAGER in
    npm)
        echo "Running: npm audit"
        npm audit --json > /tmp/npm-audit-results.json 2>/dev/null || AUDIT_EXIT_CODE=$?

        # Parse and display results
        if [ -f /tmp/npm-audit-results.json ]; then
            CRITICAL=$(jq '.metadata.vulnerabilities.critical // 0' /tmp/npm-audit-results.json 2>/dev/null || echo "0")
            HIGH=$(jq '.metadata.vulnerabilities.high // 0' /tmp/npm-audit-results.json 2>/dev/null || echo "0")
            MODERATE=$(jq '.metadata.vulnerabilities.moderate // 0' /tmp/npm-audit-results.json 2>/dev/null || echo "0")
            LOW=$(jq '.metadata.vulnerabilities.low // 0' /tmp/npm-audit-results.json 2>/dev/null || echo "0")

            echo ""
            echo -e "${BLUE}Vulnerability Summary:${NC}"
            echo -e "  Critical: ${RED}$CRITICAL${NC}"
            echo -e "  High:     ${RED}$HIGH${NC}"
            echo -e "  Moderate: ${YELLOW}$MODERATE${NC}"
            echo -e "  Low:      ${GREEN}$LOW${NC}"

            if [ "$CRITICAL" != "0" ] || [ "$HIGH" != "0" ]; then
                echo ""
                echo -e "${RED}Action Required: Fix critical and high vulnerabilities!${NC}"
                echo "Run: npm audit fix"
            fi
        fi
        ;;

    yarn)
        echo "Running: yarn audit"
        yarn audit --json > /tmp/yarn-audit-results.json 2>/dev/null || AUDIT_EXIT_CODE=$?

        if [ -f /tmp/yarn-audit-results.json ]; then
            echo ""
            echo "Audit complete. Review /tmp/yarn-audit-results.json for details."
        fi
        ;;

    pnpm)
        echo "Running: pnpm audit"
        pnpm audit --json > /tmp/pnpm-audit-results.json 2>/dev/null || AUDIT_EXIT_CODE=$?

        if [ -f /tmp/pnpm-audit-results.json ]; then
            echo ""
            echo "Audit complete. Review /tmp/pnpm-audit-results.json for details."
        fi
        ;;
esac

echo ""

# Check for outdated packages
echo -e "${BLUE}--- Checking for Outdated Packages ---${NC}"
echo ""

case $PKG_MANAGER in
    npm)
        npm outdated 2>/dev/null || true
        ;;
    yarn)
        yarn outdated 2>/dev/null || true
        ;;
    pnpm)
        pnpm outdated 2>/dev/null || true
        ;;
esac

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Audit Complete${NC}"
echo -e "${BLUE}========================================${NC}"

# Exit with audit code if vulnerabilities found
exit $AUDIT_EXIT_CODE
