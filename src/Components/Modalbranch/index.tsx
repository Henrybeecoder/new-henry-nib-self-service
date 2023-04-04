import React from "react";
import styles from "./style.module.css";
import info_l from "../../assets/images/info-l.svg";

export default function ModalBranch() {
  return (
    <div>
      {" "}
      <div className={styles.contain}>
        <img src={info_l} alt="" />
        <small className={styles.firstText}>
          Kindly visit the nearest branch if you are yet to be profiled on the
          BVN platform
        </small>
        <small className={styles.secondText}>Branch Locator</small>
      </div>
    </div>
  );
}
