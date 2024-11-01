import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';

const Portfolio = () => {
    const { portfolio, sellFund } = useAuth();
    const { showAlert } = useAlert();

    const handleSell = (fund) => {
        try {
            sellFund(fund);
            showAlert(`Successfully sold ${fund.Scheme_Name}.`, 'success');
        } catch (error) {
            showAlert(`Failed to sell ${fund.Scheme_Name}.`, 'error');
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
