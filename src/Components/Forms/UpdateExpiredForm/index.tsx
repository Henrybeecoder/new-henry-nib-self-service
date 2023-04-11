//@ts-nocheck
//@ts-ignore
import React, { useState } from "react";
import styles from "./style.module.css";
import { useDropzone } from "react-dropzone";
import uparrow from "../../../assets/images/uparrow.svg";
import Done from "../../../assets/images/Done.svg";
import * as toast from "../../../utils/makeToast";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../../utils/localStorage";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import ExpiredSuccess from "./ExpiredSuccess";
import { PrevButton } from "../../Buttons";

export default function UpdateExpiredForm() {
  const [idCardNumber, setIdCardNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardName, setCardName] = useState("");
  const [uploadfiles, setFiles] = useState("");
  const [idValidated, setIdValidated] = useState("");
  const [validating, setValidating] = useState(false);
  const [userDetails, setUserDetails] = useState(
    getLocalStorageItem("userDetails")
  );
  const [success, setSuccess] = useState(false);
  const [idCardtype, setIdCardType] = useState<any>(0);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) =>
    // <li key={file.path}>
    //   {file.path} - {file.size} bytes
    // </li>
    console.log(file.path)
  );

  console.log(acceptedFiles);

  const validateID = () => {
    if (acceptedFiles.length > 0 && idCardNumber && issueDate && cardName) {
      setIdValidated(true);
    } else {
      toast.errorToast("Please fill missing input or upload a valid ID");
    }
  };

  const SubmitExpiredID = () => {
    setValidating(true);
    let ExpiredIdPayload = {
      referenceId: userDetails.referenceId,
      requestedDate: "2022-09-08T11:50:27.483Z",
      eSignature: "signature",
      userPicture: "image",
      requestLetter: "request letter",
      idCardNumber: idCardNumber,
      idCardName: cardName,
      issueDate: issueDate,
      expiryDate: expiryDate,
      cardType: 1,
    };

    axios
      .post(`${baseUrl}IdCard/submit-id-card`, ExpiredIdPayload)
      .then((response) => {
        console.log(response);
        // if (response.data.responseCode === 5) {
        //   setSuccess(true);
        // }
        setValidating(false);
      })
      .catch((err) => {
        // toast.errorToast('something went wrong');
        setSuccess(true);
        console.log(err);
        setValidating(false);
      });
    setSuccess(true);
  };
  const handleSetIdCardType = (id: any) => {
    setIdCardType(id);
  };

  const meansOfIdentification = [
    {
      id: 0,
      text: "International Passport",
    },
    {
      id: 1,
      text: "National ID card",
    },
    {
      id: 2,
      text: "Permanent Voter's card",
    },
    {
      id: 3,
      text: "Nigerian's drivers license",
    },
  ];
  return (
    <div>
      <Toaster position='top-center' reverseOrder={false} />
      {success ? (
        <ExpiredSuccess />
      ) : (
        <>
          <h1 className={styles.header}>Update Expired ID</h1>
          <p className={styles.paragraph}>Upload means of identification</p>
          <label htmlFor='idcardtype' className='label_text'>
            Select identity card type
          </label>
          <ul
            className='nav nav-pills identity-tab mb-3 nav-fill'
            id='pills-tab'
            role='tablist'>
            {meansOfIdentification.map((identification) => {
              return (
                <li
                  className='nav-item'
                  key={identification.id}
                  onClick={() => handleSetIdCardType(identification.id)}>
                  <a
                    className={`nav-link text-nowrap pl-0 pt-2 ${
                      identification.id == 0 ? `${styles.active}` : ""
                    }`}
                    id='pills-int-tab'
                    data-toggle='pill'
                    href='#pills-int'
                    role='tab'
                    aria-controls='pills-int'
                    aria-selected='true'>
                    {identification.text}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className={styles.formFlex}>
            <div className={styles.form}>
              <label>ID card Number</label>
              <input
                type='text'
                placeholder='Enter ID card number'
                onChange={(e) => setIdCardNumber(e.target.value)}
                value={idCardNumber}
                required
              />
            </div>
            <div className={styles.dateform}>
              <label>Issue Date</label>
              <input
                type='date'
                placeholder='dd/mm/yyyy'
                onChange={(e) => setIssueDate(e.target.value)}
                value={issueDate}
                required
              />
            </div>

            {idCardtype !== 2 ? (
              <div className={styles.dateform}>
                <label>Expiry Date</label>
                <input
                  type='date'
                  placeholder='dd/mm/yyyy'
                  onChange={(e) => setExpiryDate(e.target.value)}
                  value={expiryDate}
                  required
                />
              </div>
            ) : null}
          </div>
          <div className={styles.nameForm}>
            <label>ID card name</label>
            <input
              type='text'
              placeholder='Enter your name from the ID card'
              onChange={(e) => setCardName(e.target.value)}
              value={cardName}
              required
            />
          </div>
          <h5>Upload Front page of ID</h5>
          <div className={styles.validated}>
            <section>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <div className={styles.upload}>
                  <p>
                    {acceptedFiles.length > 0 ? (
                      <p>File Uploaded</p>
                    ) : (
                      <p>
                        Click to upload or drag <br />
                        and drop file
                      </p>
                    )}
                  </p>
                  <img src={uparrow} alt='' />
                </div>
              </div>
              {/* <aside>
            <h4>Files</h4>
            <ul>{uploadfiles}</ul>
          </aside> */}
            </section>
            <button
              onClick={validateID}
              className={
                idValidated ? `${styles.validatedId}` : `${styles.validate}`
              }>
              {idValidated && <img alt="" src={Done} />}
              {idValidated ? "Validated" : "Validate ID"}
            </button>
          </div>
          <div className={styles.flexButton}>
            <PrevButton />

            {idValidated ? (
              <>
                {validating ? (
                  <div
                    className='spinner-border text-danger mb-4'
                    role='status'>
                    <span className='sr-only'></span>
                  </div>
                ) : (
                  <button
                    className={styles.submitActive}
                    type='submit'
                    onClick={SubmitExpiredID}>
                    Submit
                  </button>
                )}
              </>
            ) : (
              <button className={styles.submit}>Submit</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
