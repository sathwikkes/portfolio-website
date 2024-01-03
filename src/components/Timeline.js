

import Events from "../data/randomEvents.json";
import React from 'react';

const Timeline = () => {
  // Convert the events object to an array of key-value pairs
  const eventsArray = Object.entries(Events);

  // Sort the array by the year in ascending order
  eventsArray.sort((a, b) => a[0] - b[0]);

  // Map over the array and return a JSX element for each subarray
  const timelineElements = eventsArray.map((event, index) => {
    //const year = event[0];
    const eventText = event[1];
    const firstFourCharacters = eventText.slice(0, 4);
    const restOfText = eventText.slice(4);

    return (
      <div className="timeline-element" key={index}>
        <div className="timeline-box">
          <h4>{firstFourCharacters}</h4>
          <p>{restOfText}</p>
        </div>
      </div>
    );
  });

  // Get the current date
  const currentDate = new Date();
  // Format the date as needed (e.g., "November 9")
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  return (

    <div id="timeline" className="timeline">
      <h2 class="title">Fun Facts</h2>  
      <h3 className="timeline-heading">Snapshot of History on {formattedDate}</h3>
      <div className="timeline-container">
        {/* Render the array of JSX elements inside the timeline container */}
        {timelineElements}
      </div>
      <h3 className="timeline-heading">Top 5</h3>
    <div className="top5-container">
      <div className="top5-list">
          <h2>Last 5 Movies/TV Shows Watched</h2>
          <ul>
            <li>Peaky Blinders</li>
            <li>Shameless</li>
            <li>Oppenheimer</li>
            <li>Yellowstone</li>
            <li>Spiderman Across the Spiderverse</li>
          </ul>
        </div>
        <div className="top5-list">
        <h2>Top 5 Basketball Players</h2>
        <ul>
          <li>Kobe Bryant</li>
          <li>Lebron James</li>
          <li>Kevin Durant</li>
          <li>Tim Duncan</li>
          <li>Nikola Jokic</li>
        </ul>
      </div>
      <div className="top5-list">
        <h2>5 Places I want to visit</h2>
        <ul>
          <li>Chernobyl Exclusion Zone</li>
          <li>The Door to Hell</li>
          <li>Easter Island</li>
          <li>The Treasury</li>
          <li>Antartica</li>
        </ul>
      </div>
      <div className="top5-list">
        <h2>5 Tech Innovations I am looking forward to </h2>
        <ul>
          <li>Biotechnology</li>
          <li>Quantum Computing</li>
          <li>Battery Advancements</li>
          <li>Artificial Intelligence</li>
          <li>Space Exploration</li>
        </ul>
      </div>
      <div className="top5-list">
        <h2>5 Resarch Papers to Read</h2>
        <ul>
          <li><a href="https://link.springer.com/article/10.1007/s11023-020-09548-1" title="Click here to visit">GPT-3: Its Nature, Scope, Limits, and Consequences</a> </li>
          <li><a href="https://openaccess.thecvf.com/content_cvpr_2016/papers/Redmon_You_Only_Look_CVPR_2016_paper.pdf" title="Click here to visit">You Only Look Once: Unified, Real-Time Object Detection</a> </li>
          <li><a href="https://arxiv.org/pdf/1905.11946v5.pdf" title="Click here to visit">EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks</a></li>
          <li><a href="https://arxiv.org/pdf/1810.04805v2.pdf" title="Click here to visit">BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding</a></li>
          <li><a href="https://arxiv.org/pdf/1912.04958v2.pdf"title="Click here to visit">Analyzing and Improving the Image Quality of StyleGAN</a></li>
        </ul>
      </div>

      </div>
    </div>
  );
};

export default Timeline;


