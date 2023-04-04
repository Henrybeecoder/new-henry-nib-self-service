import React from "react";
import styles from "./style.module.css";

export default function PopupModal(children) {
  return (
    <div className={styles.bg}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
