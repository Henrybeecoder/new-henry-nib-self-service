import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import UpdateAccountNameForm from "../../Components/Forms/UpdateAccountNameForm";
import Layout from "../../Layout";

export default function UpdateAccountName() {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Layout name='Change of account name' breadcrumb='Update Account Name'>
        <UpdateAccountNameForm
          webClick={() => {}}
          image={""}
          generatedNumber={0}
          validated={false}
        />
      </Layout>
    </>
  );
}
