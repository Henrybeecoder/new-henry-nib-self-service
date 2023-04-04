import React from 'react';
import uploadArrow from '../assets/images/upload-arrow.svg'
import pen from '../assets/images/pen.svg'
import camera from '../assets/images/camera.svg'
import { useDispatch } from 'react-redux';
import { setAccountOpeningStep } from '../redux/accountOpening';

function DocumentUploadDialog(props: any) {

    const disatch = useDispatch()

    const uploadDocuments = () => {
        disatch(setAccountOpeningStep('account-opening-success'))
    }

    
    return (
        <div>
            <div className=" card-form px-2">
                <div className="card-body">
                    <h4 className="card-title text-center pl-3 mt-5">Document upload</h4>
                    <p className="text-center">
                        <small>The file format should be JPEG, PNG or PDF (max size:2mb)</small>
                    </p>

                    <div className="row mr-3">
                        <div className="col-lg-3">
                            <div className="col-md-3">
                                <label htmlFor="firstname" className="label_text2 d-inline text-nowrap">Draw/Upload
                                    Signature</label>
                                <div className="pic_upload d-flex justify-content-between pt-3 pr-3 px-2">
                                    <p className="label_text">Click or drag <br /> and drop file</p>
                                    <img className="img-fluid" src={uploadArrow} alt="" />
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-3">
                            <div className="col-md-3 mt-4">
                                <div className="pic_upload d-flex justify-content-between pt-3 pr-3 px-2">
                                    <p className="label_text">Draw an <br /> e-signature</p>
                                    <img className="img-fluid" src={pen} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="col-md-3">
                                <label htmlFor="firstname" className="label_text2 text-nowrap">Take/Upload live
                                    picture</label>
                                <div className="pic_upload d-flex justify-content-between pt-3 pr-3 px-2">
                                    <p className="label_text">Click or drag <br /> and drop file</p>
                                    <img className="img-fluid" src={uploadArrow} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="col-md-3 mt-4">
                                <div className="pic_upload d-flex justify-content-between pt-3 pr-3 px-2">
                                    <p className="label_text">Take live<br />picture</p>
                                    <img className="img-fluid" src={camera} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3 ml-1">
                        <div className="col form-group">
                            <label htmlFor="branch domicilation" className="label_text">Branch of account
                                domiciliation</label>
                            <select className="form-control border-dark bg-white" name="branch" id="">
                                <option value="yes" className="">Select branch of account domiciliation

                                </option>
                            </select>

                        </div>

                    </div>

                    <div className="row mt-3 ml-1">
                        <label htmlFor="branch domicilation" className="label_text mb-3">Select value-added
                            services</label>

                        <div className="custom-control custom-checkbox checkbox-lg input-group mb-2">
                            <input type="checkbox" className="custom-control-input" id="checkbox1" style={{marginRight:'10px'}} />
                            <label className="custom-control-label pl-2" htmlFor="checkbox1">Debit card (Verve)</label>
                        </div>
                        <div className="custom-control custom-checkbox checkbox-lg input-group mb-2">
                            <input type="checkbox" className="custom-control-input" id="checkbox2" style={{marginRight:'10px'}}/>
                            <label className="custom-control-label pl-2" htmlFor="checkbox2">SMS alert</label>
                        </div>
                        <div className="custom-control custom-checkbox checkbox-lg input-group mb-2">
                            <input type="checkbox" className="custom-control-input" id="checkbox3" style={{marginRight:'10px'}}/>
                            <label className="custom-control-label pl-2" htmlFor="checkbox3">Email alert</label>
                        </div>
                        <div className="custom-control custom-checkbox checkbox-lg input-group mb-2">
                            <input type="checkbox" className="custom-control-input" id="checkbox4" style={{marginRight:'10px'}}/>
                            <label className="custom-control-label pl-2" htmlFor="checkbox4">
                                By checking this box, you
                                have accepted the <span><a className="text-danger" href="#">
                                    <u>Terms and condition</u></a></span></label>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-2">
                    <div className="mb-3 mr-4" style={{marginRight:'20px'}}>
                        <button className="btn btn-outline-danger mr-3 btn-filled-white">Previous</button>
                    </div>
                    <div className="ml-4">
                        <button type="submit" className="btn btn-danger btn-filled-red" onClick={uploadDocuments}>Proceed</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DocumentUploadDialog;