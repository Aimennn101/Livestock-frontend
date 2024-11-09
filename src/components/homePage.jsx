import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/homePage.css";
import "../lib/owlcarousel/assets/owl.carousel.css";
import CarouselComp from "./Homepage/carousel";
import AboutUs from "./Homepage/aboutUs";
import WhyUs from "./Homepage/whyUs";
import Service from "./Homepage/service";
import Banner from "./Homepage/banner";
import Team from "./Homepage/team";
import Testimonial from "./Homepage/testimonial";
import NavbarComponent from "./navbar";
import TopbarComponent from "./topbar";
import Footer from "./footer";

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      navigate('/dashboard'); // Navigate to the Dashboard route if the token is present
    }
  }, []);

  return (
    <Container className="container-fluid px-0 mb-5">
      <TopbarComponent />
      <NavbarComponent />
      <CarouselComp />
      <AboutUs />
      <WhyUs />
      <Banner />
      <Service />
      <Team />
      <Testimonial />
      <Footer />
    </Container>
  );
};

export default HomePage;