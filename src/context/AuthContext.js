// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [portfolio, setPortfolio] = useState(() => {
        const storedPortfolio = localStorage.getItem('portfolio');
        return storedPortfolio ? JSON.parse(storedPortfolio) : [];
    });

    useEffect(() => {
        localStorage.setItem('portfolio', JSON.stringify(portfolio));
    }, [portfolio]);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expire_at');
        setIsAuthenticated(false);
        setPortfolio([]); // Clear portfolio on logout
        localStorage.removeItem('portfolio');
    };

    const addToPortfolio = (fund) => {
        setPortfolio((prevPortfolio) => [...prevPortfolio, fund]);
    };

    const sellFund = (fundToSell) => {
        setPortfolio((prevPortfolio) =>
            prevPortfolio.filter(fund => fund.Scheme_Code !== fundToSell.Scheme_Code)
        );
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, portfolio, addToPortfolio, sellFund }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
