import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [portfolio, setPortfolio] = useState(() => {
        const storedPortfolio = localStorage.getItem('portfolio');
        return storedPortfolio ? JSON.parse(storedPortfolio) : [];
    });
    const [username, setUsername] = useState(() => {
        return localStorage.getItem('username') || null;
    });
    const [userId, setUserId] = useState(() => {
        return localStorage.getItem('user_id') || null;
    });

    useEffect(() => {
        localStorage.setItem('portfolio', JSON.stringify(portfolio));
    }, [portfolio]);

    const login = (token, username, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('user_id', userId);
        setUsername(username);
        setUserId(userId);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('user_id');
        localStorage.removeItem('expire_at');
        localStorage.removeItem('portfolio');
        setIsAuthenticated(false);
        setUsername(null);
        setUserId(null);
        setPortfolio([]);
    };

    const addToPortfolio = (fund) => {
        setPortfolio((prevPortfolio) => [...prevPortfolio, fund]);
    };

    const sellFund = (fundToSell) => {
        setPortfolio((prevPortfolio) =>
            prevPortfolio.filter(fund => fund.scheme_code !== fundToSell.scheme_code) 
        );
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            username,
            userId,
            login,
            logout,
            portfolio,
            setPortfolio,
            addToPortfolio,
            sellFund
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
