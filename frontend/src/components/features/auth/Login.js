import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // Import default Amplify styles
import './Login.css'; // Your custom styles if needed

const Login = ({ signOut, user }) => {
    return (
        <div className="login-container">
            <h1>Welcome, {user?.username}!</h1>
            <div className="auth-details">
                <p>You are successfully logged in with AWS Amplify Authentication.</p>
            </div>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
};

// Wrap the component with the withAuthenticator HOC to enable Amplify Auth
export default withAuthenticator(Login);