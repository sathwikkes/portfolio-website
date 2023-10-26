import React, { useRef, useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Avatar from '../assets/sath.png';
import VideoBackground from '../assets/beach-isla.mp4';

const Body = () => {
  const videoRef = useRef(null);

  const roles = ["Data Analyst", "Tech Enthusiast", "Cinephile", "Software Engineer", "UI/UX Designer"];
  const [roleIndex, setRoleIndex] = useState(0);

  // Function to update the role
  const updateRole = () => {
    setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
  };

  // Adjust the playback rate when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.22; // Adjust this value to slow down or speed up the video
    }

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
