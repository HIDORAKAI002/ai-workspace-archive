# Flare Data Connector — Reference

Use these links for detailed specs, contract interfaces, and step-by-step guides.

## Overview and Getting Started

- [FDC Overview](https://dev.flare.network/fdc/overview) — Architecture, attestation types, workflows, DA Layer
- [FDC Getting Started](https://dev.flare.network/fdc/getting-started) — End-to-end EVMTransaction example (prepare → submit → proof → verify)
- [FDC Whitepaper](https://dev.flare.network/assets/files/20240224-FlareDataConnector-10ebe2ed4910ace306fa3542950af251.pdf) — Mechanism detail

## Attestation Types (Specs)

- [AddressValidity](https://dev.flare.network/fdc/attestation-types/address-validity)
- [EVMTransaction](https://dev.flare.network/fdc/attestation-types/evm-transaction) — Request/response fields, Event struct, verification
- [JsonApi / Web2Json](https://dev.flare.network/fdc/attestation-types/web2-json)
- [Payment](https://dev.flare.network/fdc/attestation-types/payment)
- [ConfirmedBlockHeightExists](https://dev.flare.network/fdc/attestation-types/confirmed-block-height-exists)
- [BalanceDecreasingTransaction](https://dev.flare.network/fdc/attestation-types/balance-decreasing-transaction)
- [ReferencedPaymentNonexistence](https://dev.flare.network/fdc/attestation-types/referenced-payment-nonexistence)

## FDC Guides (Hardhat)

- [Hardhat FDC index](https://dev.flare.network/fdc/guides/hardhat)
- [AddressValidity (Hardhat)](https://dev.flare.network/fdc/guides/hardhat/address-validity)
- [EVMTransaction (Hardhat)](https://dev.flare.network/fdc/guides/hardhat/evm-transaction)
- [Payment (Hardhat)](https://dev.flare.network/fdc/guides/hardhat/payment)
- [Web2Json (Hardhat)](https://dev.flare.network/fdc/guides/hardhat/web2-json)
- [Proof of Reserves (Hardhat)](https://dev.flare.network/fdc/guides/hardhat/proof-of-reserves) — Web2Json + EVMTransaction
- [Weather Insurance (Hardhat)](https://dev.flare.network/fdc/guides/hardhat/weather-insurance) — Web2Json dApp
- [Web2Json for Custom API (Hardhat)](https://dev.flare.network/fdc/guides/hardhat/web2-json-for-custom-api)

## FDC Guides (Foundry)

- [Foundry FDC index](https://dev.flare.network/fdc/guides/foundry)
- [AddressValidity](https://dev.flare.network/fdc/guides/foundry/address-validity)
- [EVMTransaction](https://dev.flare.network/fdc/guides/foundry/evm-transaction)
- [Payment](https://dev.flare.network/fdc/guides/foundry/payment)
- [Web2Json](https://dev.flare.network/fdc/guides/foundry/web2-json)
- [Proof of Reserves](https://dev.flare.network/fdc/guides/foundry/proof-of-reserves)
- [Weather Insurance](https://dev.flare.network/fdc/guides/foundry/weather-insurance)
- [Cross-Chain Payment](https://dev.flare.network/fdc/guides/foundry/cross-chain-payment)
- [Cross-Chain FDC](https://dev.flare.network/fdc/guides/foundry/cross-chain-fdc)

## Contract Reference (FDC)

- [IFdcHub](https://dev.flare.network/fdc/reference/IFdcHub) — `requestAttestation(bytes)`, fee configs
- [IFdcVerification](https://dev.flare.network/fdc/reference/IFdcVerification) — `verifyEVMTransaction`, `verifyWeb2Json`, `verifyPayment`, `verifyAddressValidity`, etc.
- [IEVMTransaction](https://dev.flare.network/fdc/reference/IEVMTransaction) — Proof/Response/RequestBody/ResponseBody/Event
- [IAddressValidity](https://dev.flare.network/fdc/reference/IAddressValidity)
- [Data Availability API](https://dev.flare.network/fdc/reference/data-availability-api) — DA Layer endpoints

## Relay (Round Finalization)

- [IRelay](https://dev.flare.network/network/fsp/solidity-reference/IRelay) — `isFinalized(uint256 _protocolId, uint256 _votingRoundId)`, FDC protocol ID = 200

## Starter Repositories

- [flare-hardhat-starter](https://github.com/flare-foundation/flare-hardhat-starter) — `scripts/fdcExample/`, `scripts/weatherInsurance/`, `scripts/proofOfReserves/`, `contracts/fdcExample/`, `contracts/weatherInsurance/`, `contracts/proofOfReserves/`
- [flare-foundry-starter](https://github.com/flare-foundation/flare-foundry-starter) — `script/fdcExample/`, `script/weatherInsurance/`, `script/proofOfReserves/`, `src/fdcExample/`, `src/weatherInsurance/`, `src/proofOfReserves/`, plus cross-chain examples

## Verifier and DA Layer

- **Testnet verifier:** See [FDC Getting Started](https://dev.flare.network/fdc/getting-started) for the current testnet verifier base URL (rate-limited; use your own verifier in production)
- **Mainnet verifier:** See [FDC Getting Started](https://dev.flare.network/fdc/getting-started) for the current mainnet verifier base URL
- **API keys:** Set `VERIFIER_API_KEY_TESTNET` / `VERIFIER_API_KEY_MAINNET` in `.env` (UUID format, see [`.env.example`](https://github.com/flare-foundation/flare-hardhat-starter/blob/main/.env.example)); pass via `X-apikey` header
- **Prepare request:** POST to verifier path like `/verifier/eth/EVMTransaction/prepareRequest` or `/Web2Json/prepareRequest` with `attestationType`, `sourceId`, `requestBody`
- **DA Layer endpoints:** See [Data Availability API](https://dev.flare.network/fdc/reference/data-availability-api) for current DA Layer base URLs
- **DA Layer proof request:** `POST .../api/v1/fdc/proof-by-request-round-raw` with body `{ votingRoundId, requestBytes }`; response includes `proof` (Merkle path) and response data (e.g. `response_hex`)

## Network and Source IDs

- **Mainnet:** `ETH`, `FLR`, `SGB`
- **Testnet:** `testETH` (Sepolia), `testFLR` (Coston2), `testSGB` (Coston)
- Web2Json: `PublicWeb2` (Coston/Coston2)

## URL Parsing Security

- [URL Parsing Security](https://dev.flare.network/fdc/guides/url-parsing-security) — Safe handling of URLs in attestation requests
