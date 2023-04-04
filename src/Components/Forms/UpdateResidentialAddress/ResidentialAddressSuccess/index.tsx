import React from "react";
import success from "../../../../assets/images/success-check.svg";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

export default function ResidentialAddressSucess() {
  const navigate = useNavigate();
  const nagivateHome = () => {
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <img src={success} alt="" />
      <h3>Request for change of residential address submitted successfully</h3>
      <p>
        Your request for change of residential address has been submitted
        successfully
      </p>
      <button onClick={nagivateHome}>Okay</button>
    </div>
  );
}
