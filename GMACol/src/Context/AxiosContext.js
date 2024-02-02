import React, { createContext } from "react";
import axios from "axios";

export const AxiosContext = createContext();

export const AxiosProvider = ({ children }) => {
    const instance = axios.create({
        baseURL: 'http://192.168.1.103:8000/api/',
    });

    const sendData = async (url, data) => {
        try {
            const response = await instance.post(url, data);
            return response;
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <AxiosContext.Provider value={{ sendData }}>
            {children}
        </AxiosContext.Provider>
    );
}
