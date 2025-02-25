import { api } from "../utils/AxiosApi";

export const register = async(userData) => {
    try {
       // console.log(userData)
        const res = await api.post("/users/userRegister", userData);
       // console.log(res);
        return res.data;
    } catch (error) {
        console.error("Error registering user: ", error.message);
    }
}

export const login = async(formData) => {
    try {
        const response = await api.post("/users/login", formData);
        console.log(response.data.data.accessToken);
        localStorage.setItem("accessTokenUser", response.data.data.accessToken);
        return response.data;
    } catch (error) {
        console.error("Error login: ", error.message);
    }
}

export const formSubmit = async(formData) => {
    try {
        const token = localStorage.getItem("accessTokenUser");
       // console.log("token: ", token);
        const response = await api.post("/users/register", formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("rewsponse from user: ", response);
        return response.data;
    } catch (error) {
        console.error("Error register user details: ", error.message);
    }
}

export const logOut = async() => {
    try {
        const response = await api.get("/users/logout",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessTokenUser")}`,
                },
            }
        );
        
        if (response.status === 200) {
            localStorage.removeItem("accessTokenUser");
            console.log("Successfully logged out");
            window.location.href = "/login"; 
        }
    } catch (error) {
        console.error("Error log out: ", error.message);
    }
}