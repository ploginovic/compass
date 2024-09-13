// careerTimeline.js

import React, { useState, useEffect } from 'react';

const LadderDiagram = ({ endSpecialtyName }) => {
  const labels = [
    'You Are Here: Premedicine',
    'UCAT + Interviews',
    'Y1-5 Med School',
    'F1+2 Placements + Logbook',
    'Specialty Applications',
    'Specialty Run Through',
    `Dream JOB: ${endSpecialtyName}`,
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isBlurred, setIsBlurred] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
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
  const boxSpacing = 50; // Fixed vertical space between boxes
  const verticalPadding = 20; // Top and bottom padding
  const horizontalPadding = 50; // Left and right padding

  // Calculate total SVG height (the same as before)
  const svgHeight =
    labels.length * boxHeight +
    (labels.length - 1) * boxSpacing +
    verticalPadding * 2;

  // Calculate maximum box width
  const maxBoxWidth = Math.max(
    ...labels.map((label) => getTextWidth(label) + boxPadding * 2)
  );

  // Calculate total horizontal space
  const totalHorizontalSpace = windowWidth - horizontalPadding * 2 - maxBoxWidth;

  // Calculate horizontal spacing between nodes
  const horizontalSpacing = totalHorizontalSpace / (labels.length - 1);

  const toggleBlur = () => {
    setIsBlurred(!isBlurred);
  };

  return (
    <div>
      <svg
        width="100%"
        height={svgHeight}
        viewBox={`0 0 ${windowWidth} ${svgHeight}`}
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

          // Recalculate yPosition to start from the bottom (bottom-up direction)
          const yPosition =
            svgHeight - verticalPadding - (index + 1) * (boxHeight + boxSpacing);

          // Calculate xPosition with proper padding
          const xPosition =
            horizontalPadding +
            (totalHorizontalSpace / (labels.length - 1)) * index;

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
              {index < labels.length - 1 && (() => {
                // Calculate next box position and width
                const nextTextWidth = getTextWidth(labels[index + 1]);
                const nextBoxWidth = nextTextWidth + boxPadding * 2;

                // Start the line at the top of the current box
                const lineStartY = yPosition;
                // End the line at the bottom of the next box
                const nextYPosition =
                  svgHeight -
                  verticalPadding -
                  (index + 2) * (boxHeight + boxSpacing);

                const nextXPosition =
                  horizontalPadding +
                  (totalHorizontalSpace / (labels.length - 1)) * (index + 1);

                return (
                  <line
                    x1={xPosition + boxWidth / 2}
                    y1={lineStartY}
                    x2={nextXPosition + nextBoxWidth / 2}
                    y2={nextYPosition + boxHeight}
                    stroke="#000"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                  />
                );
              })()}
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