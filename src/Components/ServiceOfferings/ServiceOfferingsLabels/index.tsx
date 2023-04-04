import React from "react";
import styles from "./ServiceOfferingsLabels.module.css";

interface ChildProps {
  headerText: string;
  subText?: string;
  icon: string;
  onClick?: any;
  dropDown?: boolean;
}

const ServiceOfferingsLabels = ({
  headerText,
  subText,
  icon,
  dropDown,
  onClick,
}: React.PropsWithChildren<ChildProps>) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div className={styles.mainContent}>
        <img src={icon} alt="" />
        <div
          // className={styles.textHolder}
          className={
            subText ? `${styles.headerText}` : `${styles.headerTextMargin}`
          }
        >
          <h1>{headerText}</h1>
          <p>{subText}</p>
        </div>
      </div>
      {dropDown && <img src="/images/svg/dropDownIcon.svg" alt="" />}
    </div>
  );
};

export default ServiceOfferingsLabels;
