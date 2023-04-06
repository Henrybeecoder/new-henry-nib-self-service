import React, { useState, useMemo } from "react";
import styles from "./style.module.css";
import shift from "../../../assets/downloads/shift.svg";
import ChequeDepositSuccess from "./ChequeDepositSuccess";
import { baseUrl } from "../../../utils/baseUrl";
import * as toast from "../../../utils/makeToast";
import "react-toastify/dist/ReactToastify.css";
// import { Toaster } from "react-hot-toast";
import { getLocalStorageItem } from "../../../utils/localStorage";
// import SignaturePad from "react-signature-canvas";
import { encryptAes, deCryptedData } from "../../../utils/encrypt";
import axios from "axios";
import UploadTemp from "./UploadTemp";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
// import pdf from "../../../../src/assets/downloads/quotation.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Images {
  front: { file: File | null; url: string | undefined };
  back: { file: File | null; url: string | undefined };
}

export default function ChequeDepositForm({
  success,
  setSuccess,
}: {
  success: boolean;
  setSuccess: (state: boolean) => void;
}) {
  const [{ front, back }, setFiles] = useState<Images>({
    front: { file: null, url: undefined },
    back: { file: null, url: undefined },
  });

  const [amount, setAmount] = useState<any>("");
  const [validating, setValidating] = useState(false);
  const [preview, setPreview] = useState(false);
  const [userDetails] = useState(getLocalStorageItem("userDetails"));

  const closePreview = () => setPreview(false);

  const submitChequeDepositForm = async () => {
    setValidating(true);
    const frontStr = await blobToBase64(front.file);
    const backStr = await blobToBase64(back.file);

    let ChequeDepositPayload = {
      front: frontStr,
      bank: backStr,
      referenceId: userDetails.referenceId,
      requestedDate: new Date(),
    };

    const newEncryptedPayload = {
      value: encryptAes(ChequeDepositPayload),
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}ChequeDeposit/submit-cheque-deposit`,
        newEncryptedPayload
      );
      const response = deCryptedData(data.data);
      setSuccess(true);
      toast.successToast(response.message);
      setValidating(false);
    } catch (err) {
      setSuccess(true);
      setValidating(false);
    }
  };

  return (
    <div className={styles.paddingContainer}>
      {success ? (
        <ChequeDepositSuccess />
      ) : (
        <>
          <h1 className={styles.header}>Cheque deposit details</h1>
          <p className={styles.paragraph}>
            The file format should be JPEG or PDF
          </p>

          {preview && (
            <PreviewModal
              validating={validating}
              images={{ front, back }}
              amount={amount}
              closePreview={closePreview}
              onSubmit={submitChequeDepositForm}
            />
          )}
          <>
            <div className={styles.uploadRow}>
              <UploadTemp
                name="Front"
                image={front.url}
                onChange={(image) =>
                  setFiles((state) => ({ back: state.back, front: image }))
                }
              />
              <UploadTemp
                name="Back"
                image={back.url}
                onChange={(image) =>
                  setFiles((state) => ({ front: state.front, back: image }))
                }
              />
            </div>
            <div className="">
              <label htmlFor="streetname" className="label_text">
                Enter amount
              </label>
              <input
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                type="text"
                className="form-control bg-white border-dark w-full"
                placeholder="Enter amount"
              />
            </div>
            <div className={styles.flexButton}>
              <button className={styles.previous}>Previous</button>

              <>
                {validating ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      alignContent: "center",
                      width: "200px",
                      height: "100%",
                    }}
                  >
                    <div
                      className="spinner-border text-danger mb-4"
                      role="status"
                    >
                      <span className="sr-only"></span>
                    </div>
                  </div>
                ) : (
                  <button
                    disabled={!(amount.length > 1 && !!front && !!back)}
                    className={styles.submit}
                    type="submit"
                    onClick={() => setPreview(true)}
                  >
                    Proceed
                  </button>
                )}
              </>
            </div>
          </>
        </>
      )}
    </div>
  );
}

const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve: (str: string) => void) => {
    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      const imgStr = reader.result?.toString();
      resolve(imgStr);
    };
    reader.readAsDataURL(blob);
  });
};

interface PMProps {
  images: Images;
  amount: string | number;
  closePreview: () => void;
  onSubmit: () => void;
  validating: boolean;
}

type Face = "front" | "back";

const PreviewModal = ({
  images: { front, back },
  amount,
  closePreview,
  onSubmit,
  validating,
}: PMProps) => {
  const [face, setFace] = useState<Face>("front");

  return (
    <div className={styles.ErrorBg}>
      <div className={styles.ErrorContain}>
        <h1 className={styles.header}>Confirm details</h1>
        <p className={styles.paragraph}>
          Kindly confirm the details of your cheque deposit
        </p>
        <div className={styles.shownAmount}>
          <h3>Amount</h3>
          <p>{`N${amount}`}</p>
        </div>
        <div className={styles.slider}>
          {face === "front" ? <Preview {...front} /> : <Preview {...back} />}
          <button
            onClick={() =>
              setFace((prevState) => (prevState === "front" ? "back" : "front"))
            }
            className={styles.shift}
          >
            <img src={shift} alt="" />
          </button>

          <div className={styles.indicators}>
            <div
              className={`${styles.indicator} ${
                face === "front" ? styles.indicatorA : ""
              }`}
            />
            <div
              className={`${styles.indicator} ${
                face === "back" ? styles.indicatorA : ""
              }`}
            />
          </div>
        </div>

        <div className={styles.ErrorButtonFlex}>
          <button className={styles.ErrorCancel} onClick={closePreview}>
            Edit
          </button>

          {validating ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                width: "100%",
                // height: "20px",
              }}
            >
              <div className="spinner-border text-danger" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            <button
              className={styles.ErrorRetry}
              type="submit"
              onClick={onSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Preview = (props: { file: File; url: string }) => {
  const { file, url } = useMemo(() => props, [props]);

  return (
    <>
      {file.type === "application/pdf" ? (
        <div className={styles.pdfPage}>
          <Document file={url}>
            <Page pageNumber={1} height={300} />
          </Document>
        </div>
      ) : (
        <div className={styles.imgHolder}>
          <img src={url} alt="" />
        </div>
      )}
    </>
  );
};
