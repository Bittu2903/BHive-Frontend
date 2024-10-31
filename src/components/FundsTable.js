// src/components/FundsTable.js
import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import the Auth context
import { useAlert } from '../context/AlertContext'; // Import the Alert context

const FundsTable = ({ funds, onSelectFund }) => {
    const { addToPortfolio, portfolio } = useAuth(); // Get addToPortfolio and portfolio from context
    const { showAlert } = useAlert(); // Get showAlert from Alert context

    const handleBuy = (fund) => {
        // Check if the fund is already in the portfolio
        const isFundInPortfolio = portfolio.some(item => item.Scheme_Code === fund.Scheme_Code);
        if (isFundInPortfolio) {
            showAlert(`The fund ${fund.Scheme_Name} is already in your portfolio!`, 'error'); // Alert if fund exists
            return;
        }
        addToPortfolio(fund); // Add fund to portfolio when clicked
        showAlert(`Added ${fund.Scheme_Name} to your portfolio!`, 'success'); // Alert on successful addition
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
