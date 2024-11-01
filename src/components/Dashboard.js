import React, { useState } from 'react';
import axios from 'axios';
import FundsTable from './FundsTable';
import FundDetails from './FundDetails';
import { useAlert } from '../context/AlertContext';
import config from '../config/config';

const Dashboard = () => {
    const [funds, setFunds] = useState([]);
    const [selectedFamily, setSelectedFamily] = useState('');
    const [selectedFund, setSelectedFund] = useState(null);
    const [mutualFundFamilies] = useState([
        'Bandhan Mutual Fund',
        'Tata Mutual Fund',
        'Axis Mutual Fund',
        'Mirae Asset Mutual Fund',
        'LIC Mutual Fund'
    ]);
    
    const { showAlert } = useAlert();

    const fetchFunds = async (family) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${config.BASE}/funds/latest/${family}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFunds(response.data);
            showAlert('Funds fetched successfully!', 'success');
        } catch (error) {
            console.error('Error fetching funds:', error);
            showAlert('Error fetching funds. Please try again.', 'error');
        }
    };

    const handleFamilyChange = (e) => {
        setSelectedFamily(e.target.value);
        setSelectedFund(null);
        if (e.target.value) {
            fetchFunds(e.target.value);
        } else {
            setFunds([]);
        }
    };

    const handleFundSelect = (fund) => {
        setSelectedFund(fund);
    };

    const handleBackToList = () => {
        setSelectedFund(null);
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

            {selectedFund ? (
                <FundDetails fund={selectedFund} onBack={handleBackToList} />
            ) : (
                funds.length > 0 && <FundsTable funds={funds} onSelectFund={handleFundSelect} />
            )}
        </div>
    );
};

export default Dashboard;
