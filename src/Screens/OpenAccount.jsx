import React, { useState } from "react";
import altLogo from "../assets/images/alt-logo.svg";
import group1 from "../assets/images/Group_1.svg";
import rightArrow from "../assets/images/right_arrow.svg";
import no2 from "../assets/images/no2.svg";
import no3 from "../assets/images/no3.png";
import BvnValidationDialog from "../Components/BvnValidationDialog";
import Otp from "../Components/OtpDialog";
import UpdateDetailSwiftSavingsDialog from "../Components/updateDetailsDialog/UpdateDetailSwiftSavingsDialog";
import DocumentUploadDialog from "../Components/DocumentUploadDialog";
import AccountOpeningSuccessDialog from "../Components/AccountOpeningSuccessDialog";
import { useSelector } from "react-redux";
import UpdateDetailSavingsDialog from "../Components/updateDetailsDialog/UpdateDetailSavingsDialog";
import UpdateDetailMinorSavingsDialog from "../Components/updateDetailsDialog/UpdateDetailMinorSavingsDialog";
import UpdateDetailJointSavingsDialog from "../Components/updateDetailsDialog/UpdateDetailJointSavingsDialog";
import UpdateDetailCurrentDialog from "../Components/updateDetailsDialog/UpdateDetailCurrentDialog";
import UpdateDetailJointCurrentDialog from "../Components/updateDetailsDialog/UpdateDetailJointCurrentDialog";
import UpdateDetailDomiciliaryCurrentDialog from "../Components/updateDetailsDialog/UpdateDetailDomiciliaryCurrentDialog";
import UpdateDetailDomiciliarySavingsDialog from "../Components/updateDetailsDialog/UpdateDetailDomiciliarySavingsDialog";
// import Icon_L from '../assets/images/Icon_L.svg'
import { useDispatch } from "react-redux";
import { setStep } from "../redux/global";

function OpenAccount(props) {
  // const { accountType } = useSelector((state) => state.accountOpeningData)
  const { globalState } = useSelector((state) => state.accountOpeningData);

  // const [selectedAccountType, setSelectedAccountType] = useState('')
  const [accountType, setAccountType] = useState(
    localStorage.getItem("altFinanceAccountType")
  );
  const [currentStep, setCurrentStep] = useState("bvn-validation");

  const dispatch = useDispatch();

  const next = () => {
    dispatch(setStep("swift-savings"));
    setAccountType("swift savings");
  };
  return (
    <div>
      <div className='container-fluid row'>
        <div className='col-md-5 d-none d-md-inline left_col'>
          <div className='logo pl-4 pt-5'>
            {/* <img src={altLogo} alt="alternative finance logo" onClick="document.location='index.html'" /> */}
            <img src={altLogo} alt='alternative finance logo' />
          </div>
        </div>

        <div className='col-md-7 right_col'>
          <div className='d-flex justify-content-end'>
            <div className='d-flex flex-column pt-5'>
              <div className='d-flex justify-content-end'>
                {/* <h1 className="float-right pr-3 mb-4">Swift Savings</h1> */}
                <h1 className='pr-3 mb-4 text-capitalize'>{accountType}</h1>
              </div>
              <nav className='mb-4'>
                <ol className='breadcrumb bg-white float-right'>
                  <li className='breadcrumb-item'>
                    {" "}
                    <a href='#'>
                      <span>
                        <img className='pr-1' src={group1} alt='' />
                      </span>{" "}
                      Bvn Validation &nbsp;
                      <span>
                        <img src={rightArrow} alt='' />
                      </span>
                    </a>
                  </li>
                  <li className='breadcrumb-item'>
                    {" "}
                    <a href='#'>
                      <span>
                        <img className='pr-1' src={no2} alt='' />
                      </span>{" "}
                      Update details &nbsp;
                      <span>
                        <img src={rightArrow} alt='' />
                      </span>
                    </a>
                  </li>
                  <li className='breadcrumb-item'>
                    {" "}
                    <a href='#'>
                      <span>
                        <img className='pr-1' src={no3} alt='' />
                      </span>{" "}
                      Document Upload
                    </a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-11 card validation-card pb-4'>
              {globalState === "bvn-validation" ? <BvnValidationDialog /> : ""}

              {globalState === "otp" ? <Otp /> : ""}

              {globalState === "swift-savings" ? (
                <UpdateDetailSwiftSavingsDialog />
              ) : (
                ""
              )}
              {globalState === "update-detail" && accountType === "savings" ? (
                <UpdateDetailSavingsDialog />
              ) : (
                ""
              )}
              {globalState === "update-detail" &&
              accountType === "minor savings" ? (
                <UpdateDetailMinorSavingsDialog />
              ) : null}
              {globalState === "update-detail" &&
              accountType === "joint savings" ? (
                <UpdateDetailJointSavingsDialog />
              ) : (
                ""
              )}
              {globalState === "update-detail" &&
              accountType === "domiciliary savings" ? (
                <UpdateDetailDomiciliarySavingsDialog />
              ) : (
                ""
              )}
              {globalState === "update-detail" && accountType === "current" ? (
                <UpdateDetailCurrentDialog />
              ) : (
                ""
              )}
              {globalState === "update-detail" &&
              accountType === "joint current" ? (
                <UpdateDetailJointCurrentDialog />
              ) : (
                ""
              )}
              {globalState === "update-detail" &&
              accountType === "domiciliary current" ? (
                <UpdateDetailDomiciliaryCurrentDialog />
              ) : (
                ""
              )}

              {globalState === "document-upload" ? (
                <DocumentUploadDialog />
              ) : (
                ""
              )}
              {globalState === "account-opening-success" ? (
                <AccountOpeningSuccessDialog />
              ) : (
                ""
              )}
              <button onClick={next}>next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;
