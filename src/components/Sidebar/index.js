import './index.scss'
import { useState, useEffect } from 'react'
import AWS from 'aws-sdk'
import LogoS from '../../assets/images/logo-s.png'
import LogoSubtitle from '../../assets/images/logo_sub.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedin,
  faGithub,
  // faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import {
  faHome,
  faUser,
  faEnvelope,
  faSuitcase,
  faBars,
  faClose,
  faFilePdf,
  faSquarePollVertical,
  faCog,
  faCamera, // Import camera icon
  faLightbulb,
  // faFileLines
} from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom'

// Configure AWS S3
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const s3 = new AWS.S3();

const Sidebar = () => {
  const [showNav, setShowNav] = useState(false);
  const [resumePresignedUrl, setResumePresignedUrl] = useState(null);

  // Function to generate presigned URL for the resume
  const generatePresignedUrlForResume = async () => {
    try {
      const params = {
        Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
        Key: 'Sathwik-Kesappragada-Resume.pdf', // Ensure this matches your S3 object key
        Expires: 300, // Presigned URL expiration time in seconds
      };
      const url = await s3.getSignedUrlPromise('getObject', params);
      setResumePresignedUrl(url);
    } catch (error) {
      console.error('Error generating presigned URL for resume:', error);
    }
  };

  // Generate the presigned URL when the component mounts
  useEffect(() => {
    generatePresignedUrlForResume();
  }, []);

  return (
    <div className="nav-bar">
      <Link 
        className="logo"
        to="/"
        onClick={() => setShowNav(false)}>
        <img src={LogoS} alt="Logo" />
        <img className="sub-logo" src={LogoSubtitle} alt="sath" />
      </Link>
      <nav className={showNav ? 'mobile-show' : ''}>
        <NavLink 
          exact="true"
          activeclassname="active"
          to="/"
          onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
        </NavLink>
        <NavLink 
          activeclassname="active"
          className="about-link"
          to="/about"
          onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
        </NavLink>
        <NavLink
          activeclassname="active"
          className="skills-link"
          to="/skills"
          onClick={() => setShowNav(false)}
        >
         <FontAwesomeIcon icon={faCog} color="#4d4d4e" /> 
        </NavLink>
        <NavLink
          activeclassname="active"
          className="portfolio-link"
          to="/portfolio"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faSuitcase} color="#4d4d4e" />
        </NavLink>
        <NavLink
            activeclassname="active"
            className="facts-link"
            to="/facts"
            onClick={() => setShowNav(false)}
          >
            <FontAwesomeIcon icon={faLightbulb} color="#4d4d4e" />
          </NavLink>
        <NavLink
          activeclassname="active"
          className="photography-link" // Add new NavLink for Photography
          to="/photography"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faCamera} color="#4d4d4e" /> 
        </NavLink>
        <NavLink
          activeclassname="active"
          className="contact-link"
          to="/contact"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
        </NavLink>
        <FontAwesomeIcon 
          onClick={() => setShowNav(false)}
          icon={faClose}
          color="#ffd700"
          size="3x"
          className='close-icon' />
      </nav>
      <ul>
        <li>
          <a
            href="https://www.linkedin.com/in/sathwik-kesappragada/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/sathwikkes"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>
        {resumePresignedUrl && (
          <li>
            <a
              href={resumePresignedUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon
                icon={faFilePdf}
                color="#4d4d4e"
                className="anchor-icon"
              />
            </a>
          </li>
        )}
        <li>
          <a
            href="https://public.tableau.com/app/profile/sathwik.kesappragada/vizzes"
            rel="noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faSquarePollVertical}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>
      </ul>
      <FontAwesomeIcon 
        onClick={() => setShowNav(true)}
        icon={faBars}
        color="#ffd700"
        size="3x"
        className='hamburger-icon' />
    </div>
  )
}

export default Sidebar;