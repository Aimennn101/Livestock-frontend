import React from 'react';
import Lottie from 'react-lottie-player';
import animationData from '../assets/animation-lottie.json'
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();
    return (
        <div>
            <section className="d-flex align-items-center min-vh-100 py-5">
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-md-6 order-md-2">
                            <div>
                                <Lottie
                                    loop
                                    animationData={animationData}
                                    play
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 text-center text-md-start">
                            <div className="lc-block mb-3" style={{marginLeft: "-15px"}}>
                                <h1 className="fw-bold h4">PAGE NOT FOUND!</h1>
                            </div>
                            <div className="lc-block mb-3" style={{marginLeft: "-15px"}}>
                                <h1 className="display-1 fw-bold text-muted">Error 404</h1>
                            </div>
                            <div className="lc-block mb-5">
                                <p className="rfs-11 fw-light">
                                    The page you are looking for was moved, removed, or might never have existed.
                                </p>
                            </div>
                            <div className="lc-block">
                                <a className="btn btn-lg btn-primary"  role="button" onClick={() => navigate('/dashboard')}>
                                    Back to homepage
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>5
        </div>
    );
};

export default Error;
