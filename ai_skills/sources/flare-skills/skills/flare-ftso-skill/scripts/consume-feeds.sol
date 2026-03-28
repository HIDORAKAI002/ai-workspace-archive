// SPDX-License-Identifier: MIT
// Consume Block-Latency Feeds — Skill resource script
//
// Reads multiple FTSO block-latency feeds in a single call using TestFtsoV2Interface.
// Resolve the FtsoV2 contract via ContractRegistry — do not hardcode addresses.
//
// Prerequisites:
//   - Hardhat or Foundry project with @flarenetwork/flare-periphery-contracts installed
//   - EVM version set to "cancun"
//   - Network: Coston2 testnet (adjust imports for flare/ or songbird/ in production)
//
// Usage (Hardhat): npx hardhat compile
// Usage (Foundry): forge build --evm-version cancun
//
// See: https://dev.flare.network/ftso/getting-started

pragma solidity >=0.8.0 <0.9.0;

import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
import {TestFtsoV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/TestFtsoV2Interface.sol";

contract FtsoV2Consumer {
    bytes21[] public feedIds = [
        bytes21(0x01464c522f55534400000000000000000000000000), // FLR/USD
        bytes21(0x014254432f55534400000000000000000000000000), // BTC/USD
        bytes21(0x014554482f55534400000000000000000000000000)  // ETH/USD
    ];

    function getCurrentPrices()
        external
        view
        returns (uint256[] memory _values, int8[] memory _decimals, uint64 _timestamp)
    {
        /* In production use: ContractRegistry.getFtsoV2() */
        TestFtsoV2Interface ftsoV2 = ContractRegistry.getTestFtsoV2();
        return ftsoV2.getFeedsById(feedIds);
    }
}
