import React from "react";
import styles from "./Previous.module.css";

const myList = [
  {
    title: "Order ID 5",
    from: "WBTC",
    quantityFrom: 0.005,
    to: "BTC",
    quantityTo: 0.004985,
    status: "Success",
  },
  {
    title: "Order ID 4",
    from: "WBTC",
    quantityFrom: 0.001,
    to: "BTC",
    quantityTo: 0.000977,
    status: "Success",
  },
  {
    title: "Order ID 3",
    from: "WBTC",
    quantityFrom: 0.001,
    to: "BTC",
    quantityTo: 0.000977,
    status: "Failure",
  },
];

const Previous = () => {
  return (
    <div className={styles.previous}>
      <h1>Previous</h1>
      {myList.map((order, index) => (
        <div key={index} className={styles["table-container"]}>
          <h1>{order.title}</h1>
          <table>
            <thead>
              <tr>
                <th>{order.from}</th>
                <th>{order.to}</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.quantityFrom}</td>
                <td>{order.quantityTo}</td>
                <td
                  className={
                    order.status === "Success"
                      ? styles["status-success"]
                      : styles["status-failure"]
                  }
                >
                  {order.status}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Previous;
