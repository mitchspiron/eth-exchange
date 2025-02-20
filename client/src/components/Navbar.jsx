import React, { useContext, useState } from "react";
import { WalletIcon, Menu, X } from "lucide-react";
import { TransactionContext } from "../context/TransactionContext";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const handleScroll = (e, id) => {
  e.preventDefault();
  gsap.to(window, {
    duration: 1.2,
    scrollTo: `#${id}`,
    ease: "power2.out",
  });
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { connectWallet, logout, currentAccount } =
    useContext(TransactionContext);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-gray-800  cursor-pointer">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold text-white">
              ETHSENDER
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              onClick={(e) => handleScroll(e, "welcome")}
              className="text-white hover:text-gray-300 transition-colors"
            >
              Home
            </a>
            <a
              onClick={(e) => handleScroll(e, "services")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Services
            </a>
            <a
              onClick={(e) => handleScroll(e, "transactions")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Transactions
            </a>
            <a
              onClick={(e) => handleScroll(e, "tips")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Tips
            </a>
            <a
              onClick={(e) => handleScroll(e, "contact")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:flex items-center space-x-4">
            {!currentAccount && (
              <button
                type="button"
                onClick={connectWallet}
                className="group relative px-4 py-2 bg-white text-black rounded-xl font-medium transition-all hover:bg-gray-200 active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <WalletIcon className="w-4 h-4" />
                  Connect Wallet
                </span>
              </button>
            )}
            {currentAccount && (
              <button
                type="button"
                onClick={logout}
                className="group relative px-4 py-2 bg-white text-black rounded-xl font-medium transition-all hover:bg-gray-200 active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <WalletIcon className="w-4 h-4" />
                  Logout
                </span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-1 border-t border-gray-800">
              <a
                onClick={(e) => handleScroll(e, "welcome")}
                className="block px-3 py-2 rounded-lg text-white bg-gray-800/50"
              >
                Home
              </a>
              <a
                onClick={(e) => handleScroll(e, "services")}
                className="block px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
              >
                Services
              </a>
              <a
                onClick={(e) => handleScroll(e, "transactions")}
                className="block px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
              >
                Transactions
              </a>
              <a
                onClick={(e) => handleScroll(e, "tips")}
                className="block px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
              >
                Tips
              </a>
              <a
                onClick={(e) => handleScroll(e, "contact")}
                className="block px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
              >
                Contact
              </a>
              <div className="pt-2">
                {!currentAccount && (
                  <button
                    type="button"
                    onClick={connectWallet}
                    className="w-full px-4 py-2 bg-white text-black rounded-xl font-medium transition-all hover:bg-gray-200 active:scale-[0.98]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <WalletIcon className="w-4 h-4" />
                      Connect Wallet
                    </span>
                  </button>
                )}
                {currentAccount && (
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full px-4 py-2 bg-white text-black rounded-xl font-medium transition-all hover:bg-gray-200 active:scale-[0.98]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <WalletIcon className="w-4 h-4" />
                      Logout
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
