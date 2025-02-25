import { api } from "../utils/AxiosApi";


export const vehicleForm = async(formData) => {
    try {
        const token = localStorage.getItem("accessTokenUser");
        const response = await api.post("/vehicles/registerVehicle", formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating vehicle: ", error.message);
    }
}