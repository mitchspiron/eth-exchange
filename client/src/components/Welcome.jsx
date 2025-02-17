import React, { useState, useContext } from "react";
import { WalletIcon, CopyIcon, ExternalLinkIcon } from "lucide-react";
import Motif from "../assets/img/motif.gif";
import Motif2 from "../assets/img/motif2.jpg";
import { TransactionContext } from "../context/TransactionContext";
import Loader from "./Loader";

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    console.log({ addressTo, amount, keyword, message });
    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  //console.log(connectWallet);

  return (
    <div
      className="relative min-h-screen text-white overflow-hidden pt-20" // Ajout de pt-20 pour compenser la navbar
      style={{
        backgroundImage: `url(${Motif})`,
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),
          linear-gradient(rgba(255, 255, 255, 0.1) 2px, transparent 2px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
          linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
          backgroundSize:
            "100% 100%, 100px 100px, 100px 100px, 20px 20px, 20px 20px",
          backgroundPosition: "0 0, 0 0, 0 0, 0 0, 0 0",
        }}
      ></div>

      <div className="relative min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row max-w-7xl mx-auto px-8 py-12">
        {/* Left Section - Title and Description */}
        <div className="w-full lg:w-1/2 flex items-center">
          <div className="space-y-8 lg:pr-16">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Transfer Crypto
                <br />
                <span className="text-gray-300">Seamlessly & Securely</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                Experience next-generation cryptocurrency trading with our
                advanced platform. Connect your wallet and join thousands of
                traders worldwide.
              </p>
            </div>
            <div className="flex items-start gap-4">
              {!currentAccount && (
                <button
                  type="button"
                  onClick={connectWallet}
                  className="group relative px-8 py-4 bg-white text-black rounded-xl font-medium transition-all hover:bg-gray-200 active:scale-[0.98]"
                >
                  <span className="flex items-center gap-3">
                    <WalletIcon className="w-5 h-5" />
                    Connect MetaMask
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Card and Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8 mt-12 lg:mt-0">
          {/* Card */}
          <div className="mx-auto w-full max-w-sm">
            <div className="bg-gradient-to-tl from-gray-900 to-gray-800 text-white h-56 w-full p-6 rounded-xl shadow-md">
              <div className="h-full flex flex-col justify-between">
                <div className="flex items-start justify-between space-x-4">
                  <div className="text-xl font-semibold tracking-tight">
                    SUPERCOMPANY
                  </div>
                  <div className="inline-flex flex-col items-center justify-center">
                    <svg
                      className="h-8 w-8"
                      width="24"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 15V9C2 5.68629 4.68629 3 8 3H16C19.3137 3 22 5.68629 22 9V15C22 18.3137 19.3137 21 16 21H8C4.68629 21 2 18.3137 2 15Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      ></path>
                      <path
                        d="M13 15.5V12.7M15.8571 12.7C16.5714 12.7 18 12.7 18 10.6C18 8.5 16.5714 8.5 15.8571 8.5L13 8.5V12.7M15.8571 12.7C14.7143 12.7 13.4762 12.7 13 12.7M15.8571 12.7L18 15.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M11 8.5L8 15.5L5 8.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <div className="font-semibold text-white">wallet</div>
                  </div>
                </div>

                <div className="inline-block w-12 h-8 bg-gradient-to-tl from-yellow-200 to-yellow-100 rounded-md shadow-inner overflow-hidden">
                  <div className="relative w-full h-full grid grid-cols-2 gap-1">
                    <div className="absolute border border-gray-900 rounded w-4 h-6 left-4 top-1"></div>
                    <div className="border-b border-r border-gray-900 rounded-br"></div>
                    <div className="border-b border-l border-gray-900 rounded-bl"></div>
                    <div className=""></div>
                    <div className=""></div>
                    <div className="border-t border-r border-gray-900 rounded-tr"></div>
                    <div className="border-t border-l border-gray-900 rounded-tl"></div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold tracking-tight">
                    balance
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">2.45 ETH</div>
                    <div className="text-gray-400">≈ $4,578.34 USD</div>
                  </div>

                  <div className="flex mt-4 items-center gap-2 p-4 bg-gray-800/50 rounded-xl">
                    <div className="flex-1 font-mono text-sm text-gray-300 truncate">
                      0x71C7...976F
                    </div>
                    <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                      <CopyIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                      <ExternalLinkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="mx-auto w-full max-w-sm">
            <div className="border border-gray-900 rounded-xl shadow-xl p-6">
              <h3 className="text-lg font-semibold mb-4">
                Transaction Details
              </h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="addressTo"
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white/50"
                    placeholder="Recipient Address (0x...)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      step="0.0001"
                      name="amount"
                      onChange={handleChange}
                      className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white/50"
                      placeholder="Amount (ETH)"
                      min="0"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="keyword"
                      onChange={handleChange}
                      className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white/50"
                      placeholder="Keyword"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white/50 resize-none"
                    placeholder="Transaction Note (optional)"
                    rows={2}
                  />
                </div>

                {false ? (
                  <div className="flex justify-center">
                    <Loader />
                  </div>
                ) : (
                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Send Transaction
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
