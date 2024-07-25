import React from "react";

import LOGO from "../assets/react.svg";

import styles from './Header.module.css'

const Header = () => {
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
    </div>
  );
};

export default Header;
