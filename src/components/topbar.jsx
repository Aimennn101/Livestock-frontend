import React from "react";

const TopbarComponent = () =>{
return (
    <div className="container-fluid bg-dark px-0">
        <div className="row g-0 d-none d-lg-flex">
            <div className="col-lg-6 ps-5 text-start">
                <div className="h-100 d-inline-flex align-items-center text-light">
                    <span>Follow Us:</span>
                    <a className="btn btn-link text-light" href=""><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-link text-light" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-link text-light" href=""><i className="fab fa-linkedin-in"></i></a>
                    <a className="btn btn-link text-light" href=""><i className="fab fa-instagram"></i></a>
                </div>
            </div>
            <div className="col-lg-6 text-end">
                <div className="h-100 bg-secondary d-inline-flex align-items-center text-dark py-2 px-4">
                    <span className="me-2 fw-semi-bold"><i className="fa fa-phone-alt me-2"></i>Call Us:</span>
                    <span>+012 345 6789</span>
                </div>
            </div>
        </div>
    </div>
);
}

export default TopbarComponent;