import React, { useState, useRef, useCallback } from "react";
import ChequeRequestForm from "../ChequeRequestForm";
import styles from "./style.module.css";
import uparrow from "../../../assets/images/uparrow.svg";
import * as toast from "../../../utils/makeToast";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";

export default function Front({ front, setFront }) {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.errorToast(
        "Wrong File formats. Please upload files in jpeg and pdf format "
      );
    }

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
        console.log(reader, "The reader");
        setFront(binaryStr);
      };
      reader.readAsBinaryString(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/pdf": [],
    },
    onDrop,
  });

  return (
    <>
      {isDragReject && (
        <>
          {toast.errorToast(
            "Wrong File formats. Please upload files in jpeg and pdf format "
          )}
        </>
      )}
      <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
          <div className={styles.firstUpload} style={{ marginRight: "70px" }}>
            <h5>Upload Front</h5>

            <div className={styles.upload}>
              <p>
                {front.length > 0 ? (
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
    </>
  );
}
