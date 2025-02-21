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