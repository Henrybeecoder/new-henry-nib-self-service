import "react-toastify/dist/ReactToastify.css";
import BranchDomiciliationForm from "../../Components/Forms/BranchDomiciliationForm";
import { Toaster } from "react-hot-toast";
import Layout from "../../Layout";

export default function BranchDomiciliation() {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Layout
        name='Change of branch domiciliation'
        breadcrumb='Update branch domiciliation'>
        <BranchDomiciliationForm
          webClick={() => {}}
          image={""}
          generatedNumber={0}
          validated={false}
        />
      </Layout>
    </>
  );
}
