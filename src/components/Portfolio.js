import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import axios from 'axios';
import config from '../config/config';

const Portfolio = () => {
    const { portfolio, setPortfolio } = useAuth();
    const { showAlert } = useAlert();

    useEffect(() => {
        const fetchPortfolio = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');
            try {
                const response = await axios.get(`${config.BASE}/funds/${userId}/portfolio`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                if (response.data && Array.isArray(response.data)) {
                    setPortfolio(response.data);
                } else {
                    showAlert('Portfolio data is not in the expected format.', 'error');
                }
            } catch (error) {
                console.error('Error fetching portfolio:', error);
                showAlert('Error fetching portfolio. Please try again.', 'error');
            }
        };

        fetchPortfolio();
    }, []);

    const handleSell = async (fund) => {
        console.log('Selling fund:', fund);
    
        if (!fund.scheme_code) {
            showAlert('Invalid fund data. Unable to sell.', 'error');
            return;
        }

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');

        try {
            await axios.post(`${config.BASE}/funds/${userId}/sell`, {
                schemeCode: fund.scheme_code,
                amount: 100
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPortfolio(prevPortfolio => prevPortfolio.filter(item => item.scheme_code !== fund.scheme_code));
            showAlert(`Successfully sold ${fund.scheme_name}.`, 'success');
        } catch (error) {
            console.error('Failed to sell fund:', error.response ? error.response.data : error.message);
            showAlert(`Failed to sell ${fund.scheme_name}.`, 'error');
        }
    };
    
    return (
        <div className="portfolio">
            <h3>Your Portfolio</h3>
            {portfolio.length > 0 ? (
                <ul>
                    {portfolio.map((fund) => (
                        <li key={fund.scheme_code}>
                            {fund.scheme_name} - Quantity: {fund.amount} {/* Display the scheme name and quantity of funds purchased */}
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
