import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AlertProvider, useAlert } from './context/AlertContext';

const App = () => {
    return (
        <AlertProvider>
            <AuthProvider>
                <Router>
                    <Nav />
                    <Alert />
                    <div className="container mt-5">
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
                            <Route path="/portfolio" element={<PrivateRoute component={Portfolio} />} />
                        </Routes>
                    </div>
                </Router>
            </AuthProvider>
        </AlertProvider>
    );
};

const PrivateRoute = ({ component: Component }) => {
    const { isAuthenticated } = useAuth();
    const { showAlert } = useAlert();

    if (!isAuthenticated) {
        showAlert('Unauthorized access. Please log in.', 'error');
        return <Navigate to="/" />;
    }

    return <Component />;
};

const Nav = () => {
    const { isAuthenticated, logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        logout();
        window.location.href = '/';
    };

    return (
        <nav className="navbar is-light">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <strong>Mutual Fund Broker</strong>
                </a>
            </div>
            <div className="navbar-menu">
                <div className="navbar-end">
                    {isAuthenticated ? (
                        <>
                            <button 
                                className="navbar-item" 
                                onClick={handleLogout} 
                                disabled={loading}
                            >
                                {loading ? 'Logging out...' : 'Logout'}
                            </button>
                            <a className="navbar-item" href="/portfolio">Portfolio</a>
                        </>
                    ) : (
                        <a className="navbar-item" href="/">Login</a>
                    )}
                    <a className="navbar-item" href="/dashboard">Dashboard</a>
                </div>
            </div>
        </nav>
    );
};

// Alert Component
const Alert = () => {
    const { alert } = useAlert();

    return (
        alert.message && (
            <div className={`notification is-${alert.type}`}>
                {alert.message}
            </div>
        )
    );
};

export default App;
