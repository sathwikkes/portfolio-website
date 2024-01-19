// // Create your Footer component here
import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaApple } from 'react-icons/fa';
import emailjs from 'emailjs-com';


const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const Footer = () => {
  const initialFormDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  };

  const [formDetails, setFormDetails] = useState(initialFormDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText('Sending...');

    try {
      // console.log('serviceId:', serviceId);
      // console.log('templateId:', templateId);
      // console.log('publicKey:', publicKey);
      // console.log('formDetails:', formDetails);
      // Use EmailJS send function to send the email
      const response = await emailjs.send(
        serviceId, // replace with your EmailJS service ID
        templateId, // replace with your EmailJS template ID
        {
          ...formDetails,
          from_name: `${formDetails.firstName} ${formDetails.lastName}`, // Combine first and last names
        },
        publicKey // replace with your EmailJS user ID
      );
      // Check the status of the response
      if (response.status === 200) {
        // Email sent successfully
        setStatus({
          success: true,
          message: 'Message sent successfully',
        });
      } else {
        // Email sending failed
        setStatus({
          success: false,
          message: 'Error sending message. Please try again later.',
        });
      }
    } catch (error) {
      // Handle errors if the email sending fails
      setStatus({
        success: false,
        message: 'Error sending message. Please try again later.',
      });
    }

      

    setFormDetails(initialFormDetails);
    setButtonText('Send');
  };

  return (
    <footer id="footer" className="footer">
      <div className="footer-contact-info">
        <h1 className="footer-heading">Get In Touch</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formDetails.firstName}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formDetails.lastName}
            onChange={handleFormChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formDetails.email}
            onChange={handleFormChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone No."
            value={formDetails.phone}
            onChange={handleFormChange}
          />
          <textarea
            rows="6"
            name="message"
            placeholder="Message"
            value={formDetails.message}
            onChange={handleFormChange}
          ></textarea>
          <button type="submit">
            <span>{buttonText}</span>
          </button>
        </form>
        {status.message && (
          <p className={status.success ? 'success' : 'danger'}>
            {status.message}
          </p>
        )}
      </div>
      <div>
        <h1>Social Links</h1>
        <div className="social-icons">
                    <a href="https://www.facebook.com/sathwikthecreator/"><i><FaFacebook /></i></a>
                    <a href=""><i><FaInstagram /></i></a>
                     <a href=""><i><FaTwitter /></i></a>
                     <a href="https://music.apple.com/profile/sathwikthecreator"><i><FaApple /></i></a>
        </div>
        <div id="copyright">© Copyright 2024 Sathwik Kesappragada</div>
      </div>
    </footer>
  );
};

export default Footer;
