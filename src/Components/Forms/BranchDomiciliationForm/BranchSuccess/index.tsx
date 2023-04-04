import React from "react";
import success from "../../../../assets/images/success-check.svg";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

export default function BranchSuccess() {
  const navigate = useNavigate();
  const nagivateHome = () => {
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <img src={success} alt="" />
      <h3>Request for change of branch domiciliation submitted successfully</h3>
      <p>
        Your request for change of branch domiciliation has been submitted
        successfully
      </p>
      <button onClick={nagivateHome}>Okay</button>
    </div>
  );
}
