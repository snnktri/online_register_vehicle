import { api } from "../utils/AxiosApi";

export const registerForm = async(data) => {
   try {
   // console.log("data ", data);
    const token = localStorage.getItem("accessTokenUser");
    const response = await api.post("/registers/registerDetails", data, 
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )
   } catch (error) {
    console.error("Error on submitting the form ", error.message);
   }
};

export const registerPayment = async(payData) => {
    try {
        //console.log("payData ", payData);
        const token = localStorage.getItem("accessTokenUser");
        const response = await api.post("/registers/payment", payData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return response.data;
    } catch (error) {
        console.error("Error on submitting the payment details ", error.message);
    }
}

export const successResutl = async() => {
    try {
        const token = localStorage.getItem("accessTokenUser");
        const response = await api.get("/registers/success",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return response.data;
    } catch (error) {
        console.error("Error on getting success result: ", error.message);
    }
}

export const status = async(registrationNumber) => {
    try {
        const token = localStorage.getItem("accessTokenUser");
        const response = await api.get(`/registers/statusReturn?registrationNumber=${registrationNumber}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return response.data;
    } catch (error) {
        console.error("Error on getting status: ", error.message);
    }
}