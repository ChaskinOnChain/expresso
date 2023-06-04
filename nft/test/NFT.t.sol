// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/NFT.sol";

contract NFTtest is Test {
    NFT public nft;
    address public steve = address(0x01);

    function setUp() public {
        nft = new NFT(
            "ipfs://bafybeigvd5uajehnw4tdyralejq6cyrkl6z2jn5q52e2tkksic4ycajoeq/"
        );
    }

    function testTokenURI() public {
        nft.safeMint(msg.sender);
        nft.safeMint(msg.sender);
        assertEq(
            nft.tokenURI(1),
            "ipfs://bafybeigvd5uajehnw4tdyralejq6cyrkl6z2jn5q52e2tkksic4ycajoeq/"
        );
    }

    function testOwner() public {
        nft.safeMint(msg.sender);
        nft.safeMint(steve);
        assertEq(nft.ownerOf(0), msg.sender);
        assertEq(nft.ownerOf(1), steve);
    }
}
