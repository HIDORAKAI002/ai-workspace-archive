# MetaVision AI Platform — MCP Server

Web3 AI platform with 21 MCP tools. CVE security scanning, DeFi signals, market intelligence, 3D generation, and more. Compatible with Claude Desktop, Cursor, and any MCP client.

## Quick Start

Add to your MCP config:
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

## Available Tools (21)

| Tool | Description | Cost |
|------|-------------|------|
| `cve_lookup` | Search 355,000+ CVEs from NVD database (Web3/smart contract focused) | 0.10 USDC |
| `security_check` | Wallet fraud score + rug pull detection + CVE scan | 0.50 USDC |
| `audit_smart_contract` | AI-powered smart contract security audit | 0.50 USDC |
| `defi_spread` | Live Uniswap V3 vs Aerodrome arbitrage signals on Base | Free |
| `gas_price_oracle` | Real-time Base network gas prices | Free |
| `token_price_checker` | ERC-20 token price on Base via DEX | Free |
| `wallet_balance_checker` | Check wallet balance on Base network | Free |
| `generate_3d_model` | Text/Image to 3D model (GLB/FBX/OBJ) | Credits |
| `analyze_gcode` | CNC G-code analysis, error detection, time estimate | Free |
| `interior_design_profile` | AI interior design based on personality quiz | Free |
| `search_3d_models` | Search 10K+ free 3D models library | Free |
| `get_space_wallpaper` | 4K space wallpapers | Free |
| `get_deals` | Real-time coupons from 50+ stores | Free |
| `generate_story` | AI story generation in 10 genres | Free |
| `summarize_text` | AI text summarization | Free |
| `translate_text` | AI text translation | Free |
| `calculate` | Math calculations | Free |
| `convert_units` | Unit conversions | Free |
| `get_random_fact` | Random interesting facts | Free |
| `generate_qr_code` | QR code generation | Free |
| `logicnodes_worker` | LogicNodes trust fabric integration | Varies |

## Payment

Tools marked with USDC cost use x402 micropayments on Base network. Send payment to:
`0x4CC6689560F22Dd74CFA07CAB72eB41B0Ca7169b`

## Links

- Website: https://metavision.click
- Agent card: https://metavision.click/.well-known/agent.json
- Docs: https://metavision.click/docs
- GitHub: https://github.com/adminmetavision-rgb/metavision-apex
