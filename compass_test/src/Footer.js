/**
 * Footer component that displays a footer section at the bottom of the application.
 * 
 * The footer includes a copyright message.
 * 
 * The following styles are imported and used:
 * - FooterStyles.css: CSS styles for the Footer component
 * 
 * return (
 *   <Footer />
 * )
 */
import React from 'react';
import './css/FooterStyles.css';

function Footer() {
  return (
    <footer>
      <p>&copy; 2024 My Application. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
