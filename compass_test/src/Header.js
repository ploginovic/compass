import React from 'react';
import './css/HeaderStyles.css'; // Assuming you might want specific styles for the header

const Header = () => {
    return (
        <header className="header">
            <h1>Welcome to the Quiz</h1>
            <p>Test your knowledge and find out your personality type!</p>
        </header>
    );
};

export default Header;