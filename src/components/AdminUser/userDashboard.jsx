import { useEffect, useState } from "react";
import "../../../src/css/addButton.css";
import "react-multi-carousel/lib/styles.css";
import "../../../src/css/vendor.css";
import "../../../src/css/style2.css";
import Footer from "../footer";
import cowBanner from "../../assets/cow-banner.png"
import goatBanner from "../../assets/goat-banner.png"
import goatCard from "../../assets/goat-card.jpg"
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const navigate = useNavigate();
    const cards = [
        { id: 1, value: "asd" },
        { id: 2, value: "asd" },
        { id: 2, value: "asd" }
    ];
    return (
        <div data-bs-spy="scroll" data-bs-target="#navbar" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" tabindex="0">
            <section id="billboard" className="position-relative overflow-hidden bg-light-blue">
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <div>
                        <div className="">
                            <div className="container ml-3">
                                <div className="row d-flex align-items-center">
                                    <div className="col-md-6">
                                        <div className="banner-content ml-4 pl-4 ps-4">
                                            <p className="display-2 text-uppercase text-dark pb-5">Your Products Are Great.</p>
                                            <a onClick={()=> navigate("/shop-product")} className="btn btn-medium btn-dark text-uppercase btn-rounded-none">Shop Product</a>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="image-holder">
                                            <img src={cowBanner} alt="banner" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="company-services" className="padding-large">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 pb-3">
                            <div className="icon-box d-flex">
                                <div className="icon-box-icon pe-3 pb-3">
                                    <svg className="cart-outline">
                                        <use xlink:href="#cart-outline" />
                                    </svg>
                                </div>
                                <div className="icon-box-content">
                                    <p className="card-title text-uppercase text-dark">Free delivery</p>
                                    <p>Consectetur adipi elit lorem ipsum dolor sit amet.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 pb-3">
                            <div className="icon-box d-flex">
                                <div className="icon-box-icon pe-3 pb-3">
                                    <svg className="quality">
                                        <use xlink:href="#quality" />
                                    </svg>
                                </div>
                                <div className="icon-box-content">
                                    <p className="card-title text-uppercase text-dark">Quality guarantee</p>
                                    <p>Dolor sit amet orem ipsu mcons ectetur adipi elit.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 pb-3">
                            <div className="icon-box d-flex">
                                <div className="icon-box-icon pe-3 pb-3">
                                    <svg className="price-tag">
                                        <use xlink:href="#price-tag" />
                                    </svg>
                                </div>
                                <div className="icon-box-content">
                                    <p className="card-title text-uppercase text-dark">Daily offers</p>
                                    <p>Amet consectetur adipi elit loreme ipsum dolor sit.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 pb-3">
                            <div className="icon-box d-flex">
                                <div className="icon-box-icon pe-3 pb-3">
                                    <svg className="shield-plus">
                                        <use xlink:href="#shield-plus" />
                                    </svg>
                                </div>
                                <div className="icon-box-content">
                                    <p className="card-title text-uppercase text-dark">100% secure payment</p>
                                    <p>Rem Lopsum dolor sit amet, consectetur adipi elit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="mobile-products" className="product-store position-relative padding-large no-padding-top">
                <div className="container">
                    <div className="row">
                        <div className="display-header d-flex justify-content-between pb-3">
                            <p className="display-7 text-dark text-uppercase">Latest Products</p>
                        </div>
                        <div className="swiper product-swiper">
                            <div className="swiper-wrapper">
                                <div className=" d-flex align-items-center justify-content-between">
                                    {cards.length > 0 ?
                                        cards.map((res) =>
                                        (<div className="product-card position-relative">
                                            <div className="image-holder">
                                                <img src={goatCard} alt="product-item" className="img-fluid" />
                                            </div>
                                            <div className="cart-concern position-absolute col-3">
                                                <div className="cart-button d-flex">
                                                    <a href="#" className="btn btn-medium btn-black">Add to Cart<svg className="cart-outline"><use xlink:href="#cart-outline"></use></svg></a>
                                                </div>
                                            </div>
                                            <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
                                                <p className="card-title text-uppercase">
                                                    <a href="#">Goat</a>
                                                </p>
                                                <span className="item-price text-primary">Pkr 2000</span>
                                            </div>
                                        </div>
                                        )) : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="swiper-pagination position-absolute text-center"></div>
            </section>
            <section id="yearly-sale" className="bg-light-blue overflow-hidden mt-5" style={{ backgroundImage: "url('images/single-image1.png')", backgroundPosition: "right", backgroundRepeat: "no-repeat" }}>
                <div className="row d-flex flex-wrap align-items-center">
                    <div className="col-md-6 col-sm-12">
                        <div className="text-content offset-4 padding-medium">
                            <p>10% off</p>
                            <p className="display-2 pb-5 text-uppercase text-dark">New year sale</p>
                            <a onClick={() => navigate("/shop-product")} className="btn btn-medium btn-dark text-uppercase btn-rounded-none">Shop Product</a>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="image-holder pl-5">
                            <img src={goatBanner} alt="banner" />
                        </div>
                    </div>
                </div>
            </section>
            <section id="testimonials" className="position-relative">
                <div className="container">
                    <div className="row">
                        <div className="review-content position-relative">
                            <div className="swiper-icon swiper-arrow swiper-arrow-prev position-absolute d-flex align-items-center">
                                <svg className="chevron-left">
                                    <use xlink:href="#chevron-left" />
                                </svg>
                            </div>
                            <div className="swiper testimonial-swiper">
                                <div className="quotation text-center">
                                    <svg className="quote">
                                        <use xlink:href="#quote" />
                                    </svg>
                                </div>
                                <div className="swiper-wrapper">
                                    <div className=" text-center d-flex justify-content-center">
                                        <div className="review-item col-md-10">
                                            <i className="icon icon-review"></i>
                                            <blockquote>“Tempus oncu enim pellen tesque este pretium in neque, elit morbi sagittis lorem habi mattis Pellen tesque pretium feugiat vel morbi suspen dise sagittis lorem habi tasse morbi.”</blockquote>
                                            <div className="rating">
                                                <svg className="star star-fill">
                                                    <use xlink:href="#star-fill"></use>
                                                </svg>
                                                <svg className="star star-fill">
                                                    <use xlink:href="#star-fill"></use>
                                                </svg>
                                                <svg className="star star-fill">
                                                    <use xlink:href="#star-fill"></use>
                                                </svg>
                                                <svg className="star star-half">
                                                    <use xlink:href="#star-half"></use>
                                                </svg>
                                                <svg className="star star-empty">
                                                    <use xlink:href="#star-empty"></use>
                                                </svg>
                                            </div>
                                            <div className="author-detail">
                                                <div className="name text-dark text-uppercase pt-2">Emma Chamberlin</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" text-center d-flex justify-content-center">
                                        <div className="review-item col-md-10">
                                            <i className="icon icon-review"></i>
                                            <blockquote>“A blog is a digital publication that can complement a website or exist independently. A blog may include articles, short posts, listicles, infographics, videos, and other digital content.”</blockquote>
                                            <div className="rating">
                                                <svg className="star star-fill">
                                                    <use xlink:href="#star-fill"></use>
                                                </svg>
                                                <svg className="star star-fill">
                                                    <use xlink:href="#star-fill"></use>
                                                </svg>
                                                <svg className="star star-fill">
                                                    <use xlink:href="#star-fill"></use>
                                                </svg>
                                                <svg className="star star-half">
                                                    <use xlink:href="#star-half"></use>
                                                </svg>
                                                <svg className="star star-empty">
                                                    <use xlink:href="#star-empty"></use>
                                                </svg>
                                            </div>
                                            <div className="author-detail">
                                                <div className="name text-dark text-uppercase pt-2">Jennie Rose</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-icon swiper-arrow swiper-arrow-next position-absolute d-flex align-items-center">
                                <svg className="chevron-right">
                                    <use xlink:href="#chevron-right" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="swiper-pagination"></div>
            </section>
            <section id="subscribe" className="container-grid padding-large position-relative overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="subscribe-content bg-dark d-flex flex-wrap justify-content-center align-items-center padding-medium">
                            <div className="col-md-6 col-sm-12">
                                <div className="display-header pe-3">
                                    <p className="display-7 text-uppercase text-light">Subscribe Us Now</p>
                                    <p>Get latest news, updates and deals directly mailed to your inbox.</p>
                                </div>
                            </div>
                            <div className="col-md-5 col-sm-12">
                                <form className="subscription-form validate">
                                    <div className="input-group flex-wrap">
                                        <input className="form-control btn-rounded-none" type="email" name="EMAIL" placeholder="Your email address here" required="" />
                                        <button className="btn btn-medium btn-primary text-uppercase btn-rounded-none" type="submit" name="subscribe">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section style={{width: "90vw", marginLeft: "-10px"}}><Footer></Footer></section>
        </div>
    )
}
export default UserDashboard;
