import React, { useState, useEffect } from 'react';
import { getUser } from '../../service/roles';
import DashSidebar from "./dashSidebar";
import DashNavbar from "./dashNavbar";
import { fetchUser, updateUser } from '../../api/profile';
import { getRole, updateLocalUser } from '../../service/roles';
import "../../css/profile.css";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchedUser = getUser();
        setUser(fetchedUser);  // Set initial user
        setRole(getRole());
        if (fetchedUser) {
            const fetchUserData = async () => {
                try {
                    const updatedUser = await fetchUser(fetchedUser.email, getRole());
                    setUser(updatedUser.user);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            };
    
            fetchUserData();
        }
    }, []);  

    // Handler to update the input fields as the user types
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleUpdateUser = async () => {

        if (user.name.length < 3) {
            toast.error("Username must be at least 3 characters long");
            return;
        }

        if (!/^\d{11}$/.test(user.phone)) {
            toast.error("Phone number must be exactly 11 digits long and contain only numbers");
            return;
        }
        try { 
            const updatedUser = await updateUser(user);
            if(updatedUser.updated == 1) {
                updateLocalUser(updatedUser?.name, updatedUser?.email, updatedUser?.id);
                toast.success(updatedUser.message)
            }
            else {
                toast.error(updatedUser.message)
            }
        }
        catch(e) {
            console.error("Error updating user", e);
        }
    }

    return (
        <div className="wrapper">
        <DashSidebar></DashSidebar>
        <DashNavbar></DashNavbar>
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-5 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
                        <span className="font-weight-bold">{user?.name}</span>
                        <span className="text-black-50">{user?.email}</span><span> </span></div>
                </div>
                <div className="col-md-6 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Username</label>
                            <input type="text" className="form-control mt-1" placeholder="Enter Username" name="name" value={user?.name} onChange={handleInputChange}/></div>
                            <div className="col-md-12 mt-4"><label className="labels">Mobile Number</label>
                            <input type="text" className="form-control mt-1" placeholder="Enter phone number" name="phone" value={user?.phone} onChange={handleInputChange}/></div>
                            <div className="col-md-12 mt-4"><label className="labels">Address Line 1</label>
                            <input type="text" className="form-control mt-1" placeholder="Enter address line 1" name="address1" value={user?.address1} onChange={handleInputChange}/></div>
                            <div className="col-md-12 mt-4"><label className="labels">Address Line 2</label>
                            <input type="text" className="form-control mt-1" placeholder="Enter address line 2" name="address2" value={user?.address2} onChange={handleInputChange}/></div>
                            <div className="col-md-12 mt-4"><label className="labels">Postcode</label>
                            <input type="text" className="form-control mt-1" placeholder="Enter postcode" name="postcode" value={user?.postcode} onChange={handleInputChange}/></div>
                            <div className="col-md-12 mt-4"><label className="labels">Email ID</label>
                            <input type="text" className="form-control mt-1" placeholder="Enter email id" name="email" value={user?.email} disabled/></div>
                        </div>
                        <div className='row'>
                            <div className="mt-5 text-center col-4"><button className="btn btn-primary profile-button" type="button" onClick={()=> handleUpdateUser()}>Save Profile</button></div>
                            <div className="mt-5 text-center col-4"><button className="btn btn-primary profile-button" type="button" onClick={()=>navigate(`/forget-password/${user.email}`)}>Change Password</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Profile;