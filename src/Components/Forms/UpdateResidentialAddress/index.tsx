//@ts-ignore
//@ts-nocheck

import React, { useState, useRef } from "react";

import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import * as toast from "../../../utils/makeToast";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { getLocalStorageItem } from "../../../utils/localStorage";
import SignaturePad from "react-signature-canvas";

import styles from "./style.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import carlender from "../../../assets/images/calender.svg";
import cameraX from "../../../assets/images/cameraX.svg";
import { WebcamCapture } from "../../../Containers/TakePicture";
import { useForm } from "react-hook-form";
import ResidentialAddressSucess from "./ResidentialAddressSuccess";
import uparrow from "../../../assets/images/uparrow.svg";
import { useDropzone } from "react-dropzone";
import Done from "../../../assets/images/Done.svg";
import { encryptAes, deCryptedData } from "../../../utils/encrypt";
import "react-toastify/dist/ReactToastify.css";
import { PrevButton } from "../../Buttons";

export default function UpdateResidentialAddress({
  webClick,
  image,
  generatedNumber,
  validated,
}) {
  const { register, handleSubmit, watch, errors } = useForm();
  const [success, setSuccess] = useState(false);
  // const onSubmit = (data) => {
  //   setSuccess(true);
  //   console.log(data);
  // };
  const [userDetails, setUserDetails] = useState(
    getLocalStorageItem("userDetails")
  );
  const [validating, setValidating] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [fullname, setfullname] = useState(userDetails.name);
  const [accountName, setAccountName] = useState(userDetails.accountNumber);
  const [OldResidentialAddress, setOldResidentialAddress] = useState("");
  const [NewResidentialAddress, setNewResidentialAddress] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [utilityBill, setUtilityBill] = useState("");
  const [settingUtilityBill, setSettingUtilityBill] = useState<boolean>(false);
  const [utilityBillURL, setUtilityBillURL] = useState({});

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(
    (file) => <li key={file.path}>{file.path}</li>
    //console.log(file.path),
  );
  let final;
  if (files.length > 0) {
    final = files[0].key;
  }

  // const currentdate = new Date().toLocaleString() + '';

  console.log("Info", userDetails);

  const utilityBillRef = useRef(null);

  const handleUtilityBillClick = () => {
    // 👇️ open file input box on click of other element
    utilityBillRef.current.click();
  };

  const handleUtilityBillChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setUtilityBill(fileObj.name);
  };

  const SubmitAddressForm = () => {
    if (
      imageURL &&
      image &&
      utilityBill &&
      OldResidentialAddress &&
      NewResidentialAddress
    ) {
      setValidating(true);

      let ResidentialAddressPayload = {
        referenceId: userDetails.referenceId,
        requestedDate: startDate,
        eSignature: imageURL,
        userPicture: image,
        requestLetter: "request letter",
        oldAddress: OldResidentialAddress,
        newAddress: NewResidentialAddress,
        utilityBillFile: utilityBill,
        utilityBillFileName: utilityBill,
      };

      const newEncryptedPayload = {
        value: encryptAes(ResidentialAddressPayload),
      };

      console.log(deCryptedData(newEncryptedPayload.value));

      console.log(utilityBill);

      console.log("payload", newEncryptedPayload);
      axios
        .post(`${baseUrl}Address/Submit-Request`, newEncryptedPayload)
        .then((newResponse) => {
          console.log(newResponse, "The otp response");
          const response = deCryptedData(newResponse.data);
          console.log(response);
          if (response) {
            setImageURL(
              sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
            );
            console.log(imageURL);
            setSuccess(true);
            setValidating(false);
          }
        })
        .catch((err) => {
          toast.errorToast("Ooops, something is not right");
          console.log(err);
          setValidating(false);
        });
    } else {
      toast.errorToast(
        "You must have missed something, check the fields one more time"
      );
    }
  };

  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});

  const clear = () => {
    sigCanvas.current.clear();
    setImageURL("");
  };

  const save = () => {
    const signature = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setImageURL(signature);
  };

  console.log(userDetails);

  return (
    <>
      {success ? (
        <ResidentialAddressSucess />
      ) : (
        <div className={styles.container}>
          <form onSubmit={handleSubmit()}>
            <h1 className={styles.header}>Update residential address </h1>
            <p className={styles.theparagraph}>
              The file format should be JPEG or PDF
            </p>
            <p className={styles.paragraph}>
              Dear Sterling Alternative Finance,{" "}
            </p>
            <p className={styles.paragraph}>
              I,{" "}
              <input
                type='text'
                placeholder='insert full name'
                onChange={(e) => setfullname(e.target.value)}
                value={fullname}
                required
              />{" "}
              with account number{" "}
              <input
                type='text'
                placeholder='insert account number'
                onChange={(e) => setAccountName(e.target.value)}
                value={accountName}
                required
              />{" "}
              would like to update my residential address registered with the
              stated account from{" "}
              <input
                type='text'
                placeholder='insert old residential address'
                onChange={(e) => setOldResidentialAddress(e.target.value)}
                value={OldResidentialAddress}
                required
              />{" "}
              to{" "}
              <input
                type='text'
                placeholder='insert new residential address'
                onChange={(e) => setNewResidentialAddress(e.target.value)}
                value={NewResidentialAddress}
                required
              />{" "}
              on this day,{" "}
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(startDate)}
                customInput={<ExampleCustomInput />}
              />
            </p>

            <div className={styles.holder}>
              <div className={styles.sign}>
                <div className={styles.headerX}>
                  <div className={styles.textHeader}>
                    {/* if our we have a non-null image url we should 
      show an image and pass our imageURL state to it*/}
                    {imageURL ? (
                      <img
                        src={imageURL}
                        alt='my signature'
                        style={{
                          display: "block",
                          margin: "0 auto",
                          border: "1px solid black",
                          borderRadius: "4px",
                          width: "100px",
                          height: "30px",
                        }}
                      />
                    ) : null}
                    <p>
                      <b>E-signature</b>
                    </p>
                    <p className={styles.textHeaderPara}>
                      Kindly append your e-signature.
                    </p>
                  </div>
                  <button className={styles.clearButton} onClick={clear}>
                    Clear
                  </button>
                </div>
                <div
                  style={{
                    backgroundColor: "#F8F8F8",
                    border: "2px solid #1817174a",
                    borderRadius: "8px",
                  }}>
                  <SignaturePad
                    ref={sigCanvas}
                    canvasProps={{
                      className: `${styles.signatureCanvas}`,
                    }}
                    style={{ width: "fit-content" }}
                  />
                </div>
                <button
                  className={styles.takePicture}
                  style={{ marginTop: "10px" }}
                  onClick={save}>
                  <p>Save E-signature</p>
                </button>
              </div>

              <div className={styles.picture}>
                <div className={styles.page}>
                  <div>
                    <h5>Upload utility bill</h5>

                    <div className={styles.validated}>
                      <input
                        style={{ display: "none" }}
                        ref={utilityBillRef}
                        type='file'
                        onChange={handleUtilityBillChange}
                      />

                      <div
                        className={styles.upload}
                        onClick={handleUtilityBillClick}>
                        <p>
                          {utilityBill.length > 0 ? (
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
                </div>
              </div>
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
                      className='spinner-border text-danger mb-4'
                      role='status'>
                      <span className='sr-only'></span>
                    </div>
                  ) : (
                    <button
                      className={styles.submitActive}
                      type='submit'
                      onClick={SubmitAddressForm}>
                      Submit
                    </button>
                  )}
                </>
              ) : (
                <button className={styles.submit}>Submit</button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
}

const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <div>
    <input
      type="text"
      className={styles.customInput}
      onClick={onClick}
      ref={ref}
      value={value}
    />
    <img src={carlender} />
  </div>
));
