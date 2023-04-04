import React, { useState } from "react";
import styles from "./ServiceOffer.module.css";
import ServiceOfferingsLabels from "./ServiceOfferingsLabels";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccountOpeningStep } from "../../redux/accountOpening";
import { setAccountOpeningDetails } from "../../redux/accountOpening";

export default function ServiceOfferings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToAccountReactivation = () => {
    dispatch(setAccountOpeningStep("bvn-validation"));
    dispatch(setAccountOpeningDetails("bvn-validation"));
    navigate("/account-reactivation");
  };

  const navigateToUpdateEmail = () => {
    dispatch(setAccountOpeningStep("bvn-validation"));
    dispatch(setAccountOpeningDetails("bvn-validation"));
    navigate("/update-email");
  };

  const navigateToUpdateAccountName = () => {
    dispatch(setAccountOpeningStep("bvn-validation"));
    dispatch(setAccountOpeningDetails("bvn-validation"));
    navigate("/update-account-name");
  };

  const navigateToUpdatePhoneNumber = () => {
    dispatch(setAccountOpeningStep("bvn-validation"));
    dispatch(setAccountOpeningDetails("bvn-validation"));
    navigate("/update-phone-number");
  };

  const navigateToMandateSignature = () => {
    dispatch(setAccountOpeningStep("bvn-validation"));
    dispatch(setAccountOpeningDetails("bvn-validation"));
    navigate("/mandate-and-signature");
  };

  const navigateToResidentialAddress = () => {
    dispatch(setAccountOpeningStep("bvn-validation"));
    dispatch(setAccountOpeningDetails("bvn-validation"));
    navigate("/residential-address");
  };

  const navigateToExpiredID = () => {
    dispatch(setAccountOpeningStep("bvn-validation"));
    dispatch(setAccountOpeningDetails("bvn-validation"));
    navigate("/update-expired-id");
  };

  const navigateToChequeRequest = () => {
    dispatch(setAccountOpeningStep("bvn-validation"));
    dispatch(setAccountOpeningDetails("bvn-validation"));
    navigate("/cheque-request");
  };

  const navigateToBranchDomiciliation = () => {
    dispatch(setAccountOpeningStep("bvn-validation"));
    dispatch(setAccountOpeningDetails("bvn-validation"));
    navigate("/branch-domiciliation");
  };

  const navigateToChequeDeposit = () => {
    dispatch(setAccountOpeningStep("bvn-validation"));
    dispatch(setAccountOpeningDetails("bvn-validation"));
    navigate("/cheque-deposit");
  };

  const [accountServiceInitial, setAccountServiceInitial] = useState(true);
  const [accountServiceSelection, setAccountServiceSelection] = useState(false);
  const [changeOfStaticData, setChangeOfStaticData] = useState(false);
  const [changeOfOthersSelection, setChangeOfOtherSelection] = useState(false);

  function handleAccountServiceSelection() {
    setAccountServiceSelection(true);
    setAccountServiceInitial(false);
    setChangeOfStaticData(false);
    setChangeOfOtherSelection(false);
  }

  function handleAccountServiceInitial() {
    setAccountServiceInitial(true);
    setAccountServiceSelection(false);
    setChangeOfStaticData(false);
    setChangeOfOtherSelection(false);
  }

  function handleChangeOfStaticData() {
    setChangeOfStaticData(true);
    setAccountServiceInitial(false);
    setAccountServiceSelection(false);
    setChangeOfOtherSelection(false);
  }

  const handleChangeOfOthersSelection = () => {
    setChangeOfOtherSelection(true);
    setChangeOfStaticData(false);
    setAccountServiceInitial(false);
    setAccountServiceSelection(false);
  };
  return (
    <div className={styles.main}>
      {accountServiceInitial && (
        <div>
          <h1>Our self service offerings</h1>
          <p>Which service you would like to access?</p>
          <ServiceOfferingsLabels
            headerText="Account Services"
            icon="/images/svg/accountServices.svg"
            dropDown
            onClick={handleAccountServiceSelection}
          />
        </div>
      )}
      {accountServiceSelection && (
        <div>
          <div className={styles.HeaderFlex}>
            <img
              src="images/svg/backIcon.svg"
              alt=""
              className={styles.backButton}
              onClick={handleAccountServiceInitial}
            />
            <h1>Account services</h1>
          </div>
          <p>Select an account service</p>
          <ServiceOfferingsLabels
            headerText="Account reactivation"
            icon="/images/svg/acctActivate.svg"
            onClick={navigateToAccountReactivation}
          />
          <ServiceOfferingsLabels
            headerText="Change of static data"
            icon="/images/svg/staticData.svg"
            subText="Phone Number, Email Address, Account Name, Residential Address, Mandate and Signature"
            dropDown
            onClick={handleChangeOfStaticData}
          />
          <ServiceOfferingsLabels
            headerText="Update expired ID"
            icon="/images/svg/accountServices.svg"
            onClick={navigateToExpiredID}
          />
          <ServiceOfferingsLabels
            headerText="Others"
            icon="/images/svg/otherSvg.svg"
            subText="Cheque request, Cheque deposit, Change of branch of domiciliation, Manager’s cheque request,
Manager’s cheque repurchase, Biometric maintenance service"
            dropDown
            onClick={handleChangeOfOthersSelection}
          />
        </div>
      )}
      {changeOfStaticData && (
        <div>
          <div className={styles.HeaderFlex}>
            <img
              src="images/svg/backIcon.svg"
              alt=""
              className={styles.backButton}
              onClick={handleAccountServiceSelection}
            />
            <div className={styles.staticTextHolder}>
              <h1>Change of static data</h1>
              <p>
                Account services &gt; <b>Change of static data</b>
              </p>
            </div>
          </div>
          <p>Choose an option to continue</p>
          <ServiceOfferingsLabels
            headerText="Phone number"
            icon="/images/svg/phone.svg"
            onClick={navigateToUpdatePhoneNumber}
          />
          <ServiceOfferingsLabels
            headerText="Email address"
            icon="/images/svg/email.svg"
            onClick={navigateToUpdateEmail}
          />
          <ServiceOfferingsLabels
            headerText="Account name"
            icon="/images/svg/accountName.svg"
            onClick={navigateToUpdateAccountName}
          />
          <ServiceOfferingsLabels
            headerText="Residential address"
            icon="/images/svg/address.svg"
            onClick={navigateToResidentialAddress}
          />
          <ServiceOfferingsLabels
            headerText="Mandate and signature"
            icon="/images/svg/sign.svg"
            onClick={navigateToMandateSignature}
          />
        </div>
      )}
      {changeOfOthersSelection && (
        <div>
          <div className={styles.HeaderFlex}>
            <img
              src="images/svg/backIcon.svg"
              alt=""
              className={styles.backButton}
              onClick={handleAccountServiceSelection}
            />
            <div className={styles.staticTextHolder}>
              <h1>Others</h1>
              <p>
                Account services &gt; <b>Others</b>
              </p>
            </div>
          </div>
          <p>Choose an option to continue</p>
          <ServiceOfferingsLabels
            headerText="Cheque request"
            icon="/images/svg/ches.svg"
            onClick={navigateToChequeRequest}
          />
          <ServiceOfferingsLabels
            headerText="Cheque deposit"
            icon="/images/svg/che.svg"
            onClick={navigateToChequeDeposit}
          />
          <ServiceOfferingsLabels
            headerText="Change of branch domiciliation"
            icon="/images/svg/cheDom.svg"
            onClick={navigateToBranchDomiciliation}
          />
        </div>
      )}
    </div>
  );
}
