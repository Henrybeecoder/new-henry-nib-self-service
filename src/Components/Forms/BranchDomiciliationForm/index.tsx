//@ts-ignore
//@ts-nocheck
import React, { useState, useRef, useMemo } from "react";
import styles from "./style.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import carlender from "../../../assets/images/calender.svg";
// import cameraX from "../../../assets/images/cameraX.svg";
// import { WebcamCapture } from "../../../Containers/TakePicture";
import { useForm } from "react-hook-form";
import BranchSuccess from "./BranchSuccess";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
// import * as toast from "../../../utils/makeToast";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { getLocalStorageItem } from "../../../utils/localStorage";
import SignaturePad from "react-signature-canvas";
import { getMonth, getYear } from "date-fns";
import { setStep } from "../../../redux/global";
import { BL, states } from "./BranchSuccess/utils";
import { useDispatch } from "react-redux";
import { PrevButton } from "../../Buttons";

export default function BranchDomiciliationForm({
  webClick,
  image,
  generatedNumber,
  validated,
}) {
  const dispatch = useDispatch();
  // const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});

  const clear = () => sigCanvas.current.clear();

  const { register, handleSubmit, watch, errors } = useForm();
  const [success, setSuccess] = useState(false);
  const onSubmit = (data) => {
    SubmitEmailForm();
  };

  const userDetails = useMemo(() => getLocalStorageItem("userDetails"), []);

  const [startDate, setStartDate] = useState(new Date());
  const [fullname, setfullname] = useState(userDetails.name);
  const [accountNumber, setAccountNumber] = useState(userDetails.accountNumber);
  const [OldState, setOldState] = useState("");
  const [NewState, setNewState] = useState("");
  const [NewBranch, setNewBranch] = useState("");
  const [OldBranch, setOldBranch] = useState("");
  const [eSignature, setESignature] = useState("");

  const [validating, setValidating] = useState(false);

  const handleOldStateChange = (event) => {
    setOldState(event.target.value);
  };

  const handleNewStateChange = (event) => {
    setNewState(event.target.value);
  };

  const handleOldBranchChange = (event) => {
    setOldBranch(event.target.value);
  };

  const handleNewBranchChange = (event) => {
    setNewBranch(event.target.value);
  };

  // console.log(userDetails);

  const SubmitEmailForm = () => {
    setValidating(true);
    let BranchDomiciliationPayload = {
      referenceId: userDetails.referenceId,
      requestedDate: startDate,
      eSignature: eSignature,
      userPicture: "pic",
      requestLetter: "request letter",
      fullName: fullname,
      accountNumber: accountNumber,
      state: NewState,
      oldBranch: OldBranch,
      newBranch: NewBranch,
    };

    axios
      .post(
        `${baseUrl}BranchDomiciliation/submit-branch-domiciliation`,
        BranchDomiciliationPayload
      )
      .then((response) => {
        console.log(response);
        if (response.data.responseCode === 5) {
          setSuccess(true);
        }

        setValidating(false);
      })
      .catch((err) => {
        //toast.errorToast("something went wrong");
        console.log(err);
        setValidating(false);
        setSuccess(true);
      });
  };

  const [branchList, setBranchList] = useState(BL);

  var abiaResult = branchList.filter((obj) => {
    return obj.state === "Abia";
  });

  var abujaResult = branchList.filter((obj) => {
    return obj.state === "Abuja";
  });

  var adamawaResult = branchList.filter((obj) => {
    return obj.state === "Adamawa";
  });

  var akwaIbomResult = branchList.filter((obj) => {
    return obj.state === "Akwa Ibom";
  });

  var anambraResult = branchList.filter((obj) => {
    return obj.state === "Anambra";
  });

  var bauchiResult = branchList.filter((obj) => {
    return obj.state === "Bauchi";
  });

  var bayelsaResult = branchList.filter((obj) => {
    return obj.state === "Bayelsa";
  });

  var benueResult = branchList.filter((obj) => {
    return obj.state === "Benue";
  });

  var calabarResult = branchList.filter((obj) => {
    return obj.state === "Calabar";
  });

  var deltaResult = branchList.filter((obj) => {
    return obj.state === "Delta";
  });

  var edoResult = branchList.filter((obj) => {
    return obj.state === "Edo";
  });

  var ekitiResult = branchList.filter((obj) => {
    return obj.state === "Ekiti";
  });

  var enuguResult = branchList.filter((obj) => {
    return obj.state === "Enugu";
  });

  var gombeResult = branchList.filter((obj) => {
    return obj.state === "Gombe";
  });

  var imoResult = branchList.filter((obj) => {
    return obj.state === "Imo";
  });

  var jigawaResult = branchList.filter((obj) => {
    return obj.state === "Jigawa";
  });

  var josResult = branchList.filter((obj) => {
    return obj.state === "Jos";
  });

  var kadunaResult = branchList.filter((obj) => {
    return obj.state === "Kaduna";
  });

  var kanoResult = branchList.filter((obj) => {
    return obj.state === "Kano";
  });

  var katsinaResult = branchList.filter((obj) => {
    return obj.state === "Katsina";
  });

  var kebbiResult = branchList.filter((obj) => {
    return obj.state === "Kebbi";
  });

  var kogiResult = branchList.filter((obj) => {
    return obj.state === "Kogi";
  });

  var kwaraResult = branchList.filter((obj) => {
    return obj.state === "Kwara";
  });

  var lagosResult = branchList.filter((obj) => {
    return obj.state === "Lagos";
  });

  var maiduguriResult = branchList.filter((obj) => {
    return obj.state === "Maiduguri";
  });

  var nigerResult = branchList.filter((obj) => {
    return obj.state === "Niger";
  });

  var ogunResult = branchList.filter((obj) => {
    return obj.state === "Ogun";
  });

  var ondoResult = branchList.filter((obj) => {
    return obj.state === "Ondo";
  });

  var osunResult = branchList.filter((obj) => {
    return obj.state === "Osun";
  });

  var oyoResult = branchList.filter((obj) => {
    return obj.state === "Oyo";
  });

  var riversResult = branchList.filter((obj) => {
    return obj.state === "Rivers";
  });

  var sokotoResult = branchList.filter((obj) => {
    return obj.state === "Sokoto";
  });

  var zamfaraResult = branchList.filter((obj) => {
    return obj.state === "Zamfara";
  });

  return (
    <>
      {success ? (
        <BranchSuccess />
      ) : (
        <div className={styles.container}>
          <Toaster position='top-center' reverseOrder={false} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.header}>Update branch domiciliation</h1>
            <p className={styles.paragraph}>
              Dear Sterling Alternative Finance,{" "}
            </p>
            <p className={styles.paragraph}>
              I,{" "}
              <input
                type='text'
                placeholder='insert full name'
                value={fullname}
                required
              />{" "}
              with account number{" "}
              <input
                type='text'
                placeholder='insert account number'
                value={accountNumber}
                required
              />{" "}
              would like to change my branch from{" "}
              <select value={OldState} onChange={handleOldStateChange}>
                <option value=''>Select state</option>
                {states.map((state) => {
                  return (
                    <option key={state.code} value={state.name}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
              <select value={OldBranch} onChange={handleOldBranchChange}>
                <option value=''>Select Old Branch</option>
                {branchList.map((state) => {
                  return (
                    <option key={state.Branch} value={state.Branch}>
                      {state.Branch}
                    </option>
                  );
                })}
                {/* {OldState == "Abia" && (
                  <>
                    {abiaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Abuja" && (
                  <>
                    {abujaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Adamawa" && (
                  <>
                    {adamawaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "AkwaIbom" && (
                  <>
                    {akwaIbomResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Anambra" && (
                  <>
                    {anambraResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Bauchi" && (
                  <>
                    {bauchiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Bayelsa" && (
                  <>
                    {bayelsaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Benue" && (
                  <>
                    {benueResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Calabar" && (
                  <>
                    {calabarResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Delta" && (
                  <>
                    {deltaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Edo" && (
                  <>
                    {edoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Ekiti" && (
                  <>
                    {ekitiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Enugu" && (
                  <>
                    {enuguResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Gombe" && (
                  <>
                    {gombeResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Imo" && (
                  <>
                    {imoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Jigawa" && (
                  <>
                    {jigawaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Jos" && (
                  <>
                    {josResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Kaduna" && (
                  <>
                    {kadunaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Kano" && (
                  <>
                    {kanoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Katsina" && (
                  <>
                    {katsinaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Kebbi" && (
                  <>
                    {kebbiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Kogi" && (
                  <>
                    {kogiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Kwara" && (
                  <>
                    {kwaraResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}

                {OldState == "Lagos" && (
                  <>
                    {lagosResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Maiduguri" && (
                  <>
                    {maiduguriResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Niger" && (
                  <>
                    {nigerResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Ogun" && (
                  <>
                    {ogunResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Ondo" && (
                  <>
                    {ondoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Osun" && (
                  <>
                    {osunResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Oyo" && (
                  <>
                    {oyoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Rivers" && (
                  <>
                    {riversResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Sokoto" && (
                  <>
                    {sokotoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {OldState == "Zamfara" && (
                  <>
                    {zamfaraResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )} */}
              </select>
              to{" "}
              <select value={NewState} onChange={handleNewStateChange}>
                <option value=''>Select state</option>
                {states.map((state) => {
                  return (
                    <option key={state.code} value={state.name}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
              <select value={NewBranch} onChange={handleNewBranchChange}>
                <option value=''>Select New Branch</option>
                {/* {NewState == "Abia" && (
                  <>
                    {abiaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Abuja" && (
                  <>
                    {abujaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Adamawa" && (
                  <>
                    {adamawaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "AkwaIbom" && (
                  <>
                    {akwaIbomResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Anambra" && (
                  <>
                    {anambraResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Bauchi" && (
                  <>
                    {bauchiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Bayelsa" && (
                  <>
                    {bayelsaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Benue" && (
                  <>
                    {benueResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Calabar" && (
                  <>
                    {calabarResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Delta" && (
                  <>
                    {deltaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Edo" && (
                  <>
                    {edoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Ekiti" && (
                  <>
                    {ekitiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Enugu" && (
                  <>
                    {enuguResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Gombe" && (
                  <>
                    {gombeResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Imo" && (
                  <>
                    {imoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Jigawa" && (
                  <>
                    {jigawaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Jos" && (
                  <>
                    {josResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Kaduna" && (
                  <>
                    {kadunaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Kano" && (
                  <>
                    {kanoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Katsina" && (
                  <>
                    {katsinaResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Kebbi" && (
                  <>
                    {kebbiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Kogi" && (
                  <>
                    {kogiResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Kwara" && (
                  <>
                    {kwaraResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}

                {NewState == "Lagos" && (
                  <>
                    {lagosResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Maiduguri" && (
                  <>
                    {maiduguriResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Niger" && (
                  <>
                    {nigerResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Ogun" && (
                  <>
                    {ogunResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Ondo" && (
                  <>
                    {ondoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Osun" && (
                  <>
                    {osunResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Oyo" && (
                  <>
                    {oyoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Rivers" && (
                  <>
                    {riversResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Sokoto" && (
                  <>
                    {sokotoResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )}
                {NewState == "Zamfara" && (
                  <>
                    {zamfaraResult.map((state) => {
                      return (
                        <option key={state.id} value={state.branch}>
                          {state.branch}
                        </option>
                      );
                    })}
                  </>
                )} */}
                {branchList.map((state) => {
                  return (
                    <option key={state.Branch} value={state.Branch}>
                      {state.Branch}
                    </option>
                  );
                })}
                {/* <option key={branchList.Branch} value={branchList.Branch}>
                  {state.branch}
                </option> */}
              </select>
              on this day,{" "}
              <DatePicker
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div
                    style={{
                      margin: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}>
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}>
                      {"<"}
                    </button>
                    <select
                      value={getYear(date)}
                      onChange={({ target: { value } }) => changeYear(value)}>
                      {years.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <select
                      value={months[getMonth(date)]}
                      onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                      }>
                      {months.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}>
                      {">"}
                    </button>
                  </div>
                )}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<ExampleCustomInput />}
              />
            </p>
            <div className={styles.holder}>
              <div className={styles.sign}>
                <div className={styles.headerX}>
                  <div className={styles.textHeader}>
                    <p>
                      <b>E-signature</b>
                    </p>
                    <p className={styles.textHeaderPara}>
                      Kindly append your e-signature.
                    </p>
                  </div>
                  <button className={styles.clearButton} onClick={clear}>
                    Clear
                  </button>
                </div>
                <SignaturePad
                  ref={sigCanvas}
                  canvasProps={{
                    className: `${styles.signatureCanvas}`,
                  }}
                />
              </div>
              <div className={styles.picture}>
                <div className={styles.page}></div>
              </div>
            </div>
            <div className={styles.flexButton}>
              <PrevButton />

              {validating ? (
                <div className='spinner-border text-danger mb-4' role='status'>
                  <span className='sr-only'></span>
                </div>
              ) : (
                <button className={styles.submitActive} type='submit'>
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
}

const ExampleCustomInput = React.forwardRef(({ value, onClick, ref }) => (
  <div>
    <input
      type='text'
      className={styles.customInput}
      onClick={onClick}
      ref={ref}
      value={value}
    />
    <img src={carlender} />
  </div>
));
