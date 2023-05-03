import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import ChequeDepositForm from "../../Components/Forms/ChequeDepositForm";
import Layout from "../../Layout";
import { useState } from "react";

const ChequeDeposit = () => {
  const [success, setSuccess] = useState(false);
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Layout name='Cheque Deposit' breadcrumb='Request details'>
        <ChequeDepositForm success={success} setSuccess={setSuccess} />

        {/* <button onClick={next}>next</button> */}
      </Layout>
    </>
  );
};

export default ChequeDeposit;
