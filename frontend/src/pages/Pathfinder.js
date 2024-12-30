// Pathfinder.js

import React, { useState } from 'react';

/**
 * Example stage data
 * Each stage has:
 *   - id: unique ID string
 *   - title: displayed title
 *   - items: array of strings representing tasks
 */
const ALL_STAGES = [
  {
    id: 'stage1',
    title: 'Stage 1: Identify next Cardiology Placement',
    items: [
      'Placeholder item 1 in Stage 1',
      'Placeholder item 2 in Stage 1',
    ],
  },
  {
    id: 'stage2',
    title: 'Stage 2: Consultant Cardiologists',
    items: [
      'Find 2-3 Consultant Cardiologists',
      'Ask if they have any current Audits',
      'Identify highest-likelihood Audit',
    ],
  },
  {
    id: 'stage3',
    title: 'Stage 3: Confirm First Author',
    items: [
      'Confirm you would be First Author',
    ],
  },
  {
    id: 'stage4',
    title: 'Stage 4: Some Future Step',
    items: [
      'Future step 1',
      'Future step 2',
    ],
  },
  {
    id: 'stage5',
    title: 'Stage 5: Another Future Step',
    items: [
      'Future step 3',
    ],
  },
];

/**
 * We convert the raw stage data into objects with:
 *   - color: "green", "blue", or "gray"
 *   - tasks: array of { text, done }
 *
 * For demonstration:
 *   - stage1 is "green" (completed),
 *   - stage2 is "blue" (active),
 *   - the rest "gray" (future)
 */
function convertToStageData(stages) {
  return stages.map((st, index) => {
    let color = 'gray';
    if (index === 0) color = 'green'; // completed
    else if (index === 1) color = 'blue'; // active

    const tasks = st.items.map((txt) => ({ text: txt, done: false }));
    return {
      ...st,
      color,
      tasks,
    };
  });
}

const Pathfinder = () => {
  const [stages, setStages] = useState(() => convertToStageData(ALL_STAGES));

  /**
   * currentActiveIndex: the index of the stage that's currently "blue" (active).
   * If none is blue, -1 is possible, but we do have stage2 as initial.
   */
  const currentActiveIndex = stages.findIndex((s) => s.color === 'blue');

  /**
   * Toggling a task. Only valid if the stage is active.
   */
  const toggleTask = (stageIndex, taskIndex) => {
    const newStages = [...stages];
    const stageCopy = { ...newStages[stageIndex] };
    const tasksCopy = [...stageCopy.tasks];

    tasksCopy[taskIndex] = {
      ...tasksCopy[taskIndex],
      done: !tasksCopy[taskIndex].done,
    };
    stageCopy.tasks = tasksCopy;
    newStages[stageIndex] = stageCopy;
    setStages(newStages);
  };

  /**
   * Are all tasks done in the active stage?
   */
  const allTasksDone =
    currentActiveIndex >= 0 &&
    stages[currentActiveIndex].tasks.length > 0 &&
    stages[currentActiveIndex].tasks.every((t) => t.done);

  /**
   * Move from active stage to next stage:
   *   - currentActive -> green (completed)
   *   - next stage -> blue (active)
   * Then we visually shift the row so the new stage is at center.
   */
  const advanceStage = () => {
    const newStages = [...stages];

    // current stage -> green
    if (currentActiveIndex !== -1) {
      newStages[currentActiveIndex].color = 'green';
    }

    // next stage -> blue
    const nextIndex = currentActiveIndex + 1;
    if (nextIndex < newStages.length) {
      newStages[nextIndex].color = 'blue';
    }

    setStages(newStages);
  };

  /**
   * We'll show ALL stages side-by-side in .stages-row,
   * but only 3 at a time are effectively "centered" in the container.
   *
   * We want the active stage in the center, so offset = (currentActiveIndex - 1).
   * If currentActiveIndex < 1, we clamp offset at 0, so we don't overshoot left.
   * If currentActiveIndex is near the end, we clamp so we don't overshoot right.
   */
  const stageWidth = 320; // each stage box is ~300 + 20px gap
  let offsetIndex = currentActiveIndex - 1;
  if (offsetIndex < 0) offsetIndex = 0;
  if (offsetIndex > stages.length - 3) {
    // if there are fewer than 3 stages left at the end
    offsetIndex = stages.length - 3;
  }

  const translateX = -(offsetIndex * stageWidth);

  /**
   * We'll dynamically style the .stages-row:
   *   width = total # of stages * stageWidth
   *   transform: translateX(...) with a smooth CSS transition
   */
  const totalWidth = stages.length * stageWidth;

  return (
    <div className="pathfinder-container">
      <div className="page-title">
        <h2>Pathfinder: Deep View</h2>
        
      </div>

      {/* Step icons row (optional placeholders) */}
      <div className="step-icons">
        <div className="step-icon completed"><span className="checkmark">✓</span></div>
        <div className="step-icon completed"><span className="checkmark">✓</span></div>
        <div className="step-icon completed"><span className="checkmark">✓</span></div>
        <div className="step-icon completed"><span className="checkmark">✓</span></div>
        <div className="step-icon completed"><span className="checkmark">✓</span></div>
        <div className="step-icon"></div>
        <div className="step-icon"></div>
        <div className="step-icon"></div>
      </div>

      <div className="main-content">
        {/* Left column */}
        <div className="left-column">
          <div className="info-box daily-streak">
            <h4>Current Daily Streak</h4>
            <div className="streak-number">0</div>
            <p>days streak</p>
          </div>

          <div className="info-box stage-progression">
            <h4>Current Stage Progression</h4>
            <div className="progress-circle">73%</div>
          </div>

          <div className="info-box ask-doctor">
            <h4>Ask a Doctor?</h4>
            <p>Need advice from an expert? Click here to connect.</p>
          </div>
        </div>

        {/* Center container with the "diagram" + TaskTips */}
        <div className="center-container">
          {/* Diagram window with overflow hidden, and a row of stage boxes */}
          <div className="diagram-window">
            <div
              className="stages-row"
              style={{
                width: `${totalWidth}px`,
                transform: `translateX(${translateX}px)`,
              }}
            >
              {stages.map((stage, index) => {
                // color background
                let bgColor = '#cccccc'; // default gray
                if (stage.color === 'green') bgColor = '#a5d6a7';
                if (stage.color === 'blue') bgColor = '#5DADE2';

                return (
                  <div key={stage.id} className="stage-box" style={{ backgroundColor: bgColor }}>
                    <h4 className="stage-title">{stage.title}</h4>

                    {/* If stage is blue => tasks become checkboxes */}
                    {stage.color === 'blue' && stage.tasks.length > 0 ? (
                      <ul className="task-list">
                        {stage.tasks.map((task, tIndex) => (
                          <li key={tIndex}>
                            <label>
                              <input
                                type="checkbox"
                                checked={task.done}
                                onChange={() => toggleTask(index, tIndex)}
                              />
                              {task.text}
                            </label>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="task-list read-only">
                        {stage.tasks.map((task, tIndex) => (
                          <li key={tIndex}>{task.text}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {allTasksDone && (
            <button className="advance-button" onClick={advanceStage}>
              Advance to Next Stage
            </button>
          )}

          {/* Big “Task Tips” box with text */}
          <div className="task-tips-box">
            <h3>Task Tips!</h3>
            <p className="tips-title">
              The Importance of Choosing the Right Medical Audit for IMT Progression
            </p>
            <p>
              (Selecting the right medical audit is crucial for medical students aiming for
              Internal Medicine Training (IMT), as it can directly influence both your application
              score and your ability to manage competing priorities. To maximize success, focus on
              audits that are specific, actionable, and aligned with departmental needs. 
              For instance, revisiting previous audits or analyzing adherence to recognized guidelines
              (e.g., NICE) can provide clearer pathways to measurable improvements. Collaborating with
              an experienced supervisor who understands audit processes ensures that potential hurdles
              can be addressed efficiently. Additionally, choosing a topic that leverages accessible data
              and focuses on a manageable scope—such as a single ward rather than a multi-departmental
              issue—will significantly increase your likelihood of success.)
            </p>
            <p>
              When planning your audit, consider how it aligns with IMT portfolio requirements. Prioritize
              audits that can produce meaningful outcomes, such as presentations at conferences, posters,
              or even publications. These not only strengthen your portfolio but also demonstrate your
              ability to engage with clinical governance and quality improvement. Effective time management
              is key, so select an audit that can be completed within your available timeframe while
              delivering impactful results. Remember, a well-executed audit can help you stand out by
              showcasing your organizational, analytical, and teamwork skills.
            </p>
            <p><strong>Top Tips for a Successful Audit:</strong></p>
            <ol>
              <li>
                <strong>Choose Feasible Topics:</strong> Focus on audits with clear goals
                and readily available data to ensure completion within a realistic timeframe.
              </li>
              <li>
                <strong>Collaborate Effectively:</strong> Work with supportive consultants
                or teams experienced in audits to gain valuable guidance and mentorship.
              </li>
              <li>
                <strong>Plan for Deliverables:</strong> Aim to produce evidence for your
                portfolio, such as presentations or publications, to maximize the impact of
                your audit on your IMT application.
              </li>
            </ol>
          </div>
        </div>

        {/* Right column */}
        <div className="right-column">
          <div className="info-box calendar-box">
            <h4>Your Calendar</h4>
            <div className="calendar-placeholder">
              <p>Calendar Goes Here</p>
            </div>
          </div>

          <div className="info-box specialty-box">
            <h4>Your Specialty</h4>
            <p>Details about your chosen specialty can be shown here.</p>
          </div>

          <div className="info-box task-tips-small">
            <h4>Task Tips!</h4>
            <p>Maybe we use this middle section to be the expanded view if 
              the user clicks any of the side containers?</p>
          </div>
        </div>
      </div>

      <button className="feedback-button">Feedback?</button>

      {/* Full Styles with no abbreviation */}
      <style jsx>{`
        .pathfinder-container {
          width: 90%;
          max-width: 1200px;
          margin: 1 auto;
          padding: 50px;
          font-family: Arial, sans-serif;
          color: #0A1931;
        }

        .page-title {
          margin-bottom: 20px;
        }
        .page-title h2 {
          margin: 0;
          font-size: 24px;
          color: #0A1931;
        }
        .page-title p {
          font-size: 14px;
          color: #444;
        }

        /* Step icons row */
        .step-icons {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        .step-icon {
          width: 40px;
          height: 40px;
          border: 2px solid #ccc;
          border-radius: 50%;
          margin-right: 10px;
          position: relative;
          background-color: #fff;
        }
        .step-icon.completed {
          border-color: #4caf50;
        }
        .checkmark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #4caf50;
          font-weight: bold;
        }

        .main-content {
          display: grid;
          grid-template-columns: 250px 1fr 250px;
          grid-gap: 20px;
        }
        .left-column, .right-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .info-box {
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .info-box h4 {
          margin: 0 0 10px;
          font-size: 16px;
          color: #16496D;
        }

        .daily-streak .streak-number {
          font-size: 32px;
          color: #007090;
        }

        .stage-progression .progress-circle {
          width: 80px;
          height: 80px;
          background-color: #EAEBED;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #007090;
          margin: 0 auto;
        }

        .center-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Diagram window for the horizontal carousel */
        .diagram-window {
          position: relative;
          width: 960px; /* show exactly 3 stages * 320px each */
          overflow: hidden;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .stages-row {
          display: flex;
          transition: transform 0.6s ease; /* smooth horizontal movement */
        }

        .stage-box {
          width: 300px; /* actual box content */
          margin-right: 20px; /* 20px gap => total 320px each stage */
          border-radius: 8px;
          padding: 10px;
          color: #000;
          white-space: pre-wrap;
        }

        .stage-title {
          margin-top: 0;
          margin-bottom: 6px;
          font-size: 14px;
          font-weight: bold;
        }

        .task-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .task-list li {
          margin-bottom: 4px;
        }
        .task-list.read-only li {
          color: #222;
        }

        .advance-button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }
        .advance-button:hover {
          background-color: #0056b3;
        }

        .task-tips-box {
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .task-tips-box h3 {
          margin-top: 0;
          font-size: 18px;
          color: #16496D;
          margin-bottom: 10px;
        }
        .task-tips-box .tips-title {
          font-weight: bold;
          font-size: 15px;
          margin-bottom: 10px;
        }
        .task-tips-box p {
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 10px;
          color: #333;
        }

        .calendar-box .calendar-placeholder {
          width: 100%;
          height: 120px;
          background: #f9f9f9;
          border: 1px dashed #ccc;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 14px;
        }

        .task-tips-small p {
          margin: 0;
          color: #333;
          font-size: 14px;
        }

        .feedback-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #02A1CF;
          color: #fff;
          padding: 10px 15px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .feedback-button:hover {
          background-color: #007090;
        }

        @media (max-width: 1000px) {
          .main-content {
            grid-template-columns: 200px 1fr;
          }
          .diagram-window {
            width: 640px; /* maybe only 2 stages at a time for narrower screens */
          }
          .right-column {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .main-content {
            grid-template-columns: 1fr;
          }
          .left-column {
            flex-direction: row;
            overflow-x: auto;
          }
          .left-column .info-box {
            min-width: 140px;
            margin-right: 10px;
          }
          .diagram-window {
            width: 300px; /* show 1 stage at a time on very small screens */
          }
          .center-container {
            margin-top: 10px;
          }
          .feedback-button {
            bottom: 10px;
            right: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Pathfinder;