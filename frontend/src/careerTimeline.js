// careerTimeline.js

import React, { useState, useEffect } from 'react';

const LadderDiagram = ({ endSpecialtyName }) => {
  const labels = [
    "You Are Here: Premedicine",
    "UCAT + Interviews",
    "Y1-5 Med School",
    "F1+2 Placements + Logbook",
    "Specialty Applications",
    "Specialty Run Through",
    `Dream JOB: ${endSpecialtyName}`
  ];

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [isBlurred, setIsBlurred] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getTextWidth = (text) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '16px Arial';
    return context.measureText(text).width;
  };

  const boxPadding = 20;
  const boxHeight = 50;
  const boxSpacing = Math.min(dimensions.height / labels.length, 100); // Dynamic vertical space
  const startX = Math.max(dimensions.width / 10, 50); // Dynamic start X position

  const toggleBlur = () => {
    setIsBlurred(!isBlurred);
  };

  return (
    <div>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#000" />
          </marker>
          <filter id="blur" x="0" y="0">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {labels.map((label, index) => {
          const textWidth = getTextWidth(label);
          const boxWidth = textWidth + boxPadding * 2;
          const yPosition = dimensions.height - boxSpacing * (index + 1);
          const xPosition =
            startX +
            ((dimensions.width - startX * 2) / (labels.length - 1)) * index;
          const applyBlur =
            isBlurred && index !== 0 && index !== labels.length - 1;

          return (
            <g key={index} filter={applyBlur ? 'url(#blur)' : 'none'}>
              <rect
                x={xPosition}
                y={yPosition}
                width={boxWidth}
                height={boxHeight}
                fill="#87CEEB"
              />
              <text x={xPosition + 10} y={yPosition + 30} fill="#000">
                {label}
              </text>
              {index < labels.length - 1 && (
                <line
                  x1={xPosition + boxWidth / 2}
                  y1={yPosition}
                  x2={
                    startX +
                    ((dimensions.width - startX * 2) / (labels.length - 1)) *
                      (index + 1) +
                    (getTextWidth(labels[index + 1]) + boxPadding * 2) / 2
                  }
                  y2={yPosition - boxSpacing + boxHeight}
                  stroke="#000"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />
              )}
            </g>
          );
        })}
      </svg>
      <button
        onClick={toggleBlur}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Unlock for £10/month
      </button>
    </div>
  );
};

export default LadderDiagram;