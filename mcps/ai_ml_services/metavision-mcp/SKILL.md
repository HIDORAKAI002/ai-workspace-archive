---
name: metavision
description: |
  Web3 AI platform with CVE security scanning, DeFi signals, market intelligence, and 3D generation.
  Use when: (1) searching CVE vulnerabilities in Web3/smart contracts, (2) getting live DeFi arbitrage
  signals on Base network, (3) checking wallet security and rug pull detection, (4) generating 3D models
  from text or images, (5) getting market intelligence for stocks/crypto/forex.
  Supports x402 micropayments on Base (USDC) for paid tools.
---
# MetaVision AI Platform

Web3 AI platform with 21 MCP tools. CVE Oracle, DeFi signals, market intelligence, 3D generation, and more.

## MCP Endpoint

```json
{
  "mcpServers": {
    "metavision": {
      "type": "http",
      "url": "https://metavision.click/mcp"
    }
  }
}
```

## Available Tools

### Security (paid - x402 USDC on Base)
- `cve_lookup` — Search 355,000+ CVEs from NVD database (Web3/smart contract focused)
- `security_check` — Wallet fraud score + rug pull detection + CVE scan
- `audit_smart_contract` — AI-powered smart contract security audit

### DeFi & Blockchain (free)
- `defi_spread` — Live Uniswap V3 vs Aerodrome arbitrage signals on Base
- `gas_price_oracle` — Real-time Base network gas prices
- `token_price_checker` — ERC-20 token price on Base via DEX
- `wallet_balance_checker` — Check wallet balance on Base network

### Creative (credits)
- `generate_3d_model` — Text/Image to 3D model (GLB/FBX/OBJ)
- `generate_story` — AI story generation in 10 genres

### Utilities (free)
- `analyze_gcode` — CNC G-code analysis
- `interior_design_profile` — AI interior design
- `search_3d_models` — Search 10K+ free 3D models
- `get_space_wallpaper` — 4K space wallpapers
- `get_deals` — Real-time coupons
- `summarize_text` — AI text summarization
- `translate_text` — AI text translation
- `calculate` — Math calculations
- `convert_units` — Unit conversions
- `get_random_fact` — Random facts
- `generate_qr_code` — QR code generation
- `logicnodes_worker` — LogicNodes trust fabric

## Payment

Paid tools use x402 micropayments on Base network:
- CVE lookup: 0.10 USDC
- Security check: 0.50 USDC
- Smart contract audit: 0.50 USDC

## Links

- Website: https://metavision.click
- Docs: https://metavision.click/docs
- Agent card: https://metavision.click/.well-known/agent.json
