import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import TopbarComponent from "./topbar";
import NavbarComponent from "./navbar";
import Footer from "./footer";
import { toast } from "react-toastify";
import { updatePassword } from "../api/profile";
import { isAuthenticated } from "../service/roles";
import DashNavbar from "./AdminUser/dashNavbar";
import DashSidebar from "./AdminUser/dashSidebar";
import { checkEmailDomain } from "../service/roles";

const ForgetPassword = () => {
  const {email} = useParams();
  const [password, setPassword] = useState("");
  const [selectedRole, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  useEffect(()=>{
    const determinedRole = checkEmailDomain(email);
    try {
        if(determinedRole == "none") {throw new Error("Invalid email domain provided")}
        setRole(determinedRole);
    }
    catch(error) {
        toast.error(error.message || "Failed to change password. Please try again.");
    }

  }, [authenticated])

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        if(password != confirmPassword || !password || !confirmPassword) {
         toast.error("Passwords do not match, please re-enter");
         return
        }

        if (password.length < 6) {
          toast.error("Password must be at least 6 characters long");
          return;
        }
          
        if (!/[A-Z]/.test(password)) {
          toast.error("Password must contain at least one capital letter");
          return;
        }

        else {
        const response = await updatePassword({
                email,
                password,
                confirmPassword,
                selectedRole
            });
            if (response.updated == 1) {
               toast.success(response.message);
            } else {
                toast.error(`${response.message || "Error updating password"}`)
            }
        }
    } catch (error) {
        toast.error("Error updating password")
    }
  };

  return (
    <div className={`${authenticated ? "wrapper ps-5 pl-5" : "container-fluid px-0"}`}>
      {authenticated ? <DashSidebar /> : <TopbarComponent />}
      {authenticated ?  <DashNavbar />: <NavbarComponent />}
      <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
        <div className="container">
          <div className="row align-items-center d-flex justify-content-center">
            <div className="col-lg-5 col-md-8 col-9 col-sm-9 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">Password</label>
                      <input type="password" id="password" className="form-control" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">Confirm Password</label>
                      <input type="password" id="confirmPassword" className="form-control" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary mt-3 col-12 text-dark">
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     <Footer />
    </div>
  );
};

export default ForgetPassword;
