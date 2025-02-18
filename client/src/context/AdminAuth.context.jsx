import React, { useState, createContext, useEffect } from "react";
import { api } from "../utils/AxiosApi";


export const adminContext = createContext();

export const admiinContextProvider = ({children}) => {
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
       const adminauth = async () => {
        try {
            const token = localhost.getItem("accessToken");
            if(!token) {
                console.log("Access denied");
                return;
            }

            const response = await api.get("/users/protectedAdmin",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if(response.success) {
                setAdmin(true);
            }
        } catch (error) {
            console.error("Error occurred.:", error);
            setAdmin(false);
        }
       }

       adminauth();
    }, [])

    return (
        <adminContext.Provider value={{setAdmin, admin}} >
            {children}
        </adminContext.Provider>
    )
}