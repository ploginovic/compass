import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import menuItems from './menuConfig';
import Logo from './assets/logo_v2.svg'; // Ensure the path is correct

const Header = () => {
  const [isVisible, setIsVisible] = useState(true); // State to control header visibility
  const [lastScrollY, setLastScrollY] = useState(0); // State to track the last scroll position

  useEffect(() => {
    const handleScroll = () => {
      // Get the current scroll position
      const currentScrollY = window.scrollY;

      // If scrolling down, hide the header; if scrolling up, show it
      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        setIsVisible(false); // Hide the header when scrolling down
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true); // Show the header when scrolling up
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
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
