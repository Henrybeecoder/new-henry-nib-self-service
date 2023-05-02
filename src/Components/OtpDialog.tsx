import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setStep } from "../redux/global";
import "./OtpDialog.css";
import AuthCode from "react-auth-code-input";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import * as toast from "../utils/makeToast";
import { Toaster } from "react-hot-toast";

function OtpDialog(props: any) {
  const [result, setResult] = useState("");

  const handleOnChange = (res: string) => {
    setResult(res);
  };

  const [validating, setValidating] = useState(false);

  const [resetOTP, setResetOTP] = useState(false);

  const [userDetails, setUserDetails] = useState(
    getLocalStorageItem("userDetails")
  );

  console.log(userDetails.otp);

  useEffect(() => {
    toast.successToast(userDetails.otp);
  }, [userDetails]);

  const dispatch = useDispatch();

  const handleVerifyOTP = () => {
    setValidating(true);
    let validateOTPPayload = {
      phoneNumber: userDetails.phoneNumber,
      otp: result,
      bvn: userDetails.bvn,
    };
    // console.log(validateOTPPayload)

    axios
      .post(`${baseUrl}Auth/Validate-Otp`, validateOTPPayload) //Authentication/validateOTP
      .then((response) => {
        if (response.data.UserDetails && response.data.accessToken) {
          let userInfo = getLocalStorageItem("userDetails") || {};

          setLocalStorageItem("accessToken", response.data.accessToken);
          setLocalStorageItem(
            "userDetails",
            JSON.stringify({ ...userInfo, ...response.data.UserDetails })
          );

          toast.successToast(response.data.message);
          dispatch(setStep("update-detail"));
        } else {
          toast.errorToast(response.data.message);
        }
        setValidating(false);
      })
      .catch((err) => {
        // console.log(err)
        setValidating(false);
        toast.errorToast("something went wrong");
        // dispatch(setStep('update-detail'))
      });
  };

  // TODO CONSUME RESEND OTP ENDPOINT

  const handleResendOTP = (event) => {
    event.preventDefault();
    let validateResendOtp = {
      accountServiceId: 1,
      // referenceId: referenceId,
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
          dispatch(setStep("otp"));
        }
      })
      .catch((err) => {
        toast.errorToast("please try again later");
        console.log(err);
      });
  };

  return (
    <div>
      <Toaster position='top-center' reverseOrder={false} />
      <div className=' card-form pl-5 pr-5 '>
        <div className='card-body text-center'>
          <h4 className='card-title text-center pt-4 mt-5'>Enter OTP</h4>
          <p className='text-muted'>
            An OTP has been sent to the mobile number captured in <br />
            your BVN. Kindly enter the OTP to proceed.
          </p>

          <div className='mt-4 mb-4'>
            <AuthCode
              inputClassName='text-center'
              placeholder='*'
              length={4}
              allowedCharacters='numeric'
              onChange={handleOnChange}
            />
          </div>

          {validating ? (
            <div className='spinner-border text-danger mb-4' role='status'>
              <span className='sr-only'></span>
            </div>
          ) : (
            <button
              disabled={result.length != 4}
              type='submit'
              className='btn btn-danger btn-filled-red mb-4 proceed-btn'
              onClick={handleVerifyOTP}>
              Proceed
            </button>
          )}

          {/* TODO RESET OTP  */}

          <p>
            <small>
              Did not get the OTP?{" "}
              <span className='font-weight-bold'>
                <u className='cursor-pointer' onClick={handleResendOTP}>
                  Resend OTP
                </u>
              </span>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OtpDialog;
