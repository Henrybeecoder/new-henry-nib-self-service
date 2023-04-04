import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Icon_L from "../assets/images/Icon_L.svg";
import { setAccountOpeningStep } from "../redux/accountOpening";

function TinValidationDialog(props: any) {
  const [accountType, setAccountType] = useState(
    localStorage.getItem("altFinanceAccountType")
  );

  const disatch = useDispatch();

  const validateBVN = () => {
    disatch(setAccountOpeningStep("otp"));
  };

  return (
    <div>
      <div className="card-form px-4">
        <div className="card-body">
          <h4 className="card-title text-center pl-5 mt-4">
            {accountType === "minor savings" ? "Parent/Guardian's BVN" : ""} TIN
            Validation
          </h4>
          <div className="bvn_val mb-4">
            <img src={Icon_L} alt="" />
            <small className="text-danger ml-4">
              Kindly ensure that your TIN information is up to date
            </small>
          </div>
          <div className="form-group">
            <div className="d-flex justify-content-between pb-1 fillup">
              <label htmlFor="name" className="fila">
                Existing Account Number
              </label>
            </div>
            <input
              className="form-control bvn_input text-muted border-dark"
              style={{ textAlign: "left" }}
              type="text"
              id="bvn"
              placeholder="Enter your existing sterling bank account number"
            />
          </div>
          <br></br>
          <div className="form-group">
            <div className="d-flex justify-content-between pb-1 fillup">
              <label htmlFor="name" className="fila">
                Enter TIN
              </label>
              <i
                className="bx bxs-info-circle"
                data-toggle="tooltip"
                data-placement="bottom"
                title="The Bank Verification Number (BVN) is an 11-digit number.Dial *565*0# to check your BVN"
              ></i>
            </div>
            <input
              className="form-control bvn_input text-muted border-dark"
              style={{ textAlign: "left" }}
              type="text"
              id="bvn"
              placeholder="Enter your TIN"
            />
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button
              className="btn btn-dange float-right btn-filled-red"
              onClick={validateBVN}
            >
              Validate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TinValidationDialog;
