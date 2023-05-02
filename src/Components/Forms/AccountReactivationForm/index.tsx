//@ts-ignore
//@ts-nocheck
import React, { useState, useRef } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import * as toast from "../../../utils/makeToast";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { getLocalStorageItem } from "../../../utils/localStorage";
import cameraX from "../../../assets/images/cameraX.svg";
import { useDropzone } from "react-dropzone";
import uparrow from "../../../assets/images/uparrow.svg";
import Done from "../../../assets/images/Done.svg";
import Icon_L from "../../../assets/images/Icon_L.svg";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import AccountSuccess from "./AccountSuccess";
// import PopupModal from "../../../Containers/popupModal";
import modalcancel from "../../../assets/images/modalcancel.svg";
import SignaturePad from "react-signature-canvas";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import carlender from "../../../assets/images/calender.svg";
import { encryptAes, deCryptedData } from "../../../utils/encrypt";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import { useDispatch } from "react-redux";
import { setStep } from "../../../redux/global";
import { PrevButton } from "../../Buttons";

export default function AccountReactivationForm({
  webClick,
  image,
  generatedNumber,
  validated,
}) {
  const dispatch = useDispatch();
  // const [eSignature, setESignature] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [residentialAdresss, setResidentialAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [busStop, setBusStop] = useState("");
  const [areaState, setAreaState] = useState("");

  const [userDetails, setUserDetails] = useState(
    getLocalStorageItem("userDetails")
  );
  const [validating, setValidating] = useState(false);
  const [idCardNumber, setIdCardNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardName, setCardName] = useState("");
  // const [uploadfiles, setFiles] = useState("");
  const [idValidated, setIdValidated] = useState("");
  const [success, setSuccess] = useState(false);
  const [idCardtype, setIdCardType] = useState<any>(0);
  const { acceptedFiles } = useDropzone();
  const [initialPopup, setInitialPopup] = useState(true);

  const files = acceptedFiles.map((file) => {
    return file.path;
  });

  console.log(acceptedFiles.length, " The front page file");

  console.log("UserDetails", userDetails);

  const validateID = () => {
    if (frontPageId.length > 0 && idCardNumber && issueDate && cardName) {
      setIdValidated(true);
    } else {
      toast.errorToast("Please fill the missing input(s) or upload a valid ID");
    }
  };

  const handleSetIdCardType = (id: any) => {
    setIdCardType(id);
  };

  const meansOfIdentification = [
    {
      id: "0",
      text: "International Passport",
    },
    {
      id: "1",
      text: "National ID card",
    },
    {
      id: "2",
      text: "Permanent Voter's card",
    },
    {
      id: "3",
      text: "Nigerian's drivers license",
    },
  ];

  const cardTypeValue: string = idCardtype.toString();

  // const submit = () => {
  //   setSuccess(true);
  // };

  //For uploads

  const [frontPageId, setFrontPageId] = useState("");
  const [accountActivation, setAccountActivation] = useState("");
  const [utilityBill, setUtilityBill] = useState("");

  const frontPageRef = useRef(null);
  const accountActivationRef = useRef(null);
  const utilityBillRef = useRef(null);

  const handleFrontPageClick = () => {
    // 👇️ open file input box on click of other element
    frontPageRef.current.click();
  };

  const handleAccountActivationClick = () => {
    // 👇️ open file input box on click of other element
    accountActivationRef.current.click();
  };

  const handleUtilityBillClick = () => {
    // 👇️ open file input box on click of other element
    utilityBillRef.current.click();
  };

  const handleFrontPageChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];

    if (!fileObj) {
      return;
    }
    setFrontPageId(fileObj.name);
  };

  const handleAccountActivationChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setAccountActivation(fileObj.name);
  };

  const handleUtilityBillChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setUtilityBill(fileObj.name);
  };

  // const validateForm = () => {};

  const SubmitAccountReactivationForm = () => {
    if (
      frontPageId.length >= 1 &&
      idCardNumber &&
      issueDate &&
      cardName &&
      imageURL &&
      image
    ) {
      setValidating(true);

      let AccountReactivationPayload = {
        eSignature: imageURL,
        referenceId: userDetails.referenceId,
        requestedDate: "2022-09-15T01:55:11.160Z",
        userPicture: image,
        requestLetter: "request letter",
        accountReactivationType: "Single",
        accountNumber: userDetails.accountNumber,
        newEmail: email,
        newPhoneNumber: phoneNumber,
        houseNumber: houseNumber,
        streetName: streetName,
        nearestBusStop: busStop,
        area_State: areaState,
        idCardNumber: idCardNumber,
        idCardName: cardName,
        issueDate: issueDate,
        expiryDate: expiryDate,
        cardType: cardTypeValue,
        iDcard_FrontPageFile: frontPageId,
        iDcard_FrontPage: frontPageId,
        accountReactivationInstruction: accountActivation,
        accountReactivationInstructionFile: accountActivation,
        utilityBill: utilityBill,
        utilityBillFile: utilityBill,
        signatoryEmails: ["sign"],
      };
      const newEncryptedPayload = {
        value: encryptAes(AccountReactivationPayload),
      };
      console.log("payload", AccountReactivationPayload);
      console.log("userImage", image);

      axios
        .post(
          `${baseUrl}SingleAccount/submit-account-reactivation`,
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
          toast.errorToast("something went wrong");
          console.log(err);
          setValidating(false);
        });
    } else {
      toast.errorToast("Please fill the missing input(s)");
    }
  };

  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});

  const clear = () => {
    sigCanvas.current.clear();
    setImageURL("");
  };

  const save = () => {
    const signature = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setImageURL(signature);
  };

  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      {success ? (
        <AccountSuccess />
      ) : (
        <div className={styles.accountReactivation}>
          <Toaster position='top-center' reverseOrder={false} />
          {initialPopup && (
            <div className={styles.popupBg}>
              <div className={styles.popupContainer}>
                <img
                  alt=''
                  src={modalcancel}
                  className={styles.modalcancel}
                  onClick={() => setInitialPopup(false)}
                />
                <h2 className={styles.popupHeader}>Documents required</h2>
                <p className={styles.popupParagraph}>
                  Please ensure that you have updated copies of your{" "}
                  <b>utility bill</b>
                  (if your address has changed) and{" "}
                  <b>government issued ID Card</b> to conclude the reactivation
                  process. Kindly click on proceed to continue.
                </p>
                <button
                  className={styles.popupButton}
                  onClick={() => setInitialPopup(false)}>
                  proceed
                </button>
              </div>
            </div>
          )}

          <h1 className={styles.header}>Account Reactivation </h1>
          <p className={styles.theparagraph}>
            Hello, <b>{userDetails.name}</b>, welcome to Sterling Alternative
            Finance
          </p>
          <div className='form-group' style={{ margin: " 10px 13px" }}>
            <label className='label_text'>Account name</label>
            <input
              type='text'
              value={userDetails.name}
              className='form-control bg-white border-dark'
              style={{ margin: " 10px 10px" }}
            />
          </div>
          <div className='bvn_val mb-4' id='fader'>
            <img src={Icon_L} alt='' />
            <small className='text-danger ml-4 font-weight-bold'>
              <b>Update your phone number, address, email if its changed</b>
            </small>
          </div>
          <div className={styles.formRow}>
            <div className='col-lg-6 mr-2'>
              <label className='label_text'>Phone number</label>
              <input
                value={userDetails.mobile}
                type='text'
                className='form-control bg-white border-dark'
              />
            </div>
            <div className='col-lg-6'>
              <label htmlFor='streetname' className='label_text'>
                New phone number
              </label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                type='text'
                className='form-control bg-white border-dark'
                placeholder='Enter new phone number'
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className='col-lg-6 mr-2'>
              <label className='label_text'>Email address</label>
              <input
                value={userDetails.email}
                type='text'
                className='form-control bg-white border-dark'
              />
            </div>
            <div className='col-lg-6'>
              <label htmlFor='streetname' className='label_text'>
                New email address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='text'
                className='form-control bg-white border-dark'
                placeholder='Enter new email address'
              />
              {/* </div>
          </div> */}
            </div>
          </div>
          <div className='form-group' style={{ margin: " 10px 13px" }}>
            <label className='label_text'>Exsiting residential address</label>
            <input
              onChange={(e) => setResidentialAddress(e.target.value)}
              value={residentialAdresss}
              type='text'
              className='form-control bg-white border-dark'
              placeholder='Residential address'
            />
          </div>
          <label
            htmlFor='residentialaddress'
            className='label_text my-2 font-weight-bold'>
            <b>New residential address</b>
          </label>

          <div className={styles.formRow}>
            <div className='col sec'>
              <label htmlFor='housenumber' className='label_text'>
                House number
              </label>
              <input
                name='houseNumber'
                onChange={(e) => setHouseNumber(e.target.value)}
                value={houseNumber}
                type='text'
                className='form-control bg-white border-dark'
                placeholder='Enter house number'
              />
            </div>
            <div className='col-lg-6'>
              <label htmlFor='streetname' className='label_text'>
                Street name
              </label>
              <input
                name='streetName'
                onChange={(e) => setStreetName(e.target.value)}
                value={streetName}
                type='text'
                className='form-control bg-white border-dark'
                placeholder='Enter Street Name'
              />
            </div>
          </div>
          <div className='form-group' style={{ margin: " 10px 13px" }}>
            <label htmlFor='streetname' className='label_text'>
              Nearest bus-top/landmark
            </label>
            <input
              name='nearestBustopLandmark'
              onChange={(e) => setBusStop(e.target.value)}
              value={busStop}
              type='text'
              className='form-control bg-white border-dark'
              placeholder='Enter nearest bus-stop or landmark'
            />
          </div>
          <div className='form-group' style={{ margin: " 10px 13px" }}>
            <label htmlFor='housenumber' className='label_text'>
              Area/State
            </label>
            <input
              onChange={(e) => setAreaState(e.target.value)}
              value={areaState}
              type='text'
              className='form-control bg-white border-dark'
              placeholder='Enter area of state'
            />
          </div>

          <label htmlFor='idcardtype' className='label_text'>
            Select identity card type
          </label>
          <ul
            className='nav nav-pills identity-tab mb-3 nav-fill'
            id='pills-tab'
            role='tablist'>
            {meansOfIdentification.map((identification) => {
              return (
                <li
                  className='nav-item'
                  key={identification.id}
                  onClick={() => handleSetIdCardType(identification.id)}>
                  <a
                    className={`nav-link text-nowrap pl-0 pt-2 ${
                      identification.id === 0 ? `${styles.active}` : ""
                    }`}
                    id='pills-int-tab'
                    data-toggle='pill'
                    href='#pills-int'
                    role='tab'
                    aria-controls='pills-int'
                    aria-selected='true'>
                    {identification.text}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className={styles.formFlex}>
            <div className={styles.form}>
              <label>ID card Number</label>
              <input
                type='text'
                placeholder='Enter ID card number'
                onChange={(e) => setIdCardNumber(e.target.value)}
                value={idCardNumber}
                required
              />
            </div>
            <div className={styles.dateform}>
              <label>Issue Date</label>
              {/* <input
                type="text"
                placeholder="dd/mm/yyyy"
                onChange={(e) => setIssueDate(e.target.value)}
                value={issueDate}
                required
              /> */}
              {/* <DatePicker onChange={onChange} value={value} /> */}
              <DatePicker
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div
                    style={{
                      margin: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}>
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}>
                      {"<"}
                    </button>
                    <select
                      value={getYear(date)}
                      onChange={({ target: { value } }) => changeYear(value)}>
                      {years.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <select
                      value={months[getMonth(date)]}
                      onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                      }>
                      {months.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}>
                      {">"}
                    </button>
                  </div>
                )}
                selected={issueDate}
                onChange={(date) => setIssueDate(date)}
                customInput={<ExampleCustomInput />}
                placeholder={"dd/mm/yyyy"}
                value={issueDate}
              />
            </div>
            {idCardtype === 2 ? null : (
              <div className={styles.dateform}>
                <label>Expiry Date</label>
                {/* <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  onChange={(e) => setExpiryDate(e.target.value)}
                  value={expiryDate}
                  required
                /> */}
                <DatePicker
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div
                      style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                      }}>
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}>
                        {"<"}
                      </button>
                      <select
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(value)}>
                        {years.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <select
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) =>
                          changeMonth(months.indexOf(value))
                        }>
                        {months.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}>
                        {">"}
                      </button>
                    </div>
                  )}
                  selected={expiryDate}
                  onChange={(date) => setExpiryDate(date)}
                  customInput={<ExampleCustomInput />}
                  placeholder={"dd/mm/yyyy"}
                  value={expiryDate}
                />
              </div>
            )}
          </div>
          <div className={styles.nameForm}>
            <label>ID card name</label>
            <input
              type='text'
              placeholder='Enter your name from the ID card'
              onChange={(e) => setCardName(e.target.value)}
              value={cardName}
              required
            />
          </div>
          <h5>Upload Front page of ID</h5>
          <div className={styles.validated}>
            <section>
              <input
                style={{ display: "none" }}
                ref={frontPageRef}
                type='file'
                onChange={handleFrontPageChange}
              />

              <div className={styles.upload} onClick={handleFrontPageClick}>
                <p>
                  {frontPageId.length > 0 ? (
                    <p>File Uploaded</p>
                  ) : (
                    <p>
                      Click to upload or drag <br />
                      and drop file
                    </p>
                  )}
                </p>
                <img src={uparrow} alt='' />
              </div>
              {/* <aside>
            <h4>Files</h4>
            <ul>{uploadfiles}</ul>
          </aside> */}
            </section>
            <button
              onClick={validateID}
              className={
                idValidated ? `${styles.validatedId}` : `${styles.validate}`
              }>
              {idValidated && <img src={Done} />}
              {idValidated ? "Validated" : "Validate ID"}
            </button>
          </div>
          <div className={styles.uploadFlex}>
            <div className={styles.firstUpload}>
              <h5>Upload account activation instruction</h5>

              <input
                style={{ display: "none" }}
                ref={accountActivationRef}
                type='file'
                onChange={handleAccountActivationChange}
              />

              <div
                className={styles.upload}
                onClick={handleAccountActivationClick}>
                <p>
                  {accountActivation.length > 0 ? (
                    <p>File Uploaded</p>
                  ) : (
                    <p>
                      Click to upload or drag <br />
                      and drop file
                    </p>
                  )}
                </p>
                <img src={uparrow} alt='' />
              </div>
            </div>
            <div className={styles.secondUpload}>
              <h5>Upload utility bill (optional)</h5>

              <input
                style={{ display: "none" }}
                ref={utilityBillRef}
                type='file'
                onChange={handleUtilityBillChange}
              />

              <div className={styles.upload} onClick={handleUtilityBillClick}>
                <p>
                  {utilityBill.length > 0 ? (
                    <p>File Uploaded</p>
                  ) : (
                    <p>
                      Click to upload or drag <br />
                      and drop file
                    </p>
                  )}
                </p>
                <img src={uparrow} alt='' />
              </div>
            </div>
          </div>

          {/* E-SIGNATURE */}

          <div className={styles.holder}>
            <div className={styles.sign}>
              <div className={styles.headerX}>
                <div className={styles.textHeader}>
                  {/* if our we have a non-null image url we should 
      show an image and pass our imageURL state to it*/}
                  {imageURL ? (
                    <img
                      src={imageURL}
                      alt='my signature'
                      style={{
                        display: "block",
                        margin: "0 auto",
                        border: "1px solid black",
                        borderRadius: "4px",
                        width: "100px",
                        height: "30px",
                      }}
                    />
                  ) : null}
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
              <button
                className={styles.takePicture}
                style={{ marginTop: "10px" }}
                onClick={save}>
                <p>Save E-signature</p>
              </button>
            </div>

            {/* USER PIC */}
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
                    <img src={cameraX} alt='' />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={styles.flexButton}>
            <PrevButton />

            {generatedNumber > 19 ? (
              <>
                {validating ? (
                  <div
                    className='spinner-border text-danger mb-4'
                    role='status'>
                    <span className='sr-only'></span>
                  </div>
                ) : (
                  <button
                    className={styles.submitActive}
                    type='submit'
                    onClick={SubmitAccountReactivationForm}>
                    Submit
                  </button>
                )}
              </>
            ) : (
              <button className={styles.submit}>Submit</button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const ExampleCustomInput = React.forwardRef(
  ({ value, onClick, placeholder }, ref) => (
    <div>
      <input
        type='text'
        className={styles.customInput}
        onClick={onClick}
        ref={ref}
        value={value}
        placeholder={`dd/mm/yyyy`}
      />
    </div>
  )
);
