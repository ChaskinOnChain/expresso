declare global {
  interface Window {
    ethereum: any;
  }
}

import axios from "axios";
import { useEffect, useState } from "react";
import { ethers, parseEther } from "ethers";

type Props = {
  eth_address: string | undefined;
  page: "detail" | "profile";
};

const Support = ({ eth_address, page }: Props) => {
  const [currentEthPrice, setCurrentEthPrice] = useState(0);
  const [customAmount, setCustomAmount] = useState(0);
  const isDetail = page === "detail";

  useEffect(() => {
    async function getPrice() {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const data = res.data;
        setCurrentEthPrice(data.ethereum.usd);
      } catch (error) {
        console.log(error);
      }
    }
    getPrice();
  }, []);

  const sendEth = async (amount: number) => {
    if (eth_address) {
      try {
        if (!window.ethereum) {
          alert("Please Download Metamask");
          return;
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const transaction = await signer.sendTransaction({
          to: eth_address,
          value: parseEther(amount.toString()),
        });
        await transaction.wait();
        console.log("Transaction successful!");
      } catch (error) {
        console.log("Transaction failed:", error);
      }
    } else {
      console.log("Invalid ETH address");
    }
  };

  return (
    <div className="h-full rounded-lg bg-gray-100 p-10">
      <div className="text-center">
        <h3 className="text-2xl text-center font-bold mb-6 text-gray-700">
          Support the Creator
        </h3>
        <ul
          className={`flex-col ${
            !isDetail && "lg:flex-row"
          } gap-6 flex items-center`}
        >
          {[0.01, 0.02, 0.05, 0.1].map((value) => (
            <li key={value}>
              <button
                className="donation-button mb-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg transition duration-300 transform hover:bg-blue-600 hover:scale-105"
                onClick={() => sendEth(value)}
              >
                {value} ETH | ${(value * currentEthPrice).toFixed(2)}
              </button>
            </li>
          ))}
        </ul>
        <label
          htmlFor="custom"
          className="block text-lg font-medium text-gray-700"
        >
          Or Enter Custom ETH Amount
        </label>
        <div className="mt-2 flex justify-center items-center relative">
          <input
            id="custom"
            type="number"
            step="0.05"
            value={customAmount}
            onChange={(e) => setCustomAmount(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendEth(customAmount);
              }
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 mr-4 text-lg inline-block w-24 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            className="donation-button bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 transform hover:bg-blue-600 hover:scale-105"
            onClick={() => sendEth(customAmount)}
          >
            ${(customAmount * currentEthPrice).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;
