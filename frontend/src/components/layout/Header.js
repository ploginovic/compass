// src/components/layout/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import menuItems from './menuConfig';
import './HeaderStyles.css'; // Styles for Header
import Logo from '../../assets/new_logo.svg'; // Ensure the path is correct
import useHeaderVisibility from '../../hooks/useHeaderVisibility'; // Custom hook for header visibility
import { useAuthenticator } from '@aws-amplify/ui-react'; // Correct import

const Header = () => {
  const isVisible = useHeaderVisibility(); // Use the custom hook
  const { user, signOut } = useAuthenticator(); // Access user and signOut

  return (
    <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
      <NavLink to="/" end className="header-logo">
        <img src={Logo} alt="MedMap Logo" className="logo-image"/>
      </NavLink>
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <div key={item.title} className="menu-item">
            <NavLink
              to={item.link}
              end
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {item.title}
            </NavLink>
            {item.submenu && (
              <div className="submenu">
                {item.submenu.map((sub) => (
                  <NavLink
                    key={sub.title}
                    to={sub.link}
                    end
                    className={({ isActive }) => (isActive ? 'active' : undefined)}
                  >
                    {sub.title}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="header-buttons">
        <NavLink to="/quiz" end className="quiz-button">
          Take the Quiz
        </NavLink>
        {user ? (
          <div className="user-info">
            <span className="welcome-message">Welcome, User!</span>
            <button onClick={signOut} className="signout-button">
              Sign Out
            </button>
          </div>
        ) : (
          <NavLink to="/login" end className="login-button">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
