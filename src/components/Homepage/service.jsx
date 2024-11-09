import React from "react";
import service1 from "../../assets/service-1.jpg";
import service2 from "../../assets/service-2.jpg";
import service3 from "../../assets/service-3.jpg";

const Service = () => {
    return (
        <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center mx-auto pb-4 wow fadeInUp" data-wow-delay="0.1s">
                <p className="section-title bg-white text-center text-primary px-3">Our Services</p>
                <h1 className="mb-5">Services That We Offer For Entrepreneurs</h1>
            </div>
            <div className="row gy-5 gx-4">
                <div className="col-lg-4 col-md-6 pt-5 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="service-item d-flex h-100">
                        <div className="service-img">
                            <img className="img-fluid" src={service1} alt="" />
                        </div>
                        <div className="service-text p-5 pt-0">
                            <div className="service-icon">
                                <img className="img-fluid rounded-circle" src={service1} alt="" />
                            </div>
                            <h5 className="mb-3">Best Animal Selection</h5>
                            <p className="mb-4">Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.</p>
                            <a className="btn btn-square rounded-circle" href=""><i className="bi bi-chevron-double-right"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 pt-5 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="service-item d-flex h-100">
                        <div className="service-img">
                            <img className="img-fluid" src={service2} alt="" />
                        </div>
                        <div className="service-text p-5 pt-0">
                            <div className="service-icon">
                                <img className="img-fluid rounded-circle" src={service2} alt="" />
                            </div>
                            <h5 className="mb-3">Breeding & Veterinary</h5>
                            <p className="mb-4">Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.</p>
                            <a className="btn btn-square rounded-circle" href=""><i className="bi bi-chevron-double-right"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 pt-5 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="service-item d-flex h-100">
                        <div className="service-img">
                            <img className="img-fluid" src={service3} alt="" />
                        </div>
                        <div className="service-text p-5 pt-0">
                            <div className="service-icon">
                                <img className="img-fluid rounded-circle" src={service3} alt="" />
                            </div>
                            <h5 className="mb-3">Care & Milking</h5>
                            <p className="mb-4">Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.</p>
                            <a className="btn btn-square rounded-circle" href=""><i className="bi bi-chevron-double-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Service;