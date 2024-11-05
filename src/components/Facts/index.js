import React, { useEffect, useState } from 'react';
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import { ref, onValue } from "firebase/database"; // Import Realtime Database functions
import { database } from "../../firebase"; // Import the Realtime Database instance
import './index.scss';

const twitterTimelineCode = `
  <a class="twitter-timeline" data-width="500" data-height="300" data-theme="dark" data-tweet-limit="3" href="https://twitter.com/fratwik?ref_src=twsrc%5Etfw">Tweets by fratwik</a>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
`;

const Facts = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [youtubeSubscriptions, setYoutubeSubscriptions] = useState([]);

    useEffect(() => {
        // Fetch YouTube subscriptions data from Firebase Realtime Database
        getYoutubeSubscriptions();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, []);

    const getYoutubeSubscriptions = () => {
        const subscriptionsRef = ref(database, 'youtubeSubscriptions'); 
        onValue(subscriptionsRef, (snapshot) => {
            const data = snapshot.val();
            console.log('Raw data fetched from Firebase:', data);
            if (data) {
                // Convert the data object to an array
                const subscriptionsArray = Object.values(data).map((subscription) => ({
                    name: subscription.snippet.title,
                    url: `https://www.youtube.com/channel/${subscription.snippet.resourceId.channelId}`,
                    imageUrl: subscription.snippet.thumbnails.default.url,
                }));

                // Shuffle the array and pick 10 random items
                const shuffledArray = subscriptionsArray.sort(() => 0.5 - Math.random());
                const randomTenSubscriptions = shuffledArray.slice(0, 10);

                // Set the state with the random 10 subscriptions
                setYoutubeSubscriptions(randomTenSubscriptions);
            }
        });
    };

    useEffect(() => {
        // Load Twitter widget script for embedded feed
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        document.head.appendChild(script);

        return () => {
            // Cleanup script on component unmount
            document.head.removeChild(script);
        };
    }, []);

    return (
        <>
            <div className="container facts-page">
                <div className="text-zone">
                    <h1 className="page-title">
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={"Facts".split("")}
                            idx={15}
                        />
                    </h1>
                

                {/* Main Content Container */}
                <div className="container">
                    {/* Twitter Feed Section */}
                    <div className="twitter-feed">
                        <h2 className="facts-title">My Twitter Feed</h2>
                        <div dangerouslySetInnerHTML={{ __html: twitterTimelineCode }} />
                    </div>

                    {/* YouTube Subscriptions Section */}
                    <div className="youtube-subscriptions">
                        <h2 className="facts-title">Sample of My YouTube Subscriptions</h2>
                        <div className="subscriptions-container">
                            {youtubeSubscriptions.length > 0 ? (
                                <ul>
                                    {youtubeSubscriptions.map((channel, index) => (
                                        <li key={index} className="channel-item">
                                            <img
                                                src={channel.imageUrl}
                                                alt={channel.name}
                                                className="channel-thumbnail"
                                            />
                                            <a
                                                href={channel.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="channel-link"
                                            >
                                                {channel.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Loading subscriptions...</p>
                            )}
                        </div>
                    </div>
                
                <div className="bucket-list">
                    <h2 className="facts-title">Bucket List</h2>
                    <ul className="bucket-list-items">
                        <li><strong>Epic Hikes:</strong> Summit Mt. Kilimanjaro, trek to Everest Base Camp, hike the Inca Trail to Machu Picchu.</li>
                        <li><strong>Unique Experiences:</strong> Witness the Northern Lights in Iceland, explore the Amazon rainforest, snowboard the Swiss Alps.</li>
                        <li><strong>Skill Mastery:</strong> Learn to play guitar, become a skilled photographer, write a short-script.</li>
                        <li><strong>Self-Improvement:</strong> Run a marathon, overcome a fear by seeking discomfort.</li>
                    </ul>
                </div>

                </div>

                </div>

            </div>
            <Loader type="pacman" />
        </>
    );
};

export default Facts;