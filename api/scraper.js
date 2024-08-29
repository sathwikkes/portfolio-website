const axios = require('axios');
const cheerio = require('cheerio');

async function scrapePage() {
    try {
        // Fetch HTML content
        const { data } = await axios.get("https://www.onthisday.com/film-tv/events.php");
        const $ = cheerio.load(data);
        
        // Parse and extract data
        const eventList = [];
        $('.event-list .event').each((index, element) => {
            const eventText = $(element).text();
            eventList.push(eventText);
        });
        // Randomly select five events
        const randomEvents = getRandomEvents(eventList, 5);
        //console.log("hey printing this list again", randomEvents);

        const eventObject = {};
        for (const event of randomEvents) {
          const eventYear = event.slice(0, 4); // Extract the year from the event text
          eventObject[eventYear] = event; // Add the year and the event text as a key-value pair to the object
        }

        // Remove the JSON file if it exists
        if (fs.existsSync(jsonFilePath)) {
          fs.unlinkSync(jsonFilePath);
        }

        // Save the random events to a JSON file
        fs.writeFileSync(jsonFilePath, JSON.stringify(eventObject, null, 2));

        // Send the scraped data to your server
        const postData = { events: randomEvents };

      try {
        const response = await fetch('http://localhost:3001/scrape', {
          method: 'POST',
          body: JSON.stringify(postData),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          console.log('Scraped data sent to the server successfully');
        } else {
          console.error('Failed to send scraped data to the server');
        }
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
      }

      randomEvents.forEach((event, index) => {
        console.log(`Event ${index + 1}: ${event}`);
      });

      // Close the browser when done
      await browser.close();
    } catch (error) {
      console.error('Scraping error:', error);
    }


      // Function to randomly select events from the event list
    function getRandomEvents(eventList, numEvents) {
      const shuffled = eventList.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, numEvents);
    }

  }

  
  scrapePage();