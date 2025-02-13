import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Transactions = () => {
  // Example transactions data
  const transactions = [
    {
      id: 1,
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      date: '2024-02-13',
      time: '14:30:25',
      amount: {
        eth: 0.85,
        usd: 1856.23
      },
      keywords: ['transfer', 'defi', 'payment'],
      message: 'Payment for development services - Sprint 24 completion milestone reached. Ready for review.'
    },
    {
      id: 2,
      address: '0x934d35Cc6634C0532925a3b844Bc454e4438f66b',
      date: '2024-02-13',
      time: '12:15:45',
      amount: {
        eth: 1.2,
        usd: 2625.84
      },
      keywords: ['nft', 'marketplace'],
      message: 'NFT purchase - Bored Ape #7234. Transaction completed successfully.'
    },
    {
      id: 3,
      address: '0x156d35Cc6634C0532925a3b844Bc454e4438f88c',
      date: '2024-02-13',
      time: '10:45:12',
      amount: {
        eth: 0.5,
        usd: 1094.10
      },
      keywords: ['staking', 'yield'],
      message: 'Monthly staking rewards distribution for February 2024.'
    }
  ];

  // State to track which accordion items are open
  const [openItems, setOpenItems] = useState({});

  // Toggle accordion item
  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));

    console.log("TOG", setOpenItems);
    
  };

  return (
    <div className="w-full bg-black/50 backdrop-blur-sm border-gray-800">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search transactions..."
              className="px-4 py-2 bg-black/40 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/50"
            />
            <select className="px-4 py-2 bg-black/40 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/50">
              <option value="all">All Time</option>
              <option value="day">Last 24h</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="border border-gray-800 rounded-xl overflow-hidden bg-black/40"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Address */}
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Address</div>
                    <div className="font-mono text-white">
                      {tx.address.slice(0, 6)}...{tx.address.slice(-4)}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Date & Time</div>
                    <div className="text-white">
                      {tx.date} - {tx.time}
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Amount</div>
                    <div>
                      <span className="text-white font-medium">{tx.amount.eth} ETH</span>
                      <span className="text-gray-400 ml-2">(${tx.amount.usd.toLocaleString()})</span>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Keywords</div>
                    <div className="flex gap-2 flex-wrap">
                      {tx.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-white"
                        >
                          #{keyword}
                        </span>
                      ))}
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
    </div>
  );
};

export default Transactions;