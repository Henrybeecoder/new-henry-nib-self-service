import React from 'react';
import Icon_L from '../../assets/images/Icon_L.svg'


function UpdateDetailJointSavingsDialog(props:any) {
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
                  <small className="label_text">First signatory</small>
                  <div className="col-12 pic_upload3 label_text3 text-nowrap">Photo</div>
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
                      <input type="text" className="form-control bg-white border-dark" placeholder="12-04-1989" disabled />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="idcardtype" className="label_text my-2">Select identity card type</label>

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


              <div className="row">
                <div className="col sec">
                  <div className="row form-row mb-3">
                    <div className="col-lg-6 mr-2">
                      <label htmlFor="nextofkin" className="label_text">Name of next of kin</label>
                      <input type="text" className="form-control bg-white border-dark"
                        placeholder="Enter name of next of kin" disabled />
                    </div>
                    <div className="col-lg-6 form-group">
                      <label htmlFor="employmentinformation" className="label_text">Select employment information</label>
                      <select className="form-control select-group border-dark bg-white select-dropdown pt-2 pb-3"
                        name="employmentinformation" id="box">
                        <option value="yes" className="select-item">Employed</option>
                        <option value="yes" className="select-item">Self-employed</option>
                        <option value="yes" className="select-item">Retired</option>
                        <option value="yes" className="select-item ">Others</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group mt-4 mb-4">
                <label htmlFor="idcardtype" className="label_text font-weight-bold mb-3"><b>Second signatory</b></label>
                <div className="d-flex justify-content-between pb-1 fillup">
                  <label htmlFor="name" className="fila">Enter BVN (of secondary signatory)</label>
                  <i className='bx bxs-info-circle' data-toggle="tooltip" data-placement="bottom"
                    title="The Bank Verification Number (BVN) is an 11-digit number.Dial *565*0# to check your BVN">
                  </i>
                </div>
                <input className="form-control bvn_input text-muted border-dark" type="text" id="bvn /"
                  placeholder="Enter your BVN" />
              </div>

              <div className="row">
                <div className="col-sm-4">
                  <br/>
                  <div className="col-12 pic_upload3 label_text3 text-nowrap">Photo</div>
                </div>

                <div className="col-sm-8 mt-4 pt-2 sec">
                  <div className="row form-row mb-3">
                    <div className="col-lg-6 sec">
                      <label htmlFor="firstname" className="label_text">Firstname</label>
                      <input type="text" className="form-control bg-white border-dark" placeholder="" />
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="secondname" className="label_text">Secondname</label>
                      <input type="text" className="form-control bg-white border-dark" placeholder="" />
                    </div>
                  </div>
                  <div className="row form-row mb-3">
                    <div className="col-lg-6">
                      <label htmlFor="lastname" className="label_text">Lastname</label>
                      <input type="text" className="form-control bg-white border-dark" placeholder="" />
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="dateofbirth" className="label_text">Date of birth</label>
                      <input type="text" className="form-control bg-white border-dark" placeholder="" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="idcardtype" className="label_text mb-3">Select identity card type</label>

                <ul className="nav nav-pills identity-tab mb-3 nav-fill" id="pills-tab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active text-nowrap pl-0 pt-2" id="pills-int-tab" data-toggle="pill"
                      href="#pills-int2" role="tab" aria-controls="pills-int" aria-selected="true">International
                      passport</a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a className="nav-link text-nowrap pl-0 pt-2 " id="pills-nat-tab" data-toggle="pill"
                      href="#pills-nat2" role="tab" aria-controls="pills-nat" aria-selected="false">National ID
                      card</a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a className="nav-link text-nowrap pl-0 pt-2" id="pills-pvc-tab" data-toggle="pill" href="#pills-pvc2"
                      role="tab" aria-controls="pills-pvc" aria-selected="false">Permanent
                      Voter's card</a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a className="nav-link text-nowrap pl-0 pt-2" id="pills-lic-tab" data-toggle="pill" href="#pills-lic2"
                      role="tab" aria-controls="pills-lic" aria-selected="false">Nigerian
                      Driver's licence</a>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane show fade active" id="pills-int2" role="tabpanel"
                    aria-labelledby="pills-int-tab">
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

                  <div className="tab-pane fade" id="pills-nat2" role="tabpanel" aria-labelledby="pills-nat-tab">
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

                  <div className="tab-pane fade" id="pills-pvc2" role="tabpanel" aria-labelledby="pills-pvc-tab">
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
                  <div className="tab-pane fade" id="pills-lic2" role="tabpanel" aria-labelledby="pills-lic-tab">
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

              <div className="row">
                <div className="col sec">
                  <div className="row form-row mb-3">
                    <div className="col-lg-6 mr-2">
                      <label htmlFor="nextofkin" className="label_text">Name of next of kin</label>
                      <input type="text" className="form-control bg-white border-dark"
                        placeholder="Enter name of next of kin" disabled />
                    </div>
                    <div className="col-lg-6 form-group">
                      <label htmlFor="employmentinformation" className="label_text text-nowrap">Select employment
                        information</label>
                      <select className="form-control select-group border-dark bg-white select-dropdown pt-2 pb-3"
                        name="employmentinformation" id="box">
                        <option value="yes" className="select-item">Employed</option>
                        <option value="yes" className="select-item">Self-employed</option>
                        <option value="yes" className="select-item">Retired</option>
                        <option value="yes" className="select-item ">Others</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group mt-4 mb-4">
                <label htmlFor="idcardtype" className="label_text font-weight-bold mb-3"><b>Joint account information</b></label>
                <div className="d-flex justify-content-between pb-2 fillup">
                  <label htmlFor="name" className="label_text pb-1">Joint account name</label>
                </div>
                <input className="form-control bvn_input text-muted border-dark" type="text" id="bvn" placeholder="" />
              </div>

              <div className="row">
                <div className="col sec">
                  <div className="row form-row mb-3">
                    <div className="col-lg-6 mr-2">
                      <label htmlFor="phonenumber" className="label_text">Joint account phone number</label>
                      <input type="text" className="form-control border-dark bg-white" placeholder="0801 2345 678" />
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="email" className="label_text"> Joint account email address</label>
                      <input type="email" className="form-control bg-white border-dark" placeholder="sample@email.com" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col sec">
                  <div className="row form-row mb-2">
                    <div className="col-lg-6 form-group mr-2">
                      <label htmlFor="employmentinformation" className="label_text">Select joint account mandate</label>
                      <select className="form-control select-group border-dark bg-white select-dropdown pt-2 pb-3"
                        name="employmentinformation" id="box">
                        <option value="yes" className="select-item">Both</option>
                        <option value="yes" className="select-item">Either</option>
                        <option value="yes" className="select-item ">Others</option>
                      </select>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="specifymandate" className="label_text">Specify Mandate (for others)</label>
                      <input type="text" className="form-control bg-white border-dark" placeholder="" />
                    </div>
                  </div>
                </div>
              </div>

              <label htmlFor="residentialaddress" className="label_text mb-2 mt-4 font-weight-bold"><b>Residential address</b></label>

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

              <div className="form-group mb-4">
                <input className="form-control sec border-dark" type="text" id="address"
                  placeholder="No 12 Bode Thomas Masha round about Lagos" />
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

export default UpdateDetailJointSavingsDialog;