import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../Layout";

export default function UpdateExpiredId() {
  // TODO CONSUME RESEND OTP ENDPOINT

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Layout name='Update Expired ID' breadcrumb='Update expired ID'>
        UpdateExpiredForm
      </Layout>
    </>
  );
}
