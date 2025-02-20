import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Wallet,
  ArrowRightLeft,
  Shield,
  LineChart,
  Clock,
  Globe,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  index,
  containerRef,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // L'animation commence quand la section est à 80% de la vue
        },
      }
    );
  }, [containerRef, index]);

  return (
    <div ref={cardRef} className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-200"></div>
      <div className="relative border border-gray-800 px-6 py-8 rounded-xl hover:border-gray-700 transition-colors">
        <div className="space-y-4">
          <div className="inline-block p-3 bg-gray-800/50 rounded-xl">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-gray-400 leading-relaxed">{description}</p>
          <div className="pt-2">
            <button className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
              Learn more
              <ArrowRightLeft className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const servicesRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 2,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      descRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const services = [
    {
      icon: Wallet,
      title: "Secure Wallet Integration",
      description:
        "Connect your preferred wallet securely with our platform. Support for MetaMask, WalletConnect, and more.",
    },
    {
      icon: ArrowRightLeft,
      title: "Fast Transactions",
      description:
        "Execute trades and transfers with lightning speed. Optimized gas fees and transaction confirmations.",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description:
        "State-of-the-art security measures including 2FA, encryption, and regular security audits to protect your assets.",
    },
    {
      icon: LineChart,
      title: "Advanced Analytics",
      description:
        "Real-time market data, price charts, and detailed transaction history to inform your trading decisions.",
    },
    {
      icon: Clock,
      title: "24/7 Trading",
      description:
        "Trade cryptocurrencies anytime, anywhere. Our platform never sleeps, just like the crypto market.",
    },
    {
      icon: Globe,
      title: "Global Access",
      description:
        "Access our platform from anywhere in the world. Support for multiple languages and currencies.",
    },
  ];

  return (
    <div ref={servicesRef} className="relative bg-black text-white py-24">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-6">
            Comprehensive Crypto Services
          </h2>
          <p ref={descRef} className="text-gray-400 text-lg">
            Experience the future of crypto trading with our suite of powerful
            features designed to give you the edge in the digital asset market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              index={index}
              containerRef={servicesRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
