import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import { ref, onValue } from "firebase/database"; // Import Realtime Database functions
import { database } from "../../firebase"; // Import the Realtime Database instance
import AWS from 'aws-sdk'; // Import AWS SDK for accessing S3

// Configure AWS S3
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});



const s3 = new AWS.S3();

const Portfolio = () => { 
    const [letterClass, setLetterClass] = useState('text-animate');
    const [portfolio, setPortfolio] = useState([]);
    const [presignedUrls, setPresignedUrls] = useState({}); // Store presigned URLs

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        getPortfolio();
    // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    }, []);

    const getPortfolio = async () => {  // Mark function as async
        const portfolioRef = ref(database, 'portfolio');  // Reference to the 'portfolio' node in Realtime Database
        onValue(portfolioRef, async (snapshot) => {  // Also make the callback function async
            const data = snapshot.val();
            //console.log('Portfolio Data:', data);  // Debugging: Check the data being fetched
            if (data) {
                const portfolioArray = Object.values(data); // Convert to array
                setPortfolio(portfolioArray);
                await generatePresignedUrlsForProjects(portfolioArray);  // Await the async function
            }
        });
    };

    // Function to generate presigned URLs for the slide decks
    const generatePresignedUrl = async (objectKey) => {
        try {
            const params = {
                Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
                Key: objectKey,
                Expires: 300, // Presigned URL expiration time in seconds
            };
            const url = await s3.getSignedUrlPromise('getObject', params);
            return url;
        } catch (error) {
            console.error('Error generating presigned URL:', error);
            return null;
        }
    };

    const generatePresignedUrlsForProjects = async (projects) => {
        const urls = {};
        for (const project of projects) {
            if (project.objectKey) {
                const url = await generatePresignedUrl(project.objectKey);
                if (url) {
                    urls[project.title] = url;
                }
            }
        }
        setPresignedUrls(urls);
    };

    const renderPortfolio = (portfolio) => {
        return (
            <div className="images-container">
                {
                    portfolio.map((port, idx) => {
                        return (
                            <div className="image-box" key={idx}>
                                <img 
                                    src={port.image}
                                    className="portfolio-image"
                                    alt={port.title}
                                />
                                <div className="content">
                                    <p className="title">{port.title}</p>
                                    {/* View Button */}
                                    <button
                                        className="btn"
                                        onClick={() => window.open(port.url)}
                                    >
                                        View
                                    </button>
                                    {/* More Info Button */}
                                    {presignedUrls[port.title] && (
                                        <button
                                            className="btn"
                                            onClick={() => window.open(presignedUrls[port.title])}
                                        >
                                            More Info
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    return (
        <>
            <div className="container portfolio-page">
                <h1 className="page-title">
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={"Portfolio".split("")}
                        idx={15}
                    />
                </h1>
                <div>{renderPortfolio(portfolio)}</div>
            </div>
            <Loader type="pacman" />
        </>
    );
}

export default Portfolio;