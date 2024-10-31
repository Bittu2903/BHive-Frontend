// src/components/FundDetails.js
import React from 'react';
import { useAlert } from '../context/AlertContext'; // Import alert context

const FundDetails = ({ fund, onBack }) => {
    const { showAlert } = useAlert(); // Use alert context

    if (!fund) {
        showAlert('No fund details available.', 'error'); // Show alert if fund is not provided
        return null; // Return null to avoid rendering empty details
    }

    return (
        <div className="fund-details">
            <h2 className="fund-title">{fund.Scheme_Name}</h2>
            <p>
                <strong className="label">Scheme Code:</strong> {fund.Scheme_Code}
            </p>
            <p>
                <strong className="label">Net Asset Value:</strong> {fund.Net_Asset_Value}
            </p>
            <p>
                <strong className="label">Date:</strong> {fund.Date}
            </p>
            <p>
                <strong className="label">Scheme Category:</strong> {fund.Scheme_Category}
            </p>
            <p>
                <strong className="label">Fund Family:</strong> {fund.Mutual_Fund_Family}
            </p>
            <button className="button is-info" onClick={onBack}>Back to List</button>
        </div>
    );
};

export default FundDetails;
