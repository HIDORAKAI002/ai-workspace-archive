#!/usr/bin/env python3
"""
Pattern Scanner for Python Security Vulnerabilities
Scans Python codebases for common security vulnerability patterns.
"""

import os
import re
import sys
import json
import argparse
from pathlib import Path
from dataclasses import dataclass, asdict
from typing import List, Dict, Optional, Set
from collections import defaultdict

# ANSI colors
RED = '\033[0;31m'
YELLOW = '\033[1;33m'
GREEN = '\033[0;32m'
BLUE = '\033[0;34m'
CYAN = '\033[0;36m'
NC = '\033[0m'


@dataclass
class Finding:
    """Represents a security finding."""
    file: str
    line_number: int
    line_content: str
    category: str
    pattern_name: str
    severity: str
    description: str
    cwe: str
    recommendation: str


# Vulnerability patterns organized by category
VULNERABILITY_PATTERNS = {
    "code_execution": [
        {
            "name": "eval() usage",
            "pattern": r"\beval\s*\(",
            "severity": "CRITICAL",
            "description": "eval() can execute arbitrary code",
            "cwe": "CWE-94",
            "recommendation": "Use ast.literal_eval() for safe evaluation of literals"
        },
        {
            "name": "exec() usage",
            "pattern": r"\bexec\s*\(",
            "severity": "CRITICAL",
            "description": "exec() can execute arbitrary code",
            "cwe": "CWE-94",
            "recommendation": "Avoid exec() with user input. Consider safer alternatives"
        },
        {
            "name": "compile() with user input",
            "pattern": r"\bcompile\s*\([^)]*['\"]eval['\"]",
            "severity": "HIGH",
            "description": "compile() with eval mode can lead to code execution",
            "cwe": "CWE-94",
            "recommendation": "Avoid compiling user-provided code"
        },
    ],

    "deserialization": [
        {
            "name": "pickle.loads()",
            "pattern": r"pickle\.loads?\s*\(",
            "severity": "CRITICAL",
            "description": "pickle can execute arbitrary code during deserialization",
            "cwe": "CWE-502",
            "recommendation": "Use JSON for untrusted data. Never unpickle untrusted data"
        },
        {
            "name": "cPickle usage",
            "pattern": r"cPickle\.loads?\s*\(",
            "severity": "CRITICAL",
            "description": "cPickle has same vulnerabilities as pickle",
            "cwe": "CWE-502",
            "recommendation": "Use JSON for untrusted data"
        },
        {
            "name": "yaml.load() unsafe",
            "pattern": r"yaml\.load\s*\([^)]*\)(?!\s*,\s*Loader\s*=\s*yaml\.SafeLoader)",
            "severity": "CRITICAL",
            "description": "yaml.load() can execute arbitrary code",
            "cwe": "CWE-502",
            "recommendation": "Use yaml.safe_load() instead"
        },
        {
            "name": "marshal.loads()",
            "pattern": r"marshal\.loads?\s*\(",
            "severity": "HIGH",
            "description": "marshal can deserialize code objects",
            "cwe": "CWE-502",
            "recommendation": "Never unmarshal untrusted data"
        },
        {
            "name": "shelve with untrusted data",
            "pattern": r"shelve\.open\s*\(",
            "severity": "HIGH",
            "description": "shelve uses pickle internally",
            "cwe": "CWE-502",
            "recommendation": "Use database with JSON for untrusted data"
        },
    ],

    "command_injection": [
        {
            "name": "os.system()",
            "pattern": r"os\.system\s*\(",
            "severity": "HIGH",
            "description": "os.system() is vulnerable to command injection",
            "cwe": "CWE-78",
            "recommendation": "Use subprocess.run() with shell=False"
        },
        {
            "name": "os.popen()",
            "pattern": r"os\.popen\s*\(",
            "severity": "HIGH",
            "description": "os.popen() is vulnerable to command injection",
            "cwe": "CWE-78",
            "recommendation": "Use subprocess.run() with shell=False"
        },
        {
            "name": "subprocess with shell=True",
            "pattern": r"subprocess\.(call|run|Popen|check_output|check_call)\s*\([^)]*shell\s*=\s*True",
            "severity": "HIGH",
            "description": "shell=True enables shell injection",
            "cwe": "CWE-78",
            "recommendation": "Use shell=False and pass arguments as list"
        },
        {
            "name": "subprocess with f-string",
            "pattern": r"subprocess\.(call|run|Popen|check_output|check_call)\s*\(\s*f['\"]",
            "severity": "HIGH",
            "description": "String formatting in subprocess can lead to injection",
            "cwe": "CWE-78",
            "recommendation": "Pass arguments as list instead of formatted string"
        },
    ],

    "sql_injection": [
        {
            "name": "SQL with f-string",
            "pattern": r"\.execute\s*\(\s*f['\"]",
            "severity": "CRITICAL",
            "description": "String formatting in SQL queries leads to injection",
            "cwe": "CWE-89",
            "recommendation": "Use parameterized queries"
        },
        {
            "name": "SQL with % formatting",
            "pattern": r"\.execute\s*\([^)]*%\s*\(",
            "severity": "CRITICAL",
            "description": "String formatting in SQL queries leads to injection",
            "cwe": "CWE-89",
            "recommendation": "Use parameterized queries"
        },
        {
            "name": "SQL with concatenation",
            "pattern": r"\.execute\s*\(\s*['\"][^'\"]*['\"]\s*\+",
            "severity": "CRITICAL",
            "description": "String concatenation in SQL leads to injection",
            "cwe": "CWE-89",
            "recommendation": "Use parameterized queries"
        },
        {
            "name": "Django raw() with formatting",
            "pattern": r"\.raw\s*\(\s*f['\"]",
            "severity": "CRITICAL",
            "description": "String formatting in Django raw() leads to SQL injection",
            "cwe": "CWE-89",
            "recommendation": "Use parameterized raw queries or ORM querysets"
        },
        {
            "name": "SQLAlchemy text() with formatting",
            "pattern": r"text\s*\(\s*f['\"]",
            "severity": "CRITICAL",
            "description": "String formatting in SQLAlchemy text() leads to injection",
            "cwe": "CWE-89",
            "recommendation": "Use bound parameters with text()"
        },
    ],

    "xss": [
        {
            "name": "mark_safe() with user input",
            "pattern": r"mark_safe\s*\(",
            "severity": "HIGH",
            "description": "mark_safe() disables Django's auto-escaping",
            "cwe": "CWE-79",
            "recommendation": "Sanitize input with bleach before marking safe"
        },
        {
            "name": "Markup() with user input",
            "pattern": r"Markup\s*\(",
            "severity": "HIGH",
            "description": "Markup() disables Jinja2's auto-escaping",
            "cwe": "CWE-79",
            "recommendation": "Sanitize input before marking as safe"
        },
        {
            "name": "|safe filter",
            "pattern": r"\|\s*safe\s*[%}]",
            "severity": "HIGH",
            "description": "|safe filter disables template escaping",
            "cwe": "CWE-79",
            "recommendation": "Remove |safe or sanitize input first"
        },
        {
            "name": "render_template_string()",
            "pattern": r"render_template_string\s*\(",
            "severity": "CRITICAL",
            "description": "render_template_string() can lead to SSTI",
            "cwe": "CWE-94",
            "recommendation": "Use render_template() with file-based templates"
        },
    ],

    "authentication": [
        {
            "name": "Weak password hashing (MD5)",
            "pattern": r"hashlib\.md5\s*\([^)]*password",
            "severity": "HIGH",
            "description": "MD5 is cryptographically broken for passwords",
            "cwe": "CWE-328",
            "recommendation": "Use bcrypt, argon2, or passlib"
        },
        {
            "name": "Weak password hashing (SHA1)",
            "pattern": r"hashlib\.sha1\s*\([^)]*password",
            "severity": "HIGH",
            "description": "SHA1 is not suitable for password hashing",
            "cwe": "CWE-328",
            "recommendation": "Use bcrypt, argon2, or passlib"
        },
        {
            "name": "Weak password hashing (SHA256 without salt)",
            "pattern": r"hashlib\.sha256\s*\([^)]*password[^)]*\)\.hexdigest",
            "severity": "MEDIUM",
            "description": "Password hashing without salt is vulnerable",
            "cwe": "CWE-916",
            "recommendation": "Use bcrypt or argon2 which handle salting automatically"
        },
        {
            "name": "JWT without verification",
            "pattern": r"jwt\.decode\s*\([^)]*verify\s*=\s*False",
            "severity": "CRITICAL",
            "description": "JWT decoded without signature verification",
            "cwe": "CWE-347",
            "recommendation": "Always verify JWT signatures"
        },
        {
            "name": "JWT verify_signature=False",
            "pattern": r"jwt\.decode\s*\([^)]*['\"]verify_signature['\"]\s*:\s*False",
            "severity": "CRITICAL",
            "description": "JWT signature verification disabled",
            "cwe": "CWE-347",
            "recommendation": "Enable signature verification"
        },
    ],

    "cryptography": [
        {
            "name": "Weak random (random module)",
            "pattern": r"random\.(randint|choice|random|sample|randrange)\s*\(",
            "severity": "MEDIUM",
            "description": "random module is not cryptographically secure",
            "cwe": "CWE-330",
            "recommendation": "Use secrets module for security-sensitive randomness"
        },
        {
            "name": "DES encryption",
            "pattern": r"(DES|Blowfish)\s*\(",
            "severity": "HIGH",
            "description": "DES/Blowfish are outdated encryption algorithms",
            "cwe": "CWE-327",
            "recommendation": "Use AES-256-GCM or ChaCha20-Poly1305"
        },
        {
            "name": "ECB mode",
            "pattern": r"MODE_ECB|AES\.MODE_ECB",
            "severity": "HIGH",
            "description": "ECB mode reveals patterns in encrypted data",
            "cwe": "CWE-327",
            "recommendation": "Use GCM or CBC with proper IV"
        },
    ],

    "path_traversal": [
        {
            "name": "Path concatenation",
            "pattern": r"open\s*\(\s*['\"][^'\"]*['\"]\s*\+",
            "severity": "HIGH",
            "description": "Path concatenation can lead to traversal",
            "cwe": "CWE-22",
            "recommendation": "Use os.path.join() and validate path is within allowed directory"
        },
        {
            "name": "f-string in file path",
            "pattern": r"open\s*\(\s*f['\"]",
            "severity": "MEDIUM",
            "description": "Dynamic file paths may be vulnerable to traversal",
            "cwe": "CWE-22",
            "recommendation": "Validate path is within allowed directory"
        },
        {
            "name": "send_file/send_from_directory",
            "pattern": r"send_(file|from_directory)\s*\(",
            "severity": "MEDIUM",
            "description": "File serving functions need path validation",
            "cwe": "CWE-22",
            "recommendation": "Use secure_filename() and validate paths"
        },
    ],

    "ssrf": [
        {
            "name": "requests with user URL",
            "pattern": r"requests\.(get|post|put|delete|patch|head)\s*\([^)]*request\.(args|form|json)",
            "severity": "HIGH",
            "description": "User-controlled URLs can lead to SSRF",
            "cwe": "CWE-918",
            "recommendation": "Validate URLs against allowlist, block internal IPs"
        },
        {
            "name": "urllib with user URL",
            "pattern": r"urllib\.request\.(urlopen|Request)\s*\(",
            "severity": "MEDIUM",
            "description": "URL requests need validation",
            "cwe": "CWE-918",
            "recommendation": "Validate URLs against allowlist"
        },
        {
            "name": "httpx/aiohttp with user URL",
            "pattern": r"(httpx|aiohttp)\.(get|post|AsyncClient)\s*\(",
            "severity": "MEDIUM",
            "description": "HTTP clients need URL validation",
            "cwe": "CWE-918",
            "recommendation": "Validate URLs against allowlist"
        },
    ],

    "xxe": [
        {
            "name": "XML parsing (ElementTree)",
            "pattern": r"xml\.etree\.ElementTree\.(parse|fromstring)\s*\(",
            "severity": "MEDIUM",
            "description": "ElementTree may be vulnerable to XXE",
            "cwe": "CWE-611",
            "recommendation": "Use defusedxml instead"
        },
        {
            "name": "lxml parsing",
            "pattern": r"lxml\.etree\.(parse|fromstring)\s*\(",
            "severity": "MEDIUM",
            "description": "lxml may be vulnerable to XXE",
            "cwe": "CWE-611",
            "recommendation": "Use defusedxml or disable external entities"
        },
        {
            "name": "xml.dom.minidom",
            "pattern": r"xml\.dom\.minidom\.parse\s*\(",
            "severity": "MEDIUM",
            "description": "minidom may be vulnerable to XXE",
            "cwe": "CWE-611",
            "recommendation": "Use defusedxml instead"
        },
    ],

    "framework_specific": [
        {
            "name": "Flask debug mode",
            "pattern": r"app\.run\s*\([^)]*debug\s*=\s*True",
            "severity": "CRITICAL",
            "description": "Debug mode exposes Werkzeug debugger",
            "cwe": "CWE-489",
            "recommendation": "Disable debug mode in production"
        },
        {
            "name": "Django DEBUG=True",
            "pattern": r"DEBUG\s*=\s*True",
            "severity": "HIGH",
            "description": "Django debug mode exposes sensitive info",
            "cwe": "CWE-489",
            "recommendation": "Set DEBUG=False in production"
        },
        {
            "name": "@csrf_exempt",
            "pattern": r"@csrf_exempt",
            "severity": "MEDIUM",
            "description": "CSRF protection disabled for this view",
            "cwe": "CWE-352",
            "recommendation": "Enable CSRF protection or use API tokens"
        },
        {
            "name": "CORS allow all origins",
            "pattern": r"allow_origins\s*=\s*\[\s*['\"]?\*['\"]?\s*\]",
            "severity": "MEDIUM",
            "description": "CORS allows all origins",
            "cwe": "CWE-942",
            "recommendation": "Specify allowed origins explicitly"
        },
    ],

    "miscellaneous": [
        {
            "name": "assert for security",
            "pattern": r"assert\s+.*\.(is_admin|is_authenticated|has_permission)",
            "severity": "MEDIUM",
            "description": "assert statements are removed with -O flag",
            "cwe": "CWE-617",
            "recommendation": "Use explicit if statements for security checks"
        },
        {
            "name": "Temporary file without secure creation",
            "pattern": r"open\s*\([^)]*['\"]\/tmp\/",
            "severity": "LOW",
            "description": "Insecure temporary file creation",
            "cwe": "CWE-377",
            "recommendation": "Use tempfile module for secure temp files"
        },
        {
            "name": "Hardcoded IP address",
            "pattern": r"['\"](\d{1,3}\.){3}\d{1,3}['\"]",
            "severity": "LOW",
            "description": "Hardcoded IP addresses reduce flexibility",
            "cwe": "CWE-798",
            "recommendation": "Use configuration or environment variables"
        },
    ],
}

# Files and directories to skip
SKIP_DIRS = {
    '.git', '.svn', '.hg', 'node_modules', '__pycache__', '.venv', 'venv',
    'env', '.tox', '.pytest_cache', '.mypy_cache', 'build', 'dist',
    'egg-info', '.eggs', 'site-packages', 'migrations'
}


def should_skip_path(path: Path) -> bool:
    """Check if path should be skipped."""
    for part in path.parts:
        if part in SKIP_DIRS:
            return True
    return False


def scan_line(line: str, line_number: int, file_path: str,
              categories: Optional[Set[str]] = None) -> List[Finding]:
    """Scan a single line for vulnerabilities."""
    findings = []

    # Skip comments (but still scan docstrings)
    stripped = line.strip()
    if stripped.startswith('#'):
        return findings

    for category, patterns in VULNERABILITY_PATTERNS.items():
        # Filter by category if specified
        if categories and category not in categories:
            continue

        for pattern_info in patterns:
            if re.search(pattern_info["pattern"], line):
                findings.append(Finding(
                    file=file_path,
                    line_number=line_number,
                    line_content=line.strip()[:100],
                    category=category,
                    pattern_name=pattern_info["name"],
                    severity=pattern_info["severity"],
                    description=pattern_info["description"],
                    cwe=pattern_info["cwe"],
                    recommendation=pattern_info["recommendation"]
                ))

    return findings


def scan_file(file_path: Path, categories: Optional[Set[str]] = None) -> List[Finding]:
    """Scan a file for vulnerabilities."""
    findings = []

    if not file_path.suffix in {'.py', '.pyw', '.pyx'}:
        return findings

    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            for line_number, line in enumerate(f, 1):
                findings.extend(scan_line(line, line_number, str(file_path), categories))
    except Exception as e:
        print(f"{YELLOW}Warning: Could not scan {file_path}: {e}{NC}", file=sys.stderr)

    return findings


def scan_directory(directory: Path, categories: Optional[Set[str]] = None,
                   verbose: bool = False) -> List[Finding]:
    """Scan a directory for vulnerabilities."""
    all_findings = []
    files_scanned = 0

    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not d.startswith('.')]

        for file in files:
            if not file.endswith(('.py', '.pyw', '.pyx')):
                continue

            file_path = Path(root) / file

            if should_skip_path(file_path):
                continue

            if verbose:
                print(f"Scanning: {file_path}")

            findings = scan_file(file_path, categories)
            all_findings.extend(findings)
            files_scanned += 1

    if verbose:
        print(f"\nScanned {files_scanned} Python files")

    return all_findings


def print_findings(findings: List[Finding], format: str = 'text') -> None:
    """Print findings in specified format."""
    if format == 'json':
        output = [asdict(f) for f in findings]
        print(json.dumps(output, indent=2))
        return

    if not findings:
        print(f"{GREEN}No vulnerabilities found!{NC}")
        return

    # Group by severity
    by_severity = defaultdict(list)
    for f in findings:
        by_severity[f.severity].append(f)

    severity_order = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO']
    severity_colors = {
        'CRITICAL': RED,
        'HIGH': RED,
        'MEDIUM': YELLOW,
        'LOW': GREEN,
        'INFO': BLUE
    }

    print(f"\n{BLUE}========================================{NC}")
    print(f"{BLUE}  Security Pattern Scan Results{NC}")
    print(f"{BLUE}========================================{NC}")
    print(f"\nFound {RED}{len(findings)}{NC} potential vulnerabilities\n")

    # Summary by category
    by_category = defaultdict(int)
    for f in findings:
        by_category[f.category] += 1

    print(f"{CYAN}By Category:{NC}")
    for cat, count in sorted(by_category.items(), key=lambda x: -x[1]):
        print(f"  {cat}: {count}")
    print()

    # Detailed findings
    for severity in severity_order:
        if severity not in by_severity:
            continue

        color = severity_colors.get(severity, NC)
        print(f"{color}[{severity}]{NC} ({len(by_severity[severity])} findings)")
        print("-" * 50)

        for finding in by_severity[severity]:
            print(f"  {finding.pattern_name}")
            print(f"  File: {finding.file}:{finding.line_number}")
            print(f"  Line: {finding.line_content}")
            print(f"  CWE: {finding.cwe}")
            print(f"  Fix: {finding.recommendation}")
            print()


def main():
    parser = argparse.ArgumentParser(
        description='Scan Python projects for security vulnerability patterns'
    )
    parser.add_argument(
        'path',
        nargs='?',
        default='.',
        help='Path to scan (default: current directory)'
    )
    parser.add_argument(
        '-c', '--category',
        action='append',
        choices=list(VULNERABILITY_PATTERNS.keys()),
        help='Scan only specific categories (can be repeated)'
    )
    parser.add_argument(
        '-f', '--format',
        choices=['text', 'json'],
        default='text',
        help='Output format (default: text)'
    )
    parser.add_argument(
        '-v', '--verbose',
        action='store_true',
        help='Verbose output'
    )
    parser.add_argument(
        '--list-categories',
        action='store_true',
        help='List available categories'
    )
    parser.add_argument(
        '--exit-code',
        action='store_true',
        help='Exit with non-zero code if vulnerabilities found'
    )

    args = parser.parse_args()

    if args.list_categories:
        print("Available categories:")
        for cat in VULNERABILITY_PATTERNS.keys():
            count = len(VULNERABILITY_PATTERNS[cat])
            print(f"  {cat} ({count} patterns)")
        return

    path = Path(args.path).resolve()
    categories = set(args.category) if args.category else None

    if not path.exists():
        print(f"{RED}Error: Path does not exist: {path}{NC}", file=sys.stderr)
        sys.exit(1)

    if path.is_file():
        findings = scan_file(path, categories)
    else:
        findings = scan_directory(path, categories, verbose=args.verbose)

    print_findings(findings, format=args.format)

    if args.exit_code and findings:
        critical_high = sum(1 for f in findings if f.severity in ['CRITICAL', 'HIGH'])
        sys.exit(min(critical_high, 125))


if __name__ == '__main__':
    main()
