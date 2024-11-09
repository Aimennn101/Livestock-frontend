export const getRole = () => {
    return JSON.parse(localStorage.getItem("role"));
}

export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export const getUserId = () => {
    return JSON.parse(localStorage.getItem("user"))["id"];
}

export const updateLocalUser = (name, email, id) => {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify({name: name, email: email, id: id}))
}

export const isAuthenticated = () => {
    return localStorage.getItem("token") !== null && localStorage.getItem("token") !== undefined;
}

export const handleLogout = (navigate) => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/'); 
};


export const checkEmailDomain = (email) => {
    const doctorPattern = /@doctor\.herhub\.com$/;
    const adminPattern = /@herhub\.com$/;
    const userPattern = /@(gmail\.com|yahoo\.com|outlook\.com)$/;

    if (doctorPattern.test(email)) {
        return "doctor";
    } else if (adminPattern.test(email) && !doctorPattern.test(email)) {
        return "admin";
    } else if (userPattern.test(email)) {
        return "user";
    } else {
        return "none";
    }
};