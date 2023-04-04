import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import carlender from "../../../assets/images/calender.svg";
import cameraX from "../../../assets/images/cameraX.svg";
import { WebcamCapture } from "../../../Containers/TakePicture";
import { useForm } from "react-hook-form";
import EmailSucess from "./EmailSuccess";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import * as toast from "../../../utils/makeToast";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { getLocalStorageItem } from "../../../utils/localStorage";
import SignaturePad from "react-signature-canvas";
import { encryptAes, deCryptedData } from "../../../utils/encrypt";
import * as EmailValidator from "email-validator";

export default function UpdateEmailForm({
  webClick,
  image,
  generatedNumber,
  validated,
}) {
  const { register, handleSubmit, watch, errors } = useForm();
  const [success, setSuccess] = useState(false);
  const onSubmit = (data) => {
    SubmitEmailForm();
  };

  const [startDate, setStartDate] = useState(new Date());
  const [fullname, setfullname] = useState("");
  const [accountName, setAccountName] = useState("");
  const [OldEmailAddress, setOldEmailAddress] = useState("");
  const [NewEmailAddress, setNewEmailAddress] = useState("");
  const [eSignature, setESignature] = useState("");
  const [userDetails, setUserDetails] = useState(
    getLocalStorageItem("userDetails")
  );
  const [validating, setValidating] = useState(false);

  const SubmitEmailForm = () => {
    //@ts-ignore
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));

    let EmailPayload = {
      referenceId: userDetails.referenceId,
      requestedDate: startDate,
      eSignature: imageURL,
      userPicture: image,
      requestLetter: "",
      oldEmail: userDetails.email,
      newEmail: NewEmailAddress,
    };

    const newEncryptedPayload = {
      value: encryptAes(EmailPayload),
    };

    if (EmailValidator.validate(NewEmailAddress)) {
      setValidating(true);
      axios
        .post(`${baseUrl}Email/Submit-Request`, newEncryptedPayload)
        .then((newResponse) => {
          console.log(newResponse, "The otp response");
          const response = deCryptedData(newResponse.data);
          console.log(response);

          setSuccess(true);

          toast.successToast(response.message);

          setValidating(false);
        })
        .catch((err) => {
          toast.errorToast("something went wrong");
          console.log(err);

          setValidating(false);
        });
    } else {
      toast.errorToast("Please enter a valid email address");
    }
  };

  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});

  //@ts-ignore
  const clear = () => sigCanvas.current.clear();

  return (
    <>
      {success ? (
        <EmailSucess />
      ) : (
        <div className={styles.container}>
          <Toaster position="top-center" reverseOrder={false} />

          <h1 className={styles.header}>Update email address</h1>
          <p className={styles.paragraph}>
            Dear Sterling Alternative Finance,{" "}
          </p>
          <p className={styles.paragraph}>
            I,{" "}
            <input
              type="text"
              placeholder="insert full name"
              value={userDetails.name}
              required
            />{" "}
            with account number{" "}
            <input
              type="text"
              placeholder="insert account name"
              value={userDetails.accountNumber}
              required
            />{" "}
            would like to update my email address registered with the stated
            account from{" "}
            <input
              type="text"
              placeholder="insert old email address"
              value={userDetails.email}
              required
            />{" "}
            to{" "}
            <input
              type="text"
              placeholder="insert new email address"
              onChange={(e) => setNewEmailAddress(e.target.value)}
              value={NewEmailAddress}
              required
            />{" "}
            on this day,{" "}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={<ExampleCustomInput />}
            />
          </p>
          <div className={styles.holder}>
            <div className={styles.sign}>
              <div className={styles.headerX}>
                <div className={styles.textHeader}>
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

              <SignaturePad
                ref={sigCanvas}
                canvasProps={{
                  className: `${styles.signatureCanvas}`,
                }}
              />
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      alignContent: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <div
                      className="spinner-border text-danger mb-4"
                      role="status"
                    >
                      <span className="sr-only"></span>
                    </div>
                  </div>
                ) : (
                  <button
                    className={styles.submitActive}
                    onClick={SubmitEmailForm}
                  >
                    Submit
                  </button>
                )}
              </>
            ) : (
              <button className={styles.submit} disabled>
                Submit
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

//@ts-ignore
//@ts-nocheck

const ExampleCustomInput = React.forwardRef(({ value, onClick, ref }) => (
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
