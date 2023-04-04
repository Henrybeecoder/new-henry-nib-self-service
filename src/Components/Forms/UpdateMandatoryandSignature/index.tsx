//@ts-ignore
//@ts-nocheck
import React, { useState, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import * as toast from "../../../utils/makeToast";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { getLocalStorageItem } from "../../../utils/localStorage";
import styles from "./style.module.css";
import DatePicker from "react-datepicker";
import SignaturePad from "react-signature-canvas";
import "react-datepicker/dist/react-datepicker.css";
import carlender from "../../../assets/images/calender.svg";
import cameraX from "../../../assets/images/cameraX.svg";
import { WebcamCapture } from "../../../Containers/TakePicture";
import { useForm } from "react-hook-form";
import MandatorySucess from "./MandatorySuccess";
import { encryptAes, deCryptedData } from "../../../utils/encrypt";

export default function UpdateMandatoryForm({
  webClick,
  image,
  generatedNumber,
  validated,
}): JSX.Element {
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
  const [fullname, setfullname] = useState("");
  const [accountName, setAccountName] = useState("");
  const [OldPhoneNumber, setOldPhoneNumber] = useState("");
  const [NewPhoneNumber, setNewPhoneNumber] = useState("");

  // if (
  //   fullname.length > 0
  //   // accountName.length > 0 &&
  //   // OldEmailAddress > 0 &&
  //   // NewEmailAddress > 0
  // ) {
  //   setValidated(true);
  // }

  console.log(
    startDate,
    fullname.length,
    accountName,
    // OldEmailAddress,
    // NewEmailAddress,
    OldPhoneNumber,
    NewPhoneNumber
  );

  console.log(validated);
  console.log("UserDetails", userDetails);

  const currentdate = new Date().toLocaleString() + "";

  const SubmitMandateForm = () => {
    if (imageURL && image) {
      setValidating(true);

      let MandatePayload = {
        referenceId: userDetails.referenceId,
        requestedDate: currentdate,
        eSignature: imageURL,
        userPicture: image,
        requestLetter: "request letter",
        mandateSignatureType: "Individual",
        corporateSignatories: "sign",
        individualSignatory: "sign",
      };

      const newEncryptedPayload = {
        value: encryptAes(MandatePayload),
      };

      axios
        .post(`${baseUrl}MandateSignature/Submit-Request`, newEncryptedPayload)
        .then((newResponse) => {
          console.log(newResponse, "The otp response");
          const response = deCryptedData(newResponse.data);
          console.log(response, "the response");
          if (response) {
            setImageURL(
              sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
            );

            setSuccess(true);
            setValidating(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setSuccess(true);
          setValidating(false);
        });
    } else {
      toast.errorToast("Please append your signature");
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

  return (
    <>
      {success ? (
        <MandatorySucess />
      ) : (
        <div className={styles.container}>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <h1 className={styles.header}>
            Update mandate and signature (Individual)
          </h1>

          <div className={styles.holder}>
            <div className={styles.sign}>
              <div className={styles.headerX}>
                <div className={styles.textHeader}>
                  {/* if our we have a non-null image url we should 
      show an image and pass our imageURL state to it*/}
                  {imageURL ? (
                    <img
                      src={imageURL}
                      alt="my signature"
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
                }}
              >
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
                onClick={save}
              >
                <p>Save E-signature</p>
              </button>
            </div>

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
                    <img src={cameraX} alt="" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={styles.flexButton}>
            <button className={styles.previous}>Previous</button>

            {generatedNumber > 19 ? (
              <>
                {validating ? (
                  <div
                    className="spinner-border text-danger mb-4"
                    role="status"
                  >
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  <button
                    className={styles.submitActive}
                    type="submit"
                    onClick={SubmitMandateForm}
                  >
                    Submit
                  </button>
                )}
              </>
            ) : (
              <button className={styles.submit}>Submit</button>
            )}
          </div>
          {/* </form> */}
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
