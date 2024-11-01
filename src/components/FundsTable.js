import React from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import config from '../config/config';

const FundsTable = ({ funds, onSelectFund }) => {
    const { addToPortfolio, portfolio } = useAuth();
    const { showAlert } = useAlert();

    const handleBuy = async (fund) => {
        const isFundInPortfolio = portfolio.some(item => item.Scheme_Code === fund.Scheme_Code);
        if (isFundInPortfolio) {
            showAlert(`The fund ${fund.Scheme_Name} is already in your portfolio!`, 'error');
            return;
        }

        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${config.BASE}/funds/purchase`, {
                schemeCode: fund.Scheme_Code,
                schemeName: fund.Scheme_Name,
                amount: 1000
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                addToPortfolio(fund);
                showAlert(`Added ${fund.Scheme_Name} to your portfolio!`, 'success');
                
                const purchasedFunds = JSON.parse(localStorage.getItem('purchasedFunds')) || [];
                purchasedFunds.push(fund);
                localStorage.setItem('purchasedFunds', JSON.stringify(purchasedFunds));
            }
        } catch (error) {
            console.error('Error purchasing fund:', error);
            showAlert('Error purchasing fund. Please try again.', 'error');
        }
    };

    return (
        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>Scheme Name</th>
                    <th>Scheme Code</th>
                    <th>Net Asset Value</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {funds.map((fund) => (
                    <tr key={fund.Scheme_Code} onClick={() => onSelectFund(fund)} style={{ cursor: 'pointer' }}>
                        <td>{fund.Scheme_Name}</td>
                        <td>{fund.Scheme_Code}</td>
                        <td>{fund.Net_Asset_Value}</td>
                        <td>{fund.Date}</td>
                        <td>
                            <button className="button is-link" onClick={(e) => { e.stopPropagation(); handleBuy(fund); }}>
                                Buy
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FundsTable;
