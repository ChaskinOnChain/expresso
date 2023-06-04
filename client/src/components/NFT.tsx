import { Contract, ethers } from "ethers";
import nftAbi from "../utils/nftAbi.json";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

function NFT() {
  const [loading, setLoading] = useState(false);
  const nftAddress = "0x79DbFb0bb54F5d4f47fE551E9AAFD11E7E6B4Ed9";

  async function mintNft() {
    try {
      if (!window.ethereum) {
        alert("Please Download Metamask");
        return;
      }
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(nftAddress, nftAbi, signer);
      const tx = await contract.safeMint(signer.getAddress());
      await tx.wait();
      alert("You successfully minted the NFT");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col bg-gray-100 py-8 w-full mt-auto mx-8 my-8">
      <h4 className="mb-5 flex justify-center text-xl font-semibold text-gray-900">
        Express your enthusiasm for Express!
      </h4>
      <div className="flex flex-col gap-4 lg:flex-row justify-center items-center">
        <div className="w-[25%] text-gray-600">
          <h4 className="text-lg">
            Mint the complimentary monthly NFT for June and join our community's
            celebration
          </h4>
        </div>
        <div className="relative h-44 w-44">
          <img
            src="https://ipfs.io/ipfs/bafybeihq6xacjveaehfamauul3odg3e3fmu6xsucr27qfamvyz34cwyq6u/"
            alt="nft"
            className="h-full w-full object-cover rounded-lg shadow-md"
          />
          <button
            onClick={mintNft}
            className="absolute left-1/2 bottom-2 -translate-x-1/2 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200"
          >
            Mint
          </button>
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </div>
  );
}

export default NFT;
