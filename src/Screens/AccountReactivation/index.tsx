import React, { useState } from "react";
import Webcam from "react-webcam";
import styles from "./style.module.css";
import cameraX from "../../assets/images/cameraX.svg";
import cancelX from "../../assets/images/cancelX.svg";
import cancelCapture from "../../assets/images/cancelCapture.svg";
import reverse from "../../assets/images/reverse.svg";
import Done from "../../assets/images/Done.svg";
import Delete from "../../assets/images/Delete.svg";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import AccountReactivationForm from "../../Components/Forms/AccountReactivationForm";
import useMediaQuery from "../../utils/Hooks/useMediaQuery";
import Layout from "../../Layout";

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

export default function AccountReactivation() {
  const matches = useMediaQuery("(min-width: 768px)");
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState("");
  const [generatedNumber, setGeneratedNumber] = useState(0);
  const [result, setResult] = useState(false);
  const [validated, setValidated] = useState(false);

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

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const [webcam, setWebCam] = useState(false);

  const webClick = () => {
    setWebCam(true);
    if (generatedNumber > 19) {
      setValidated(true);
    }
  };

  function closeWebCam() {
    setWebCam(false);
  }

  // TODO CONSUME RESEND OTP ENDPOINT

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Layout name='Account Reactivation' breadcrumb='upload documents'>
        <AccountReactivationForm
          webClick={webClick}
          image={image}
          generatedNumber={generatedNumber}
          validated={validated}
        />

        {/* <button onClick={next}>next</button> */}
      </Layout>

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
              {image === "" ? (
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
                <img alt='' src={image} />
              )}
              {image !== "" ? (
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
    </>
  );
}
