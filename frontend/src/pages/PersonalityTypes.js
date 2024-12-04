// PersonalityTypes.js

import React, { useState } from 'react';
import '../css/App.css'; // Global styles
import '../css/PersonalityTypes.css'; // Import your personality types styles

const personalityData = [
  {
    type: 'INTJ',
    title: 'The Architect',
    description:
      'INTJs are strategic and analytical thinkers who are always planning for the future. They are known for their high standards of competence and performance, both for themselves and others. With a natural inclination for analysis and problem-solving, INTJs are often seen as intellectual and insightful individuals. They value knowledge and seek to understand the systems and principles that underlie the world around them. Their visionary outlook allows them to see patterns and possibilities where others see complexity.',
  },
  {
    type: 'INTP',
    title: 'The Logician',
    description:
      'INTPs are innovative inventors with an unquenchable thirst for knowledge. They are logical and abstract thinkers who enjoy exploring theoretical concepts and complex ideas. INTPs are curious and open-minded, often questioning established norms and seeking to understand the underlying principles of how things work. They prefer independence and autonomy, thriving in environments that allow them to pursue their interests without constraints. Their analytical prowess enables them to solve problems creatively and effectively.',
  },
  {
    type: 'ENTJ',
    title: 'The Commander',
    description:
      'ENTJs are bold, imaginative, and strong-willed leaders who are always finding a way—or making one. They are strategic thinkers with a natural ability to organize and direct people towards achieving common goals. ENTJs are decisive and outspoken, valuing efficiency and competence. They thrive on challenges and are driven to succeed, often inspiring others with their vision and determination. Their confidence and charisma make them effective at rallying teams and driving progress.',
  },
  {
    type: 'ENTP',
    title: 'The Debater',
    description:
      'ENTPs are smart and curious thinkers who cannot resist an intellectual challenge. They are enthusiastic about new ideas and enjoy engaging in lively debates. ENTPs are quick-witted and innovative, often thinking outside the box to find unique solutions to problems. They are adaptable and resourceful, thriving in dynamic environments where they can explore possibilities. Their energetic and spontaneous nature makes them engaging companions who are always ready for the next adventure.',
  },
  {
    type: 'INFJ',
    title: 'The Advocate',
    description:
      'INFJs are quiet and mystical, yet very inspiring and tireless idealists. They are compassionate and altruistic, driven by a deep sense of purpose to help others and make a positive impact on the world. INFJs have a strong intuition and are adept at understanding the emotions and motivations of others. They are creative and dedicated, often working tirelessly towards their goals. Despite their reserved nature, they are passionate about their values and are not afraid to stand up for what they believe in.',
  },
  {
    type: 'INFP',
    title: 'The Mediator',
    description:
      'INFPs are poetic, kind, and altruistic people who are always eager to help a good cause. They are idealistic and value authenticity and harmony. INFPs are guided by their principles and seek to understand themselves and others. They are empathetic and compassionate, often putting the needs of others before their own. Their creativity and imagination allow them to see the potential in people and situations, and they are often drawn to artistic and humanitarian pursuits.',
  },
  {
    type: 'ENFJ',
    title: 'The Protagonist',
    description:
      'ENFJs are charismatic and inspiring leaders, able to mesmerize their listeners. They are warm and altruistic, genuinely caring about others and eager to make a positive difference. ENFJs are excellent communicators, skilled at articulating their ideas and motivating others. They are organized and decisive, often taking on leadership roles and working tirelessly to achieve their goals. Their enthusiasm and passion are contagious, making them natural influencers and mentors.',
  },
  {
    type: 'ENFP',
    title: 'The Campaigner',
    description:
      'ENFPs are enthusiastic, creative, and sociable free spirits who can always find a reason to smile. They are imaginative and open-minded, drawn to new experiences and ideas. ENFPs value individuality and authenticity, often encouraging others to express themselves fully. They are empathetic and enjoy building deep connections with others. Their energy and optimism make them inspiring companions who are always ready for the next adventure.',
  },
  {
    type: 'ISTJ',
    title: 'The Logistician',
    description:
      'ISTJs are practical and fact-minded individuals whose reliability cannot be doubted. They are responsible and methodical, valuing tradition and stability. ISTJs are meticulous and detail-oriented, often taking a structured approach to tasks. They are loyal and dependable, committed to fulfilling their duties and obligations. Their strong sense of duty and integrity makes them trusted and respected members of any team or community.',
  },
  {
    type: 'ISFJ',
    title: 'The Defender',
    description:
      'ISFJs are very dedicated and warm protectors, always ready to defend their loved ones. They are caring and considerate, often putting the needs of others before their own. ISFJs value harmony and work diligently to create a supportive environment. They are meticulous and practical, excelling at managing details and organizing tasks. Their kindness and generosity make them beloved friends and family members.',
  },
  {
    type: 'ESTJ',
    title: 'The Executive',
    description:
      'ESTJs are excellent administrators, unsurpassed at managing things—or people. They are organized and efficient, valuing order and tradition. ESTJs are decisive and straightforward, often taking charge to ensure that projects are completed effectively. They have a strong sense of responsibility and are committed to upholding standards and protocols. Their leadership skills and practical approach make them effective in coordinating teams and resources.',
  },
  {
    type: 'ESFJ',
    title: 'The Consul',
    description:
      'ESFJs are extraordinarily caring, social, and popular people who are always eager to help. They are attentive to the needs and emotions of others, often taking on supportive roles. ESFJs value harmony and cooperation, working hard to maintain positive relationships. They are organized and dependable, excelling at coordinating events and activities. Their warmth and generosity make them beloved members of any community.',
  },
  {
    type: 'ISTP',
    title: 'The Virtuoso',
    description:
      'ISTPs are bold and practical experimenters, masters of all kinds of tools. They are analytical and adaptable, often thriving in hands-on environments. ISTPs are curious and observant, with a knack for understanding how things work. They enjoy exploring new experiences and are not afraid to take risks. Their independent and spontaneous nature makes them flexible problem-solvers who can quickly adapt to changing situations.',
  },
  {
    type: 'ISFP',
    title: 'The Adventurer',
    description:
      'ISFPs are flexible and charming artists who are always ready to explore and experience something new. They are sensitive and caring, often expressing themselves through creative pursuits. ISFPs value personal freedom and authenticity, preferring to live in the moment. They are empathetic and supportive, often attuned to the feelings of others. Their gentle and compassionate nature makes them cherished friends and companions.',
  },
  {
    type: 'ESTP',
    title: 'The Entrepreneur',
    description:
      'ESTPs are smart, energetic, and very perceptive people who truly enjoy living on the edge. They are action-oriented and thrive in dynamic environments. ESTPs are observant and resourceful, often excelling in situations that require quick thinking and adaptability. They are charismatic and confident, enjoying social interactions and engaging with others. Their enthusiasm and spontaneity make them exciting and engaging companions.',
  },
  {
    type: 'ESFP',
    title: 'The Entertainer',
    description:
      'ESFPs are spontaneous, energetic, and enthusiastic people—life is never boring around them. They are outgoing and sociable, enjoying the company of others and the excitement of new experiences. ESFPs are compassionate and generous, often bringing joy and positivity to those around them. They live in the moment and are always ready to embrace the fun side of life. Their warmth and vivacity make them the life of any party.',
  },
];

const PersonalityTypes = () => {
  const [selectedPersonality, setSelectedPersonality] = useState(null);

  return (
    <div className="results-container">
      {/* Panel */}
      <div className="panel">
        <div className="panel-header">
          <div className="panel-number">1</div>
          <h2>MBTI Personality Types</h2>
        </div>
        <div className="panel-content specialties-panel">
          <div className="specialties-list">
            {personalityData.map((personality, index) => (
              <div
                key={personality.type}
                className={`specialty-item ${
                  selectedPersonality && selectedPersonality.type === personality.type
                    ? 'selected'
                    : ''
                }`}
                onClick={() => setSelectedPersonality(personality)}
              >
                <span className="specialty-number">{index + 1}</span>
                <span className="specialty-name">{personality.type}</span>
              </div>
            ))}
          </div>
          {selectedPersonality && (
            <div className="specialty-details-panel">
              <h3>
                {selectedPersonality.type} - {selectedPersonality.title}
              </h3>
              <p>{selectedPersonality.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalityTypes;