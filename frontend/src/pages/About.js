// About.js

import React, { useState } from 'react';
import '../css/App.css'; // Global styles
import '../css/AboutStyles.css'; // Import About page styles
// No image imports needed since we're using placeholders

const About = () => {
  // State to track which page to show
  const [page, setPage] = useState(1);

  // Handler to toggle between pages
  const togglePage = () => setPage(page === 1 ? 2 : 1);

  return (
    <div className="content">
      <div className="about-container">
        <h1>About MedMap</h1>

        <div className="panel">
          <div className="panel-header">
            <h2>Our Mission</h2>
          </div>
          <div className="panel-content">
            {page === 1 ? (
              <>
                <p>
                  At <strong>MedMap</strong>, we are dedicated to simplifying the journey through medical education.
                  Our goal is to empower medical students with clear, personalized pathways to their desired specialties.
                </p>
                <p>
                  We believe that with the right guidance and resources, every student can navigate their medical career with confidence and clarity.
                </p>
              </>
            ) : (
              <>
                <p>
                  Our team consists of experienced medical professionals and educators who understand the challenges students face.
                  We're committed to providing up-to-date information and tools that align with current educational standards.
                </p>
                <p>
                  Join us as we revolutionize medical career planning, making it accessible and straightforward for everyone.
                </p>
              </>
            )}
          </div>
          <div className="arrow-control" onClick={togglePage}>
            ➔
          </div>
        </div>

        {/* New Section: Our Team */}
        <div className="team-section">
          <h2>Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              {/* Placeholder for the photo */}
              <div className="team-photo-placeholder">
                {/* Optional: Add initials or an icon */}
              </div>
              <h3>Tom Owen</h3>
              <p>Business Development Lead</p>
            </div>
            <div className="team-member">
              {/* Placeholder for the photo */}
              <div className="team-photo-placeholder">
                {/* Optional: Add initials or an icon */}
              </div>
              <h3>Pavel Loginovic</h3>
              <p>Technical Lead</p>
            </div>
          </div>
        </div>

        <div className="button-container">
          {/* Updated the button to use a mailto link */}
          <a href="mailto:admin@northstarapp.co.uk" className="contact-button">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;