// src/components/Portfolio.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext'; // Import alert context

const Portfolio = () => {
    const { portfolio, sellFund } = useAuth();
    const { showAlert } = useAlert(); // Use alert context

    const handleSell = (fund) => {
        try {
            sellFund(fund); // Attempt to sell the fund
            showAlert(`Successfully sold ${fund.Scheme_Name}.`, 'success'); // Show success alert
        } catch (error) {
            showAlert(`Failed to sell ${fund.Scheme_Name}.`, 'error'); // Show error alert
        }
    };

    return (
        <div className="portfolio">
            <h3>Your Portfolio</h3>
            {portfolio.length > 0 ? (
                <ul>
                    {portfolio.map((fund) => (
                        <li key={fund.Scheme_Code}>
                            {fund.Scheme_Name} - {fund.Net_Asset_Value} 
                            <button className="button is-danger ml-2" onClick={() => handleSell(fund)}>Sell</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No funds added to your portfolio yet.</p>
            )}
        </div>
    );
};

export default Portfolio;
