import React, { useState, useRef, useCallback } from "react";
import Front from "./front";
import Back from "./back";
import styles from "./style.module.css";
import shift from "../../../assets/downloads/shift.svg";
import ChequeDepositSuccess from "./ChequeDepositSuccess";
import { baseUrl } from "../../../utils/baseUrl";
import * as toast from "../../../utils/makeToast";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { getLocalStorageItem } from "../../../utils/localStorage";
import SignaturePad from "react-signature-canvas";
import { encryptAes, deCryptedData } from "../../../utils/encrypt";
import axios from "axios";

export default function ChequeDepositForm() {
  const [front, setFront] = useState<any>("");
  const [back, setBack] = useState<any>("");
  const [amount, setAmount] = useState<any>("");
  const [validating, setValidating] = useState(false);
  const [result, setResult] = useState(false);
  const [change, setChange] = useState(true);
  const [success, setSuccess] = useState(false);
  const [userDetails, setUserDetails] = useState(
    getLocalStorageItem("userDetails")
  );

  const proceedFunction = () => {
    setResult(true);
  };

  const closeResult = () => {
    setResult(false);
  };

  const submitChequeDepositForm = () => {
    setValidating(true);
    let ChequeDepositPayload = {
      front: front,
      bank: back,
      referenceId: userDetails.referenceId,
      requestedDate: new Date(),
    };

    const newEncryptedPayload = {
      value: encryptAes(ChequeDepositPayload),
    };

    axios
      .post(
        `${baseUrl}ChequeDeposit/submit-cheque-deposit`,
        newEncryptedPayload
      )
      .then((newResponse) => {
        console.log(newResponse, "The otp response");
        const response = deCryptedData(newResponse.data);
        console.log(response);

        setSuccess(true);

        toast.successToast(response.message);

        setValidating(false);
      })
      .catch((err) => {
        //toast.errorToast("something went wrong");
        console.log(err);
        setSuccess(true);

        setValidating(false);
      });
  };
  return (
    <>
      {success ? (
        <ChequeDepositSuccess />
      ) : (
        <div>
          <h1 className={styles.header}>Cheque deposit details</h1>
          <p className={styles.paragraph}>
            The file format should be JPEG or PDF
          </p>

          {result && (
            <div className={styles.ErrorBg}>
              <div className={styles.ErrorContain}>
                <h1 className={styles.header}>Confirm details</h1>
                <p className={styles.paragraph}>
                  Kindly confirm the details of your cheque deposit
                </p>
                <div className={styles.shownAmount}>
                  <p>Amount</p>
                  <div
                    className={styles.shownAmountContainer}
                  >{`N${amount}`}</div>
                </div>
                <div className={styles.slider}>
                  <div className={styles.imgHolder}>
                    {change ? (
                      <img src={front} alt="" className={styles.imgCorn} />
                    ) : (
                      <img src={back} alt="" className={styles.imgCorn} />
                    )}
                  </div>
                  <div>
                    <img
                      src={shift}
                      alt=""
                      onClick={() => setChange((prevState) => !prevState)}
                      className={styles.shift}
                    />
                  </div>
                </div>
                <div className={styles.ErrorButtonFlex}>
                  <button className={styles.ErrorCancel} onClick={closeResult}>
                    Edit
                  </button>

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
                      className={styles.ErrorRetry}
                      type="submit"
                      onClick={submitChequeDepositForm}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          <>
            <div className={styles.uploadRow}>
              <Front front={front} setFront={setFront} />
              <Back back={back} setBack={setBack} />
            </div>
            <div className="col-lg-6 mr-2">
              <label htmlFor="streetname" className="label_text">
                Enter amount
              </label>
              <input
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                type="text"
                className="form-control bg-white border-dark"
                placeholder="Enter amount"
              />
            </div>
            <div className={styles.flexButton}>
              <button className={styles.previous}>Previous</button>

              {amount.length > 1 && front.length > 1 && back.length > 1 ? (
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
                      type="submit"
                      onClick={proceedFunction}
                    >
                      Proceed
                    </button>
                  )}
                </>
              ) : (
                <button className={styles.submit}>Proceed</button>
              )}
            </div>
          </>
        </div>
      )}
    </>
  );
}
