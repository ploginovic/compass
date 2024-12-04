/**
 * App component sets up the main structure and routing for the application.
 * It uses React Router to manage different routes and displays corresponding components for each route.
 * 
 * The following components and styles are imported and used:
 * - Footer: Footer component
 * - Header: Header component
 * - Home: Home page component
 * - Quiz: Quiz page component
 * - About: About page component
 * - Articles: Articles page component
 * - Guides: Guides page component
 * - Specialties: Specialties page component
 * - Research: Research page component
 * - Theory: Theory page component
 * - FooterStyles.css: CSS styles for the Footer component
 * - HeaderStyles.css: CSS styles for the Header component
 * - QuestionStyles.css: CSS styles for Question and Quiz components
 * 
 * Routes:
 * - "/": Home component
 * - "/about": About component
 * - "/quiz": Quiz component
 * - "/articles": Articles component
 * - "/guides": Guides component
 * - "/specialties": Specialties component
 * - "/research": Research component
 * - "/theory": Theory component
 * 
 * return (
 *   <App />
 * )
 */
// src/App.js
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import About from './pages/About';
import Guides from './pages/Guides';
import Specialties from './pages/Specialties';
import Research from './pages/Research';
import Theory from './pages/Theory';
import Login from './components/features/auth/Login';
import Results from './components/features/Results/Results';
import Pathfinder from './pages/Pathfinder';
import Competition from './pages/CompetitionRatios'
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import RequireAuth from './components/RequireAuth'; // Import the RequireAuth component
import PersonalityTypes from './pages/PersonalityTypes'; // Import the new component


Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/results" element={<Results />} />
            {/* <Route path="/guides" element={<Guides />} /> */}
            <Route path="/specialties" element={<Specialties />} />
            <Route path="/research" element={<Research />} />
            <Route path="/theory" element={<Theory />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/competition" element={<Competition />} />
            <Route path="/personality-types" element={<PersonalityTypes />} /> {/* Add this route */}
            <Route path="/login" element={<Login />} /> {/* Login route */}
            
            <Route
              path="/pathfinder"
              element={
                <RequireAuth>
                  <Pathfinder />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
