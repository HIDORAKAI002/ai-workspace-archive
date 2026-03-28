#!/usr/bin/env python3
"""
Secret Scanner for Python Projects
Scans for hardcoded secrets, API keys, and credentials in Python codebases.

By default, this scanner:
- SKIPS real .env files (.env, .env.local, .env.production, etc.)
- SCANS .env.example/.env.template files to analyze template configuration
- Use --include-env-files to explicitly scan real .env files (not recommended)
"""

import os
import re
import sys
import json
import argparse
from pathlib import Path
from dataclasses import dataclass, asdict
from typing import List, Dict, Optional
from collections import defaultdict

# ANSI colors
RED = '\033[0;31m'
YELLOW = '\033[1;33m'
GREEN = '\033[0;32m'
BLUE = '\033[0;34m'
CYAN = '\033[0;36m'
NC = '\033[0m'  # No Color


@dataclass
class Finding:
    """Represents a security finding."""
    file: str
    line_number: int
    line_content: str
    pattern_name: str
    severity: str
    description: str
    recommendation: str


@dataclass
class EnvTemplateAnalysis:
    """Analysis of .env.example template files."""
    file: str
    variables: List[str]
    missing_descriptions: List[str]
    sensitive_vars: List[str]
    suggestions: List[str]


# Secret patterns with severity and descriptions
SECRET_PATTERNS = [
    # AWS
    {
        "name": "AWS Access Key ID",
        "pattern": r"AKIA[0-9A-Z]{16}",
        "severity": "CRITICAL",
        "description": "AWS Access Key ID found",
        "recommendation": "Remove and rotate AWS credentials. Use IAM roles or environment variables."
    },
    {
        "name": "AWS Secret Access Key",
        "pattern": r"(?i)aws_secret_access_key\s*=\s*['\"][A-Za-z0-9/+=]{40}['\"]",
        "severity": "CRITICAL",
        "description": "AWS Secret Access Key found",
        "recommendation": "Remove and rotate AWS credentials immediately."
    },

    # API Keys
    {
        "name": "Generic API Key",
        "pattern": r"(?i)(api[_-]?key|apikey)\s*[=:]\s*['\"][a-zA-Z0-9_\-]{20,}['\"]",
        "severity": "HIGH",
        "description": "Potential API key found",
        "recommendation": "Move API keys to environment variables or secrets manager."
    },
    {
        "name": "Generic Secret Key",
        "pattern": r"(?i)(secret[_-]?key|secretkey)\s*[=:]\s*['\"][a-zA-Z0-9_\-]{16,}['\"]",
        "severity": "HIGH",
        "description": "Potential secret key found",
        "recommendation": "Move secret keys to environment variables."
    },

    # GitHub
    {
        "name": "GitHub Personal Access Token",
        "pattern": r"ghp_[a-zA-Z0-9]{36}",
        "severity": "CRITICAL",
        "description": "GitHub Personal Access Token found",
        "recommendation": "Revoke and regenerate the GitHub token."
    },
    {
        "name": "GitHub OAuth Access Token",
        "pattern": r"gho_[a-zA-Z0-9]{36}",
        "severity": "CRITICAL",
        "description": "GitHub OAuth Access Token found",
        "recommendation": "Revoke the OAuth token."
    },

    # Stripe
    {
        "name": "Stripe API Key",
        "pattern": r"sk_(live|test)_[a-zA-Z0-9]{24,}",
        "severity": "CRITICAL",
        "description": "Stripe API Key found",
        "recommendation": "Rotate Stripe API key immediately."
    },
    {
        "name": "Stripe Publishable Key",
        "pattern": r"pk_(live|test)_[a-zA-Z0-9]{24,}",
        "severity": "MEDIUM",
        "description": "Stripe Publishable Key found (less sensitive but should still be protected)",
        "recommendation": "Move to environment variables."
    },

    # Database
    {
        "name": "Database URL with Password",
        "pattern": r"(?i)(postgres|mysql|mongodb|redis)://[^:]+:[^@]+@[^\s'\"]+",
        "severity": "CRITICAL",
        "description": "Database connection string with credentials found",
        "recommendation": "Move database credentials to environment variables."
    },

    # Django
    {
        "name": "Django Secret Key",
        "pattern": r"(?i)secret_key\s*=\s*['\"][^'\"]{20,}['\"]",
        "severity": "CRITICAL",
        "description": "Django SECRET_KEY appears to be hardcoded",
        "recommendation": "Move SECRET_KEY to environment variable."
    },
    {
        "name": "Django Insecure Secret Key",
        "pattern": r"django-insecure-[a-zA-Z0-9_\-]+",
        "severity": "CRITICAL",
        "description": "Django insecure secret key (development key) found",
        "recommendation": "Generate a new secure SECRET_KEY for production."
    },

    # Flask
    {
        "name": "Flask Secret Key",
        "pattern": r"(?i)app\.secret_key\s*=\s*['\"][^'\"]+['\"]",
        "severity": "HIGH",
        "description": "Flask secret_key appears to be hardcoded",
        "recommendation": "Move secret_key to environment variable."
    },

    # JWT
    {
        "name": "JWT Secret",
        "pattern": r"(?i)(jwt[_-]?secret|jwt[_-]?key)\s*[=:]\s*['\"][^'\"]{8,}['\"]",
        "severity": "CRITICAL",
        "description": "JWT secret key found",
        "recommendation": "Move JWT secret to environment variable."
    },

    # OAuth
    {
        "name": "OAuth Client Secret",
        "pattern": r"(?i)(client[_-]?secret|oauth[_-]?secret)\s*[=:]\s*['\"][a-zA-Z0-9_\-]{16,}['\"]",
        "severity": "HIGH",
        "description": "OAuth client secret found",
        "recommendation": "Move OAuth secrets to environment variables."
    },

    # Generic Passwords
    {
        "name": "Hardcoded Password",
        "pattern": r"(?i)(password|passwd|pwd)\s*[=:]\s*['\"][^'\"]{4,}['\"]",
        "severity": "HIGH",
        "description": "Potential hardcoded password found",
        "recommendation": "Remove hardcoded passwords. Use environment variables or secrets manager."
    },

    # Private Keys
    {
        "name": "RSA Private Key",
        "pattern": r"-----BEGIN RSA PRIVATE KEY-----",
        "severity": "CRITICAL",
        "description": "RSA private key found in code",
        "recommendation": "Remove private key from code. Store in secure location."
    },
    {
        "name": "SSH Private Key",
        "pattern": r"-----BEGIN OPENSSH PRIVATE KEY-----",
        "severity": "CRITICAL",
        "description": "SSH private key found in code",
        "recommendation": "Remove SSH key from code. Store in secure location."
    },
    {
        "name": "PGP Private Key",
        "pattern": r"-----BEGIN PGP PRIVATE KEY BLOCK-----",
        "severity": "CRITICAL",
        "description": "PGP private key found in code",
        "recommendation": "Remove PGP key from code."
    },

    # Google
    {
        "name": "Google API Key",
        "pattern": r"AIza[0-9A-Za-z_-]{35}",
        "severity": "HIGH",
        "description": "Google API Key found",
        "recommendation": "Restrict API key or move to environment variable."
    },
    {
        "name": "Google OAuth Client ID",
        "pattern": r"[0-9]+-[a-z0-9]+\.apps\.googleusercontent\.com",
        "severity": "MEDIUM",
        "description": "Google OAuth Client ID found",
        "recommendation": "Move to environment variable."
    },

    # Slack
    {
        "name": "Slack Token",
        "pattern": r"xox[baprs]-[0-9a-zA-Z]{10,}",
        "severity": "HIGH",
        "description": "Slack token found",
        "recommendation": "Revoke and regenerate Slack token."
    },
    {
        "name": "Slack Webhook URL",
        "pattern": r"https://hooks\.slack\.com/services/T[a-zA-Z0-9_]+/B[a-zA-Z0-9_]+/[a-zA-Z0-9_]+",
        "severity": "MEDIUM",
        "description": "Slack Webhook URL found",
        "recommendation": "Move webhook URL to environment variable."
    },

    # Twilio
    {
        "name": "Twilio API Key",
        "pattern": r"SK[a-fA-F0-9]{32}",
        "severity": "HIGH",
        "description": "Twilio API Key found",
        "recommendation": "Rotate Twilio API key."
    },

    # SendGrid
    {
        "name": "SendGrid API Key",
        "pattern": r"SG\.[a-zA-Z0-9_-]{22}\.[a-zA-Z0-9_-]{43}",
        "severity": "HIGH",
        "description": "SendGrid API Key found",
        "recommendation": "Rotate SendGrid API key."
    },

    # Heroku
    {
        "name": "Heroku API Key",
        "pattern": r"(?i)heroku.*['\"][0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}['\"]",
        "severity": "HIGH",
        "description": "Heroku API Key found",
        "recommendation": "Rotate Heroku API key."
    },

    # Generic Bearer Token
    {
        "name": "Bearer Token",
        "pattern": r"(?i)(bearer|authorization)\s*[=:]\s*['\"]Bearer\s+[a-zA-Z0-9_\-\.]+['\"]",
        "severity": "HIGH",
        "description": "Bearer token found",
        "recommendation": "Move token to environment variable."
    },

    # Base64 Encoded Secrets (potential)
    {
        "name": "Base64 Encoded Secret",
        "pattern": r"(?i)(secret|key|token|password)\s*[=:]\s*['\"][A-Za-z0-9+/]{40,}={0,2}['\"]",
        "severity": "MEDIUM",
        "description": "Potential base64-encoded secret found",
        "recommendation": "Review and move to environment variable if sensitive."
    },
]

# Files and directories to skip
SKIP_DIRS = {
    '.git', '.svn', '.hg', 'node_modules', '__pycache__', '.venv', 'venv',
    'env', '.tox', '.pytest_cache', '.mypy_cache', 'build', 'dist',
    'egg-info', '.eggs', 'site-packages'
}

SKIP_FILES = {
    '.gitignore', '.dockerignore', 'package-lock.json', 'yarn.lock',
    'Pipfile.lock', 'poetry.lock', '*.pyc', '*.pyo', '*.min.js', '*.min.css'
}

# Real .env files to skip by default (contain actual secrets)
REAL_ENV_FILES = {
    '.env', '.env.local', '.env.development', '.env.production',
    '.env.staging', '.env.test', '.env.dev', '.env.prod',
    '.env.development.local', '.env.production.local',
    '.env.test.local', '.env.staging.local'
}

# Template .env files to analyze (safe to scan, should be in version control)
ENV_TEMPLATE_FILES = {
    '.env.example', '.env.sample', '.env.template', '.env.defaults'
}

# File extensions to scan
SCAN_EXTENSIONS = {
    '.py', '.pyw', '.pyx', '.pxd',  # Python
    '.json', '.yaml', '.yml', '.toml', '.ini', '.cfg', '.conf',  # Config
    '.sh', '.bash', '.zsh',  # Shell
    '.md', '.txt', '.rst',  # Documentation (may contain examples)
    '.sql',  # SQL
    '.html', '.htm', '.js', '.jsx', '.ts', '.tsx',  # Web
}

# Sensitive variable patterns for env template analysis
SENSITIVE_VAR_PATTERNS = [
    r'.*SECRET.*', r'.*KEY.*', r'.*TOKEN.*', r'.*PASSWORD.*',
    r'.*CREDENTIAL.*', r'.*AUTH.*', r'.*API_KEY.*', r'.*PRIVATE.*',
    r'DATABASE_URL', r'REDIS_URL', r'MONGODB_URI', r'.*_URI$',
    r'.*_DSN$', r'AWS_.*', r'STRIPE_.*', r'OPENAI_.*', r'ANTHROPIC_.*',
    r'DJANGO_SECRET_KEY', r'FLASK_SECRET_KEY', r'JWT_SECRET'
]


def should_skip_path(path: Path) -> bool:
    """Check if path should be skipped."""
    for part in path.parts:
        if part in SKIP_DIRS:
            return True
    return False


def should_scan_file(path: Path, include_env_files: bool = False) -> bool:
    """Check if file should be scanned."""
    if path.name in SKIP_FILES:
        return False

    # Handle .env files specially
    if path.name in REAL_ENV_FILES:
        return include_env_files  # Only scan if explicitly requested

    # Template files are handled separately
    if path.name in ENV_TEMPLATE_FILES:
        return False  # Analyzed separately

    if path.suffix in SCAN_EXTENSIONS:
        return True

    return False


def is_sensitive_var(var_name: str) -> bool:
    """Check if a variable name matches sensitive patterns."""
    var_upper = var_name.upper()
    for pattern in SENSITIVE_VAR_PATTERNS:
        if re.match(pattern, var_upper):
            return True
    return False


def analyze_env_template(filepath: Path) -> Optional[EnvTemplateAnalysis]:
    """Analyze an .env.example template file."""
    try:
        content = filepath.read_text(encoding='utf-8', errors='ignore')
        lines = content.split('\n')

        variables = []
        missing_descriptions = []
        sensitive_vars = []
        suggestions = []

        prev_line_comment = False

        for i, line in enumerate(lines):
            stripped = line.strip()

            # Track if previous line was a comment (description)
            if stripped.startswith('#'):
                prev_line_comment = True
                continue

            # Parse variable assignment
            if '=' in stripped and not stripped.startswith('#'):
                var_name = stripped.split('=')[0].strip()
                var_value = stripped.split('=', 1)[1].strip() if '=' in stripped else ''

                if var_name:
                    variables.append(var_name)

                    # Check if sensitive variable
                    if is_sensitive_var(var_name):
                        sensitive_vars.append(var_name)

                        # Check if value looks like a real secret (not placeholder)
                        if var_value and not any(p in var_value.lower() for p in [
                            'your_', 'xxx', 'placeholder', 'changeme', 'example',
                            'replace', 'todo', 'fill', '<', '>', 'insert'
                        ]) and len(var_value) > 10:
                            suggestions.append(
                                f"{var_name}: Value looks like a real secret. "
                                f"Use a placeholder like 'your_{var_name.lower()}_here'"
                            )

                    # Check for missing description
                    if not prev_line_comment and is_sensitive_var(var_name):
                        missing_descriptions.append(var_name)

            prev_line_comment = False

        # Add framework-specific suggestions
        common_vars = {
            'SECRET_KEY': 'Django/Flask secret key for cryptographic signing',
            'DATABASE_URL': 'Database connection string',
            'DEBUG': 'Debug mode flag (should be False in production)',
        }
        for var, desc in common_vars.items():
            if var not in variables:
                suggestions.append(f"Consider adding {var} ({desc}) if used in your project")

        return EnvTemplateAnalysis(
            file=str(filepath),
            variables=variables,
            missing_descriptions=missing_descriptions,
            sensitive_vars=sensitive_vars,
            suggestions=suggestions[:5]  # Limit suggestions
        )

    except Exception as e:
        print(f"{YELLOW}Warning: Could not analyze {filepath}: {e}{NC}", file=sys.stderr)
        return None


def find_env_templates(root_dir: str) -> List[Path]:
    """Find all .env template files in the project."""
    root_path = Path(root_dir)
    templates = []

    for template_name in ENV_TEMPLATE_FILES:
        for filepath in root_path.rglob(template_name):
            skip = False
            for part in filepath.parts:
                if part in SKIP_DIRS:
                    skip = True
                    break
            if not skip:
                templates.append(filepath)

    return templates


def scan_line(line: str, line_number: int, file_path: str) -> List[Finding]:
    """Scan a single line for secrets."""
    findings = []

    # Skip comments and common false positives
    stripped = line.strip()
    if stripped.startswith('#') and 'env' not in stripped.lower():
        return findings

    for pattern_info in SECRET_PATTERNS:
        pattern = pattern_info["pattern"]
        matches = re.finditer(pattern, line)

        for match in matches:
            matched_text = match.group()

            # Skip example/placeholder values
            if any(placeholder in matched_text.lower() for placeholder in [
                'example', 'your_', 'xxx', 'placeholder', 'changeme',
                'insert', '<your', 'my_', 'test_key', 'dummy'
            ]):
                continue

            # Skip environment variable references
            if re.search(r'os\.environ|getenv|os\.getenv|\$\{?\w+\}?', line):
                continue

            findings.append(Finding(
                file=file_path,
                line_number=line_number,
                line_content=line.strip()[:100],
                pattern_name=pattern_info["name"],
                severity=pattern_info["severity"],
                description=pattern_info["description"],
                recommendation=pattern_info["recommendation"]
            ))
            break

    return findings


def scan_file(file_path: Path) -> List[Finding]:
    """Scan a file for secrets."""
    findings = []

    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            for line_number, line in enumerate(f, 1):
                findings.extend(scan_line(line, line_number, str(file_path)))
    except Exception as e:
        print(f"{YELLOW}Warning: Could not scan {file_path}: {e}{NC}", file=sys.stderr)

    return findings


def scan_directory(directory: Path, include_env_files: bool = False,
                   verbose: bool = False) -> List[Finding]:
    """Scan a directory for secrets."""
    all_findings = []
    files_scanned = 0

    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not d.startswith('.')]

        for file in files:
            file_path = Path(root) / file

            if should_skip_path(file_path):
                continue

            if not should_scan_file(file_path, include_env_files):
                continue

            if verbose:
                print(f"Scanning: {file_path}")

            findings = scan_file(file_path)
            all_findings.extend(findings)
            files_scanned += 1

    if verbose:
        print(f"\nScanned {files_scanned} files")

    return all_findings


def print_env_template_analysis(analyses: List[EnvTemplateAnalysis], output_format: str = 'text'):
    """Print environment template analysis."""
    if output_format == 'json':
        return

    if not analyses:
        print(f"\n{YELLOW}No .env.example or .env.template files found.{NC}")
        print(f"Consider creating one to document required environment variables.\n")
        return

    print(f"\n{CYAN}========================================{NC}")
    print(f"{CYAN}  Environment Template Analysis{NC}")
    print(f"{CYAN}========================================{NC}\n")

    for analysis in analyses:
        print(f"{BLUE}File: {analysis.file}{NC}")
        print(f"  Total variables: {len(analysis.variables)}")
        print(f"  Sensitive variables: {len(analysis.sensitive_vars)}")

        if analysis.sensitive_vars:
            print(f"\n  {YELLOW}Sensitive variables defined:{NC}")
            for var in analysis.sensitive_vars:
                print(f"    - {var}")

        if analysis.missing_descriptions:
            print(f"\n  {YELLOW}Missing descriptions (add comment above):{NC}")
            for var in analysis.missing_descriptions[:5]:
                print(f"    - {var}")

        if analysis.suggestions:
            print(f"\n  {BLUE}Suggestions:{NC}")
            for suggestion in analysis.suggestions:
                print(f"    - {suggestion}")

        print()


def print_findings(findings: List[Finding], env_analyses: List[EnvTemplateAnalysis] = None,
                   output_format: str = 'text') -> None:
    """Print findings in specified format."""
    if output_format == 'json':
        output = {
            'secrets': [asdict(f) for f in findings],
            'env_templates': [
                {
                    'file': a.file,
                    'variables': a.variables,
                    'sensitive_vars': a.sensitive_vars,
                    'missing_descriptions': a.missing_descriptions,
                    'suggestions': a.suggestions
                }
                for a in (env_analyses or [])
            ]
        }
        print(json.dumps(output, indent=2))
        return

    print(f"\n{BLUE}========================================{NC}")
    print(f"{BLUE}  Secret Scan Results{NC}")
    print(f"{BLUE}========================================{NC}\n")

    if not findings:
        print(f"{GREEN}No secrets found in source code!{NC}")
    else:
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

        print(f"Found {RED}{len(findings)}{NC} potential secrets\n")

        for severity in severity_order:
            if severity not in by_severity:
                continue

            color = severity_colors.get(severity, NC)
            print(f"{color}[{severity}]{NC} ({len(by_severity[severity])} findings)")
            print("-" * 50)

            for finding in by_severity[severity]:
                print(f"  Pattern: {finding.pattern_name}")
                print(f"  File: {finding.file}:{finding.line_number}")
                print(f"  Line: {finding.line_content}")
                print(f"  Fix: {finding.recommendation}")
                print()

    # Print env template analysis
    if env_analyses is not None:
        print_env_template_analysis(env_analyses, output_format)


def main():
    parser = argparse.ArgumentParser(
        description='Scan Python projects for hardcoded secrets and credentials',
        epilog='''
By default, real .env files are SKIPPED (they contain actual secrets).
Only .env.example/.env.template files are analyzed for documentation quality.
Use --include-env-files to explicitly scan real .env files (not recommended).
        '''
    )
    parser.add_argument(
        'path',
        nargs='?',
        default='.',
        help='Path to scan (default: current directory)'
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
        '--exit-code',
        action='store_true',
        help='Exit with non-zero code if secrets found'
    )
    parser.add_argument(
        '--include-env-files',
        action='store_true',
        help='Also scan real .env files (not recommended - they should contain secrets)'
    )
    parser.add_argument(
        '--skip-env-analysis',
        action='store_true',
        help='Skip .env.example template analysis'
    )

    args = parser.parse_args()

    path = Path(args.path).resolve()

    if not path.exists():
        print(f"{RED}Error: Path does not exist: {path}{NC}", file=sys.stderr)
        sys.exit(1)

    print(f"{BLUE}Scanning {args.path} for secrets...{NC}", file=sys.stderr)

    if not args.include_env_files:
        print(f"{BLUE}(Skipping real .env files - use --include-env-files to scan them){NC}\n", file=sys.stderr)

    # Scan for secrets
    if path.is_file():
        findings = scan_file(path)
    else:
        findings = scan_directory(path, include_env_files=args.include_env_files,
                                   verbose=args.verbose)

    # Analyze env templates
    env_analyses = None
    if not args.skip_env_analysis and path.is_dir():
        templates = find_env_templates(str(path))
        env_analyses = []
        for template in templates:
            analysis = analyze_env_template(template)
            if analysis:
                env_analyses.append(analysis)

    print_findings(findings, env_analyses, output_format=args.format)

    if args.exit_code and findings:
        critical_high = sum(1 for f in findings if f.severity in ['CRITICAL', 'HIGH'])
        sys.exit(min(critical_high, 125))


if __name__ == '__main__':
    main()
