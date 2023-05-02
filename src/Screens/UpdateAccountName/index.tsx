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
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import cameraX from "../../assets/images/cameraX.svg";
import cancelX from "../../assets/images/cancelX.svg";
import cancelCapture from "../../assets/images/cancelCapture.svg";
import reverse from "../../assets/images/reverse.svg";
import Done from "../../assets/images/Done.svg";
import Delete from "../../assets/images/Delete.svg";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import UpdateAccountNameForm from "../../Components/Forms/UpdateAccountNameForm";
import Loader from "../Loader";
import BvnValidation from "../../Components/BvnValidation";

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

export default function UpdateAccountName() {
  const [image, setImage] = useState("");
  const [generatedNumber, setGeneratedNumber] = useState(0);
  const [result, setResult] = useState(false);
  const [validated, setValidated] = useState(false);
  const webcamRef = React.useRef(null);
  const [bvnCompleted, setBvnCompleted] = useState(false);

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
  const { globalState } = useSelector((state: any) => state.accountOpeningData);

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

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <Toaster position='top-center' reverseOrder={false} />

        <div className='container-fluid row'>
          <div className='col-md-5 d-none d-md-inline left_col'>
            <div className='logo pl-4 pt-5'>
              <img
                src={altLogo}
                alt='alternative finance logo'
                onClick={nagivateHome}
              />
            </div>
          </div>

          <div className='col-md-7 right_col'>
            <div className='d-flex justify-content-end'>
              <div className='d-flex flex-column pt-5'>
                <div className='d-flex justify-content-end'>
                  {/* <h1 className="float-right pr-3 mb-4">Swift Savings</h1> */}
                  <h1 className='pr-3 mb-4 text-capitalize'>
                    Change of account name
                  </h1>
                </div>
                <nav className='mb-4'>
                  <ol className='breadcrumb bg-white float-right'>
                    <li className='breadcrumb-item'>
                      {" "}
                      <a href='#'>
                        {bvnCompleted ? (
                          <span>
                            <img className={styles.done} src={Done} alt='' />
                          </span>
                        ) : (
                          <span>
                            <img className='pr-1' src={group1} alt='' />
                          </span>
                        )}
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
                        Update Account Name
                      </a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-11 card validation-card pb-4'>
                <BvnValidation
                  setComplete={setBvnCompleted}
                  setIsLoading={setIsLoading}
                />
                {globalState === "account-reactivation" ? (
                  <UpdateAccountNameForm
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
                  alt=''
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
                      screenshotFormat='image/jpeg'
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
                              <img src={Done} alt='' />
                            ) : (
                              <img src={Delete} alt='' />
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
                                  }`}>
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
                              onClick={closeWebCam}>
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
                          }}>
                          Retry
                        </button>
                        <button
                          className={styles.validate}
                          onClick={validateImage}>
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
                      <img src={cancelCapture} alt='' />
                    </button>
                    <button
                      className={styles.getCapture}
                      onClick={(e) => {
                        e.preventDefault();
                        capture();
                      }}>
                      <img src={cameraX} alt='' />
                    </button>
                    <button className={styles.reverseCapture}>
                      <img src={reverse} alt='' />
                    </button>
                  </div>
                )}
              </div>
              <div className='ImageCam'></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
