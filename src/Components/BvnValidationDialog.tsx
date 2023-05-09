//@ts-nocheck
//@ts-ignore
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Icon_L from "../assets/images/Icon_L.svg";
import { setStep } from "../redux/global";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import {
  setLocalStorageItem,
  getLocalStorageItem,
} from "../utils/localStorage";
import * as toast from "../utils/makeToast";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
//import styles from "./style.module.css";

function BvnValidationDialog(props: any) {
  const [inputs, setInputs] = useState({});

  const [validating, setValidating] = useState(false);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
  };

  const [accountType] = useState(localStorage.getItem("altFinanceAccountType"));

  console.log(inputs.bvn);
  console.log(typeof inputs.bvn);
  console.log(inputs.accountNumber);

  const dispatch = useDispatch();

  const handleValidateBVN = () => {
    if (checkFormValidity()) {
      setValidating(true);
      validateBVN();
    } else {
      // console.log('invalid form')
    }
  };

  const validateBVN = () => {
    let validateBVNPayload = {
      accountNumber: `${inputs.accountNumber}`,
      bvn: `${inputs.bvn}`,
      accountServiceId: 1,
    };
    let userDetails = getLocalStorageItem("userDetails") || {};
    setLocalStorageItem(
      "userDetails",
      JSON.stringify({ ...userDetails, bvn: inputs.bvn })
    );
    console.log("BVN PAGE Deets:", userDetails);
    // console.log(validateBVNPayload)
    axios
      .post(`${baseUrl}Auth/Validate-AccountNumber-BVN`, validateBVNPayload)
      .then((response) => {
        console.log(response);
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

          console.log(response.data.message);

          dispatch(setStep("otp"));
        }
        // if (response.data.isSuccess) {
        //   // toast.successToast(response.data.otp)
        //   console.log(response.data.otp);
        //   let userInfo = getLocalStorageItem("userDetails") || {};
        //   setLocalStorageItem(
        //     "userDetails",
        //     JSON.stringify({
        //       ...userInfo,
        //       firstName: response.data.firstName,
        //       lastName: response.data.lastName,
        //       middleName: response.data.middleName,
        //       phoneNumber: response.data.phoneNumber,
        //     })
        //   );
        //   setLocalStorageItem(
        //     "bvnValidationData",
        //     JSON.stringify({ ...response.data })
        //   );

        //   dispatch(setStep("otp"));
        // } else {
        //   toast.errorToast(response.data.responseMessage);
        // }
        setValidating(false);
      })
      .catch((err) => {
        toast.errorToast("something went wrong");
        console.log(err);
        setValidating(false);
      });
  };

  const checkFormValidity = () => {
    if (
      inputs.bvn.length < 11 ||
      inputs.bvn.length > 11 ||
      inputs.accountNumber.length > 10 ||
      inputs.accountNumber.length < 10
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <Toaster position='top-center' reverseOrder={false} />
      {/* <div className="card-form px-4"> */}
      <div className={`card-form`}>
        <div className='card-body'>
          <h4 className='card-title text-center pl-5 mt-4'>
            {accountType === "minor savings" ? "Parent/Guardian's BVN" : ""} BVN
            Validation
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
              value={inputs.bvn}
              onChange={handleChange}
              maxLength={11}
              className='form-control bvn_input border-dark'
              style={{ textAlign: "left" }}
              type='text'
              id='bvn'
              placeholder='Enter your BVN'
            />
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
              onChange={handleChange}
              id='accountNumber'
              placeholder='Enter your account number'
              value={inputs.accountNumber}
            />
          </div>

          <div className='d-flex justify-content-end mt-4'>
            {validating ? (
              <div className='spinner-border text-danger' role='status'>
                <span className='sr-only'></span>
              </div>
            ) : (
              <button
                className='btn btn-dange float-right btn-filled-red'
                onClick={handleValidateBVN}>
                Validate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BvnValidationDialog;
