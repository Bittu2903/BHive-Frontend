import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import config from '../config/config';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const { showAlert } = useAlert();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log(config.BASE)
            const response = await axios.post(`${config.BASE}/auth/login`, {
                username: username,
                password: password
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            
            login(response.data.token);
            localStorage.setItem('expire_at', response.data.expire_at);
            showAlert('Login successful!', 'success');
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            const errorMessage = error.response?.data?.detail || 'Login failed. Please try again.';
            showAlert(errorMessage, 'error');
        }
    };

    return (
        <div className="container">
            <h1 className="title has-text-centered">Login</h1>
            <div className="columns is-centered">
                <div className="column is-half">
                    <form onSubmit={handleLogin} className="box card-glass">
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
                            <button type="submit" className="button is-primary is-fullwidth">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
