import React, { useState, useRef, useCallback } from "react";
import ChequeRequestForm from "../ChequeRequestForm";
import styles from "./style.module.css";
import uparrow from "../../../assets/images/uparrow.svg";
import { useDropzone } from "react-dropzone";

export default function Back({ back, setBack }) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        setBack(binaryStr);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={styles.firstUpload}>
          <h5>Upload Back</h5>

          <div className={styles.upload}>
            <p>
              {back.length > 0 ? (
                <p>File Uploaded</p>
              ) : (
                <p>
                  Click to upload or drag <br />
                  and drop file
                </p>
              )}
            </p>
            <img src={uparrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
