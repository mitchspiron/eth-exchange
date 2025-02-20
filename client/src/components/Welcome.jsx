import React, { useState, useContext, useEffect, useRef } from "react";
import { WalletIcon, CopyIcon, ExternalLinkIcon } from "lucide-react";
import Motif from "../assets/img/motif.gif";
import { TransactionContext } from "../context/TransactionContext";
import Loader from "./Loader";
import { shortenAddress } from "../utils/shortenAddress";
import gsap from "gsap";

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    currentBalance,
    formData,
    sendTransaction,
    handleChange,
    isLoading,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  const welcomeRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    tl.from(leftSectionRef.current, {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power3.out",
    }).from(
      rightSectionRef.current,
      {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5"
    );
  }, []);

  return (
    <div
      ref={welcomeRef}
      className="relative min-h-screen text-white overflow-hidden pt-20"
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
        <div ref={leftSectionRef} className="w-full lg:w-1/2 flex items-center">
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

        <div
          ref={rightSectionRef}
          className="w-full lg:w-1/2 flex flex-col justify-center space-y-8 mt-12 lg:mt-0"
        >
          <div className="mx-auto w-full max-w-sm">
            <div className="bg-gradient-to-tl from-gray-900 to-gray-800 text-white h-56 w-full p-6 rounded-xl shadow-md">
              <div className="h-full flex flex-col justify-between">
                <div className="flex items-start justify-between space-x-4">
                  <div className="text-xl font-semibold tracking-tight">
                    ETHSENDER
                  </div>
                  <div className="inline-flex flex-col items-center justify-center">
                    <svg
                      className="h-8 w-8"
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Ethereum"
                      role="img"
                      viewBox="0 0 512 512"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <rect
                          width="512"
                          height="512"
                          rx="15%"
                          fill="#ffffff"
                        ></rect>
                        <path fill="#3C3C3B" d="m256 362v107l131-185z"></path>
                        <path
                          fill="#343434"
                          d="m256 41l131 218-131 78-132-78"
                        ></path>
                        <path
                          fill="#8C8C8C"
                          d="m256 41v158l-132 60m0 25l132 78v107"
                        ></path>
                        <path fill="#141414" d="m256 199v138l131-78"></path>
                        <path fill="#393939" d="m124 259l132-60v138"></path>
                      </g>
                    </svg>
                    <div className="font-semibold text-white">ethereum</div>
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
                    <div className="text-3xl font-bold">
                      {currentBalance ? currentBalance : "XXX"} ETH
                    </div>
                    <div className="text-gray-400">≈ $4,578.34 USD</div>
                  </div>

                  <div className="flex mt-4 items-center gap-2 p-4 bg-gray-800/50 rounded-xl">
                    <div className="flex-1 font-mono text-sm text-gray-300 truncate">
                      {currentAccount
                        ? shortenAddress(currentAccount)
                        : "My eth address ..."}
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

                {isLoading ? (
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
