import React, { useRef, useEffect, useState } from 'react';
import { FaChartBar, FaGithub, FaLinkedin, FaFilePdf } from 'react-icons/fa';
import Avatar from '../assets/sath.png';
import VideoBackground from '../assets/background.mp4';
import AWS from 'aws-sdk'; 
AWS.config.update({ 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY, 
  region: process.env.REACT_APP_AWS_REGION, 
  bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME, 
});

const s3 = new AWS.S3();

const Body = () => {
  const videoRef = useRef(null);
  const [resumePresignedUrl, setResumePresignedUrl] = useState(null);

  const roles = ["📊 Data Analyst", "🤖 Machine Learning Engineer", "💻 Computer Scientist", "👨🏽‍🎨 UI/UX Designer", "👨🏽‍💻 Tech Enthusiast", "🎬 Cinephile", "⛹🏽 Hooper", "🏏 Cricketer"];
  const [roleIndex, setRoleIndex] = useState(0);

  // Function to update the role
  const updateRole = () => {
    setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
  };

  // Adjust the playback rate when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Adjust this value to slow down or speed up the video
    }

    // Event listener for when the video ends
    videoRef.current.addEventListener('ended', () => {
      videoRef.current.currentTime = 0; // Rewind to the beginning
      videoRef.current.play(); // Play forward again
    });
    const generatePresignedUrlForResume = async () => {
      try {
        const params = {
          Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
          Key: 'Sathwik-Kesappragada-Resume.pdf', // Replace with the S3 object key for your resume
          Expires: 60, // Presigned URL expiration time in seconds
        };
        const url = await s3.getSignedUrlPromise('getObject', params);
        setResumePresignedUrl(url);
      } catch (error) {
        console.error('Error generating presigned URL for resume:', error);
      }
    };
  
    generatePresignedUrlForResume();


    // Set an interval to update the role
    const roleInterval = setInterval(updateRole, 2000); // Change roles every 2 seconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(roleInterval);
    };
  });

  return (
    <div id="body" className="body">
      <div className="body-container">
        {/* Video Background */}
        <video src={VideoBackground} autoPlay loop muted className="video-background" ref={videoRef}></video>

        <div className="body-profile">
          <img className="body-img" alt="avatar" src={Avatar} />

          <div className="body-content">
            <div className="body-headline">Sathwik Kesappragada</div>
            <div className="body-text">{roles[roleIndex]}</div>
          </div>

          <div className="body-icons">
            <a href="https://github.com/sathwikkes" target="_blank" rel="noreferrer" className="icon-link">
              <i>
                <FaGithub />
              </i>{' '}
            </a>
            <a href="https://www.linkedin.com/in/sathwik-kesappragada/" target="_blank" rel="noreferrer" className="icon-link">
              <i>
                <FaLinkedin />
              </i>
            </a>
            {resumePresignedUrl && (
            <a href={resumePresignedUrl} target="_blank" rel="noreferrer" className="icon-link">
              <i>
                <FaFilePdf />
            </i>
            </a>
          )}
            <a href="https://public.tableau.com/app/profile/sathwik.kesappragada/vizzes" target="_blank" rel="noreferrer" className="icon-link">
              <i>
                <FaChartBar />
              </i>
            </a>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;