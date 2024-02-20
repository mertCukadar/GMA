import React, { createContext , useState} from "react";
import axios from "axios";

export const AxiosContext = createContext();



export const AxiosProvider = ({ children }) => {
    const [UserId , setUserId] = useState(0);
    const instance = axios.create({
        baseURL: 'http://192.168.239.169:8000/api/',
    });
    const userInstance = axios.create({
        baseURL: 'http://192.168.239.169:8000/user/',
    });

    const sendData = async (url, data) => {
        try {
            const response = await instance.post(url, data);
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    const sendUserData = async (url, data) => {
        try {
            const response = await userInstance.post(url, data);
            response.data.id ? setUserId(response.data.id) : null;
            return response;
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <AxiosContext.Provider value={{ sendData , UserId , sendUserData}}>
            {children}
        </AxiosContext.Provider>
    );
}
