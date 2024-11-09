import { useNavigate } from "react-router-dom";
import { getUser, handleLogout as logoutService, getRole } from "../../service/roles";
import { useState, useEffect } from "react";

const DashNavbar = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await getUser();
                setUser(fetchedUser);
                setRole(getRole());
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [])

    const handleLogout = () => {
        logoutService(navigate);
    };

    const navigate = useNavigate();

    return (
        <div className="container-fluid" style={{ position: "sticky", zIndex: 999 }}>
            <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        {role == "user" &&
                            <>
                                <p className="navbar-nav" style={{ color: "black", fontWeight: "bold", fontSize: "25px" }}>Herhub</p>
                                <ul className="navbar-nav mx-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ cursor: "pointer" }} onClick={() => navigate('/')}>Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ cursor: "pointer" }} onClick={() => navigate('/shop-product')}>Shop Products</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ cursor: "pointer" }} onClick={() => navigate('/vet-appointment')}>Vet Appointment</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ cursor: "pointer" }} onClick={() => navigate('/orders')}>My Orders</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ cursor: "pointer" }} onClick={() => navigate('/cart')}>My Cart
                                        </a>
                                    </li>
                                </ul>
                            </>
                        }

                        <ul className="navbar-nav ms-md-auto align-items-center">
                            <li className="nav-item topbar-user dropdown hidden-caret">
                                <a
                                    className="dropdown-toggle profile-pic"
                                    data-bs-toggle="dropdown"
                                    href="#"
                                    aria-expanded="false"
                                >
                                    <span className="profile-username">
                                        <span className="op-7">Hi, <b>{user?.name}</b></span>
                                    </span>
                                </a>
                                <ul className="dropdown-menu dropdown-user animated fadeIn">
                                    <div className="dropdown-user-scroll scrollbar-outer">
                                        <li>
                                            <div className="user-box">
                                                <div className="avatar-lg">
                                                    <img
                                                        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                                        alt="image profile"
                                                        className="avatar-img rounded"
                                                    />
                                                </div>
                                                <div className="u-text">
                                                    {user ? (
                                                        <>
                                                            <h4>{user?.name}</h4>
                                                            <p className="text-muted">{user?.email}</p>
                                                            <a
                                                                className="btn btn-xs btn-secondary btn-sm me-2"
                                                                onClick={() => navigate('/profile')}
                                                            >View Profile</a>
                                                            <a
                                                                className="btn btn-xs btn-secondary btn-sm"
                                                                onClick={handleLogout}
                                                            >Logout</a>
                                                        </>
                                                    ) : ""}
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default DashNavbar;
