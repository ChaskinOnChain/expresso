// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/NFT.sol";

contract DeployNFT is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        new NFT(
            "ipfs://bafybeigvd5uajehnw4tdyralejq6cyrkl6z2jn5q52e2tkksic4ycajoeq/"
        );

        vm.stopBroadcast();
    }
}
