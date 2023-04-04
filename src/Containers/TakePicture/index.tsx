import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@material-ui/core";
import styles from "./style.module.css";
import cameraX from "../../assets/images/cameraX.svg";
import cancelX from "../../assets/images/cancelX.svg";
import cancelCapture from "../../assets/images/cancelCapture.svg";
import reverse from "../../assets/images/reverse.svg";
import Done from "../../assets/images/Done.svg";
import Delete from "../../assets/images/Delete.svg";

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

export const WebcamCapture = (closeWebCam: any) => {
  const [image, setImage] = useState("");
  const [generatedNumber, setGeneratedNumber] = useState(0);
  const [result, setResult] = useState(false);
  const webcamRef = React.useRef(null);

  const validateImage = () => {
    setResult(true);
    setGeneratedNumber(0);
    setGeneratedNumber(Math.floor(Math.random() * 101));
  };

  const retry = (e: any) => {
    e.preventDefault();
    setImage("");
    setGeneratedNumber(0);
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

  console.log(image);

  return (
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
                      <button onClick={() => closeWebCam}>Okay</button>
                    )}
                  </div>
                  {generatedNumber < 20 && (
                    <div className={styles.flexButton}>
                      <button className={styles.retry} onClick={closeWebCam}>
                        Cancel
                      </button>
                      <button
                        className={styles.validate}
                        onClick={(e) => {
                          retry;
                        }}
                      >
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
                  <button className={styles.validate} onClick={validateImage}>
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
  );
};
