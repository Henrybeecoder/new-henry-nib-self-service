import React, { useState } from "react";
import styles from "./style.module.css";
import PopupModal from "../../../Containers/popupModal";

export default function BvnUnsuccessful() {
  const [closeModal, setCloseModal] = useState(false);
  return (
    <div className={`${closeModal ? `${styles.closeModal}` : `${styles.bg}`}`}>
      <div className={styles.container}>
        <h1>BVN Validation unsuccessful</h1>
        <p>
          Kindly visit the nearest branch if you are yet to be profiled on the
          BVN platform
        </p>
        <div className={styles.buttonFlex}>
          <button className={styles.transperent}>Cancel</button>
          <button className={styles.colors}>Retry</button>
        </div>
      </div>
    </div>
  );
}
