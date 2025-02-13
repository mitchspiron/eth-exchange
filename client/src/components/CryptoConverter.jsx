import React, { useState, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";

const CryptoConverter = () => {
  const [ethAmount, setEthAmount] = useState("");
  const [usdAmount, setUsdAmount] = useState("");
  const [ethPrice, setEthPrice] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Simuler un prix en direct (dans un vrai projet, utilisez une API comme CoinGecko)
    const price = 3500 + Math.random() * 100;
    setEthPrice(price);

    const interval = setInterval(() => {
      const newPrice = price + (Math.random() - 0.5) * 20;
      setEthPrice(newPrice);
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleEthChange = (value) => {
    setEthAmount(value);
    setUsdAmount((value * ethPrice).toFixed(2));
  };

  const handleUsdChange = (value) => {
    setUsdAmount(value);
    setEthAmount((value / ethPrice).toFixed(6));
  };

  const swapValues = () => {
    const tempEth = ethAmount;
    handleEthChange(parseFloat(usdAmount) / ethPrice);
    handleUsdChange(parseFloat(tempEth) * ethPrice);
  };

  return (
    <div className="relative bg-black text-white py-24">
      <div className="relative max-w-lg mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Currency Converter
          </h2>
          <p className="text-gray-400">
            Current ETH Price: ${ethPrice.toFixed(2)}
            <br />
            <span className="text-sm">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          </p>
        </div>

        <div className="bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-800 rounded-xl p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">ETH Amount</label>
            <input
              type="number"
              value={ethAmount}
              onChange={(e) => handleEthChange(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white/50"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={swapValues}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeftRight className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">USD Amount</label>
            <input
              type="number"
              value={usdAmount}
              onChange={(e) => handleUsdChange(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white/50"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoConverter;
