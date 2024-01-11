import React, { createContext, useState } from 'react';

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  );
};



// Function to randomly select events remains the same
function getRandomEvents(eventList, numEvents) {
    const shuffled = eventList.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, numEvents);
}

fetch('https://www.onthisday.com/film-tv/events.php')
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const eventElements = doc.querySelectorAll('.event-list .event a.date');
    const eventTitles = [];

    eventElements.forEach(element => {
      const eventTitle = element.parentNode.textContent.trim();
      eventTitles.push(eventTitle);
    });

    const randomEvents = getRandomEvents(eventTitles, 5);
    // Update events in context
    const { setEvents } = useContext(EventsContext);
    setEvents(randomEvents);

    randomEvents.forEach((event, index) => {
      console.log(`Event ${index + 1}: ${event}`);
      displayEvent(`Event ${index + 1}: ${event}`);
    });

    fetch('http://localhost:3002/scrape', {
      method: 'POST',
      body: JSON.stringify({ events: randomEvents }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.ok ? console.log('Scraped data sent successfully') : console.error('Failed to send data'))
      .catch(error => console.error('Fetch error:', error));
  });

function displayEvent(event) {
  const eventContainer = document.getElementById('events-container');
  const eventItem = document.createElement('div');
  eventItem.classList.add('event-item');
  eventItem.textContent = event;
  eventContainer.appendChild(eventItem);
}

