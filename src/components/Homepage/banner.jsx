import React from "react";
import banner from "../../assets/banner.jpg";
import banner1 from "../../assets/banner-1.jpg";
import banner2 from "../../assets/banner-2.jpg";

const Banner = () => {
    return (
        <div className="container-fluid banner my-5 py-5" data-parallax="scroll" data-image-src={banner}>
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.3s">
                    <div className="row g-4 align-items-center">
                        <div className="col-sm-4">
                            <img className="img-fluid rounded" src={banner1} alt=""/>
                        </div>
                        <div className="col-sm-8">
                            <h2 className="text-white mb-3">We Sell Best Dairy Products</h2>
                            <p className="text-white mb-4">Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                            <a className="btn btn-secondary rounded-pill py-2 px-4" href="">Read More</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                    <div className="row g-4 align-items-center">
                        <div className="col-sm-4">
                            <img className="img-fluid rounded" src={banner2} alt=""/>
                        </div>
                        <div className="col-sm-8">
                            <h2 className="text-white mb-3">We Deliver Fresh Mild Worldwide</h2>
                            <p className="text-white mb-4">Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                            <a className="btn btn-secondary rounded-pill py-2 px-4" href="">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Banner;