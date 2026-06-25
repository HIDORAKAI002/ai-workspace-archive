<a name="readme-top"></a>



<div align="center">
  <a href="https://pypi.org/project/MindsDB/" target="_blank">
    <img src="https://badge.fury.io/py/MindsDB.svg" alt="MindsDB Release" />
  </a>
  <a href="https://www.python.org/downloads/" target="_blank">
    <img src="https://img.shields.io/badge/python-3.10.x%7C%203.11.x%7C%203.12.x%7C%203.13.x-brightgreen.svg" alt="Python supported" />
  </a>
  <a href="https://hub.docker.com/r/mindsdb/mindsdb" target="_blank">
  <img src="https://img.shields.io/docker/pulls/mindsdb/mindsdb.svg?logo=docker&label=Docker%20pulls&cacheSeconds=86400" alt="Docker pulls" />
  </a>
<br/>
  <p align="center">
	<a href="https://docs.mindshub.ai/">Documentation</a>
    ·
    <a href="https://docs.mindshub.ai/setup.html">Try it</a>
    ·
    <a href="https://mindsdb.com/contact?utm_medium=community&utm_source=github&utm_campaign=mindsdb%20repo">Contact us for a demo</a>
    
  </p>
</div>


<img width="1198" height="697" alt="image" src="https://github.com/user-attachments/assets/769e6463-0a9d-45ae-83d1-ef9e234775d3" />


# MINDS-COWORK PLATFORM 

Minds Platform is dedicated to building a general-purpose AI designed for knowledge workers — creators, strategists, and operators — and individuals seeking AI systems they can truly control to help them get work done, with full flexibility to extend and deploy anywhere (VPC, on-prem, or cloud).



## USE CASES


**For every knowledge worker**
- **Automate** any repetitive multi-step task that involves reading and writing (reports, monitoring, workflows)
- **Build** internal AI tools/artifacts without engineering and deploy to your team (apps, decks, docs, analyses)

---

## GET STARTED

### Desktop App:
Simplest way to use this is the latest build App, available on web or desktop:

- **web**: Click [here to register/login](https://mindshub.ai) the Minds-cowork app, packaged and ready for you in one click.

- **macOS**: Click [here to download](https://downloads.mindsdb.com/anton/mac/anton-latest.pkg) the Minds-cowork for MacOS.

- **Windows**: Click [here to download](https://downloads.mindsdb.com/anton/windows/anton-latest.exe) the Minds-cowork for Windows.
 

### Build from source:
**1. Clone the repository**
```bash
git clone --recurse-submodules https://github.com/mindsdb/minds-platform.git
cd minds-platform
```

**2. Install dependencies**
```bash
make setup
```

**3. Run**

| Mode | Command |
|---|---|
| Desktop app (Electron) with hot reload | `make dev` or `make watch` |
| Web app in browser with hot reload | `make dev-web` |
| Production build | `make build` |
| Package for macOS | `make dist-mac` |
| Package for Windows | `make dist-win` |
| Build macOS `.app` from local uncommitted source | `make pack-local` |
| Wipe all local installs + data (fresh start) | `make flush` |

> **Reset to a clean slate:** `make flush` uninstalls the local runtime (the `cowork-server` uv tool and the `backend/*/.venv`s) **and** deletes app state in `~/.anton` (provider keys) and `~/.cowork` (database, hermes, projects). Use it to test the from-scratch install flow or recover from a broken install. ⚠️ This deletes your conversations and saved keys. It prompts for confirmation; pass `FORCE=1` to skip it. The next `make setup` or app launch reinstalls everything.

### Working on feature branches (submodules)

This repo is a superproject that pins each module (`frontend`, `backend/core_api`, `backend/core_agent`, `backend/data-vault`) to a commit. To work on module branches without polluting `git status` or fighting over pins:

**1. Pick your branches** in a gitignored `dev.env` (copy the template):
```bash
cp dev.env.example dev.env      # then set REF=feat/my-thing (or per-module API_REF=…)
```

**2. `make` follows it** — one knob, both run paths:

| Command | What it does |
|---|---|
| `make use` | check out your `dev.env` refs across all submodules |
| `make dev` / `make watch` | run the Electron app with live reload against local source |
| `make dev-web` | run the web SPA with live reload against local source |
| `make server` + `make app` | (re)install the desktop server from the configured branch, then launch |
| `make server-local` + `make app-local` | install the desktop server from **local uncommitted source**, then launch |
| `make pack-local` | build the macOS `.app` from local uncommitted source (no push needed) |
| `make refs` | show which refs the next run will use |
| `make baseline` | reset submodules to the pinned commits |
| `make pin` | record the current submodule commits as the superproject's pins (one deliberate commit) |

Submodules are configured with `ignore = all`, so your branch work never shows up as superproject changes — the parent `git status` stays clean. Pins move **only** via `make pin`. See [`CLAUDE.md`](CLAUDE.md) for the full workflow.

---

## DEPLOY ANYWHERE

Minds Platform is designed for flexible deployment across:

- Cloud
- VPC
- On-Prem
- Air-Gapped Environments
- Hybrid Infrastructure

Maintain full control over your infrastructure, models, permissions, and data.

## 🫴 Help and support

Stuck on a query? Found a bug? We’re here to help.
<table style="width:100%; border-collapse:collapse;">
  <tr>
    <td style="width:30%; border:1px solid #d0d7de; padding:12px; vertical-align:top;">
      Ask a question
    </td>
    <td style="width:70%; border:1px solid #d0d7de; padding:12px; vertical-align:top;">
      Join our <a href="https://mindsdb.com/joincommunity">Slack Community</a>.
    </td>
  </tr>
  <tr>
    <td style="width:30%; border:1px solid #d0d7de; padding:12px; vertical-align:top;">
      Report a bug
    </td>
    <td style="width:70%; border:1px solid #d0d7de; padding:12px; vertical-align:top;">
      Open a <a href="https://github.com/mindsdb/mindsdb/issues">GitHub Issue</a>. Please include reproduction steps!
    </td>
  </tr>
  <tr>
    <td style="width:30%; border:1px solid #d0d7de; padding:12px; vertical-align:top;">
      Get commercial support
    </td>
    <td style="width:70%; border:1px solid #d0d7de; padding:12px; vertical-align:top;">
      Contact the <a href="https://mindsdb.com/contact?utm_medium=community&utm_source=github&utm_campaign=mindsdb%20repo">MindsDB Team</a> for enterprise SLAs and custom solutions.
    </td>
  </tr>
</table>

**Security Note:** If you find a security vulnerability, please do not open a public issue. Refer to our <a href="https://github.com/mindsdb/mindsdb/security">security policy</a> for reporting instructions.

## 🤝 Contribute to Minds Platform

Minds Platform is open source and contributions are welcome! You can submit code changes through pull requests or by opening issues to report bugs, suggest new features, or enhancements.


**How to contribute**

- Read the <a href="https://docs.mindsdb.com/contribute/contribute?utm_medium=community&utm_source=github&utm_campaign=mindsdb%20repo">contribution guide</a> to get set up.
- Browse <a href="https://github.com/mindsdb/mindsdb/issues">open issues</a>.
- Join the #contributors channel in <a href="https://mindsdb.com/joincommunity">Slack</a>.
- Explore <a href="https://mindsdb.com/community?utm_medium=community&utm_source=github&utm_campaign=mindsdb%20repo">community rewards and programs</a>.

<div align="center">

<strong>Our top 100 contributors</strong>

<a href="https://github.com/mindsdb/mindsdb/graphs/contributors">
<img src="https://contrib.rocks/image?repo=mindsdb/mindsdb&max=100&columns=10" />
</a>
	
Made with [contrib.rocks](https://contrib.rocks)
</div>

## 📚 Resources
- <a href="https://docs.mindsdb.com?utm_medium=community&utm_source=github&utm_campaign=mindsdb%20repo">Documentation</a>
- <a href="https://mindsdb.com/blog?utm_medium=community&utm_source=github&utm_campaign=mindsdb%20repo">Blog</a>
- <a href="https://mindsdb.com/events?utm_medium=community&utm_source=github&utm_campaign=mindsdb%20repo">Events</a>
- <a href="https://mindsdb.com/joincommunity">Community Slack</a>
- <a href="https://mindsdb.com/press-kit?utm_medium=community&utm_source=github&utm_campaign=mindsdb%20repo">Brand guidelines</a>
- <a href="https://mindsdb.com/contact?utm_medium=community&utm_source=github&utm_campaign=mindsdb%20repo">Contact form</a>
