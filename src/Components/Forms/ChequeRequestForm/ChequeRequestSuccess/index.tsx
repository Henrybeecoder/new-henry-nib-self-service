import React from "react";
import success from "../../../../assets/images/success-check.svg";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

export default function ChequeRequestSuccess() {
  const navigate = useNavigate();
  const nagivateHome = () => {
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <img src={success} alt="" />
      <h3>Cheque request submited</h3>
      <p>Your cheque request has been successfully submited.</p>
      <button onClick={nagivateHome}>Okay</button>
    </div>
  );
}
