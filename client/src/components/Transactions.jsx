import React, { useState, useContext } from "react";
import { ChevronDown, ChevronUp, SearchX } from "lucide-react";
import Cta from "./Cta";
import { TransactionContext } from "../context/TransactionContext";

const Transactions = () => {
  // Example transactions data
  const { currentAccount, transactions } = useContext(TransactionContext);

  // State to track which accordion items are open
  const [openItems, setOpenItems] = useState({});

  // Toggle accordion item
  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full bg-black/50 backdrop-blur-sm border-gray-800">
      {!currentAccount ? (
        <Cta />
      ) : (
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              Recent Transactions
            </h2>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search transactions..."
                className="px-4 py-2 bg-black/40 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/50"
              />
              {/* <select className="px-4 py-2 bg-black/40 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/50">
                <option value="all">All Time</option>
                <option value="day">Last 24h</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select> */}
            </div>
          </div>

          {transactions.length == 0 && (
            <div className="space-y-4">
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-black/40">
                <div className="p-6">
                  <div className="flex flex-cols-2 lg:flex-cols-4 gap-6 justify-center">
                    {/* Address */}
                    <div>
                      <div className="font-mono text-xl text-white flex justify-center items-center">
                        <SearchX />
                        <span className="ml-3">No transaction found.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {transactions.map((tx, index) => (
              <div
                key={index}
                className="border border-gray-800 rounded-xl overflow-hidden bg-black/40"
              >
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Address */}
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Address</div>
                      <div className="font-mono text-white">
                        {tx.addressTo.slice(0, 6)}...{tx.addressTo.slice(-4)}
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        Date & Time
                      </div>
                      <div className="text-white">{tx.timestamp}</div>
                    </div>

                    {/* Amount */}
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Amount</div>
                      <div>
                        <span className="text-white font-medium">
                          {tx.amount} ETH
                        </span>
                        <span className="text-gray-400 ml-2">
                          {/*  (${tx.amount.usd.toLocaleString()}) */} 5 USD
                        </span>
                      </div>
                    </div>

                    {/* Keywords */}
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Keywords</div>
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                          #{tx.keyword}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Button */}
                  <button
                    onClick={() => toggleItem(tx.id)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mt-4 transition-colors"
                  >
                    <span>View Message</span>
                    {openItems[tx.id] ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Accordion Content */}
                {openItems[tx.id] && (
                  <div className="px-6 pb-6 text-gray-300">
                    <div className="p-4 bg-white/5 rounded-lg">
                      {tx.message}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
