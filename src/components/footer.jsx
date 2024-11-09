import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container-fluid bg-dark footer py-5 fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
            <div className="row container-fluid">
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-white mb-4">Our Office</h5>
                    <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                    <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                    <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                    <div className="d-flex pt-3">
                        <a className="btn btn-square btn-secondary rounded-circle me-2" href=""><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-square btn-secondary rounded-circle me-2" href=""><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-square btn-secondary rounded-circle me-2" href=""><i className="fab fa-youtube"></i></a>
                        <a className="btn btn-square btn-secondary rounded-circle me-2" href=""><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-white mb-4">Quick Links</h5>
                    <a className="btn btn-link" href="">About Us</a>
                    <a className="btn btn-link" href="">Contact Us</a>
                    <a className="btn btn-link" href="">Our Services</a>
                    <a className="btn btn-link" href="">Terms & Condition</a>
                    <a className="btn btn-link" href="">Support</a>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-white mb-4">Business Hours</h5>
                    <p className="mb-1">Monday - Friday</p>
                    <h6 className="text-light">09:00 am - 07:00 pm</h6>
                    <p className="mb-1">Saturday</p>
                    <h6 className="text-light">09:00 am - 12:00 pm</h6>
                    <p className="mb-1">Sunday</p>
                    <h6 className="text-light">Closed</h6>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-white mb-4">Newsletter</h5>
                    <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                    <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                </div>
            </div>
        </div>
    </div>
      {/* <Container>
        <Row>
          <Col md={4} sm={6}>
            <h5>About Us</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
              iaculis mauris.
            </p>
          </Col>
          <Col md={4} sm={6}>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/livestock">Livestock</a></li>
              <li><a href="/vet">Veterinery services</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </Col>
          <Col md={4} sm={12}>
            <h5>Contact Us</h5>
            <p>
              Address: 123 Street, City, Country<br />
              Phone: +123 456 7890<br />
              Email: info@example.com
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={6} className="text-start">
            <p>&copy; 2024 Livestock Management System. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-end">
            <ul className="footer-nav">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Legal Notice</a></li>
            </ul>
          </Col>
        </Row>
      </Container> */}
    </footer>
  );
};

export default Footer;
