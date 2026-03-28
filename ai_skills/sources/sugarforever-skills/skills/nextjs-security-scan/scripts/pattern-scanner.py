#!/usr/bin/env python3
"""
Security Pattern Scanner for Next.js/TypeScript Projects
Detects common vulnerability patterns based on OWASP guidelines.
"""

import os
import re
import sys
import json
from pathlib import Path
from dataclasses import dataclass, field
from typing import Optional

# ANSI colors
RED = '\033[0;31m'
YELLOW = '\033[1;33m'
GREEN = '\033[0;32m'
BLUE = '\033[0;34m'
CYAN = '\033[0;36m'
NC = '\033[0m'

@dataclass
class Finding:
    severity: str
    category: str
    subcategory: str
    file: str
    line: int
    code: str
    description: str
    recommendation: str

@dataclass
class ScanStats:
    files_scanned: int = 0
    findings_by_severity: dict = field(default_factory=lambda: {'CRITICAL': 0, 'HIGH': 0, 'MEDIUM': 0, 'LOW': 0, 'INFO': 0})

# Vulnerability patterns organized by category
VULNERABILITY_PATTERNS = {
    'XSS': [
        {
            'name': 'dangerouslySetInnerHTML',
            'pattern': r'dangerouslySetInnerHTML\s*=\s*\{',
            'severity': 'HIGH',
            'description': 'dangerouslySetInnerHTML can lead to XSS if used with unsanitized input',
            'recommendation': 'Use DOMPurify to sanitize HTML: dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}'
        },
        {
            'name': 'innerHTML assignment',
            'pattern': r'\.innerHTML\s*=',
            'severity': 'HIGH',
            'description': 'Direct innerHTML assignment can lead to XSS',
            'recommendation': 'Use textContent for plain text, or DOMPurify.sanitize() for HTML'
        },
        {
            'name': 'outerHTML assignment',
            'pattern': r'\.outerHTML\s*=',
            'severity': 'HIGH',
            'description': 'Direct outerHTML assignment can lead to XSS',
            'recommendation': 'Avoid outerHTML with user input; use safe DOM manipulation methods'
        },
        {
            'name': 'document.write',
            'pattern': r'document\.write(ln)?\s*\(',
            'severity': 'HIGH',
            'description': 'document.write can lead to XSS and is deprecated',
            'recommendation': 'Use safe DOM manipulation methods instead'
        },
        {
            'name': 'eval() usage',
            'pattern': r'\beval\s*\(',
            'severity': 'CRITICAL',
            'description': 'eval() executes arbitrary code and is extremely dangerous',
            'recommendation': 'Never use eval(); use JSON.parse() for JSON or safer alternatives'
        },
        {
            'name': 'new Function()',
            'pattern': r'new\s+Function\s*\(',
            'severity': 'CRITICAL',
            'description': 'new Function() is equivalent to eval() and executes arbitrary code',
            'recommendation': 'Avoid dynamic code execution; use safer alternatives'
        },
    ],

    'Injection': [
        {
            'name': 'SQL string concatenation',
            'pattern': r'(SELECT|INSERT|UPDATE|DELETE|DROP)\s+.*\$\{',
            'severity': 'CRITICAL',
            'description': 'SQL query with template literal - potential SQL injection',
            'recommendation': 'Use parameterized queries or ORM methods'
        },
        {
            'name': 'Raw SQL query',
            'pattern': r'\$queryRaw\s*`[^`]*\$\{',
            'severity': 'HIGH',
            'description': 'Prisma $queryRaw with interpolation - potential SQL injection',
            'recommendation': 'Use Prisma.sql template tag: $queryRaw(Prisma.sql`...`)'
        },
        {
            'name': 'exec with variable',
            'pattern': r'exec(Sync)?\s*\([^)]*\$\{',
            'severity': 'CRITICAL',
            'description': 'Command execution with interpolated variable - command injection risk',
            'recommendation': 'Use execFile() or spawn() with array arguments instead'
        },
        {
            'name': 'spawn with shell',
            'pattern': r'spawn\s*\([^)]*shell\s*:\s*true',
            'severity': 'HIGH',
            'description': 'spawn() with shell: true is vulnerable to command injection',
            'recommendation': 'Remove shell: true and pass arguments as array'
        },
    ],

    'Authentication': [
        {
            'name': 'Server Action without auth',
            'pattern': r'[\'"]use server[\'"]\s*\n\s*\n?\s*export\s+(async\s+)?function',
            'severity': 'MEDIUM',
            'description': 'Server Action may be missing authentication check',
            'recommendation': 'Add auth() or getSession() check at the start of Server Actions'
        },
        {
            'name': 'JWT decode without verify',
            'pattern': r'jwt\.decode\s*\(',
            'severity': 'HIGH',
            'description': 'jwt.decode() does not verify signature - use jwt.verify() instead',
            'recommendation': 'Always use jwt.verify() with proper secret/key verification'
        },
        {
            'name': 'Weak password check',
            'pattern': r'password\.length\s*[<>=]+\s*[1-7]\b',
            'severity': 'MEDIUM',
            'description': 'Password length requirement is too weak',
            'recommendation': 'Require minimum 12 characters and use zxcvbn for strength checking'
        },
    ],

    'NextJS': [
        {
            'name': 'NEXT_PUBLIC secret exposure',
            'pattern': r'NEXT_PUBLIC_[A-Z_]*(SECRET|KEY|PASSWORD|TOKEN|CREDENTIAL|DATABASE)',
            'severity': 'CRITICAL',
            'description': 'Sensitive variable exposed to client via NEXT_PUBLIC_ prefix',
            'recommendation': 'Remove NEXT_PUBLIC_ prefix; keep secrets server-side only'
        },
        {
            'name': 'Unrestricted image domains',
            'pattern': r'remotePatterns\s*:\s*\[\s*\{[^}]*hostname\s*:\s*[\'"]?\*\*?[\'"]?',
            'severity': 'MEDIUM',
            'description': 'Image optimization allows any remote domain',
            'recommendation': 'Restrict remotePatterns to specific trusted domains'
        },
        {
            'name': 'Missing allowed origins',
            'pattern': r'serverActions\s*:\s*\{(?![^}]*allowedOrigins)',
            'severity': 'LOW',
            'description': 'Server Actions may benefit from allowedOrigins configuration',
            'recommendation': 'Configure serverActions.allowedOrigins for CSRF protection'
        },
    ],

    'Cryptography': [
        {
            'name': 'MD5 hashing',
            'pattern': r'createHash\s*\(\s*[\'"]md5[\'"]\s*\)',
            'severity': 'HIGH',
            'description': 'MD5 is cryptographically broken - do not use for security',
            'recommendation': 'Use SHA-256 or bcrypt for passwords'
        },
        {
            'name': 'SHA1 hashing',
            'pattern': r'createHash\s*\(\s*[\'"]sha1[\'"]\s*\)',
            'severity': 'MEDIUM',
            'description': 'SHA1 is deprecated for security purposes',
            'recommendation': 'Use SHA-256 or stronger'
        },
        {
            'name': 'Hardcoded encryption key',
            'pattern': r'(encrypt|decrypt|createCipher)\s*\([^)]*[\'"][A-Za-z0-9]{16,}[\'"]',
            'severity': 'CRITICAL',
            'description': 'Hardcoded encryption key detected',
            'recommendation': 'Store encryption keys in environment variables'
        },
    ],

    'Redirect': [
        {
            'name': 'Open redirect',
            'pattern': r'redirect\s*\(\s*req\.(query|params|body)',
            'severity': 'MEDIUM',
            'description': 'Redirect with user-controlled input - potential open redirect',
            'recommendation': 'Validate redirect URLs against allowlist of trusted domains'
        },
        {
            'name': 'Location assignment',
            'pattern': r'(window\.)?location(\.href)?\s*=\s*[^;]*req\.',
            'severity': 'MEDIUM',
            'description': 'Location assignment with request data - potential open redirect',
            'recommendation': 'Validate URLs before redirecting'
        },
    ],

    'Logging': [
        {
            'name': 'Password in logs',
            'pattern': r'console\.(log|info|debug|warn|error)\s*\([^)]*password',
            'severity': 'HIGH',
            'description': 'Potential password logging detected',
            'recommendation': 'Never log sensitive data like passwords'
        },
        {
            'name': 'Token in logs',
            'pattern': r'console\.(log|info|debug|warn|error)\s*\([^)]*token',
            'severity': 'MEDIUM',
            'description': 'Potential token logging detected',
            'recommendation': 'Avoid logging authentication tokens'
        },
        {
            'name': 'Error stack exposure',
            'pattern': r'res\.(json|send)\s*\([^)]*error\.(stack|message)',
            'severity': 'MEDIUM',
            'description': 'Error details may be exposed to client',
            'recommendation': 'Return generic error messages; log details server-side'
        },
    ],
}

# Files and directories to skip
SKIP_DIRS = {
    'node_modules', '.git', '.next', 'dist', 'build',
    '.turbo', 'coverage', '__pycache__', '.cache'
}

# File extensions to scan
SCAN_EXTENSIONS = {'.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'}


def should_skip_file(filepath: Path) -> bool:
    """Check if file should be skipped."""
    for part in filepath.parts:
        if part in SKIP_DIRS:
            return True

    if filepath.suffix not in SCAN_EXTENSIONS:
        return True

    return False


def scan_file(filepath: Path) -> list[Finding]:
    """Scan a single file for vulnerability patterns."""
    findings = []

    try:
        content = filepath.read_text(encoding='utf-8', errors='ignore')
        lines = content.split('\n')

        for category, patterns in VULNERABILITY_PATTERNS.items():
            for pattern_info in patterns:
                for i, line in enumerate(lines, 1):
                    if re.search(pattern_info['pattern'], line, re.IGNORECASE):
                        # Get surrounding context
                        code_snippet = line.strip()
                        if len(code_snippet) > 100:
                            code_snippet = code_snippet[:100] + '...'

                        findings.append(Finding(
                            severity=pattern_info['severity'],
                            category=category,
                            subcategory=pattern_info['name'],
                            file=str(filepath),
                            line=i,
                            code=code_snippet,
                            description=pattern_info['description'],
                            recommendation=pattern_info['recommendation']
                        ))
    except Exception as e:
        print(f"{YELLOW}Warning: Could not read {filepath}: {e}{NC}", file=sys.stderr)

    return findings


def scan_directory(root_dir: str, categories: Optional[list] = None) -> tuple[list[Finding], ScanStats]:
    """Recursively scan directory for vulnerability patterns."""
    root_path = Path(root_dir)
    all_findings = []
    stats = ScanStats()

    for filepath in root_path.rglob('*'):
        if filepath.is_file() and not should_skip_file(filepath):
            stats.files_scanned += 1
            findings = scan_file(filepath)

            # Filter by category if specified
            if categories:
                findings = [f for f in findings if f.category.lower() in [c.lower() for c in categories]]

            for f in findings:
                stats.findings_by_severity[f.severity] += 1

            all_findings.extend(findings)

    return all_findings, stats


def print_findings(findings: list[Finding], stats: ScanStats, output_format: str = 'text'):
    """Print findings in specified format."""
    if output_format == 'json':
        output = {
            'stats': {
                'files_scanned': stats.files_scanned,
                'findings_by_severity': stats.findings_by_severity
            },
            'findings': [
                {
                    'severity': f.severity,
                    'category': f.category,
                    'subcategory': f.subcategory,
                    'file': f.file,
                    'line': f.line,
                    'code': f.code,
                    'description': f.description,
                    'recommendation': f.recommendation
                }
                for f in findings
            ]
        }
        print(json.dumps(output, indent=2))
        return

    # Text output
    print(f"\n{BLUE}========================================{NC}")
    print(f"{BLUE}  Security Pattern Scan Results{NC}")
    print(f"{BLUE}========================================{NC}\n")

    print(f"Files scanned: {stats.files_scanned}")
    print(f"Total findings: {len(findings)}")
    print(f"  {RED}Critical: {stats.findings_by_severity['CRITICAL']}{NC}")
    print(f"  {YELLOW}High: {stats.findings_by_severity['HIGH']}{NC}")
    print(f"  {CYAN}Medium: {stats.findings_by_severity['MEDIUM']}{NC}")
    print(f"  Low: {stats.findings_by_severity['LOW']}")
    print(f"  Info: {stats.findings_by_severity['INFO']}")
    print()

    if not findings:
        print(f"{GREEN}No security issues detected!{NC}")
        return

    # Sort by severity
    severity_order = {'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3, 'INFO': 4}
    sorted_findings = sorted(findings, key=lambda x: severity_order.get(x.severity, 5))

    current_category = None
    for finding in sorted_findings:
        if finding.category != current_category:
            current_category = finding.category
            print(f"\n{BLUE}--- {current_category} ---{NC}\n")

        if finding.severity == 'CRITICAL':
            color = RED
        elif finding.severity == 'HIGH':
            color = YELLOW
        elif finding.severity == 'MEDIUM':
            color = CYAN
        else:
            color = NC

        print(f"{color}[{finding.severity}] {finding.subcategory}{NC}")
        print(f"  File: {finding.file}:{finding.line}")
        print(f"  Code: {finding.code}")
        print(f"  Risk: {finding.description}")
        print(f"  Fix:  {finding.recommendation}")
        print()


def main():
    import argparse

    parser = argparse.ArgumentParser(description='Scan for security vulnerability patterns in Next.js projects')
    parser.add_argument('path', nargs='?', default='.', help='Directory to scan (default: current directory)')
    parser.add_argument('--json', action='store_true', help='Output in JSON format')
    parser.add_argument('--category', '-c', action='append', dest='categories',
                        choices=['xss', 'injection', 'authentication', 'nextjs', 'cryptography', 'redirect', 'logging'],
                        help='Filter by category (can be used multiple times)')
    parser.add_argument('--exit-code', action='store_true', help='Exit with code 1 if critical/high issues found')

    args = parser.parse_args()

    if not os.path.isdir(args.path):
        print(f"{RED}Error: {args.path} is not a directory{NC}", file=sys.stderr)
        sys.exit(1)

    print(f"{BLUE}Scanning {args.path} for security patterns...{NC}\n", file=sys.stderr)

    findings, stats = scan_directory(args.path, args.categories)
    print_findings(findings, stats, 'json' if args.json else 'text')

    if args.exit_code:
        if stats.findings_by_severity['CRITICAL'] > 0 or stats.findings_by_severity['HIGH'] > 0:
            sys.exit(1)

    sys.exit(0)


if __name__ == '__main__':
    main()
