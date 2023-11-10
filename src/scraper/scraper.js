//import Events from "../components/data/randomEvents.json";
const puppeteer = require('puppeteer');
const fs = require('fs'); // Add this line to import the 'fs' module


// Use dynamic import to import node-fetch
import('node-fetch').then(async (nodeFetch) => {
  const fetch = nodeFetch.default; // access the 'default' export from the ES module
  //const jsonFilePath = '../data/randomEvents.json';
  const jsonFilePath = `${__dirname}/../data/randomEvents.json`;

  async function scrapePage() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log('New page created'); // Add this line

    // Navigate to the target web page
    //await page.goto('https://www.onthisday.com/today/events.php');
    await page.goto("https://www.onthisday.com/film-tv/events.php");

    // Scrape events from the current page
    const events = await page.$$('.event-list .event');

    const eventList = []; // Initialize an empty array to store the events

    for (const event of events) {
      const eventText = await event.evaluate(node => node.textContent);
      eventList.push(eventText); // Add each event to the array
      console.log('Event:', eventText); // Add this line
    }



    // Randomly select five events
    const randomEvents = getRandomEvents(eventList, 5);
    //console.log("hey printing this list again", randomEvents);

    const eventObject = {}; // Initialize an empty object to store the events

    for (const event of randomEvents) {
      const eventYear = event.slice(0, 4); // Extract the year from the event text
      eventObject[eventYear] = event; // Add the year and the event text as a key-value pair to the object
    }

    // // Define the path of the .js file
    // const jsFilePath = '../components/data/events.js';

    // // Write the JSON object to the .js file
    // fs.writeFileSync(jsFilePath, 'const events = ' + JSON.stringify(eventObject, null, 2) + ';');
   
   
   // Remove the JSON file if it exists
    if (fs.existsSync(jsonFilePath)) {
        fs.unlinkSync(jsonFilePath);
    }
 
    // Save the random events to a JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(eventObject, null, 2));
    //fs.writeFileSync(Events, JSON.stringify(eventObject, null, 2));

    // Send the scraped data to your server
    const postData = {
      events: randomEvents,
    };

    try {
        const response = await fetch('http://localhost:3002/scrape', {
          method: 'POST',
          body: JSON.stringify(postData),
          headers: { 'Content-Type': 'application/json' },
        });
      
        if (response.ok) {
          console.log('Scraped data sent to the server successfully');
        } else {
          console.error('Failed to send scraped data to the server');
        }
      } catch (error) {
        console.error('Fetch error:', error);
    }

    // Print the selected events
    randomEvents.forEach((event, index) => {
      console.log(`Event ${index + 1}: ${event}`);
    });

    // Close the browser when done
    await browser.close();
    //return eventObject; // Return the random events
  }

  // Function to randomly select events from the event list
  function getRandomEvents(eventList, numEvents) {
    const shuffled = eventList.sort(() => 0.5 - Math.random()); // Shuffle the events
    return shuffled.slice(0, numEvents); // Return the first numEvents events
  }

  scrapePage(); // Run the scraper function
});
