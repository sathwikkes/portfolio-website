// // Create your Footer component here
 import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

// const Footer = () => {
//     return (
//         <footer id="footer" className="footer">
//             <div className="footer-contact-info">
//                 <h1 className="footer-heading">Connect With Me</h1>
//                 <p className="footer-contact-access">Email: deliciousmistake@sath.com</p>
//                 <p className="footer-contact-access">Mobile: 1234 1234 1234</p>
//             </div>
//             <div>
//                 <h1>Social Links</h1>
//                 <div className="social-icons">
//                     <a href="https://www.facebook.com/sathwikthecreator/"><i><FaFacebook /></i></a>
//                     <a href=""><i><FaInstagram /></i></a>
//                     <a href=""><i><FaTwitter /></i></a>
//                 </div>
//             </div>
//         </footer>
//     )
// }

// export default Footer;

// Update your Footer component

import React, { useState } from 'react';

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

    // Add your code to send the contact form data to the server.

    // Once the data is sent and processed, you can update the status state.

    // Example status update:
    setStatus({
      success: true, // or false based on the result
      message: 'Message sent successfully', // Update with an appropriate message
    });

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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
