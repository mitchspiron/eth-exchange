import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { useDisconnect } from "wagmi";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
  let signer = null;

  let provider;
  if (ethereum == null) {
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(ethereum);
    signer = await provider.getSigner();
  }
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);

  const { disconnect } = useDisconnect();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = await getEthereumContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const web3 = new Web3();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              Number(transaction.timestamp) * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: web3.utils.fromWei(parseInt(transaction.amount), "ether"),
          })
        );

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please, install Metamask!");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      console.log("Account", accounts);

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        const provider = new ethers.BrowserProvider(ethereum);
        const balance = await provider.getBalance(accounts[0]);

        const web3 = new Web3();
        const accountBalance = web3.utils.fromWei(balance, "ether");

        setCurrentBalance(Number(accountBalance).toFixed(2));
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = await getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();

      window.localStorage.setItem("transactionCount", Number(transactionCount));
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please, install Metamask!");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.BrowserProvider(ethereum);
      const balance = await provider.getBalance(accounts[0]);

      const web3 = new Web3();
      const accountBalance = web3.utils.fromWei(balance, "ether");

      setCurrentBalance(Number(accountBalance).toFixed(2));
      setCurrentAccount(accounts[0]);
      getAllTransactions();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const logout = async () => {
    try {
      if (ethereum) {
        disconnect();

        // Nettoyage de votre état existant
        setCurrentAccount("");
        localStorage.removeItem("transactionCount");
        setTransactionCount(null);
        setTransactions([]);
        setFormData({ addressTo: "", amount: "", keyword: "", message: "" });
        window.location.reload();
      } else {
        console.log("Please install MetaMask to use this application.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please, install Metamask!");
      const { addressTo, amount, keyword, message } = formData;

      const transactionsContract = await getEthereumContract();

      //const parsedAmount = ethers.parseEther(amount).toString(16);

      const web3 = new Web3();
      const parsedAmount = web3.utils.toWei(amount, "ether");
      const hexAmount = "0x" + BigInt(parsedAmount).toString(16);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: web3.utils.toHex(21000), // '0x5208' in hex is 21000
            value: hexAmount,
          },
        ],
      });

      const transactionHash = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setIsLoading(true);

      await transactionHash.wait();
      setIsLoading(false);

      const transactionCount = await transactionsContract.getTransactionCount();

      setTransactionCount(Number(transactionCount));

      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (currentAccount) {
      checkIfTransactionsExist();
    }
  }, [currentAccount]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        logout,
        currentAccount,
        currentBalance,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
