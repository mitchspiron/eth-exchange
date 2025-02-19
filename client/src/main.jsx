import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TransactionProvider } from "./context/TransactionContext.jsx";
import { WagmiProvider, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { metaMask } from "wagmi/connectors";

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [metaMask()],
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <TransactionProvider>
        <StrictMode>
          <App />
        </StrictMode>
        ,
      </TransactionProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
