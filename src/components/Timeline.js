import Events from "../data/randomEvents.json";
import React, { useEffect, useState }  from 'react';

import { getSubscriptions } from './Subscriptions';

// import React, { useContext } from 'react';
// import { EventsContext } from './EventsContext'; // Adjust path as needed
const twitterTimelineCode = '<a class="twitter-timeline" data-width="500" data-height="200" data-theme="dark" data-tweet-limit="3" href="https://twitter.com/fratwik?ref_src=twsrc%5Etfw" >Tweets by fratwik</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';

const Timeline = () => {
  // Convert the events object to an array of key-value pairs
  const eventsArray = Object.entries(Events);
  //const subscriptionList = getSubscriptions();
  //const { events } = useContext(EventsContext); // Get events from context
  // Sort the array by the year in ascending order
  eventsArray.sort((a, b) => a[0] - b[0]);
  // const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  // const apiKey = process.env.REACT_APP_APPLE_API_KEY;
  const [randomChannelNames, setRandomChannelNames] = useState([]);
  //const [subscriptions, setSubscriptions] = useState([]);
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
  
  useEffect(() => {
    // Use the getSubscriptions function to get the JSON data
    const subscriptions = getSubscriptions();

    // Function to get 10 random channel names
    function getRandomChannelNames(subscriptions, count) {
      const shuffledSubscriptions = subscriptions.sort(() => Math.random() - 0.5);
      const randomChannels = shuffledSubscriptions.slice(0, count);
      //const channelNames = randomChannels.map(subscription => subscription.snippet.title);
      const channelNames = randomChannels.map(subscription => ({
        name: subscription.snippet.title,
        url: `https://www.youtube.com/channel/${subscription.snippet.resourceId.channelId}`,
        imageUrl: subscription.snippet.thumbnails.default.url,
      }));
      return channelNames;
    }

    // Get 10 random channel names
    const randomChannels = getRandomChannelNames(subscriptions, 10);
    
    // Set the state with random channel names
    setRandomChannelNames(randomChannels);

    //console.log('Random Channels:', randomChannels); // Add this line
  }, []);

  useEffect(() => {

    // // Fetch 10 random YouTube subscriptions data
    // const fetchedSubscriptions = getSubscriptions();
    // setSubscriptions(fetchedSubscriptions);
    // Load the Twitter widget script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.head.appendChild(script);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(script);
    };
    
  }, []);


  // Get the current date
  const currentDate = new Date();
  // Format the date as needed (e.g., "November 9")
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  return (

    <div id="timeline" className="timeline">
      <h2 className="title">Fun Facts</h2>  
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

      <div className="container">
        <div className="twitter-feed">
          <h2 className="twitter-title">My Twitter Feed</h2>
          <div dangerouslySetInnerHTML={{ __html: twitterTimelineCode }} />
        </div>

        <div className="youtube-subscription-list">
          <h2 className="youtube-heading">Sample of My Youtube Subscriptions</h2>
          <div className="random-channels-container">
            <ul>
              {randomChannelNames.map((channel, index) => (
                <li key={index}>
                  <img src={channel.imageUrl} alt={channel.name}></img>
                  <a href={channel.url} target="_blank" rel="noopener noreferrer">
                    {channel.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
</div>

    </div>
  );
};

export default Timeline;   

