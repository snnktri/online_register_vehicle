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
    return response.data;
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
        const response = await api.get(`/registers/statusReturn?vin=${registrationNumber}`,
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

export const getRegisterNumber =async (vin) => {
    try {
        const response = await api.get(`/registers/getRegisterNumber?vin=${vin}`);
        return response.data;
    } catch (error) {
        console.error("Error on getting register number: ", error.message);
    }
}

export const  upDateRegister= async (data) => {
    try {
        // console.log("data ", data);
         const token = localStorage.getItem("accessTokenUser");
         const response = await api.put("/registers/updateRegister", data, 
             {
                 headers: {
                     'Authorization': `Bearer ${token}`
                 }
             }
         )
         console.log(response);
         return response.data;
        } catch (error) {
         console.error("Error on submitting the form ", error.message);
        }
}

export const updatePay = async(payData) => {
    try {
        //console.log("payData ", payData);
        const token = localStorage.getItem("accessTokenUser");
        const response = await api.put("/registers/updatePay", payData,
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
