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
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Footer';
import './css/FooterStyles.css';
import Header from './Header';
import './css/HeaderStyles.css'; // Style for Header
import './css/QuestionStyles.css'; // Style for Question and Quiz
import Home from './pages/Home'; // Import Home page component
import Quiz from './pages/Quiz'; // Import Quiz page component
import About from './pages/About'; // Import About page component
import Articles from './pages/Articles'; // Import Articles page component
import Guides from './pages/Guides'; // Import Guides page component
import Specialties from './pages/Specialties'; // Import Specialties page component
import Research from './pages/Research'; // Import Research page component
import Theory from './pages/Theory'; // Import Theory page component
import Login from './Login'; // Import Login component


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/specialties" element={<Specialties />} />
            <Route path="/research" element={<Research />} />
            <Route path="/theory" element={<Theory />} />
            <Route path="/login" element={<Login />} /> {/* Add Login route */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
