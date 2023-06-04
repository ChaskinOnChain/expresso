// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    uint256 private _tokenId;
    string private _baseTokenURI;

    constructor(string memory baseTokenURI) ERC721("ExpressoNFT", "exNFT") {
        _baseTokenURI = baseTokenURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        return _baseTokenURI;
    }

    function safeMint(address to) public {
        _safeMint(to, _tokenId);
        _tokenId++;
    }
}
