import React, { useState, useRef } from "react";
import styles from "./style.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import carlender from "../../../assets/images/calender.svg";
import cameraX from "../../../assets/images/cameraX.svg";
import { WebcamCapture } from "../../../Containers/TakePicture";
import { useForm } from "react-hook-form";
import PhoneNumberSucess from "./PhoneNumberSuccess";
import { getLocalStorageItem } from "../../../utils/localStorage";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import * as toast from "../../../utils/makeToast";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import SignaturePad from "react-signature-canvas";
import { encryptAes, deCryptedData } from "../../../utils/encrypt";

export default function UpdatePhoneNumber({
  webClick,
  image,
  generatedNumber,
  validated,
}) {
  const { register, handleSubmit, watch, errors } = useForm();
  const [success, setSuccess] = useState(false);
  const onSubmit = (data) => {
    SubmitPhoneNumberForm();
  };
  const [startDate, setStartDate] = useState(new Date());

  const [NewPhoneNumber, setNewPhoneNumber] = useState("");
  const [validating, setValidating] = useState(false);
  const [eSignature, setESignature] = useState("");
  const [userDetails, setUserDetails] = useState(
    getLocalStorageItem("userDetails")
  );

  const SubmitPhoneNumberForm = () => {
    //@ts-ignore
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    setValidating(true);
    let PhoneNumberPayload = {
      referenceId: userDetails.referenceId,
      requestedDate: startDate,
      eSignature: imageURL,
      userPicture: image,
      requestLetter: "request letter",
      oldPhoneNumber: userDetails.mobile,
      newPhoneNumber: NewPhoneNumber,
    };

    const newEncryptedPayload = {
      value: encryptAes(PhoneNumberPayload),
    };

    axios
      .post(`${baseUrl}PhoneNumber/Submit-Request`, newEncryptedPayload)
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

  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});

  //@ts-ignore
  const clear = () => sigCanvas.current.clear();

  return (
    <>
      {success ? (
        <PhoneNumberSucess />
      ) : (
        <div className={styles.container}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.header}>Update phone number</h1>
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
              would like to update my phone number registered with the stated
              account from{" "}
              <input
                type="text"
                placeholder="insert old phone number"
                value={userDetails.mobile}
                required
              />{" "}
              to{" "}
              <input
                type="text"
                placeholder="insert new phone number"
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                value={NewPhoneNumber}
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
                {/* <textarea
                  type="text"
                  onChange={(e) => setESignature(e.target.value)}
                  value={eSignature}
                  required
                ></textarea> */}
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
                      className="spinner-border text-danger mb-4"
                      role="status"
                    >
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    <button className={styles.submitActive} type="submit">
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
//@ts-ignore
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
