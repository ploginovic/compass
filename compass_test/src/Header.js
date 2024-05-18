import React from 'react';
import menuItems from './menuConfig';

const Header = () => {
  return (
    <header>
      <h1 className="header-title">My Website</h1> {/* Add this line */}
      <nav>
        {menuItems.map(item => (
          <div key={item.title}>
            <button>{item.title}</button>
            {item.submenu && (
              <div>
                {item.submenu.map(sub => (
                  <a key={sub.title} href={sub.link}>{sub.title}</a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Header;