import { useEffect, useState } from "react";

import LOGO from "../assets/react.svg";

import styles from "./Header.module.css";

const Header = () => {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    getCurrentConnectedWallet();
    addWalletListener()
  }, []);

  //to be able to connect to wallet
  const connectWallet = async function () {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        //Metamask is installed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
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
  const addWalletListener = async function () {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged" , (accounts) => {
        setWalletAddress(accounts[0])
      })
    } else {
      //to handle when no wallet is connected
      setWalletAddress("")
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <img src={LOGO} alt="logo" />
        <p>Bit Swap</p>
      </div>
      <div className={styles.headerRight}>
        <p>Bitcoin: 0.1234</p>
        <p>WBTC: 0.9932</p>
      </div>
      <button onClick={connectWallet} className={styles.connectButton}>
        {walletAddress.length > 0
          ? `Connected: ${walletAddress.substring(
              0,
              6
            )}...${walletAddress.substring(36)}`
          : "Connect Wallet"}
      </button>
    </div>
  );
};

export default Header;
