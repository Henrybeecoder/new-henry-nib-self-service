//@ts-ignore
//@ts-nocheck
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import altLogo from "../../assets/images/alt-logo.svg";
import group1 from "../../assets/images/Group_1.svg";
import rightArrow from "../../assets/images/right_arrow.svg";
import no2 from "../../assets/images/no2.svg";
import no3 from "../../assets/images/no3.png";
import BvnValidationDialog from "../../Components/BvnValidationDialog";
import Otp from "../../Components/OtpDialog";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAccountOpeningStep } from "../../redux/accountOpening";
import styles from "./style.module.css";
import UpdateEmailForm from "../../Components/Forms/UpdateEmailForm";
import { useNavigate } from "react-router-dom";
import { WebcamCapture } from "../../Containers/TakePicture";
import cameraX from "../../assets/images/cameraX.svg";
import cancelX from "../../assets/images/cancelX.svg";
import cancelCapture from "../../assets/images/cancelCapture.svg";
import reverse from "../../assets/images/reverse.svg";
import Done from "../../assets/images/Done.svg";
import Delete from "../../assets/images/Delete.svg";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/localStorage";
import AuthCode from "react-auth-code-input";
import * as toast from "../../utils/makeToast";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import Icon_L from "../../assets/images/Icon_L.svg";
import "react-toastify/dist/ReactToastify.css";
import UpdatePhoneNumber from "../../Components/Forms/UpdatePhoneNumber";
import { useFormik } from "formik";
import * as Yup from "yup";
import { encryptAes, deCryptedData } from "../../utils/encrypt";

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

export default function UpdatePhoneNumberPage() {
  const [image, setImage] = useState("");
  const [generatedNumber, setGeneratedNumber] = useState(0);
  const [result, setResult] = useState(false);
  const [validated, setValidated] = useState(false);
  const webcamRef = React.useRef(null);
  const [bvnCompleted, setBvnCompleted] = useState(false);
  const [referenceId, setreferenceId] = useState("");

  const validateImage = () => {
    setGeneratedNumber(0);
    setGeneratedNumber(Math.floor(Math.random() * 101));
    setResult(true);
  };

  const retry = (e: any) => {
    e.preventDefault();
    setImage("");
    setGeneratedNumber(Math.floor(Math.random() * 101));
  };

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const capture = () => {
    //@ts-ignore
    //@ts-nocheck
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const [webcam, setWebCam] = useState(false);

  const navigate = useNavigate();
  const { accountOpeningStep } = useSelector(
    (state: any) => state.accountOpeningData
  );

  const { accountType } = useSelector((state: any) => state.accountOpeningData);

  const [currentStep, setCurrentStep] = useState("bvn-validation");

  const nagivateHome = () => {
    navigate("/");
  };

  const webClick = () => {
    setWebCam(true);
    if (generatedNumber > 19) {
      setValidated(true);
    }
  };

  function closeWebCam() {
    setWebCam(false);
  }

  //for otp functions

  const verifyOTP = () => {};

  const [resultx, setResultx] = useState("");
  const handleOnChange = (res: string) => {
    setResultx(res);
  };

  const [validating, setValidating] = useState(false);

  const [userDetails, setUserDetails] = useState(
    getLocalStorageItem("userDetails")
  );

  const dispatch = useDispatch();

  const handleVerifyOTP = () => {
    setValidating(true);
    let validateOTPPayload = {
      otp: resultx,
      referenceId: referenceId,
    };
    const newEncryptedPayload = {
      value: encryptAes(validateOTPPayload),
    };

    axios
      .post(`${baseUrl}Auth/Validate-Otp`, newEncryptedPayload)
      .then((newResponse) => {
        console.log(newResponse, "The otp response");
        const response = deCryptedData(newResponse.data);
        console.log(response);
        let userInfo = getLocalStorageItem("userDetails") || {};
        setLocalStorageItem(
          "userDetails",
          JSON.stringify({
            ...userInfo,
            accountNumber: response.data.accountNumber,
            bvn: response.data.bvn,
            customerNumber: response.data.customerNumber,
            email: response.data.email,
            mobile: response.data.mobile,
            name: response.data.name,
            referenceId: response.data.referenceId,
          })
        );
        toast.successToast(response.data.message);

        setValidating(true);
        setBvnCompleted(true);
        dispatch(setAccountOpeningStep(`account-reactivation`));
      })
      .catch((err) => {
        console.log(err);
        setValidating(false);
        toast.errorToast("OTP has expired");
      });
  };
  //For bvn Validation

  const [inputs, setInputs] = useState({});

  const [Bvnvalidating, setBvnValidating] = useState(false);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
  };

  const formik = useFormik({
    initialValues: {
      bvn: "",
      accountNumber: "",
    },
    validationSchema: Yup.object({
      bvn: Yup.string()
        .required()
        .matches(/^[0-9]+$/, "Please input a valid bvn")
        .min(11, "Please input a valid bvn")
        .max(11, "Please input a valid bvn"),
      accountNumber: Yup.string()
        .required()
        .matches(/^[0-9]+$/, "Please input a valid account Number")
        .min(10, "Please input a valid account Number")
        .max(10, "Please input a valid account Number"),
    }),
    onSubmit: () => {
      validateBVN();
    },
  });

  const validateBVN = () => {
    setBvnValidating(true);
    let validateBVNPayload = {
      accountNumber: `${formik.values.accountNumber}`,
      bvn: `${formik.values.bvn}`,
      accountServiceId: 3,
    };
    let userDetails = getLocalStorageItem("userDetails") || {};
    setLocalStorageItem(
      "userDetails",
      JSON.stringify({ ...userDetails, bvn: formik.values.bvn })
    );
    // console.log(validateBVNPayload)

    const newEncryptedPayload = {
      value: encryptAes(validateBVNPayload),
    };

    axios
      .post(`${baseUrl}Auth/Validate-AccountNumber-BVN`, newEncryptedPayload, {
        headers: { "Content-type": "application/json; charset=utf-8" },
      })
      .then((newResponse) => {
        console.log(newResponse);
        const response = deCryptedData(newResponse.data);

        if (newResponse && response.status) {
          setreferenceId(response.data.referenceId);
          let userInfo = getLocalStorageItem("userDetails") || {};
          setLocalStorageItem(
            "userDetails",
            JSON.stringify({
              ...userInfo,
              otp: response.data.message,
              referenceId: response.data.referenceId,
            })
          );
          toast.successToast(response.message);

          dispatch(setAccountOpeningStep("otp"));
          setBvnValidating(false);
        } else if (!newResponse) {
          setBvnError(true);
          //console.log(err);
          setBvnValidating(false);
        }
      })
      .catch((err) => {
        setBvnError(true);
        console.log(err);
        setBvnValidating(false);
      });
  };

  //For the bvn error
  const [bvnError, setBvnError] = useState(false);
  const [attempt, setAttempt] = useState(3);

  const closeBvnError = () => {
    setBvnError(false);
  };

  const retryError = () => {
    setBvnError(false);

    setAttempt(attempt - 1);
  };

  // TODO CONSUME RESEND OTP ENDPOINT

  const handleResendOTP = (event) => {
    event.preventDefault();
    let validateResendOtp = {
      accountServiceId: 1,
      referenceId: referenceId,
    };
    axios
      .post(`${baseUrl}Auth/ResendOTP`, validateResendOtp)
      .then((response) => {
        if (response.status === 200) {
          let userInfo = getLocalStorageItem("userDetails") || {};
          setLocalStorageItem(
            "userDetails",
            JSON.stringify({
              ...userInfo,
              otp: response.data.message,
              referenceId: response.data.data.referenceId,
            })
          );
          toast.successToast(response.data.message);
          dispatch(setAccountOpeningStep("otp"));
        }
      })
      .catch((err) => {
        toast.errorToast("please try again later");
        console.log(err);
      });
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {bvnError && (
        <div className={styles.ErrorBg}>
          <div className={styles.ErrorContain}>
            <h1>BVN Validation unsuccessful</h1>
            <p>
              Kindly visit the nearest branch if you are yet to be profiled on
              the BVN platform
            </p>
            <div className={styles.ErrorButtonFlex}>
              <button className={styles.ErrorCancel} onClick={closeBvnError}>
                Cancel
              </button>
              <button className={styles.ErrorRetry} onClick={retryError}>
                Retry
              </button>
            </div>
            <p className={styles.ErrorMessage}>
              You have <b>{attempt} attempts</b> remaining
            </p>
          </div>
        </div>
      )}
      <div className="container-fluid row">
        <div className="col-md-5 d-none d-md-inline left_col">
          <div className="logo pl-4 pt-5">
            <img
              src={altLogo}
              alt="alternative finance logo"
              onClick={nagivateHome}
            />
          </div>
        </div>

        <div className="col-md-7 right_col">
          <div className="d-flex justify-content-end">
            <div className="d-flex flex-column pt-5">
              <div className="d-flex justify-content-end">
                {/* <h1 className="float-right pr-3 mb-4">Swift Savings</h1> */}
                <h1 className="pr-3 mb-4 text-capitalize">
                  Change of phone number
                </h1>
              </div>
              <nav className="mb-4">
                <ol className="breadcrumb bg-white float-right">
                  <li className="breadcrumb-item">
                    {" "}
                    <a href="#">
                      {bvnCompleted ? (
                        <span>
                          <img className={styles.done} src={Done} alt="" />
                        </span>
                      ) : (
                        <span>
                          <img className="pr-1" src={group1} alt="" />
                        </span>
                      )}
                      Bvn Validation &nbsp;
                      <span>
                        <img src={rightArrow} alt="" />
                      </span>
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    {" "}
                    <a href="#">
                      <span>
                        <img className="pr-1" src={no2} alt="" />
                      </span>{" "}
                      Update phone number
                    </a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-md-11 card validation-card pb-4">
              {accountOpeningStep === "bvn-validation" ? (
                <div>
                  {/* <div className="card-form px-4"> */}
                  <div className={`card-form`}>
                    <div className="card-body">
                      <h4 className="card-title text-center pl-5 mt-4">
                        {accountType === "minor savings"
                          ? "Parent/Guardian's BVN"
                          : ""}{" "}
                        BVN Validation
                      </h4>
                      <div className="bvn_val mb-4">
                        <img src={Icon_L} alt="" />
                        <small className="text-danger ml-4">
                          Kindly ensure that your BVN information is up to date
                        </small>
                      </div>
                      <div className="form-group">
                        <div className="d-flex justify-content-between pb-1 fillup">
                          <label htmlFor="name" className="fila">
                            Enter BVN
                          </label>
                          <i
                            className="bx bxs-info-circle"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="The Bank Verification Number (BVN) is an 11-digit number.Dial *565*0# to check your BVN"
                          ></i>
                        </div>
                        <input
                          name="bvn"
                          value={formik.values.bvn}
                          onChange={formik.handleChange}
                          maxLength={11}
                          className="form-control bvn_input border-dark"
                          style={{ textAlign: "left" }}
                          type="text"
                          id="bvn"
                          placeholder="Enter your BVN"
                        />
                        {formik.touched.bvn && formik.errors.bvn ? (
                          <small className="text-danger">
                            {formik.errors.bvn}
                          </small>
                        ) : null}
                      </div>

                      <div className="form-group">
                        <div className="d-flex justify-content-between pb-1 fillup">
                          <label htmlFor="name" className="fila">
                            Account number
                          </label>
                        </div>
                        <input
                          name="accountNumber"
                          className="form-control bvn_input text-muted border-dark"
                          style={{ textAlign: "left" }}
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.accountNumber}
                          id="accountNumber"
                          placeholder="Enter your account number"
                        />
                        {formik.touched.accountNumber &&
                        formik.errors.accountNumber ? (
                          <small className="text-danger">
                            {formik.errors.accountNumber}
                          </small>
                        ) : null}
                      </div>

                      <div className="d-flex justify-content-end mt-4">
                        {Bvnvalidating ? (
                          <div
                            className="spinner-border text-danger"
                            role="status"
                          >
                            <span className="sr-only"></span>
                          </div>
                        ) : (
                          <button
                            className="btn btn-dange float-right btn-filled-red"
                            onClick={formik.handleSubmit}
                          >
                            Validate
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              {accountOpeningStep === "otp" ? (
                <div>
                  <Toaster position="top-center" reverseOrder={false} />
                  <div className=" card-form pl-5 pr-5 ">
                    <div className="card-body text-center">
                      <h4 className="card-title text-center pt-4 mt-5">
                        Enter OTP
                      </h4>
                      <p className="text-muted">
                        An OTP has been sent to the mobile number captured in{" "}
                        <br />
                        your BVN. Kindly enter the OTP to proceed.
                      </p>

                      <div className={styles.otpHolder}>
                        <AuthCode
                          inputClassName={styles.otp}
                          placeholder="*"
                          length={4}
                          allowedCharacters="numeric"
                          onChange={handleOnChange}
                        />
                      </div>

                      {validating ? (
                        <div
                          className="spinner-border text-danger mb-4"
                          role="status"
                        >
                          <span className="sr-only"></span>
                        </div>
                      ) : (
                        <button
                          disabled={resultx.length != 4}
                          type="submit"
                          className="btn btn-danger btn-filled-red mb-4 proceed-btn"
                          onClick={handleVerifyOTP}
                        >
                          Proceed
                        </button>
                      )}

                      <p>
                        <small>
                          Did not get the OTP?{" "}
                          <span className="font-weight-bold">
                            <u
                              style={{ cursor: "pointer" }}
                              onClick={handleResendOTP}
                            >
                              Resend OTP
                            </u>
                          </span>
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {accountOpeningStep === "account-reactivation" ? (
                <UpdatePhoneNumber
                  webClick={webClick}
                  image={image}
                  generatedNumber={generatedNumber}
                  validated={validated}
                />
              ) : (
                ""
              )}

              {/* <button onClick={next}>next</button> */}
            </div>
          </div>
        </div>
      </div>
      {webcam && (
        <div className={styles.bg}>
          <div className={styles.webcamContainer}>
            <div className={styles.header}>
              <h3>Take Live Picture</h3>
              <img
                src={cancelX}
                alt=""
                className={styles.cancel}
                onClick={closeWebCam}
              />
            </div>

            <div className={styles.webcam}>
              {image == "" ? (
                <>
                  <Webcam
                    audio={false}
                    height={matches ? 450 : 250}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={matches ? 450 : 250}
                    videoConstraints={videoConstraints}
                  />
                </>
              ) : (
                <img src={image} />
              )}
              {image != "" ? (
                // <Button
                //   variant="contained"
                //   color="secondary"
                //   size="small"

                //   className="webcam-btn"
                // >
                //   Retake Image
                // </Button>
                <div>
                  {result ? (
                    <div>
                      <div className={styles.resultFlex}>
                        <div className={styles.resultText}>
                          {generatedNumber > 19 ? (
                            <img src={Done} alt="" />
                          ) : (
                            <img src={Delete} alt="" />
                          )}

                          <div className={styles.iconFlex}>
                            <p>Validated</p>
                            <p>
                              Match score grade{" "}
                              <span
                                className={`${
                                  generatedNumber > 19
                                    ? `${styles.success}`
                                    : `${styles.failed}`
                                }`}
                              >
                                {generatedNumber}%
                              </span>
                            </p>
                          </div>
                        </div>
                        {generatedNumber > 19 && (
                          <button onClick={closeWebCam}>Okay</button>
                        )}
                      </div>
                      {generatedNumber < 20 && (
                        <div className={styles.flexButton}>
                          <button
                            className={styles.retry}
                            onClick={closeWebCam}
                          >
                            Cancel
                          </button>
                          <button className={styles.validate} onClick={retry}>
                            Retry
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={styles.flexButton}>
                      <button
                        className={styles.retry}
                        onClick={(e) => {
                          e.preventDefault();
                          setImage("");
                        }}
                      >
                        Retry
                      </button>
                      <button
                        className={styles.validate}
                        onClick={validateImage}
                      >
                        Validate
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // <Button
                //   variant="contained"
                //   color="secondary"
                //   size="small"

                //   className="webcam-btn"
                // >
                //   <img src={cameraX} />
                // </Button>

                <div className={styles.captureButtons}>
                  <button className={styles.cancelCapture}>
                    <img src={cancelCapture} alt="" />
                  </button>
                  <button
                    className={styles.getCapture}
                    onClick={(e) => {
                      e.preventDefault();
                      capture();
                    }}
                  >
                    <img src={cameraX} alt="" />
                  </button>
                  <button className={styles.reverseCapture}>
                    <img src={reverse} alt="" />
                  </button>
                </div>
              )}
            </div>
            <div className="ImageCam"></div>
          </div>
        </div>
      )}
    </div>
  );
}
