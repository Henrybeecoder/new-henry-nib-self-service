import React, { useCallback } from "react";
// import ChequeRequestForm from "../ChequeRequestForm";
import styles from "./style.module.css";
import uparrow from "../../../assets/images/uparrow.svg";
import * as toast from "../../../utils/makeToast";
import "react-toastify/dist/ReactToastify.css";
import { FileRejection, useDropzone } from "react-dropzone";

interface Props {
  image: string | undefined;
  onChange: (image: { file: File | null; url: string }) => void;
  name: "Front" | "Back";
}

const UploadTemp = ({ name, image, onChange }: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        toast.errorToast(
          "Wrong File formats. Please upload files in jpeg and pdf format "
        );
        return;
      }

      acceptedFiles.forEach((file) =>
        onChange({ file, url: URL.createObjectURL(file) })
      );

      // acceptedFiles.forEach((file) => {
      //   const reader = new FileReader();

      //   reader.onabort = () => console.log("file reading was aborted");
      //   reader.onerror = () => console.log("file reading has failed");
      //   reader.onload = () => {
      //     // Do whatever you want with the file contents
      //     const imgStr = reader.result?.toString();
      //     // console.log(binaryStr);
      //     // console.log(reader, "The reader");
      //     onChange(imgStr);
      //   };
      //   reader.readAsDataURL(file);
      // });
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/pdf": [],
    },
    onDrop,
    multiple: false,
  });

  return (
    <>
      {isDragReject && (
        <>
          {toast.errorToast(
            "Wrong File formats. Please upload files in jpeg and pdf format "
          )}
        </>
      )}
      <>
        <div {...getRootProps()} className='w-full'>
          <input {...getInputProps()} />
          {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
          <div className={styles.uploadContainer}>
            <h5>{`Upload ${name}`}</h5>

            <div className={styles.upload}>
              {image ? (
                <p>File Uploaded</p>
              ) : (
                <p>
                  Click to upload or drag <br />
                  and drop file
                </p>
              )}
              <img src={uparrow} alt='' />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default UploadTemp;
