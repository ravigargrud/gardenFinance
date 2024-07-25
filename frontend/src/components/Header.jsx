import { useEffect, useState } from "react";

import LOGO from "../assets/react.svg";

import styles from "./Header.module.css";

const Header = ({ connectWallet, walletAddress }) => {
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
        {walletAddress && walletAddress.length > 0
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
