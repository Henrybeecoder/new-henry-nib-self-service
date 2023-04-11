import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import carlender from "../../../assets/images/calender.svg";
import cameraX from "../../../assets/images/cameraX.svg";
import { WebcamCapture } from "../../../Containers/TakePicture";
import { useForm } from "react-hook-form";

import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import * as toast from "../../../utils/makeToast";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { getLocalStorageItem } from "../../../utils/localStorage";
import uparrow from "../../../assets/images/uparrow.svg";
import Download from "../../../assets/icons/Download.svg";
import AccountNameSuccess from "./AccountNameSuccess";
import { encryptAes, deCryptedData } from "../../../utils/encrypt";
// @ts-ignore
import changeofNameDoc from "../../../assets/downloads/change-of-account-name.docx";
import { PrevButton } from "../../Buttons";

export default function UpdateAccountNameForm({
  webClick,
  image,
  generatedNumber,
  validated,
}) {
  const [validating, setValidating] = useState(false);
  const [userDetails, setUserDetails] = useState(
    getLocalStorageItem("userDetails")
  );
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [reason, setReason] = useState("");
  const [legalDocumentation, setLegalDocumentation] = useState("");
  const [instructionChange, setInstructionChange] = useState("");
  const [success, setSuccess] = useState(false);

  const legalDocumentationRef = useRef(null);
  const instructionChangeRef = useRef(null);

  const handleLegalDocumentationClick = () => {
    // 👇️ open file input box on click of other element
    legalDocumentationRef.current.click();
  };

  const handleInstructionChangeClick = () => {
    // 👇️ open file input box on click of other element
    instructionChangeRef.current.click();
  };

  const handleLegalDocumentationChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setLegalDocumentation(fileObj.name);
  };
  const handleinstructionChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setInstructionChange(fileObj.name);
  };

  const SubmitAccountNameForm = () => {
    if (!legalDocumentation) {
      toast.errorToast("Upload legal documentation (Where required)");
    }
    if (!instructionChange) {
      toast.errorToast("Please upload instruction for change");
    }
    setValidating(true);
    let AccountNamePayload = {
      referenceId: userDetails.referenceId,
      requestedDate: "2022-09-19T05:03:01.758Z",
      eSignature: "signature",
      userPicture: "user picture",
      requestLetter: "request letter",
      oldAccountName: userDetails.name,
      newAccountName: {
        firstName: firstname,
        lastName: lastname,
        middleName: middlename,
      },
      instructionFile: instructionChange,
      instructionFileName: instructionChange,
      legalDoc: legalDocumentation,
      legalFileName: legalDocumentation,
      reasonForChange: reason,
    };

    const newEncryptedPayload = {
      value: encryptAes(AccountNamePayload),
    };

    axios
      .post(`${baseUrl}AccountName/Submit-Request`, newEncryptedPayload)
      .then((newResponse) => {
        const response = deCryptedData(newResponse.data);

        if (response) {
          setSuccess(true);

          setValidating(false);
        }
      })
      .catch((err) => {
        toast.errorToast("something went wrong");
        console.log(err);
        setValidating(false);
      });
  };

  return (
    <>
      {success ? (
        <AccountNameSuccess />
      ) : (
        <div>
          <h1 className={styles.header}>Update Account Name</h1>
          <p className={styles.paragraph}>
            The file format should be JPEG or PDF
          </p>
          <div className='form-group' style={{ margin: " 10px 13px" }}>
            <label className='label_text'>old account name</label>
            <input
              value={userDetails.name}
              type='text'
              className='form-control bg-white border-dark'
              placeholder='Old account name'
            />
          </div>
          <div className={styles.formRow}>
            <div className='col-lg-6 mr-2'>
              <label htmlFor='streetname' className='label_text'>
                First name
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstname}
                type='text'
                className='form-control bg-white border-dark'
                placeholder='Enter first name'
              />
            </div>
            <div className='col-lg-6'>
              <label htmlFor='streetname' className='label_text'>
                Last name
              </label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastname}
                type='text'
                className='form-control bg-white border-dark'
                placeholder='Enter last name'
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className='col-lg-6 mr-2'>
              <label htmlFor='streetname' className='label_text'>
                Middle name
              </label>
              <input
                onChange={(e) => setMiddleName(e.target.value)}
                value={middlename}
                type='text'
                className='form-control bg-white border-dark'
                placeholder='Enter middle name'
              />
            </div>
            <div className='col-lg-6'></div>
          </div>
          <div className={styles.textRow}>
            <div className='col-lg-6 mr-2'>
              <label htmlFor='streetname' className='label_text'>
                Provide reason for change
              </label>
              <textarea
                onChange={(e) => setReason(e.target.value)}
                value={reason}
                placeholder='Enter reason for change'></textarea>
            </div>
            <div className={styles.firstUpload}>
              <h5>Upload legal documentation ( Where required )</h5>

              <input
                style={{ display: "none" }}
                ref={legalDocumentationRef}
                type='file'
                onChange={handleLegalDocumentationChange}
              />

              <div
                className={styles.upload}
                onClick={handleLegalDocumentationClick}>
                <p>
                  {legalDocumentation.length > 0 ? (
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
          </div>
          <div className={styles.ITRow}>
            <div className={styles.firstUpload}>
              <h5>Upload instruction for change</h5>

              <input
                style={{ display: "none" }}
                ref={instructionChangeRef}
                type='file'
                onChange={handleinstructionChange}
              />

              <div
                className={styles.upload}
                onClick={handleInstructionChangeClick}>
                <p>
                  {instructionChange.length > 0 ? (
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
            <a href={changeofNameDoc}>
              <button className={styles.instructionTemplate}>
                <p>Download instruction template</p>
                <img
                  src={Download}
                  alt='download icon'
                  style={{ paddingLeft: "10px" }}
                />
              </button>
            </a>
          </div>
          <div className={styles.holder}>
            <div className={styles.picture}>
              <p>
                <b>Live Picture</b>
              </p>
              <div className={styles.page}>
                <ul>
                  <li>
                    Kindly ensure that you take the photo in a well lit room
                  </li>
                  <li>
                    {" "}
                    Ensure you take off any accessories like glasses, scarfs,
                    etc.
                  </li>
                  <li>Please ensure your full face is captured</li>
                  <li>
                    Ensure the picture is taken with a clear background like a
                    wall.
                  </li>
                </ul>

                {generatedNumber > 19 ? (
                  <div className={styles.takenResult}>
                    <p className={styles.validationResult}>
                      Live Picture Validated
                    </p>
                    <p className={styles.matchScore}>
                      Match score grade <span>{generatedNumber}%</span>
                    </p>
                  </div>
                ) : (
                  <button className={styles.takePicture} onClick={webClick}>
                    <p>Take live picture</p>
                    <img src={cameraX} alt='' />
                  </button>
                )}
              </div>
            </div>
            <div className={styles.sign}></div>
          </div>
          <div className={styles.flexButton}>
            <PrevButton />

            {generatedNumber > 19 ? (
              <>
                {validating ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      alignContent: "center",
                      width: "100%",
                      height: "100%",
                    }}>
                    <div
                      className='spinner-border text-danger mb-4'
                      role='status'>
                      <span className='sr-only'></span>
                    </div>
                  </div>
                ) : (
                  <button
                    className={styles.submitActive}
                    type='submit'
                    onClick={SubmitAccountNameForm}>
                    Submit
                  </button>
                )}
              </>
            ) : (
              <button className={styles.submit}>Submit</button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
