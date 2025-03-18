import React, { useState, createContext, useEffect } from "react";
import { api } from "../utils/AxiosApi";
import { getALlData } from '../services/admin';


export const AdminContext = createContext();

export const AdmiinContextProvider = ({children}) => {
    const [admin, setAdmin] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadfun = async () => {
          try {
            const resposne = await getALlData();
            
            setData(resposne.data);
           
          } catch (error) {
            console.error(error);
          }
        }
       loadfun();
      }, [admin])

    useEffect(() => {
       const adminauth = async () => {
        try {
            const token = localStorage.getItem("token");
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
           // console.log(response);
                setAdmin(true);
            
        } catch (error) {
            console.error("Error occurred.:", error);
            setAdmin(false);
        }
       }

       adminauth();
    }, [])

    return (
        <AdminContext.Provider value={{setAdmin, admin, data}} >
            {children}
        </AdminContext.Provider>
    )
}