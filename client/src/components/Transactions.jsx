import React, { useState, useContext, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, SearchX } from "lucide-react";
import Cta from "./Cta";
import { TransactionContext } from "../context/TransactionContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);
  const [openItems, setOpenItems] = useState({});
  const sectionRef = useRef(null);
  const transactionRefs = useRef([]);
  const [searchTerm, setSearchTerm] = useState("");

  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  const filteredTransactions = sortedTransactions.filter((tx) => {
    if (searchTerm === "") return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      tx.addressTo.toLowerCase().includes(searchLower) ||
      tx.keyword.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    if (filteredTransactions.length > 0) {
      const elements = transactionRefs.current;
      gsap.fromTo(
        elements,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [filteredTransactions]);

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      ref={sectionRef}
      className="w-full bg-black/50 backdrop-blur-sm border-gray-800"
    >
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search transaction"
                className="px-4 py-2 bg-black/40 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/50"
              />
            </div>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="space-y-4">
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-black/40">
                <div className="p-6">
                  <div className="flex justify-center">
                    <div className="font-mono text-xl text-white flex items-center">
                      <SearchX />
                      <span className="ml-3">
                        {searchTerm
                          ? "No matching transactions found."
                          : "No transactions found."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {filteredTransactions.map((tx, index) => (
              <div
                key={index}
                ref={(el) => (transactionRefs.current[index] = el)}
                className="border border-gray-800 rounded-xl overflow-hidden bg-black/40 opacity-0"
              >
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Address</div>
                      <div className="font-mono text-white">
                        {tx.addressTo.slice(0, 6)}...{tx.addressTo.slice(-4)}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        Date & Time
                      </div>
                      <div className="text-white">{tx.timestamp}</div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-1">Amount</div>
                      <div>
                        <span className="text-white font-medium">
                          {tx.amount} ETH
                        </span>
                        <span className="text-gray-400 ml-2">5 USD</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-1">Keywords</div>
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                          #{tx.keyword}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleItem(index)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mt-4 transition-colors"
                  >
                    <span>View Message</span>
                    {openItems[index] ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {openItems[index] && (
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
