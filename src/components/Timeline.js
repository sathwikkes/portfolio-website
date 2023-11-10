// import React, { useEffect, useState } from 'react';
// //const fs = require('fs');
// //const jsonFilePath = '../data/randomEvents.json';

import Events from "../data/randomEvents.json";
// import React, { useEffect, useState } from 'react';
// import scraper from '../scraper/scraper';  // Adjust the import path based on your directory structure


// console.log(Events)
// const Timeline = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     // Fetch and set the events data from randomEvents.json
//     fetch(Events)
//     .then((response) => {
//       // Log the response to the console
//       //console.log(response);
//       // Parse the response as JSON
//       return response.json();
//     })
//     .then((data) => setEvents(data))
//     .then((data) => {
//       // Convert the object to an array
//       const eventArray = Object.values(data);
//       // Update the state with the array
//       setEvents(eventArray);
//       // console.log(eventArray)
//     })
//     .catch((error) => console.error('Error loading randomEvents.json:', error));

//   }, []);

//   return (
//     <div className="timeline">
//       <div className="timeline-container">
//         {events.map((event, index) => (
//           <div className="timeline-element" key={index}>
//             <div className="timeline-box">{event}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

//export default Timeline;



// import React from 'react';

// const Timeline = () => {
//   return (
//     <div className="timeline">
//       <div className="timeline-container">
//         <div className="timeline-element">
//           <div className="timeline-box">Box 1</div>
//         </div>
//         <div className="timeline-element">
//           <div className="timeline-box">Box 2</div>
//         </div>
//         <div className="timeline-element">
//           <div className="timeline-box">Box 3</div>
//         </div>
//         <div className="timeline-element">
//           <div className="timeline-box">Box 4</div>
//         </div>
//         <div className="timeline-element">
//           <div className="timeline-box">Box 5</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Timeline;

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
  // Format the date as needed (e.g., "November 9, 2023")
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <div id="timeline" className="timeline">
      <h2 className="timeline-heading">Snapshot of History on {formattedDate}</h2>
      <div className="timeline-container">
        {/* Render the array of JSX elements inside the timeline container */}
        {timelineElements}
      </div>
    </div>
  );
};

export default Timeline;

// const Timeline = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     scraper().then((randomEvents) => {
//       // Set the random events to the state
//       setEvents(randomEvents);
//     });
//   }, []);

//   const timelineElements = events.map((event, index) => (
//     <div className="timeline-element" key={index}>
//       <div className="timeline-box">
//         <p>{event}</p>
//       </div>
//     </div>
//   ));

//   return (
//     <div className="timeline">
//       <div className="timeline-container">
//         {timelineElements}
//       </div>
//     </div>
//   );
// };

// export default Timeline;