# Scripts

## Validate skills (Python)

The repo includes a script to validate skill **frontmatter** only. Markdown link checks run in CI via **lychee**. Use a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r .github/scripts/requirements.txt
python .github/scripts/validate-skills.py
```

Dependencies are listed in `requirements.txt` in this directory.
