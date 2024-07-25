import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

import { useState, useEffect } from "react";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [windowObject, setWindowObject] = useState(null);

  useEffect(() => {
    getCurrentConnectedWallet();
    addWalletListeners();
  }, []);

  useEffect(() => {
    if (isConnected) {
      setWindowObject(window.ethereum);
    } else {
      setWindowObject(null);
    }
  }, [isConnected]);

  //to be able to connect to wallet
  const connectWallet = async function () {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        //Metamask is installed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      //Metamask is not installed
      console.log("Please install Metamask");
    }
  };

  //to make sure on refresh connection shows
  const getCurrentConnectedWallet = async function () {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        //Metamask is installed
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        } else {
          console.log("Connect your wallet using the Connect button");
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      //Metamask is not installed
      console.log("Please install Metamask");
    }
  };

  //to handle if account is changed
  const addWalletListeners = async function () {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);

        } else {
          setWalletAddress("");
          setIsConnected(false);
          setWindowObject(null)
        }
      });

      window.ethereum.on("disconnect", () => {
        setWalletAddress("");
        setIsConnected(false);
        setWindowObject(null)
      });
    }
  };

  return (
    <div className="app">
      <Header connectWallet={connectWallet} walletAddress={walletAddress} />
      <Main windowObject={windowObject} walletAddress={walletAddress} />
    </div>
  );
}

export default App;
