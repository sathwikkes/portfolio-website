import { useEffect, useState, useRef } from 'react';
import Loader from 'react-loaders';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import emailjs from '@emailjs/browser';
import AnimatedLetters from '../AnimatedLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faApple } from '@fortawesome/free-brands-svg-icons';
import './index.scss';
import { trackPageView, trackLinkClick } from '../../firebase';

const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;




const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const form = useRef();

  useEffect(() => {
    trackPageView('Contact Page', 'https://sathematics.com/contact');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        () => {
          alert('Message successfully sent!');
          window.location.reload(false);
        },
        (error) => {
          console.error('Email send error:', error); // Log error for debugging
          alert('Failed to send the message, please try again');
        }
      );
  };

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
          I'm seeking full-time roles on ambitious, large-scale projects. 
          Feel free to reach out with any questions or opportunities using the form below.
          </p>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input placeholder="Name" type="text" name="from_name" required />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="from_email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div className="info-map">
          Los Angeles,
          <br />
          California,
          <br />
          United States <br />
          Hollywood<br />
          <br />
          <span>kiwasek18@gmail.com</span>
        </div>
        <div className="map-wrap">
          <MapContainer center={[34.052235, -118.243683]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[34.052235, -118.243683]}>
              <Popup>
                Sath lives here, come over for a cup of coffee :)<br />
                <a href="https://buymeacoffee.com/sathwikkes" target="_blank" rel="noreferrer">
                  Buy me a coffee!
                </a>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="social-links">
        <h4>Social Media</h4>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/sathwikthecreator/"
            target="_blank"
            rel="noreferrer"
            onClick={() => trackLinkClick('Facebook')}
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://www.instagram.com/sathwikthecreator/"
            target="_blank"
            rel="noreferrer"
            onClick={() => trackLinkClick('Instagram')}
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://twitter.com/fratwik"
            target="_blank"
            rel="noreferrer"
            onClick={() => trackLinkClick('Twitter')}
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://music.apple.com/profile/sathwikthecreator"
            target="_blank"
            rel="noreferrer"
            onClick={() => trackLinkClick('Apple Music')}
          >
            <FontAwesomeIcon icon={faApple} />
          </a>
        </div>
      </div>
      </div>
      <Loader type="pacman" />
    </>
  );
}

export default Contact;