import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRole } from "../../service/roles";
import land from "../../assets/land.svg";
import feeding from "../../assets/feeding.svg";
import shelter from "../../assets/shelter.svg";
import vet from "../../assets/vet.svg";
import dashboard from "../../assets/dashboard.svg"

const DashSidebar = () => {
    const [role, setRole] = useState(null); 
    const navigate = useNavigate();

    useEffect(()=>{
        setRole(getRole());
    },[])

    const adminNavContent = [
        { id: 1, name: "Dashboard", path: "/dashboard", svg: dashboard},
        { id: 2, name: "Add Livestock", path: "/livestock", svg: land},
        { id: 3, name: "Feeding Routine", path: "/feeding", svg: feeding },
        { id: 4, name: "Resource Management", path: "/resource-management", svg: land},
        { id: 5, name: "Shelter and Space", path: "/shelter-space", svg: shelter }
    ];

    const userNavContent = [
        { id: 1, name: "Dashboard", path: "/dashboard", svg: dashboard},
        { id: 2, name: "Vet Appointment", path: "/vet-appointment", svg: vet }
    ];

    const doctorNavContent = [
        { id: 1, name: "Dashboard", path: "/dashboard", svg: dashboard},
        { id: 2, name: "Schedule Timeslot", path: "/timeslot", svg: vet }
    ]

    const getNavContent = () => {
        switch (role) {
            case 'admin':
                return adminNavContent;
            case 'user':
                return userNavContent;
            default:
                return doctorNavContent
        }
    };

    const navContent = getNavContent();

    return (
        <div className="sidebar" data-background-color="dark">
            <div className="sidebar-logo">
                <div className="logo-header" data-background-color="dark">
                    <a href="/" className="logo">
                        <img
                            src="assets/img/kaiadmin/logo_light.svg"
                            alt="navbar brand"
                            className="navbar-brand"
                            height="20"
                        />
                    </a>
                    <span><h2 className="pt-1" style={{ color: "white" }}>Herhub</h2></span>
                    <div className="nav-toggle">
                        <button className="btn btn-toggle toggle-sidebar">
                            <i className="gg-menu-right"></i>
                        </button>
                        <button className="btn btn-toggle sidenav-toggler">
                            <i className="gg-menu-left"></i>
                        </button>
                    </div>
                    <button className="topbar-toggler more">
                        <i className="gg-more-vertical-alt"></i>
                    </button>
                </div>
            </div>
            <div className="sidebar-wrapper scrollbar scrollbar-inner">
                <div className="sidebar-content">
                    <ul className="nav nav-secondary">
                        {role && navContent.map((link) => (
                            <li className="nav-item" key={link.id} style={{ cursor: "pointer" }}>
                                <a onClick={() => navigate(link.path)}>
                                    <i className="fas"><img src={link.svg}></img></i>
                                    <p>{link.name}</p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DashSidebar;
