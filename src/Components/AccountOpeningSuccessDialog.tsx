import React from 'react';
import success from '../assets/images/success-icon.svg'
import copyButton from '../assets/images/copy-button.svg'

function AccountOpeningSuccessDialog(props: any) {
    return (
        <div>
            <div className="card-body text-center">
                <img className="" src={success} alt="" />
                <h4 className="card-title text-center pl-3 mt-5">Congratulations Tunde, your <br /> account
                    opening was successful</h4>
                <p className="text-center text-muted">
                    Here is your account number
                </p>
                <div className="acct_num2 container mb-4 text-center pt-3">
                    <p className="pl-2 pr-5">1234567890</p>
                    <img className="img-fluid pb-2" src={copyButton} alt="" />
                </div>
            </div>

            <div className=" row text-center">
                <div className="col-md-12">
                    <button className="btn btn-outline-danger mr-3 btn-filled-white">Okay</button>
                </div>
            </div>
        </div>
    );
}

export default AccountOpeningSuccessDialog;