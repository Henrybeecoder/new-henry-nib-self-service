import React from "react";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import AccountReactivationForm from "../../Components/Forms/AccountReactivationForm";
import Layout from "../../Layout";

export default function AccountReactivation() {
  // TODO CONSUME RESEND OTP ENDPOINT

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Layout name='Account Reactivation' breadcrumb='upload documents'>
        <AccountReactivationForm
          webClick={() => {}}
          image={""}
          generatedNumber={0}
          validated={false}
        />
      </Layout>
    </>
  );
}
