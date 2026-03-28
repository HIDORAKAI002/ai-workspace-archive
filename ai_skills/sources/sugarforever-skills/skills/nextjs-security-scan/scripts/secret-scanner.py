#!/usr/bin/env python3
"""
Secret Scanner for Next.js Projects
Detects hardcoded secrets, API keys, and credentials in source code.

By default, this scanner:
- SKIPS real .env files (.env, .env.local, .env.production, etc.)
- SCANS .env.example/.env.template files to analyze template configuration
- Use --include-env-files to explicitly scan real .env files (not recommended)
"""

import os
import re
import sys
import json
from pathlib import Path
from dataclasses import dataclass
from typing import Optional, List

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
    file: str
    line: int
    match: str
    description: str

@dataclass
class EnvTemplateAnalysis:
    """Analysis of .env.example template files."""
    file: str
    variables: List[str]
    missing_descriptions: List[str]
    sensitive_vars: List[str]
    suggestions: List[str]

# Secret patterns with descriptions
SECRET_PATTERNS = [
    # API Keys
    {
        'name': 'AWS Access Key ID',
        'pattern': r'AKIA[0-9A-Z]{16}',
        'severity': 'CRITICAL'
    },
    {
        'name': 'AWS Secret Access Key',
        'pattern': r'(?i)aws[_-]?secret[_-]?access[_-]?key["\'\s:=]+[A-Za-z0-9/+=]{40}',
        'severity': 'CRITICAL'
    },
    {
        'name': 'GitHub Token',
        'pattern': r'gh[pousr]_[A-Za-z0-9_]{36,}',
        'severity': 'CRITICAL'
    },
    {
        'name': 'GitHub OAuth',
        'pattern': r'gho_[A-Za-z0-9]{36}',
        'severity': 'CRITICAL'
    },
    {
        'name': 'OpenAI API Key',
        'pattern': r'sk-[A-Za-z0-9]{48}',
        'severity': 'CRITICAL'
    },
    {
        'name': 'Anthropic API Key',
        'pattern': r'sk-ant-[A-Za-z0-9-]{95}',
        'severity': 'CRITICAL'
    },
    {
        'name': 'Stripe Secret Key',
        'pattern': r'sk_live_[A-Za-z0-9]{24,}',
        'severity': 'CRITICAL'
    },
    {
        'name': 'Stripe Publishable Key (Live)',
        'pattern': r'pk_live_[A-Za-z0-9]{24,}',
        'severity': 'HIGH'
    },
    {
        'name': 'Google API Key',
        'pattern': r'AIza[0-9A-Za-z-_]{35}',
        'severity': 'HIGH'
    },
    {
        'name': 'Slack Token',
        'pattern': r'xox[baprs]-[0-9]{10,13}-[0-9]{10,13}[a-zA-Z0-9-]*',
        'severity': 'CRITICAL'
    },
    {
        'name': 'Slack Webhook',
        'pattern': r'https://hooks\.slack\.com/services/T[A-Z0-9]+/B[A-Z0-9]+/[A-Za-z0-9]+',
        'severity': 'HIGH'
    },
    {
        'name': 'Discord Webhook',
        'pattern': r'https://discord(app)?\.com/api/webhooks/[0-9]+/[A-Za-z0-9_-]+',
        'severity': 'HIGH'
    },
    {
        'name': 'Twilio API Key',
        'pattern': r'SK[0-9a-fA-F]{32}',
        'severity': 'HIGH'
    },
    {
        'name': 'SendGrid API Key',
        'pattern': r'SG\.[A-Za-z0-9_-]{22}\.[A-Za-z0-9_-]{43}',
        'severity': 'CRITICAL'
    },
    {
        'name': 'Mailgun API Key',
        'pattern': r'key-[0-9a-zA-Z]{32}',
        'severity': 'CRITICAL'
    },
    {
        'name': 'Firebase API Key',
        'pattern': r'(?i)firebase[_-]?api[_-]?key["\'\s:=]+[A-Za-z0-9_-]{39}',
        'severity': 'HIGH'
    },

    # Database URLs
    {
        'name': 'PostgreSQL Connection String',
        'pattern': r'postgres(ql)?://[^:]+:[^@]+@[^/]+/[^\s"\']+',
        'severity': 'CRITICAL'
    },
    {
        'name': 'MySQL Connection String',
        'pattern': r'mysql://[^:]+:[^@]+@[^/]+/[^\s"\']+',
        'severity': 'CRITICAL'
    },
    {
        'name': 'MongoDB Connection String',
        'pattern': r'mongodb(\+srv)?://[^:]+:[^@]+@[^\s"\']+',
        'severity': 'CRITICAL'
    },
    {
        'name': 'Redis Connection String',
        'pattern': r'redis://[^:]*:[^@]+@[^\s"\']+',
        'severity': 'CRITICAL'
    },

    # Generic patterns
    {
        'name': 'Private Key',
        'pattern': r'-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----',
        'severity': 'CRITICAL'
    },
    {
        'name': 'JWT Token',
        'pattern': r'eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+',
        'severity': 'HIGH'
    },
    {
        'name': 'Generic API Key Assignment',
        'pattern': r'(?i)(api[_-]?key|apikey|api_secret|secret_key)["\'\s:=]+["\'][A-Za-z0-9_-]{20,}["\']',
        'severity': 'HIGH'
    },
    {
        'name': 'Password Assignment',
        'pattern': r'(?i)(password|passwd|pwd)["\'\s:=]+["\'][^"\']{8,}["\']',
        'severity': 'HIGH'
    },
    {
        'name': 'Bearer Token',
        'pattern': r'[Bb]earer\s+[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+',
        'severity': 'HIGH'
    },

    # Next.js specific
    {
        'name': 'NEXT_PUBLIC with Secret',
        'pattern': r'NEXT_PUBLIC_[A-Z_]*(SECRET|KEY|PASSWORD|TOKEN|CREDENTIAL)',
        'severity': 'CRITICAL'
    },
]

# Files and directories to skip
SKIP_DIRS = {
    'node_modules', '.git', '.next', 'dist', 'build',
    '.turbo', 'coverage', '__pycache__', '.cache'
}

SKIP_FILES = {
    'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
}

# Real .env files to skip by default (contain actual secrets)
# These should NOT be in version control and should NOT be scanned
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
    '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs',
    '.json', '.yaml', '.yml', '.toml',
    '.md', '.txt', '.sh', '.bash'
}

# Sensitive variable patterns that should have placeholder values in templates
SENSITIVE_VAR_PATTERNS = [
    r'.*SECRET.*', r'.*KEY.*', r'.*TOKEN.*', r'.*PASSWORD.*',
    r'.*CREDENTIAL.*', r'.*AUTH.*', r'.*API_KEY.*', r'.*PRIVATE.*',
    r'DATABASE_URL', r'REDIS_URL', r'MONGODB_URI', r'.*_URI$',
    r'.*_DSN$', r'AWS_.*', r'STRIPE_.*', r'OPENAI_.*', r'ANTHROPIC_.*'
]


def should_skip_file(filepath: Path, include_env_files: bool = False) -> bool:
    """Check if file should be skipped."""
    # Skip directories in path
    for part in filepath.parts:
        if part in SKIP_DIRS:
            return True

    # Skip specific files
    if filepath.name in SKIP_FILES:
        return True

    # Handle .env files specially
    if filepath.name in REAL_ENV_FILES:
        if not include_env_files:
            return True  # Skip real .env files by default

    # Template files are handled separately, not skipped
    if filepath.name in ENV_TEMPLATE_FILES:
        return True  # Skip in main scan, analyzed separately

    # Only scan specific extensions
    if filepath.suffix and filepath.suffix not in SCAN_EXTENSIONS:
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

        # Add general suggestions
        if not any('NEXT_PUBLIC_' in v for v in variables):
            suggestions.append(
                "Consider documenting which variables should be NEXT_PUBLIC_* for client-side access"
            )

        common_vars = {
            'DATABASE_URL': 'Database connection string',
            'NEXTAUTH_SECRET': 'NextAuth.js secret for JWT encryption',
            'NEXTAUTH_URL': 'NextAuth.js base URL',
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
            # Skip node_modules etc.
            skip = False
            for part in filepath.parts:
                if part in SKIP_DIRS:
                    skip = True
                    break
            if not skip:
                templates.append(filepath)

    return templates


def scan_file(filepath: Path) -> list[Finding]:
    """Scan a single file for secrets."""
    findings = []

    try:
        content = filepath.read_text(encoding='utf-8', errors='ignore')
        lines = content.split('\n')

        for i, line in enumerate(lines, 1):
            # Skip comments
            stripped = line.strip()
            if stripped.startswith('//') or stripped.startswith('#'):
                # Still check for actual secrets in comments (they shouldn't be there)
                pass

            for pattern_info in SECRET_PATTERNS:
                matches = re.finditer(pattern_info['pattern'], line)
                for match in matches:
                    # Mask the actual secret in output
                    matched_text = match.group()
                    if len(matched_text) > 20:
                        masked = matched_text[:10] + '...' + matched_text[-5:]
                    else:
                        masked = matched_text[:5] + '...'

                    findings.append(Finding(
                        severity=pattern_info['severity'],
                        category=pattern_info['name'],
                        file=str(filepath),
                        line=i,
                        match=masked,
                        description=f"Potential {pattern_info['name']} detected"
                    ))
    except Exception as e:
        print(f"{YELLOW}Warning: Could not read {filepath}: {e}{NC}", file=sys.stderr)

    return findings


def scan_directory(root_dir: str, include_env_files: bool = False) -> list[Finding]:
    """Recursively scan directory for secrets."""
    root_path = Path(root_dir)
    all_findings = []
    files_scanned = 0

    for filepath in root_path.rglob('*'):
        if filepath.is_file() and not should_skip_file(filepath, include_env_files):
            files_scanned += 1
            findings = scan_file(filepath)
            all_findings.extend(findings)

    print(f"Scanned {files_scanned} files", file=sys.stderr)
    return all_findings


def print_env_template_analysis(analyses: List[EnvTemplateAnalysis], output_format: str = 'text'):
    """Print environment template analysis."""
    if output_format == 'json':
        return  # JSON output handled separately

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


def print_findings(findings: list[Finding], env_analyses: List[EnvTemplateAnalysis] = None,
                   output_format: str = 'text'):
    """Print findings in specified format."""
    if output_format == 'json':
        output = {
            'secrets': [
                {
                    'severity': f.severity,
                    'category': f.category,
                    'file': f.file,
                    'line': f.line,
                    'match': f.match,
                    'description': f.description
                }
                for f in findings
            ],
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

    # Text output for secrets
    print(f"\n{BLUE}========================================{NC}")
    print(f"{BLUE}  Secret Scan Results{NC}")
    print(f"{BLUE}========================================{NC}\n")

    if not findings:
        print(f"{GREEN}No secrets detected in source code!{NC}")
    else:
        # Group by severity
        critical = [f for f in findings if f.severity == 'CRITICAL']
        high = [f for f in findings if f.severity == 'HIGH']
        medium = [f for f in findings if f.severity == 'MEDIUM']

        print(f"Total findings: {len(findings)}")
        print(f"  {RED}Critical: {len(critical)}{NC}")
        print(f"  {YELLOW}High: {len(high)}{NC}")
        print(f"  Medium: {len(medium)}\n")

        for finding in sorted(findings, key=lambda x: ('CRITICAL', 'HIGH', 'MEDIUM').index(x.severity) if x.severity in ('CRITICAL', 'HIGH', 'MEDIUM') else 3):
            if finding.severity == 'CRITICAL':
                color = RED
            elif finding.severity == 'HIGH':
                color = YELLOW
            else:
                color = NC

            print(f"{color}[{finding.severity}] {finding.category}{NC}")
            print(f"  File: {finding.file}:{finding.line}")
            print(f"  Match: {finding.match}")
            print()

    # Print env template analysis
    if env_analyses is not None:
        print_env_template_analysis(env_analyses, output_format)


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description='Scan for hardcoded secrets in Next.js projects',
        epilog='''
By default, real .env files are SKIPPED (they contain actual secrets).
Only .env.example/.env.template files are analyzed for documentation quality.
Use --include-env-files to explicitly scan real .env files (not recommended).
        '''
    )
    parser.add_argument('path', nargs='?', default='.', help='Directory to scan (default: current directory)')
    parser.add_argument('--json', action='store_true', help='Output in JSON format')
    parser.add_argument('--exit-code', action='store_true', help='Exit with code 1 if secrets found')
    parser.add_argument('--include-env-files', action='store_true',
                        help='Also scan real .env files (not recommended - they should contain secrets)')
    parser.add_argument('--skip-env-analysis', action='store_true',
                        help='Skip .env.example template analysis')

    args = parser.parse_args()

    if not os.path.isdir(args.path):
        print(f"{RED}Error: {args.path} is not a directory{NC}", file=sys.stderr)
        sys.exit(1)

    print(f"{BLUE}Scanning {args.path} for secrets...{NC}", file=sys.stderr)

    if not args.include_env_files:
        print(f"{BLUE}(Skipping real .env files - use --include-env-files to scan them){NC}\n", file=sys.stderr)

    # Scan for secrets in source code
    findings = scan_directory(args.path, include_env_files=args.include_env_files)

    # Analyze env templates
    env_analyses = None
    if not args.skip_env_analysis:
        templates = find_env_templates(args.path)
        env_analyses = []
        for template in templates:
            analysis = analyze_env_template(template)
            if analysis:
                env_analyses.append(analysis)

    print_findings(findings, env_analyses, 'json' if args.json else 'text')

    if args.exit_code and findings:
        critical_or_high = [f for f in findings if f.severity in ('CRITICAL', 'HIGH')]
        if critical_or_high:
            sys.exit(1)

    sys.exit(0)


if __name__ == '__main__':
    main()
