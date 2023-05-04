import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import UpdatePhoneNumber from "../../Components/Forms/UpdatePhoneNumber";
import Layout from "../../Layout";

export default function UpdatePhoneNumberPage() {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Layout name='Change of phone number' breadcrumb='Update phone number'>
        <UpdatePhoneNumber
          webClick={() => {}}
          image={""}
          generatedNumber={0}
          // validated={false}
        />
      </Layout>
    </>
  );
}
