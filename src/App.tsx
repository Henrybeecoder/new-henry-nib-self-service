import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// screens
import Slider from "./Components/Sliders";
import AccountReactivation from "./Screens/AccountReactivation";
import UpdateEmail from "./Screens/UpdateEmail";
import UpdatePhoneNumberPage from "./Screens/UpdatePhoneNumber";
import MandateandSignature from "./Screens/MandateandSignature";
import ResidentialAdress from "./Screens/ResidentialAddress";
import UpdateExpiredId from "./Screens/UpdateExpiredId";
import ChequeRequest from "./Screens/ChequeRequest";
import BranchDomiciliation from "./Screens/BranchDomicilisation";
import UpdateAccountName from "./Screens/UpdateAccountName";
import ChequeDeposit from "./Screens/ChequeDeposit";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Slider />} />
          <Route
            path='/account-reactivation'
            element={<AccountReactivation />}
          />
          <Route path='/update-email' element={<UpdateEmail />} />
          <Route
            path='/update-phone-number'
            element={<UpdatePhoneNumberPage />}
          />
          <Route path='/update-expired-id' element={<UpdateExpiredId />} />
          <Route
            path='/mandate-and-signature'
            element={<MandateandSignature />}
          />
          <Route path='/residential-address' element={<ResidentialAdress />} />
          <Route path='/cheque-request' element={<ChequeRequest />} />
          <Route path='/cheque-deposit' element={<ChequeDeposit />} />
          <Route
            path='/branch-domiciliation'
            element={<BranchDomiciliation />}
          />
          <Route path='/update-account-name' element={<UpdateAccountName />} />
        </Routes>
      </Router>
      {/* <BvnValidationDialog /> */}
      {/* <OpenAccount /> */}
    </div>
  );
}

export default App;
