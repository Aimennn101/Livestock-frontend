import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import TopbarComponent from "./topbar";
import NavbarComponent from "./navbar";
import Footer from "./footer";
import { toast } from "react-toastify";
import { checkEmailDomain } from "../service/roles";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, setSignIn] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const container = document.getElementById('container-login');
    if (container) {
      container.classList.toggle('sign-in', signIn);
      container.classList.toggle('sign-up', signUp);
    }
  }, [signIn, signUp]);

  useEffect(() => {
    setSignUp(true);
    setSignIn(false);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const determinedRole = checkEmailDomain(email);
      if(determinedRole == "none") {throw new Error("Invalid email domain provided")}
      const response = await axios.post(`/api/users/login`, {
        email,
        password,
        role: determinedRole
      });
      if (response.status == 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("role", JSON.stringify(response.data.role));
        navigate("/dashboard");
        toast.success("Login successful");
      } else {
        toast.warn(`${response.data.message || "Login failed"}`)
      }
    } catch (error) {
        toast.error(error.message || "Error login")
    }
  };

  const handleForgotPassword = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailPattern.test(email)) {
      navigate(`/forget-password/${email}`);
    } else {
      toast.error("Please enter a valid email address");
    }
  };


  return (
    <section className="container-fluid px-0 mb-5">
      <TopbarComponent />
      <NavbarComponent />
      <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
        <div className="container">
          <div className="row gx-lg-5 align-items-center d-flex justify-content-center">
            <div className="col-lg-5 col-md-8 col-9 col-sm-9  mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label" htmlFor="email">Email address</label>
                      <input type="email" id="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} className="form-control" required />
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">Password</label>
                      <input type="password" id="password" className="form-control" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary mt-3 col-12 text-dark">
                      Login
                    </button>
                    <div className="form-check d-flex justify-content-center">
                      <label className="form-check-label">
                          Forgot Password? &nbsp; 
                          <a 
                            style={{cursor: "pointer", color: "blue"}}
                            onClick={handleForgotPassword}>
                            Click Here
                          </a>
                      </label>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default LoginPage;
