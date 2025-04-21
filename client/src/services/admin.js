import { api } from "../utils/AxiosApi";

export const login = async(userData) => {
    console.log(userData);
    try {
        const res = await api.post("/users/loginAdmin", userData);
        return res.data;
    } catch (error) {
        console.error("Error logging in user: ", error.message);
    }
 
}

export const updateStatus = async(userData) => {
    try {
        const response = await api.put("/registers/statusUpdate", userData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating status: ", error.message);
    }
}

export const getALlData = async() => {
    try {
        const response = await api.get("/registers/allDatas", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            
        })
        return response.data;
    } catch (error) {
        console.log("Error getting datas: ", error.message);
    }
}

export const getVehicleData = async(vin) => {
    try {
        const response = await api.get(`/vehicles/details?vin=${vin}`);
        return response.data;
    } catch (error) {
        console.error("Error getting vehicle data: ", error.message);
    }
}

export const userDetails = async(userId) => {
    try {
        const response = await api.get(`/users/getUser?user=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting user details: ", error.message);
    }
}

export const registerDetails = async(vin) => {
    try {
        const response = await api.get(`/registers/details?vin=${vin}`);
        return response.data;
    } catch (error) {
        console.error("Error getting register details: ", error.message);
    }
}

export const logOut = async() => {
    const tokens = localStorage.getItem("token");
    console.log(tokens);
    try {
        const response = await api.get("/users/logout",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        
        if (response.status === 200) {
            localStorage.removeItem("token");
            console.log("Successfully logged out");
            window.location.href = "/login"; 
        }
    } catch (error) {
        console.error("Error log out: ", error.message);
    }
}