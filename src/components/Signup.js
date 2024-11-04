import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';
import config from '../config/config';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${config.BASE}/auth/signup`, {
                username: username,
                password: password
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            showAlert('Signup successful! You can now log in.', 'success');
            navigate('/');
        } catch (error) {
            console.error('Signup failed:', error.response?.data || error.message);
            const errorMessage = error.response?.data?.detail || 'Signup failed. Please try again.';
            showAlert(errorMessage, 'error');
        }
    };

    return (
        <div className="container">
            <h1 className="title has-text-centered">Signup</h1>
            <div className="columns is-centered">
                <div className="column is-half">
                    <form onSubmit={handleSignup} className="box card-glass">
                        <div className="field">
                            <label className="custom-label label">Username</label>
                            <div className="control">
                                <input 
                                    className="input" 
                                    type="text" 
                                    placeholder="Enter your username" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="custom-label label">Password</label>
                            <div className="control">
                                <input 
                                    className="input" 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="control">
                            <button type="submit" className="button is-primary is-fullwidth">Signup</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
