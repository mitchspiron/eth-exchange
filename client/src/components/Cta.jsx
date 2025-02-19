import React, { useContext } from "react";
import { ArrowRight } from "lucide-react";
import CtaImg from "../assets/img/cta2.png";
import { TransactionContext } from "../context/TransactionContext";

const Cta = () => {
  const { connectWallet } = useContext(TransactionContext);
  return (
    <div className="w-full backdrop-blur-sm py-16 md:py-20 overflow-hidden relative">
      {/* Background glow effects - visible on all screen sizes */}
      <div className="absolute -right-24 top-3 w-64 md:w-96 h-64 md:h-96 bg-white/100 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute right-1/2 md:-right-16 top-1/4 w-48 md:w-64 h-48 md:h-64 bg-white/15 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute right-1/4 -bottom-20 w-56 md:w-80 h-56 md:h-80 bg-white/5 rounded-full blur-3xl opacity-25"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container for desktop layout */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 relative">
          {/* Text content - takes full width on mobile, constrained on desktop */}
          <div className="w-full lg:max-w-xl z-10">
            <h3 className="text-sm uppercase text-gray-400 mb-3">
              Your Transactions
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Connect your wallet to unlock your ETH history
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Take control of your portfolio by accessing your complete
              transaction history and real-time analytics. Security and privacy
              guaranteed.
            </p>
            <button
              type="button"
              onClick={connectWallet}
              className="px-8 py-3 bg-white hover:bg-white/90 text-black font-medium rounded-lg flex items-center gap-2 transition-colors group"
            >
              Check transaction
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Image for desktop - positioned absolutely */}
          <div className="hidden lg:block absolute right-0 bottom-0 w-1/2 h-full">
            <div className="w-full h-full relative">
              <div className="absolute right-0 bottom-0 overflow-hidden rounded-tl-3xl">
                <img
                  src={CtaImg}
                  alt="CTA visualization"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Image for mobile - displays below text */}
          <div className="w-full h-64 sm:h-80 mt-10 relative lg:hidden">
            <div className="absolute inset-0 rounded-tl-3xl overflow-hidden">
              <img
                src={CtaImg}
                alt="CTA visualization"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
