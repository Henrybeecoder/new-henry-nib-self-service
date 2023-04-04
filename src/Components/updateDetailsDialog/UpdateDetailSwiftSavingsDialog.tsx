import React from 'react';
import { useDispatch } from 'react-redux';
import Icon_L from '../../assets/images/Icon_L.svg'
import Rectangle_61 from '../../assets/images/Rectangle_61.svg'
import { setAccountOpeningStep } from '../../redux/accountOpening';

function UpdateDetailSwiftSavingsDialog(props: any) {


    const disatch = useDispatch()

    const updateDetails = () => {
        disatch(setAccountOpeningStep('document-upload'))
    }


    return (
        <div>
            <div className=" card-form pl-1 pr-1 ">
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
                            <img src={Rectangle_61} alt="" />
                        </div>

                        <div className="col-sm-8 mt-4 pt-2 sec">
                            <div className="row form-row mb-3">
                                <div className="col-lg-6 sec">
                                    <label htmlFor="firstname" className="label_text">Firstname</label>
                                    <input type="text" className="form-control bg-white border-dark" placeholder="Tunde" />
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="secondname" className="label_text">Secondname</label>
                                    <input type="text" className="form-control bg-white border-dark" placeholder="Emeka"
                                    />
                                </div>
                            </div>
                            <div className="row form-row mb-3">
                                <div className="col-lg-6">
                                    <label htmlFor="lastname" className="label_text">Lastname</label>
                                    <input type="text" className="form-control bg-white border-dark" placeholder="Aminah"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="dateofbirth" className="label_text">Date of birth</label>
                                    <input type="text" className="form-control bg-white border-dark" placeholder="12-04-1989"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col sec">
                            <div className="row form-row mb-3">
                                <div className="col-lg-6 mr-2">
                                    <label htmlFor="lastname" className="label_text">Phone number</label>
                                    <input type="text" className="form-control bg-white border-dark" placeholder="0801 2345 678"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="dateofbirth" className="label_text">Email address</label>
                                    <input type="text" className="form-control bg-white border-dark"
                                        placeholder="sample@email.com" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">

                    </div>


                    <div className=" row form-group d-flex mb-4">
                        <div className="col-lg-6">
                            <label htmlFor="religion" className="label_text">Religion</label>
                            <select className="form-control border-dark">
                                <option>Christianity</option>
                            </select>
                        </div>
                        <div className="col-lg-6 mr-0">
                            <label htmlFor="occupation" className="label_text">Occupation</label>
                            <select className="form-control border-dark">
                                <option>Barber</option>
                            </select>
                        </div>
                    </div>


                    <div className="row mb-4">
                        <div className="col sec">
                            <div className="row form-row mb-3">
                                <div className="col-lg-6 mr-2">
                                    <label htmlFor="housenumber" className="label_text">House number</label>
                                    <input type="text" className="form-control bg-white border-dark"
                                        placeholder="No 12" />
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="streetname" className="label_text">Street name</label>
                                    <input type="text" className="form-control bg-white border-dark"
                                        placeholder="Bode Thomas" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col sec">
                            <div className="row form-row mb-3">
                                <div className="col-lg-6 mr-2">
                                    <label htmlFor="housenumber" className="label_text">Area/State</label>
                                    <input type="text" className="form-control bg-white border-dark"
                                        placeholder="Lagos" />
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="streetname" className="label_text">Nearest
                                        bus-top/landmark</label>
                                    <input type="text" className="form-control bg-white border-dark"
                                        placeholder="Masha round about" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group mb-4">
                        <input className="form-control sec border-dark" type="text" id="address"
                            placeholder="No 12 Bode Thomas Masha round about Lagos" />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="refferalcode" className="label_text">Referral code(optional)</label>
                        <input className="form-control border-dark" type="text" id="name"
                            placeholder="Enter referral code" />
                    </div>

                    <div>
                        <div className="d-flex justify-content-end mt-4">
                            <button style={{ marginRight: '10px' }} className="btn btn-outline-danger btn-filled-white">Previous</button>
                            <button type="submit" className="btn btn-danger btn-filled-red" onClick={updateDetails}>Proceed</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default UpdateDetailSwiftSavingsDialog;