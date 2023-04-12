import { Toaster } from "react-hot-toast";
import Icon_L from "../../assets/images/Icon_L.svg";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/localStorage";
import { deCryptedData, encryptAes } from "../../utils/encrypt";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { Dispatch, useState } from "react";
import * as toast from "../../utils/makeToast";
import { useDispatch, useSelector } from "react-redux";
import { setAccountOpeningStep } from "../../redux/accountOpening";
import styles from "./style.module.css";
import AuthCode from "react-auth-code-input";

interface Props {
  setComplete: (state: boolean) => void;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = {
  bvn: "",
  accountNumber: "",
};

export type BvnValidationForm = typeof initialValues;

const VS = Yup.object({
  bvn: Yup.string()
    .required("bvn is a required field")
    .matches(/^[0-9]+$/, "Please input a valid bvn")
    .min(11, "Please input a valid bvn")
    .max(11, "Please input a valid bvn"),
  accountNumber: Yup.string()
    .required("account number is a required field")
    .matches(/^[0-9]+$/, "Please input a valid account Number")
    .min(10, "Please input a valid account Number")
    .max(10, "Please input a valid account Number"),
});

const BvnValidation = ({ setComplete, setIsLoading }: Props) => {
  const [loading, setLoading] = useState({ otp: false, bvn: false });
  const [error, setError] = useState(false);
  const [referenceId, setreferenceId] = useState("");

  const [attempt, setAttempt] = useState(3);
  const [serverOtp, setServerOtp] = useState("");

  const dispatch = useDispatch();

  const { step, accountType } = useSelector((state: any) => ({
    step: state.accountOpeningData.accountOpeningStep,
    accountType: state.accountOpeningData.accountType,
  }));

  const validateBVN = async (values: BvnValidationForm) => {
    setLoading((state) => ({ otp: state.otp, bvn: true }));
    try {
      let validateBVNPayload = {
        accountNumber: `${values.accountNumber}`,
        bvn: `${values.bvn}`,
        accountServiceId: 3,
      };
      let userDetails = getLocalStorageItem("userDetails") || {};
      setLocalStorageItem(
        "userDetails",
        JSON.stringify({ ...userDetails, bvn: values.bvn })
      );
      const newEncryptedPayload = {
        value: encryptAes(validateBVNPayload),
      };

      const { data } = await axios.post(
        `${baseUrl}Auth/Validate-AccountNumber-BVN`,
        newEncryptedPayload,
        {
          headers: { "Content-type": "application/json; charset=utf-8" },
        }
      );
      const response = deCryptedData(data);

      if (data && response.status) {
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
        setLoading((state) => ({ otp: state.otp, bvn: false }));
      } else if (!data) {
        setError(true);
        //console.log(err);
        setLoading((state) => ({ otp: state.otp, bvn: false }));
      }
    } catch (err) {
      setError(true);
      console.log(err);
      setLoading((state) => ({ otp: state.otp, bvn: false }));
    }
  };

  const handleVerifyOTP = async () => {
    setLoading((state) => ({ bvn: state.bvn, otp: true }));
    let validateOTPPayload = {
      otp: serverOtp,
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

        setLoading((state) => ({ bvn: state.bvn, otp: false }));
        setComplete(true);
        dispatch(setAccountOpeningStep(`account-reactivation`));
      })
      .catch((err) => {
        console.log(err);
        setLoading((state) => ({ bvn: state.bvn, otp: false }));
        toast.errorToast("OTP has expired");
      });
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
    try {
      let validateResendOtp = {
        accountServiceId: 3,
        referenceId: referenceId,
      };
      const newEncryptedPayload = {
        value: encryptAes(validateResendOtp),
      };
      console.log(validateResendOtp, "handle this");
      setIsLoading(true);
      const { data } = await axios.post(
        `${baseUrl}Auth/ResendOTP`,
        newEncryptedPayload
      );

      console.log(data);
      const response = deCryptedData(data);
      if (response.status) {
        let userInfo = getLocalStorageItem("userDetails") || {};
        setLocalStorageItem(
          "userDetails",
          JSON.stringify({
            ...userInfo,
            otp: response.message,
            referenceId: response.data.referenceId,
          })
        );
        toast.successToast(response.message);
        dispatch(setAccountOpeningStep("otp"));
        setIsLoading(false);
        setLoading((state) => ({ bvn: state.bvn, otp: false }));
      }
    } catch (err) {
      toast.errorToast("please try again later");
      setIsLoading(false);
      setLoading((state) => ({ bvn: state.bvn, otp: false }));
      console.log(err);
    }
  };

  const closeBvnError = () => {
    setError(false);
  };

  const retryError = () => {
    setError(false);
    setAttempt(attempt - 1);
  };

  return (
    <>
      {error && (
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

      {step === "bvn-validation" ? (
        <Formik
          initialValues={initialValues}
          onSubmit={validateBVN}
          validationSchema={VS}>
          {({ dirty, getFieldProps, touched, errors, isValid }) => (
            <Form>
              <Toaster position='top-center' reverseOrder={false} />
              {/* <div className="card-form px-4"> */}
              <div className={`card-form`}>
                <div className='card-body'>
                  <h4 className='card-title text-center pl-5 mt-4'>
                    {accountType === "minor savings"
                      ? "Parent/Guardian's BVN"
                      : ""}{" "}
                    BVN Validation
                  </h4>
                  <div className='bvn_val mb-4'>
                    <img src={Icon_L} alt='' />
                    <small className='text-danger ml-4'>
                      Kindly ensure that your BVN information is up to date
                    </small>
                  </div>
                  <div className='form-group'>
                    <div className='d-flex justify-content-between pb-1 fillup'>
                      <label htmlFor='name' className='fila'>
                        Enter BVN
                      </label>
                      <i
                        className='bx bxs-info-circle'
                        data-toggle='tooltip'
                        data-placement='bottom'
                        title='The Bank Verification Number (BVN) is an 11-digit number.Dial *565*0# to check your BVN'></i>
                    </div>
                    <input
                      name='bvn'
                      maxLength={11}
                      className='form-control bvn_input border-dark'
                      style={{ textAlign: "left" }}
                      type='text'
                      {...getFieldProps("bvn")}
                      placeholder='Enter your BVN'
                    />
                    {touched.bvn && errors.bvn ? (
                      <small className='text-danger'>{errors.bvn}</small>
                    ) : null}
                  </div>

                  <div className='form-group'>
                    <div className='d-flex justify-content-between pb-1 fillup'>
                      <label htmlFor='name' className='fila'>
                        Account number
                      </label>
                    </div>
                    <input
                      name='accountNumber'
                      className='form-control bvn_input text-muted border-dark'
                      style={{ textAlign: "left" }}
                      type='text'
                      placeholder='Enter your account number'
                      {...getFieldProps("accountNumber")}
                    />
                    {touched.accountNumber && errors.accountNumber ? (
                      <small className='text-danger'>
                        {errors.accountNumber}
                      </small>
                    ) : null}
                  </div>

                  <div className='d-flex justify-content-end mt-4'>
                    {loading.bvn ? (
                      <div className='spinner-border text-danger' role='status'>
                        <span className='sr-only'></span>
                      </div>
                    ) : (
                      <>
                        <div className='d-flex justify-content-end mt-4'>
                          {loading.bvn ? (
                            <div
                              className='spinner-border text-danger'
                              role='status'>
                              <span className='sr-only'></span>
                            </div>
                          ) : (
                            <>
                              {attempt > 0 ? (
                                <button
                                  disabled={!isValid || !dirty}
                                  className='btn btn-dange float-right btn-filled-red'
                                  type='submit'>
                                  Validate
                                </button>
                              ) : (
                                <button className={styles.submit}>
                                  Submit
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : step === "otp" ? (
        <div>
          <div className=' card-form pl-5 pr-5 '>
            <div className='card-body text-center'>
              <h4 className='card-title text-center pt-4 mt-5'>Enter OTP</h4>
              <p className='text-muted'>
                An OTP has been sent to the mobile number captured in <br />
                your BVN. Kindly enter the OTP to proceed.
              </p>

              <div className={styles.otpHolder}>
                <AuthCode
                  inputClassName={styles.otp}
                  placeholder='*'
                  length={4}
                  allowedCharacters='numeric'
                  onChange={(value) => setServerOtp(value)}
                />
              </div>

              {loading.otp ? (
                <div className='spinner-border text-danger mb-4' role='status'>
                  <span className='sr-only'></span>
                </div>
              ) : (
                <button
                  disabled={serverOtp.length !== 4}
                  type='submit'
                  className='btn btn-danger btn-filled-red mb-4 proceed-btn'
                  onClick={handleVerifyOTP}>
                  Proceed
                </button>
              )}

              {/* TODO reset otp */}

              <p>
                <small>
                  Did not get the OTP?{" "}
                  <span className='font-weight-bold'>
                    <u style={{ cursor: "pointer" }} onClick={handleResendOTP}>
                      Resend OTP
                    </u>
                  </span>
                </small>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BvnValidation;
