import React, { useState } from 'react';
import axios from 'axios';
import './css/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [registrationComplete, setRegistrationComplete] = useState(false);

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        if (!isRegistered) {
            alert("Please register first.");
            return;
        }
        try {
            const response = await axios.post('/login', { email, password });
            alert('You have logged in!');
        } catch (error) {
            alert(error.response.data);
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/register', { email: registerEmail, password: registerPassword });
            setIsRegistered(true);
            setShowLogin(true);
            setRegistrationComplete(true);
            setEmail(registerEmail);
            setPassword(registerPassword);
        } catch (error) {
            alert(error.response.data);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            {showLogin ? (
                <>
                    <h2>Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    {!isRegistered && (
                        <p>
                            <button 
                                onClick={() => setShowLogin(false)} 
                                className="link-button"
                            >
                                Register Here
                            </button>
                        </p>
                    )}
                </>
            ) : (
                <>
                    <h2>Register Here</h2>
                    <form onSubmit={handleRegisterSubmit}>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                required
                            />
                            <button type="button" onClick={togglePasswordVisibility}>
                                {showPassword ? 'Hide' : 'Show'} Password
                            </button>
                        </div>
                        <button type="submit">Register</button>
                    </form>
                </>
            )}
            {registrationComplete && (
                <p>Thank you for registering! Please log in with your new credentials.</p>
            )}
        </div>
    );
};

export default Login;