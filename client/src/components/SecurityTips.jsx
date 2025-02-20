import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Shield } from "lucide-react";
import Motif3 from "../assets/img/motif3.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SecurityTips = () => {
  const [openIndices, setOpenIndices] = useState([0]);
  const faqRefs = useRef([]);

  useEffect(() => {
    faqRefs.current.forEach((faq, index) => {
      if (faq) {
        gsap.fromTo(
          faq,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: faq,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, []);

  const toggleIndex = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "How to Protect Your Crypto Assets?",
      answer:
        "Never share your private keys or seed phrases. Store them offline in a secure location. Use hardware wallets for large amounts. Enable 2FA on all your accounts. Be cautious of phishing attempts and always verify URLs carefully.",
    },
    {
      question: "Common Scam Warning Signs",
      answer:
        "Be wary of: Promises of guaranteed returns, unsolicited investment advice, pressure to act quickly, requests to share your screen or download unknown software, fake support accounts on social media, and giveaway scams asking you to send crypto first.",
    },
    {
      question: "Best Security Practices",
      answer:
        "Use strong, unique passwords for each platform. Enable all available security features. Never store large amounts on exchanges. Verify all transaction details carefully. Use official wallets and exchanges only. Keep your device's software updated.",
    },
    {
      question: "What to Do If You Suspect a Scam?",
      answer:
        "Immediately disconnect your wallet from any suspicious sites. Report the incident to relevant authorities and the platform where you encountered the scam. Document everything. Don't engage further with the suspected scammers.",
    },
    {
      question: "Safe Trading Guidelines",
      answer:
        "Start with small amounts to test transactions. Double-check wallet addresses before sending. Never trust 'too good to be true' offers. Research projects thoroughly before investing. Keep most of your assets in cold storage.",
    },
  ];

  return (
    <div
      className="relative bg-black text-white py-24 overflow-hidden"
      style={{ backgroundImage: `url(${Motif3})` }}
    >
      <div
        className="absolute inset-2 lg:inset-10"
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
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent, black 85%)",
          pointerEvents: "none",
        }}
      />
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -left-32 top-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -right-32 top-3/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-white/5 rounded-2xl backdrop-blur-sm">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Security Tips</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Essential guidelines to keep your crypto assets safe and secure
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => (faqRefs.current[index] = el)}
              className="group border border-gray-800/50 rounded-xl overflow-hidden transition-all duration-300 backdrop-blur-sm hover:border-gray-700 h-fit"
            >
              <button
                onClick={() => toggleIndex(index)}
                className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
                  openIndices.includes(index)
                    ? "bg-white/5"
                    : "hover:bg-white/5"
                }`}
              >
                <span className="font-medium">{item.question}</span>
                <div className="p-1 rounded-full transition-colors">
                  {openIndices.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  )}
                </div>
              </button>
              {openIndices.includes(index) && (
                <div className="px-6 py-4 bg-black/50 text-gray-400 leading-relaxed border-t border-gray-800/50">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityTips;
