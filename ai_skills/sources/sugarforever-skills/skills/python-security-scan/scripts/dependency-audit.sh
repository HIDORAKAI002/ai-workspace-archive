#!/bin/bash
#
# Dependency Audit Script for Python Projects
# Checks for known vulnerabilities in pip/pipenv/poetry dependencies
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
echo -e "${BLUE}  Python Dependency Security Audit${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

cd "$PROJECT_DIR"

# Detect package manager and dependency files
PKG_MANAGER=""
if [ -f "Pipfile.lock" ]; then
    PKG_MANAGER="pipenv"
elif [ -f "poetry.lock" ]; then
    PKG_MANAGER="poetry"
elif [ -f "requirements.txt" ]; then
    PKG_MANAGER="pip"
elif [ -f "pyproject.toml" ]; then
    # Check if it's poetry or pip with pyproject.toml
    if grep -q "\[tool.poetry\]" pyproject.toml 2>/dev/null; then
        PKG_MANAGER="poetry"
    else
        PKG_MANAGER="pip"
    fi
else
    echo -e "${RED}Error: No dependency file found (requirements.txt, Pipfile, pyproject.toml)${NC}"
    exit 1
fi

echo -e "Detected package manager: ${GREEN}$PKG_MANAGER${NC}"
echo ""

# Check Python version
echo -e "${BLUE}--- Python Version Check ---${NC}"
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version 2>&1)
    echo -e "Python version: ${GREEN}$PYTHON_VERSION${NC}"
elif command -v python &> /dev/null; then
    PYTHON_VERSION=$(python --version 2>&1)
    echo -e "Python version: ${GREEN}$PYTHON_VERSION${NC}"
fi
echo ""

# Check for common vulnerable packages
echo -e "${BLUE}--- Framework Version Check ---${NC}"

check_package_version() {
    local package=$1
    local file=$2

    if [ -f "$file" ]; then
        local version=$(grep -iE "^${package}[=<>~!]" "$file" 2>/dev/null | head -1 || echo "")
        if [ -n "$version" ]; then
            echo -e "${package}: ${GREEN}$version${NC}"
        fi
    fi
}

# Check requirements.txt
if [ -f "requirements.txt" ]; then
    check_package_version "django" "requirements.txt"
    check_package_version "flask" "requirements.txt"
    check_package_version "fastapi" "requirements.txt"
    check_package_version "requests" "requirements.txt"
    check_package_version "pyyaml" "requirements.txt"
    check_package_version "pillow" "requirements.txt"
    check_package_version "urllib3" "requirements.txt"
fi

echo ""

# Run security audit
echo -e "${BLUE}--- Running Security Audit ---${NC}"
echo ""

AUDIT_EXIT_CODE=0

# Try pip-audit first (recommended)
if command -v pip-audit &> /dev/null; then
    echo "Running: pip-audit"
    pip-audit --format=json > /tmp/pip-audit-results.json 2>/dev/null || AUDIT_EXIT_CODE=$?

    if [ -f /tmp/pip-audit-results.json ] && [ -s /tmp/pip-audit-results.json ]; then
        VULN_COUNT=$(jq 'length' /tmp/pip-audit-results.json 2>/dev/null || echo "0")

        echo ""
        echo -e "${BLUE}Vulnerability Summary:${NC}"
        if [ "$VULN_COUNT" != "0" ] && [ "$VULN_COUNT" != "null" ]; then
            echo -e "  Found: ${RED}$VULN_COUNT vulnerabilities${NC}"

            # Show details
            echo ""
            echo -e "${BLUE}Details:${NC}"
            jq -r '.[] | "  - \(.name) \(.version): \(.vulns[0].id) - \(.vulns[0].description // "No description")"' /tmp/pip-audit-results.json 2>/dev/null || true
        else
            echo -e "  ${GREEN}No known vulnerabilities found${NC}"
        fi
    fi

# Fallback to safety
elif command -v safety &> /dev/null; then
    echo "Running: safety check"

    case $PKG_MANAGER in
        pip)
            safety check -r requirements.txt --json > /tmp/safety-results.json 2>/dev/null || AUDIT_EXIT_CODE=$?
            ;;
        pipenv)
            safety check --json > /tmp/safety-results.json 2>/dev/null || AUDIT_EXIT_CODE=$?
            ;;
        poetry)
            poetry export -f requirements.txt --output /tmp/poetry-requirements.txt 2>/dev/null
            safety check -r /tmp/poetry-requirements.txt --json > /tmp/safety-results.json 2>/dev/null || AUDIT_EXIT_CODE=$?
            ;;
    esac

    if [ -f /tmp/safety-results.json ]; then
        echo ""
        echo "Audit complete. Review /tmp/safety-results.json for details."
    fi

else
    echo -e "${YELLOW}Warning: Neither pip-audit nor safety is installed.${NC}"
    echo "Install with: pip install pip-audit"
    echo "         or: pip install safety"
fi

echo ""

# Check for outdated packages
echo -e "${BLUE}--- Checking for Outdated Packages ---${NC}"
echo ""

case $PKG_MANAGER in
    pip)
        if command -v pip &> /dev/null; then
            pip list --outdated 2>/dev/null | head -20 || true
        fi
        ;;
    pipenv)
        if command -v pipenv &> /dev/null; then
            pipenv update --outdated 2>/dev/null | head -20 || true
        fi
        ;;
    poetry)
        if command -v poetry &> /dev/null; then
            poetry show --outdated 2>/dev/null | head -20 || true
        fi
        ;;
esac

echo ""

# Check for known vulnerable patterns in requirements
echo -e "${BLUE}--- Known Vulnerable Version Check ---${NC}"
echo ""

check_vulnerable_versions() {
    local req_file=$1

    if [ ! -f "$req_file" ]; then
        return
    fi

    # Known vulnerable version patterns
    local vulnerabilities_found=0

    # PyYAML < 5.4 (CVE-2020-14343)
    if grep -qiE "^pyyaml[=<>~!]*[0-4]\." "$req_file" 2>/dev/null; then
        echo -e "${RED}[CRITICAL] PyYAML < 5.4 detected - CVE-2020-14343 (arbitrary code execution)${NC}"
        vulnerabilities_found=1
    fi

    # Pillow < 9.0.0 (multiple CVEs)
    if grep -qiE "^pillow[=<>~!]*[0-8]\." "$req_file" 2>/dev/null; then
        echo -e "${RED}[HIGH] Pillow < 9.0.0 detected - multiple CVEs${NC}"
        vulnerabilities_found=1
    fi

    # urllib3 < 1.26.5 (CVE-2021-33503)
    if grep -qiE "^urllib3[=<>~!]*1\.(25|24|23|22|21|20|19|18)" "$req_file" 2>/dev/null; then
        echo -e "${YELLOW}[MEDIUM] urllib3 < 1.26.5 detected - CVE-2021-33503${NC}"
        vulnerabilities_found=1
    fi

    # requests < 2.20.0 (CVE-2018-18074)
    if grep -qiE "^requests[=<>~!]*2\.(19|18|17|16|15|14|13|12|11|10|[0-9])\." "$req_file" 2>/dev/null; then
        echo -e "${YELLOW}[MEDIUM] requests < 2.20.0 detected - CVE-2018-18074${NC}"
        vulnerabilities_found=1
    fi

    # Django < 3.2.4 (multiple CVEs)
    if grep -qiE "^django[=<>~!]*(1\.|2\.[0-1]|3\.[0-1]|3\.2\.[0-3])" "$req_file" 2>/dev/null; then
        echo -e "${RED}[HIGH] Django < 3.2.4 detected - multiple security vulnerabilities${NC}"
        vulnerabilities_found=1
    fi

    # Flask < 2.0.0 (security improvements)
    if grep -qiE "^flask[=<>~!]*(0\.|1\.)" "$req_file" 2>/dev/null; then
        echo -e "${YELLOW}[MEDIUM] Flask < 2.0.0 detected - consider upgrading for security improvements${NC}"
        vulnerabilities_found=1
    fi

    # Jinja2 < 2.11.3 (CVE-2020-28493)
    if grep -qiE "^jinja2[=<>~!]*2\.(10|[0-9])\." "$req_file" 2>/dev/null; then
        echo -e "${YELLOW}[MEDIUM] Jinja2 < 2.11.3 detected - CVE-2020-28493${NC}"
        vulnerabilities_found=1
    fi

    # cryptography < 3.3.2 (CVE-2020-36242)
    if grep -qiE "^cryptography[=<>~!]*(2\.|3\.[0-2]\.)" "$req_file" 2>/dev/null; then
        echo -e "${YELLOW}[MEDIUM] cryptography < 3.3.2 detected - CVE-2020-36242${NC}"
        vulnerabilities_found=1
    fi

    if [ $vulnerabilities_found -eq 0 ]; then
        echo -e "${GREEN}No known vulnerable version patterns detected${NC}"
    fi
}

case $PKG_MANAGER in
    pip)
        check_vulnerable_versions "requirements.txt"
        ;;
    pipenv)
        # Convert Pipfile to check
        if command -v pipenv &> /dev/null; then
            pipenv requirements > /tmp/pipenv-requirements.txt 2>/dev/null || true
            check_vulnerable_versions "/tmp/pipenv-requirements.txt"
        fi
        ;;
    poetry)
        if command -v poetry &> /dev/null; then
            poetry export -f requirements.txt --output /tmp/poetry-requirements.txt 2>/dev/null || true
            check_vulnerable_versions "/tmp/poetry-requirements.txt"
        fi
        ;;
esac

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Audit Complete${NC}"
echo -e "${BLUE}========================================${NC}"

# Recommendations
echo ""
echo -e "${BLUE}Recommendations:${NC}"
echo "1. Install pip-audit for comprehensive vulnerability scanning: pip install pip-audit"
echo "2. Run 'pip-audit --fix' to automatically update vulnerable packages"
echo "3. Consider using 'pip-compile' with hashes for reproducible builds"
echo "4. Set up automated dependency scanning in CI/CD"

# Exit with audit code if vulnerabilities found
exit $AUDIT_EXIT_CODE
