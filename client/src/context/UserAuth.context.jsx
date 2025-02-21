import React, { useState, useEffect, createContext} from "react";
import { api } from "../utils/AxiosApi";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(false);

    useEffect(()=> {
        const localhost = async () => {
           try {
            const token = localStorage.getItem("accessTokensUser");
            console.log("Access token:", token);
            if(!token) {
                console.log("Usr not logged in.");
                return ;
            }

            const response = await api.get("/users/protectedUser",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            console.log(response);

            setUser(true);
            
           } catch (error) {
            //console.error("Error getting access token: ", error);
            setUser(false);
           }
        }

        localhost();
    }, []);


    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}