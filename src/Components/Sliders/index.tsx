import React from "react";
import ServiceOfferings from "../ServiceOfferings";
import styles from "./style.module.css";

export default function Slider() {
  return (
    <div className={styles.body}>
      <ul className={styles.slideshow}>
        <li>
          <span>Image 01</span>
        </li>
        <li>
          <span>Image 02</span>
        </li>
        <li>
          <span>Image 03</span>
        </li>
        <li>
          <span>Image 04</span>
        </li>
        <li>
          <span>Image 05</span>
        </li>
        <li>
          <span>Image 06</span>
        </li>
      </ul>
      <div className={styles.containerX}>
        <div className={styles.logoContainer}>
          <img src="/images/svg/logo.svg" alt="" className={styles.logoX} />
        </div>
        <div className={styles.flexContainer}>
          <div className={styles.textHolder}>
            <h1>
              Self <br />
              <span>Service</span>
            </h1>
            <p>Get access to easy self service options</p>
          </div>
          <ServiceOfferings />
        </div>
        {/* <img src="/images/svg/shadow.svg" alt="" className="shadow" />
        <img src="/images/svg/shadow.svg" alt="" className="shadow" /> */}
      </div>
    </div>
  );
}
