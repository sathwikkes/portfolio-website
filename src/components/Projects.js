import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AWS from 'aws-sdk';

//import basicImage from '../assets/Software.png';
import proj1 from '../assets/movie.png';
import projImg2 from '../assets/yelp-classification.jpeg';
import projImg3 from '../assets/cwc2023.jpeg';
import youtubeImage from '../assets/summarize-youtube-video.png';
import viceMedia from '../assets/vice-media.jpeg'
import hackForLA from '../assets/hack-for-la.png'

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
  bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
});

const s3 = new AWS.S3();

const Projects = () => {
  const projects = [
    {
      name: 'Movie Recommender System',
      description: 'Identify which key characteristics affect the rating of a film',
      link: 'https://github.com/sathwikkes/Movie-Recommender-System',
      objectKey: 'Movie-Recommender.pdf', 
      image: proj1,
    },
    {
        name : "Yelp Image Classification",
        description : "Classifying pictures from Yelp's image data set into respective categories",
        link : "https://github.com/sathwikkes/Yelp-Image-Classification", 
        objectKey: "Image-Classification.pdf",
        image: projImg2,
    },
    {
        name: "Cricket Web Scraper",
        description : "Daily scraping tournament stats to keep track of who stays on top the longest.",
        link : "https://github.com/sathwikkes/cricket-world-cup-tracking-web-scraper", 
        objectKey: "Cricket-Scraper-Project.pdf",
        image:projImg3,
    },
    {
        name : "YouTube Video Summarizer",
        description : "Say goodbye to long videos, save time with summaries",
        link: "https://github.com/sathwikkes/Youtube-Video-Summarizer", 
        objectKey: "Youtube-Video-Summarizer.pdf",
        image: youtubeImage,
    },
    {
        name : "Article Audience Analysis",
        description: "Recommendations for future content strategies for Vice Media's editorial content",
        link: "https://github.com/sathwikkes/Vice-Media", 
        objectKey: "slide-deck-rec.pdf",
        image: viceMedia,
    },
    {
      name: "SEIE Survey Analysis",
      description: "Neighborhood Council Board members in Los Angeles prioritized housing and homelessness as the most pressing issue for the city, with police concerns rising in specific regions.",
      link: "https://github.com/hackforla/data-science/tree/seie-survey", 
      objectKey: "SEIE-Presentation.pdf",
      image:hackForLA,
  },

  ];

  const [presignedUrls, setPresignedUrls] = useState([]);

  const generatePresignedUrl = async (objectKey) => {
    try {
      const params = {
        Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
        Key: objectKey,
        Expires: 60, // Presigned URL expiration time in seconds
      };
      const url = await s3.getSignedUrlPromise('getObject', params);
      return url;
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      return null;
    }
  };

  useEffect(() => {
    const generatePresignedUrlsForProjects = async () => {
      const urls = await Promise.all(
        projects.map(async (project) => {
          if (project.objectKey) {
            const url = await generatePresignedUrl(project.objectKey);
           // console.log(`Generated URL for ${project.name}:`, url);
            return { ...project, presignedUrl: url };
          }
          return project;
        })
      );
      setPresignedUrls(urls);
    };

    generatePresignedUrlsForProjects();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          infinite: false,
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div id="projects" className="projects">
      <div className="heading">
        <h2>MY WORK</h2>
      </div>
      <div className="projects-container">
        <Slider {...settings}>
          {presignedUrls.map((project, key) => (
            <div key={key} className="project">
              <div className="content">
                <img src={project.image} alt="Project" />
                <h2 className="name">{project.name}</h2>
                {project.description.length > 130 ? (
                  <p className="description-min">{project.description}</p>
                ) : (
                  <p className="description">{project.description}</p>
                )}
                <div>
                  <a className="project-button" target="_blank" href={project.link} rel="noreferrer">
                    GitHub
                  </a>
                  {project.presignedUrl && (
                    <a className="project-button" target="_blank" href={project.presignedUrl} rel="noreferrer">
                      Slide Deck
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Projects;
