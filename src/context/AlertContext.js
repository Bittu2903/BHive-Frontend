import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ message: '', type: '' });

    const showAlert = (message, type = 'info') => {
        setAlert({ message, type });
        setTimeout(() => {
            setAlert({ message: '', type: '' });
        }, 3000);
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    return useContext(AlertContext);
};
