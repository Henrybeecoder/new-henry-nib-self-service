import UpdateEmailForm from "../../Components/Forms/UpdateEmailForm";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../Layout";

export default function UpdateEmail() {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />

      <Layout name='Change of email address' breadcrumb='Update email address'>
        <UpdateEmailForm
          webClick={() => {}}
          image={""}
          generatedNumber={0}
          validated={false}
        />
      </Layout>
    </>
  );
}
