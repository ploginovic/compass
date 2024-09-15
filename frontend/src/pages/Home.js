// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css'; // Global styles
import '../css/HomeStyles.css'; // Import your home page styles

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to MedMap</h1>
      <p>
        MedMap is your personalized guide to navigating the complex journey of medical specialties in the UK. We understand that choosing the right specialty is one of the most significant decisions you'll make in your medical career. Our platform leverages the Myers-Briggs Type Indicator (MBTI) to help you identify the specialties that align best with your unique personality traits.
      </p>

      <h2>Discover Your Ideal Medical Specialty</h2>
      <p>
        By taking our MBTI-based assessment, you'll receive tailored recommendations for medical specialties that suit your personality profile. Whether you're inclined towards fast-paced environments like Emergency Medicine or prefer the thoughtful analysis found in Pathology, MedMap provides insights to guide your choice.
      </p>

      <h2>Create Your Personalized Career Plan</h2>
      <p>
        Once you've identified your ideal specialty, MedMap offers a dynamically updating plan to help you achieve your career goals. This plan includes:
      </p>
      <ul>
        <li><strong>Educational Milestones:</strong> Key academic requirements and timelines.</li>
        <li><strong>Experience Recommendations:</strong> Suggested internships, volunteer opportunities, and extracurricular activities.</li>
        <li><strong>Exam Preparation:</strong> Resources and study plans for essential exams like the UCAT and BMAT.</li>
        <li><strong>Application Guidance:</strong> Tips for crafting compelling personal statements and performing well in interviews.</li>
      </ul>
      <p>
        Our plan adapts as you progress, ensuring you always have the most relevant information at your fingertips.
      </p>

      <h2>Why MedMap?</h2>
      <p>
        Navigating the path to becoming a medical professional can be overwhelming. MedMap simplifies this journey by:
      </p>
      <ul>
        <li><strong>Personalization:</strong> Tailored recommendations based on your MBTI personality type.</li>
        <li><strong>Comprehensive Planning:</strong> Step-by-step guidance from pre-med to your dream job.</li>
        <li><strong>Resource Accessibility:</strong> Centralized access to essential tools and information.</li>
        <li><strong>Community Support:</strong> Connect with like-minded peers and mentors.</li>
      </ul>

      <h2>Start Your Journey Today</h2>
      <p>
        Ready to discover the medical specialty that's the perfect fit for you? Take the first step by completing our MBTI assessment. Your personalized career plan awaits.
      </p>

      <div className="button-container">
        <Link to="/quiz" className="start-button">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;