import { useEffect, useState, useRef } from "react";
import { deleteUser, getAllUsers, getAllUsersCount } from "../../api/feedingRoutineApi";
import { formatDate } from "../../util/getFormatedDateAndTIme";
import { toast } from "react-toastify";
import expand from "../../assets/expand.svg"
import { getRole } from "../../service/roles";
import capitalize from "lodash/capitalize";

const AdminDashboard = () => {
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState("user");
    const [roleCount, setRoleCount] = useState(null);
    const [role, setRole] = useState(null);
    const fetchedRef = useRef(false);

    const cards = [
        { id: "admin", name: "Total Admins", svg: expand},
        { id: "user", name: "Total Users", svg: expand},
        { id: "doctor", name: "Total Doctors", svg: expand }
    ];

    useEffect(() => {
        if (!fetchedRef.current) {
            fetchAllUsers("user");
            fetchRoleCount();
            fetchedRef.current = true;
        }
    }, []);

    const fetchAllUsers = async (roleIn) => {
        try {
            const fetchedUsers = await getAllUsers(roleIn);
            setUsers(fetchedUsers);
            setRole(getRole());
            setUser(roleIn);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchRoleCount = async () => {
        const fetchedRoleCount = await getAllUsersCount();
        setRoleCount(fetchedRoleCount.data.rolesCount);
    }

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await deleteUser(userId);
                if (response.status === 200) {
                    toast.success("User deleted successfully");
                    setUsers(users.filter(user => user._id !== userId));
                } else {
                    toast.error("Failed to delete user");
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                toast.error("Error occurred while deleting user");
            }
        }
    };
    
return (
    <>
    <div className="row">
        { cards.map((link) => (
            <div className="col-sm-6 col-md-3 col-lg-4" key={link.id}>
                <div className="card card-stats card-round" style={{ position: "relative" }}>
                <img
                    src={link.svg}
                    alt="Expand Icon"
                    onClick = {()=> fetchAllUsers(link.id)}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                        width: "20px",
                        height: "20px"
                    }}
                />
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-icon">
                                <div
                                    className="icon-big text-center icon-primary bubble-shadow-small"
                                >
                                    <i className="fas fa-users"></i>
                                </div>
                            </div>
                            <div className="col col-stats ms-3 ms-sm-0">
                                <div className="numbers">
                                    <p className="card-category">{link.name}</p>
                                    <h4 className="card-title">
                                        {roleCount && roleCount.length > 0
                                            ? (roleCount.find(e => e._id === link.id)?.count || 0) 
                                            : "Loading..."}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="card card-round">
                    <div className="card-header">
                        <div className="card-head-row card-tools-still-right">
                            <div className="card-title">{capitalize(user)+"s"}</div>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table align-items-center mb-0">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        {user == "user" &&<th scope="col">Appointments Booked</th>}
                                        <th scope="col">Joined On</th>
                                        {user != "admin" && <th scope="col">Action</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {users && users.length > 0 ? (
                                        users.map((res, index) => (
                                            <tr key={index}>
                                                <th scope="row">
                                                    {res.name}
                                                </th>
                                                <td>{res.email}</td>
                                                {user == "user" && <td>{res.booked}</td>}
                                                <td>{formatDate(res.created_at)}</td>
                                                {user != "admin" && 
                                                <td>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(res._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No users found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </>
)
}
export default AdminDashboard;