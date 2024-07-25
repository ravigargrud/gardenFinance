import React from "react";
import styles from "./Swap.module.css";
import { useState, useEffect } from "react";

const Swap = ({ windowObject, walletAddress }) => {
  // const [balance, setBalance] = useState(0);

  // useEffect(() => {
  //   const fetchBalance = async () => {
  //     if (windowObject && walletAddress) {
  //       try {
  //         const balance = await windowObject.request({
  //           method: "eth_getBalance",
  //           params: [walletAddress, "latest"],
  //         });
  //         setBalance(parseFloat(balance));
  //       } catch (error) {
  //         console.error("Error fetching balance:", error);
  //       }
  //     }
  //   };

  //   fetchBalance();
  // }, [windowObject, walletAddress]);

  return (
    <div className={styles.swap}>
      <h1>Swap</h1>
      {/* <h2>Balance: {balance}</h2> */}
      <hr />
      <div className={styles.first}>
        <input
          type="text"
          placeholder="Enter your Currency"
          className={styles.input}
        />
        <select>
          <option value="option1">BTC</option>
          <option value="option2">Etherium</option>
          <option value="option3">Dodgecoin</option>
        </select>
      </div>

      <div className={styles.first}>
        <p>41</p>
        <select>
          <option value="option1">BTC</option>
          <option value="option2">Etherium</option>
          <option value="option3">Dodgecoin</option>
        </select>
      </div>
    </div>
  );
};

export default Swap;
