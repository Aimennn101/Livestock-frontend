import DashSidebar from "./dashSidebar";
import DashNavbar from "./dashNavbar";
import { useEffect, useRef, useState } from "react";
import { getRole } from "../../service/roles";
import AdminDashboard from "./adminDashboard";
import DoctorDashboard from "./doctorDashboard";
import UserDashboard from "./userDashboard";

const Dashboard = () => {
    const ref = useRef(null); // Initialize ref with null
    const [role, setRole] = useState(null);

    useEffect(() => {
        const role = getRole();
        setRole(role);

        // Once the role is set and ref is assigned, manipulate the style
        if (role === "user" && ref.current) {
            ref.current.style.marginTop = "-50px"; // Modify the margin-top value
        }
    }, []);

    return (
        <div className="wrapper my-0 py-0">
            {role != "user" && <DashSidebar />}
            <DashNavbar />
            <div className={`${role !== "user" ? "main-panel" : ""} my-0`} ref={ref}>
                <div className="mx-0 px-0 my-0">
                    <div className="container-fluid mx-0 px-0 my-0">
                        <div className="page-inner px-0 mx-0 my-0">
                            {role === "admin" && <AdminDashboard />}
                            {role === "user" && <UserDashboard />}
                            {role === "doctor" && <DoctorDashboard />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
