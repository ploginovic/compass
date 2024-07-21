/**
 * Header component that displays the navigation menu and logo for the application.
 * 
 * The header includes:
 * - A logo that links to the home page
 * - A navigation menu generated from `menuItems` configuration
 * - A button linking to the quiz page
 * 
 * The following components and assets are imported and used:
 * - NavLink from react-router-dom: For navigation links
 * - menuItems from './menuConfig': Configuration for the menu items
 * - Logo from './assets/logo.svg': The logo image for the application
 * 
 * The menu items can have submenus, which are also rendered as nested navigation links.
 * 
 * return (
 *   <Header />
 * )
 */
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
      <NavLink to="/quiz" exact className="quiz-button">
        Take the Quiz
      </NavLink>
    </header>
  );
};

export default Header;
