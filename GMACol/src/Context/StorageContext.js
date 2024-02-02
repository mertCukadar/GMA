import React from "react";
import {createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
    const storeData = async (key, value) => {
        try {
        await AsyncStorage.setItem(key, value);
        }
        catch (e) {
        console.log(e);
        }
    }

    const getData = async (key) => {
        try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
        }
        catch (e) {
        console.log(e);
        }
    }

}

export default StorageProvider;
