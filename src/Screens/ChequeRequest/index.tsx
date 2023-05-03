import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import ChequeRequestForm from "../../Components/Forms/ChequeRequestForm";
import Layout from "../../Layout";

export default function ChequeRequest() {
  const [webcam, setWebcam] = useState(false);

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />

      <Layout
        name='Cheque request'
        breadcrumb='Request details'
        webcam={{ webcam, setWebcam }}>
        <ChequeRequestForm />
      </Layout>
    </>
  );
}
