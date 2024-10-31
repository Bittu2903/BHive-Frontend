// src/components/Dashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import FundsTable from './FundsTable'; // Import the table component
import FundDetails from './FundDetails'; // Import the details component
import { useAlert } from '../context/AlertContext'; // Import alert context

const Dashboard = () => {
    const [funds, setFunds] = useState([]);
    const [selectedFamily, setSelectedFamily] = useState('');
    const [selectedFund, setSelectedFund] = useState(null); // State for selected fund details
    const [mutualFundFamilies] = useState([
        'Bandhan Mutual Fund',
        'Tata Mutual Fund',
        'Axis Mutual Fund',
        'Mirae Asset Mutual Fund',
        'LIC Mutual Fund'
    ]);
    
    const { showAlert } = useAlert(); // Use alert context

    const fetchFunds = async (family) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:8005/funds/latest/${family}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFunds(response.data);
            showAlert('Funds fetched successfully!', 'success'); // Show success alert
        } catch (error) {
            console.error('Error fetching funds:', error);
            showAlert('Error fetching funds. Please try again.', 'error'); // Show error alert
        }
    };

    const handleFamilyChange = (e) => {
        setSelectedFamily(e.target.value);
        setSelectedFund(null); // Reset selected fund when changing family
        if (e.target.value) {
            fetchFunds(e.target.value);
        } else {
            setFunds([]); // Clear funds if no family is selected
        }
    };

    const handleFundSelect = (fund) => {
        setSelectedFund(fund); // Set selected fund for details view
    };

    const handleBackToList = () => {
        setSelectedFund(null); // Go back to the list view
    };

    return (
        <div className="container mt-5">
            <h1 className="title has-text-centered">Dashboard</h1>
            <div className="field">
                <label className="label">Select Mutual Fund Family</label>
                <div className="control">
                    <div className="select">
                        <select value={selectedFamily} onChange={handleFamilyChange}>
                            <option value="">-- Select a Family --</option>
                            {mutualFundFamilies.map((family) => (
                                <option key={family} value={family}>{family}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Show fund details if a fund is selected */}
            {selectedFund ? (
                <FundDetails fund={selectedFund} onBack={handleBackToList} />
            ) : (
                // Render the FundsTable component if there are funds
                funds.length > 0 && <FundsTable funds={funds} onSelectFund={handleFundSelect} />
            )}
        </div>
    );
};

export default Dashboard;
