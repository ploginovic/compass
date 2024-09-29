// Home.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css'; // Global styles
import '../css/HomeStyles.css'; // Import home page styles

const Home = () => {
  // State to track which page to show for each section
  const [whyPage, setWhyPage] = useState(1);
  const [whatPage, setWhatPage] = useState(1);
  const [howPage, setHowPage] = useState(1);

  // Handlers to toggle between pages for each section
  const toggleWhyPage = () => setWhyPage(whyPage === 1 ? 2 : 1);
  const toggleWhatPage = () => setWhatPage(whatPage === 1 ? 2 : 1);
  const toggleHowPage = () => setHowPage(howPage === 1 ? 2 : 1);

  return (
    <div className="content"> {/* Embed everything in the .content container */}
      <div className="home-container">
        <h1>Welcome to MedMap</h1>

        <div className="panel-row">
          {/* WHY SECTION */}
          <div className="panel why-panel">
            <div className="panel-header">
              <h2>Why?</h2>
            </div>
            <div className="panel-content">
              {whyPage === 1 ? (
                <>
                  <p>
                    Choosing a career in medicine is a daunting task. With so many
                    specialties to choose from, making the right decision
                    is challenging for even the most focused students.
                  </p>
                  <p>
                    <strong> MedMap simplifies this journey,</strong> helping you identify the specialty that
                    fits your personality and career goals through our tailored assessment
                    and step-by-step planning tools.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    With the stakes so high, it's essential to be confident in your choice.
                    That's why we offer comprehensive guidance based on proven personality
                    assessments like MBTI, providing you with personalized recommendations.
                  </p>
                  <p>
                    MedMap ensures that you're not only prepared for your medical journey,
                    but you're making the right choices along the way.
                  </p>
                </>
              )}
            </div>
            <div className="arrow-control" onClick={toggleWhyPage}>
              ➔
            </div>
          </div>

          {/* WHAT SECTION */}
          <div className="panel what-panel">
            <div className="panel-header">
              <h2>What?</h2>
            </div>
            <div className="panel-content">
              {whatPage === 1 ? (
                <>
                  <p>
                    Our product helps you make an informed decision by using key facts about
                    medical specialties in the UK. We highlight aspects such as:
                  </p>
                  <ul>
                    <li><strong>Training Length:</strong> Understanding the years needed to specialize.</li>
                    <li><strong>Work Environment:</strong> A preview of what daily work looks like in various specialties.</li>
                  </ul>
                </>
              ) : (
                <>
                  <p>
                    Our platform also offers a dynamically updating plan that adapts as you
                    progress. This plan provides:
                  </p>
                  <ul>
                    <li><strong>Exam Preparation:</strong> Tailored resources for essential exams like the UCAT and BMAT.</li>
                    <li><strong>Application Guidance:</strong> Tips for crafting standout personal statements and performing well in interviews.</li>
                  </ul>
                </>
              )}
            </div>
            <div className="arrow-control" onClick={toggleWhatPage}>
              ➔
            </div>
          </div>
        </div>

        <div className="panel-row">
          {/* HOW SECTION */}
          <div className="panel how-panel">
            <div className="panel-header">
              <h2>How?</h2>
            </div>
            <div className="panel-content">
              {howPage === 1 ? (
                <>
                  <p>
                    By using MedMap, you're not only guided in choosing the right specialty,
                    but also in mapping out a clear and actionable career path. Our tailored
                    advice covers everything from education to hands-on experience.
                  </p>
                  <p>
                    Each milestone is broken down into achievable steps, ensuring you're on
                    the right path to your dream specialty.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    MedMap has already helped countless students align their personalities
                    with their careers, ensuring they achieve their medical career aspirations.
                  </p>
                  <p>
                    Whether it's the support you need for exam preparation or application
                    assistance, MedMap is here to guide you every step of the way.
                  </p>
                </>
              )}
            </div>
            <div className="arrow-control" onClick={toggleHowPage}>
              ➔
            </div>
          </div>
        </div>

        <div className="button-container">
          <Link to="/quiz" className="start-button">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
