import React from 'react';
import { NavLink } from 'react-router-dom';
import menuItems from './menuConfig';
import Logo from './assets/logo.svg'; // Ensure the path is correct

const Header = () => {
  return (
    <header className="header">
      <NavLink to="/" exact className="header-logo">
        <img src={Logo} alt="CompassMed Logo" />
      </NavLink>
      <nav className="nav-menu">
        {menuItems.map(item => (
          <div key={item.title} className="menu-item">
            <NavLink to={item.link} exact activeClassName="active">
              {item.title}
            </NavLink>
            {item.submenu && (
              <div className="submenu">
                {item.submenu.map(sub => (
                  <NavLink key={sub.title} to={sub.link} exact activeClassName="active">
                    {sub.title}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="header-buttons">
        <NavLink to="/quiz" exact className="quiz-button">
          Take the Quiz
        </NavLink>
        <NavLink to="/login" exact className="login-button">
          Login
        </NavLink>
      </div>
    </header>
  );
};

export default Header;