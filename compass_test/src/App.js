
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Footer';
import './css/FooterStyles.css';
import Header from './Header';
import './css/HeaderStyles.css'; // Style for Header
import './css/QuestionStyles.css'; // Style for Question and Quiz
import Home from './pages/Home'; // Import Home page component
import Quiz from './Quiz'; // Import Quiz page component
import About from './pages/About'; // Import About page component
import Articles from './pages/Articles'; // Import Articles page component
import Guides from './pages/Guides'; // Import Guides page component
import Research from './pages/Research'; // Import Research page component
import Theory from './pages/Theory'; // Import Theory page component

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
            <Route path="/research" element={<Research />} />
            <Route path="/theory" element={<Theory />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
