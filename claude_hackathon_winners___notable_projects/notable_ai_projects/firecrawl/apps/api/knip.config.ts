import type { KnipConfig } from "knip";

const config: KnipConfig = {
  workspaces: {
    ".": {
      entry: [
        "src/services/worker/**/*.ts",
        "src/services/**/*-worker.ts",
        "src/**/*.test.ts",
        "src/__tests__/**/*.ts",
      ],
      project: ["src/**/*.ts"],
    },
  },
  ignore: [
    "native/**",
    "src/scraper/scrapeURL/engines/fire-engine/branding-script/**",
    // Legacy auto-recharge files — kept but disabled (Autumn handles auto-recharge now)
    "src/services/billing/auto_charge.ts",
    "src/services/billing/issue_credits.ts",
    "src/services/billing/stripe.ts",
  ],
  ignoreDependencies: ["undici-types", "stripe"],
};

export default config;
