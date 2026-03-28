# Flare for React Developers Guide

How to build React dApps on Flare using wagmi, viem, and the `@flarenetwork/flare-wagmi-periphery-package`.

**Source:** [dev.flare.network/network/guides/flare-for-react-developers](https://dev.flare.network/network/guides/flare-for-react-developers)

## Prerequisites

- Node.js v18+
- npm

## Setup

```bash
npm create vite@latest my-flare-app -- --template react-ts
cd my-flare-app
npm install wagmi viem @tanstack/react-query @flarenetwork/flare-wagmi-periphery-package
```

## Wagmi Configuration

**`src/wagmi.config.ts`**

```typescript
import { createConfig, http } from "wagmi";
import { flare, flareTestnet } from "viem/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [flare, flareTestnet],
  connectors: [injected()],
  transports: {
    [flare.id]: http(),
    [flareTestnet.id]: http(),
  },
});
```

**`src/main.tsx`**

```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./wagmi.config.ts";
import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
```

## Contract Interaction

### Generic Hooks (useReadContract)

```typescript
import { useReadContract } from "wagmi";
import { iFlareContractRegistryAbi } from "@flarenetwork/flare-wagmi-periphery-package/contracts/flare";

const FLARE_CONTRACT_REGISTRY =
  "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019" as const;

function WNatAddress() {
  const { data, isLoading, error } = useReadContract({
    address: FLARE_CONTRACT_REGISTRY,
    abi: iFlareContractRegistryAbi,
    functionName: "getContractAddressByName",
    args: ["WNat"],
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>WNat address: {data}</div>;
}
```

### Contract-Specific Hooks (auto-generated)

```typescript
import { useReadIFlareContractRegistry } from "@flarenetwork/flare-wagmi-periphery-package/contracts/flare";

const FLARE_CONTRACT_REGISTRY =
  "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019" as const;

function WNatAddress() {
  const { data } = useReadIFlareContractRegistry({
    address: FLARE_CONTRACT_REGISTRY,
    functionName: "getContractAddressByName",
    args: ["WNat"],
  });

  return <div>WNat address: {data}</div>;
}
```

The contract-specific hooks provide better type safety and autocompletion.

## Package Network Exports

Import ABIs and hooks from the network-specific path:

```typescript
// Flare Mainnet
import { ... } from "@flarenetwork/flare-wagmi-periphery-package/contracts/flare";

// Coston2 Testnet
import { ... } from "@flarenetwork/flare-wagmi-periphery-package/contracts/coston2";

// Songbird
import { ... } from "@flarenetwork/flare-wagmi-periphery-package/contracts/songbird";

// Coston Testnet
import { ... } from "@flarenetwork/flare-wagmi-periphery-package/contracts/coston";
```

Each export provides:
- ABI constants (e.g. `iFlareContractRegistryAbi`, `iFtsoV2Abi`)
- Auto-generated typed hooks (e.g. `useReadIFlareContractRegistry`, `useReadIFtsoV2`)

## Run the Dev Server

```bash
npm run dev
```

## Key Notes

- Use `flareTestnet` from `viem/chains` for Coston2; use `flare` for mainnet.
- `@flarenetwork/flare-wagmi-periphery-package` provides typed ABIs and auto-generated hooks for all Flare periphery contracts — no need to copy/paste ABIs manually.
- Use the contract-specific hooks (`useReadI*`) for the best TypeScript experience.
- Wrap your app in both `WagmiProvider` and `QueryClientProvider` — wagmi requires `@tanstack/react-query` for data fetching.
