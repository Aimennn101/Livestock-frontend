import React from "react";
import { Carousel } from "react-bootstrap";
import carousel1 from "../../assets/carousel-1.jpg";
import carousel2 from "../../assets/carousel-2.jpg";


const CarouselComp = () => {
    return (
        <Carousel fade>
        <Carousel.Item>
          <img
            className="w-100"
            src={carousel1}
            alt="First slide"
            onClick={() => handleNavigate("/livestock")}
            style={{ cursor: "pointer" }} 
          />
          <Carousel.Caption>
          <div className="container">
              <div className="row justify-content-start">
                  <div className="col-lg-8 text-start">
                      <p className="fs-4 text-white">Welcome to our dairy farm</p>
                      <h1 className="display-1 text-white mb-5 animated slideInRight">The Farm of Dairy products</h1>
                      <a href="" className="btn btn-secondary rounded-pill py-3 px-5 animated slideInRight">Explore More</a>
                  </div>
              </div>
          </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className=" w-100"
            src={carousel2}
            alt="Second slide"
            onClick={() => handleNavigate("/housing")}
            style={{ cursor: "pointer" }} 
          />
          <Carousel.Caption>
          <div className="container">
              <div className="row justify-content-end">
                  <div className="col-lg-8 text-end">
                      <p className="fs-4 text-white">Welcome to our dairy farm</p>
                      <h1 className="display-1 text-white mb-5 animated slideInRight">Best Organic Dairy Products</h1>
                      <a href="" className="btn btn-secondary rounded-pill py-3 px-5 animated slideInLeft">Explore More</a>
                  </div>
              </div>
          </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
}

export default CarouselComp;