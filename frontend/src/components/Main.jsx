import React from "react";

import styles from "./Main.module.css";
import Swap from "./Swap";
import Previous from "./Previous";

const Main = ({ windowObject, walletAddress }) => {
  return (
    <div className={styles.main}>
      <Swap windowObject={windowObject} walletAddress={walletAddress} />
      <Previous windowObject={windowObject} walletAddress={walletAddress} />
    </div>
  );
};

export default Main;
