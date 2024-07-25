import React from "react";
import styles from "./Swap.module.css";

const Swap = () => {
  return (
    <div className={styles.swap}>
      <h1>Swap</h1>
      <hr />
      <div className={styles.first}>
        <p>41</p>
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
