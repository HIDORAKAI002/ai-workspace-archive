// SPDX-License-Identifier: MIT
// Verify Scaling Anchor Feed — Skill resource script
//
// Verifies a Scaling anchor feed value against the onchain Merkle root
// and stores the proven feed data for later use.
//
// Prerequisites:
//   - Hardhat or Foundry project with @flarenetwork/flare-periphery-contracts installed
//   - EVM version set to "cancun"
//   - Network: Coston2 testnet (adjust imports for flare/ or songbird/ in production)
//
// Usage (Hardhat): npx hardhat compile
// Usage (Foundry): forge build --evm-version cancun
//
// See: https://dev.flare.network/ftso/scaling/overview

pragma solidity >=0.8.0 <0.9.0;

import {FtsoV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/FtsoV2Interface.sol";
import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";

contract AnchorFeedConsumer {
    mapping(uint32 => mapping(bytes21 => FtsoV2Interface.FeedData)) public provenFeeds;

    function savePrice(FtsoV2Interface.FeedDataWithProof calldata data) external {
        FtsoV2Interface ftsoV2 = ContractRegistry.getFtsoV2();
        require(ftsoV2.verifyFeedData(data), "Invalid proof");
        // Use data.body.id, data.body.value, data.body.decimals, data.body.votingRoundId
        provenFeeds[data.body.votingRoundId][data.body.id] = data.body;
    }
}
