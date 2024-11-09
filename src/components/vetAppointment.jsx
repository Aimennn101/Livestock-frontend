import React, { useState, useEffect } from "react";
import DashSidebar from "./AdminUser/dashSidebar";
import DashNavbar from "./AdminUser/dashNavbar";
import ModalForBookingAppointment from "./AdminUser/addModalForBookAppointment";
import "../css/vet.css";
import doc from "../assets/doc.jpg";
import medical from "../assets/medical.jpg";
import { getBookedAppointmentsUser } from "../api/doctorPortalApi";
import { formatDay, formatTime } from "../util/getFormatedDateAndTIme";
import { Oval } from "react-loader-spinner"; 

const AppointmentForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchBookedAppointment();
  }, [isOpen]);

  const fetchBookedAppointment = async () => {
    try {
      const res = await getBookedAppointmentsUser();
      setData(res.data);
    } catch (err) {
      console.log(err, "err");
    } finally {
      setLoading(false);
    }
  };

  const handleIsOpen = (id = null) => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="">
      <DashNavbar />
      <div className="row" style={{ marginTop: "35px" }}>
        {isOpen && (
          <ModalForBookingAppointment isOpen={isOpen} handleIsOpen={handleIsOpen} />
        )}

        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "50vh", width: "100%" }}
          >
            <Oval
              height={60}
              width={190}
              color="#5B8C51"
              ariaLabel="oval-loading"
              secondaryColor="#EDDD5E"
              strokeWidth={6}
              strokeWidthSecondary={6}
            />
          </div>
        ) : data.length > 0 ? (
          data.map((res, index) => (
            <div className="col-lg-3 col-md-6 pt-5 wow fadeInUp" data-wow-delay="0.5s" key={index}>
              <div className="service-item d-flex h-100">
                <div className="service-img">
                  <img className="img-fluid" src={doc} alt="" />
                </div>
                <div className="service-text p-5 pt-0">
                  <div className="service-icon">
                    <img className="img-fluid rounded-circle" src={medical} alt="" />
                  </div>
                  <p className="mb-1"><b>Date:</b> {formatDay(res?.start_time)}</p>
                  <p className="mb-1"><b>Time:</b> {formatTime(res?.start_time)} - {formatTime(res?.end_time)}</p>
                  <p className="mb-1"><b>Doctor:</b> {res?.doctor_id?.name}</p>
                  <p className="mb-1"><b>Description:</b> {res?.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              height: "90vh",
              width: "100vw",
              textAlign: "center",
              alignContent: "center",
              fontSize: "20px",
            }}
          >
            No Appointments to show
          </div>
        )}

        <button className="floating-button" onClick={() => handleIsOpen(null)}>
          +
        </button>
      </div>
    </div>
  );
};

export default AppointmentForm;
