import altLogo from "../assets/images/alt-logo.svg";
import group1 from "../assets/images/Group_1.svg";
import rightArrow from "../assets/images/right_arrow.svg";
import no2 from "../assets/images/no2.svg";
import { useNavigate } from "react-router";
import Done from "../assets/images/Done.svg";
import { ReactNode, useState } from "react";
import BvnValidation from "../Components/BvnValidation";
import Loader from "../Screens/Loader";
import { useSelector } from "react-redux";
import WebcamComp, { WCProps } from "./Webcam";

interface Props {
  name: string;
  breadcrumb: string;
  children: ReactNode;
  webcam?: WCProps;
}

const Layout = ({ children, name, breadcrumb, webcam }: Props) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const step = useSelector((state: any) => state.globalState.step);

  return (
    <>
      {isLoading && <Loader />}
      <div className='container-fluid row'>
        <div className='col-md-5 d-none d-md-inline left_col'>
          <div className='logo pl-4 pt-5'>
            <img
              src={altLogo}
              alt='alternative finance logo'
              onClick={() => navigate("/")}
            />
          </div>
        </div>

        <div className='col-md-7 right_col'>
          <div className='d-flex justify-content-end'>
            <div className='d-flex flex-column pt-5'>
              <div className='d-flex justify-content-end'>
                {/* <h1 className="float-right pr-3 mb-4">Swift Savings</h1> */}
                <h1 className='pr-3 mb-4 text-capitalize'>{name}</h1>
              </div>
              <nav className='mb-4'>
                <ol className='breadcrumb bg-white float-right'>
                  <li
                    className='breadcrumb-item'
                    style={{ alignItems: "center" }}>
                    <span>
                      <img // className={styles.done}
                        style={{
                          width: "28px",
                          marginRight: "5px",
                        }}
                        src={step === "validated" ? Done : group1}
                        alt=''
                      />
                    </span>
                    Bvn Validation &nbsp;
                    <span>
                      <img src={rightArrow} alt='' />
                    </span>
                  </li>

                  <li
                    className='breadcrumb-item'
                    style={{ alignItems: "center" }}>
                    <span>
                      <img
                        style={{
                          width: "28px",
                          marginRight: "5px",
                        }}
                        src={no2}
                        alt=''
                      />
                    </span>
                    {breadcrumb}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className='col-md-11 card validation-card pb-4'>
            <BvnValidation setIsLoading={setIsLoading}>
              {children}
            </BvnValidation>
          </div>
        </div>
      </div>

      <WebcamComp {...webcam} />
    </>
  );
};

export default Layout;
