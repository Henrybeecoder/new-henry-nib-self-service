import React from 'react';
import Icon_L from '../../assets/images/Icon_L.svg'


function UpdateDetailDomiciliarySavingsDialog(props: any) {
    return (
        <div>
            <div className="card-body">
                <h4 className="card-title text-center pl-3 mt-4">Update details</h4>
                <p className="text-center pl-5 no-wrap">Hello <span className="font-weight-bold"><b>Tunde,</b> </span>
                    Welcome to Sterling Alternative Finance
                </p>
                <div className="bvn_val mb-4" id="fader">
                    <img src={Icon_L} alt="" />
                    <small className="text-danger ml-4 font-weight-bold"><b>Update your address and email if it has changed</b></small>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <small className="label_text">Photo</small>
                        <div className="col-12 pic_upload3"></div>
                    </div>

                    <div className="col-sm-8 mt-4 pt-2 sec">
                        <div className="row form-row mb-3">
                            <div className="col-lg-6 sec">
                                <label htmlFor="firstname" className="label_text">Firstname</label>
                                <input type="text" className="form-control bg-white border-dark" placeholder="Tunde" disabled />
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="secondname" className="label_text">Secondname</label>
                                <input type="text" className="form-control bg-white border-dark" placeholder="Emeka" disabled />
                            </div>
                        </div>
                        <div className="row form-row mb-3">
                            <div className="col-lg-6">
                                <label htmlFor="lastname" className="label_text">Lastname</label>
                                <input type="text" className="form-control bg-white border-dark" placeholder="Aminah" disabled />
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="dateofbirth" className="label_text">Date of birth</label>
                                <input type="text" className="form-control bg-white border-dark" placeholder="12-04-1989" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col sec">
                        <div className="row form-row mb-3">
                            <div className="col-lg-6 mr-2">
                                <label htmlFor="phonenumber" className="label_text">Phone number</label>
                                <input type="text" className="form-control bg-white border-dark" placeholder="0801 2345 678" disabled />
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="email" className="label_text">Email address</label>
                                <input type="email" className="form-control bg-white border-dark" placeholder="sample@email.com"
                                    disabled />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">

                </div>
                <label htmlFor="residentialaddress" className="label_text my-2 font-weight-bold">Residential address</label>

                <div className="row">
                    <div className="col sec">
                        <div className="row form-row mb-3">
                            <div className="col-lg-6 mr-2">
                                <label htmlFor="housenumber" className="label_text">House number</label>
                                <input type="text" className="form-control bg-white border-dark" placeholder="No 12" />
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="streetname" className="label_text">Street name</label>
                                <input type="text" className="form-control bg-white border-dark" placeholder="Bode Thomas" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col sec">
                        <div className="row form-row mb-3">
                            <div className="col-lg-6 mr-2">
                                <label htmlFor="housenumber" className="label_text">Area/State</label>
                                <input type="text" className="form-control bg-white border-dark" placeholder="Lagos" />
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="streetname" className="label_text">Nearest
                                    bus-top/landmark</label>
                                <input type="text" className="form-control bg-white border-dark" placeholder="Masha round about" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <input className="form-control sec border-dark" type="text" id="address"
                        placeholder="No 12 Bode Thomas Masha round about Lagos" />
                </div>

                <div className="row mt-3 mb-4">
                    <div className="col form-group">
                        <label htmlFor="religion" className="label_text">Religion</label>
                        <select className="form-control border-dark bg-white" name="branch" id="">
                            <option value="yes" className="">Christianity</option>
                        </select>

                    </div>

                </div>

                <div className=" row form-group d-flex mb-4">
                    <div className="col-lg-6">
                        <label htmlFor="employment" className="label_text">Self employment information</label>
                        <select className="form-control border-dark bg-white" name="branch" id="">
                            <option value="yes" className="">Self-emplpoyed</option>
                            <option value="yes" className="">Retired</option>
                            <option value="yes" className="">Others</option>
                        </select>
                    </div>
                    <div className="col-lg-6 mr-0">
                        <label htmlFor="occupation" className="label_text">Occupation</label>
                        <select className="form-control border-dark bg-white" name="branch" id="">
                            <option value="yes" className="">Barber</option>
                        </select>
                    </div>
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="nextofkin" className="label_text">Name of next of kin</label>
                    <input className="form-control border-dark" type="text" id="name" placeholder="Enter name of next of kin" />
                </div>

                <div className="form-group">
                    <label htmlFor="idcardtype" className="label_text">Select identity card type</label>

                    <ul className="nav nav-pills identity-tab mb-3 nav-fill" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active text-nowrap pl-0 pt-2" id="pills-int-tab" data-toggle="pill"
                                href="#pills-int" role="tab" aria-controls="pills-int" aria-selected="true">International
                                passport</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-nowrap pl-0 pt-2 " id="pills-nat-tab" data-toggle="pill" href="#pills-nat"
                                role="tab" aria-controls="pills-nat" aria-selected="false">National ID
                                card</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-nowrap pl-0 pt-2" id="pills-pvc-tab" data-toggle="pill" href="#pills-pvc"
                                role="tab" aria-controls="pills-pvc" aria-selected="false">Permanent
                                Voter's card</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-nowrap pl-0 pt-2" id="pills-lic-tab" data-toggle="pill" href="#pills-lic"
                                role="tab" aria-controls="pills-lic" aria-selected="false">Nigerian
                                Driver's licence</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane show fade active" id="pills-int" role="tabpanel" aria-labelledby="pills-int-tab">
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="nextofkin" className="label_text">ID card number</label>
                                        <input className="form-control border-dark" type="text" id="name"
                                            placeholder="Enter ID card number" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group identity">
                                        <label htmlFor="issuedate" className="label_text">Issue Date</label>
                                        <input type="text" className="form-control border-dark bg-white" placeholder="dd/mm/yyyy" />
                                    </div>

                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="expirydate" className="label_text">Expiry Date</label>
                                        <input type="text" className="form-control border-dark bg-white" placeholder="dd/mm/yyyy" />
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="tab-pane fade" id="pills-nat" role="tabpanel" aria-labelledby="pills-nat-tab">
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="nextofkin" className="label_text">ID card number</label>
                                        <input className="form-control border-dark" type="text" id="name"
                                            placeholder="Enter ID card number" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group identity">
                                        <label htmlFor="issuedate" className="label_text">Issue Date</label>
                                        <input type="text" className="form-control border-dark bg-white" placeholder="dd/mm/yyyy" />
                                    </div>

                                </div>
                                <div className="col-md-3">

                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-pvc" role="tabpanel" aria-labelledby="pills-pvc-tab">
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="nextofkin" className="label_text">ID card number</label>
                                        <input className="form-control border-dark" type="text" id="name"
                                            placeholder="Enter ID card number" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group identity">
                                        <label htmlFor="issuedate" className="label_text">Issue Date</label>
                                        <input type="text" className="form-control border-dark bg-white" placeholder="dd/mm/yyyy" />
                                    </div>

                                </div>
                                <div className="col-md-3">

                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-lic" role="tabpanel" aria-labelledby="pills-lic-tab">
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="nextofkin" className="label_text">ID card number</label>
                                        <input className="form-control border-dark" type="text" id="name"
                                            placeholder="Enter ID card number" />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group identity">
                                        <label htmlFor="issuedate" className="label_text">Issue Date</label>
                                        <input type="text" className="form-control border-dark bg-white" placeholder="dd/mm/yyyy" />
                                    </div>

                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="expirydate" className="label_text">Expiry Date</label>
                                        <input type="text" className="form-control border-dark bg-white" placeholder="dd/mm/yyyy" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="form-group">
                    <label htmlFor="refferalcode" className="label_text">Referral code(optional)</label>
                    <input className="form-control border-dark" type="text" id="name" placeholder="Enter referral code" />
                </div>

                <div className="d-flex justify-content-end mt-4">

                    <button style={{ marginRight: '10px' }} className="btn btn-outline-danger mr-3 btn-filled-white"
                    >Previous</button>
                    <button type="submit" className="btn btn-danger btn-filled-red"
                    >Proceed
                    </button>
                </div>


            </div>
        </div>
    );
}

export default UpdateDetailDomiciliarySavingsDialog;