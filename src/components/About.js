// // Import the image
// import IMG from '../assets/Detective.png';

// // Import the shooting stars component
// import ShootingStars from './ShootingStars';

// const About = () => {
//   return (
//     <div id="about" className="about">
//       {/* Shooting Stars Animation */}
//       <div className="stars-container">
//         <ShootingStars />
//       </div>

//       <h1 className="about-heading">About Me</h1>
//       <div className="about-info">
//         <p className="about-desc">
//           I am a Full Stack Data Scientist with a robust foundation in statistics,
//           mathematics, computer science, database management, analytical tools, and
//           machine learning methodologies. Proficient in Python, SQL, and R, I approach
//           my work with a pragmatic vision, firmly believing in the potential of data
//           analytics. I thrive in collaborative team settings and embrace healthy competition,
//           always striving to achieve. My proactive attitude is complemented by effective
//           communication skills, and I possess an unwavering passion for acquiring proficiency
//           in emerging technologies.
//         </p>
        
//         <div className="about-img">
//           <div className="about-img-wrapper">
//             <img src={IMG} alt="Detective" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;
// Import the shooting stars component
// Import the detective image
// Import the image
import IMG from '../assets/Detective.png';

// Import the shooting stars component
import ShootingStars from './ShootingStars';

const About = () => {
  return (
    <div id="about" className="about">
      {/* Shooting Stars Animation */}
      <div className="stars-container">
        <ShootingStars />
      </div>

      <div className="about-info">
        {/* Heading and Image */}
        <div className="heading-image">
          <h1 className="about-heading">About Me</h1>
          <div className="about-img">
            <img src={IMG} alt="Detective" className="about-img-medium" />
          </div>
        </div>

        {/* Existing paragraph with detective image */}
        <div className="about-desc">
          <p>
            I am a Full Stack Data Scientist with a robust foundation in statistics,
            mathematics, computer science, database management, analytical tools, and
            machine learning methodologies. Proficient in Python, SQL, and R, I approach
            my work with a pragmatic vision, firmly believing in the potential of data
            analytics. I thrive in collaborative team settings and embrace healthy competition,
            always striving to achieve. My proactive attitude is complemented by effective
            communication skills, and I possess an unwavering passion for acquiring proficiency
            in emerging technologies.
          </p>
        </div>
      </div>

      {/* Timeline elements displayed horizontally */}
      <div className="timeline-elements">
        {/* First timeline element */}
        <div className="timeline-element">
          <h4 className="mbr-timeline-title pb-3 mbr-fonts-style display-5">Passionate Data Scientist</h4>
          <p className="mbr-timeline-text mbr-fonts-style display-7">
            I am a data analytics teaching assistant, have mentored over 200+ students,
            and actively participate in events like Springboard's Rise and DataConLA.
          </p>
        </div>

        {/* Second timeline element */}
        <div className="timeline-element">
          <h4 className="mbr-timeline-title pb-3 mbr-fonts-style display-5">Believer of Continuous Learning</h4>
          <p className="mbr-timeline-text mbr-fonts-style display-7">
            The power of data amazes me. I am intrigued by applications such as
            self-driving cars, object detection, robotics, NLP with LSTMs, and I strive
            to become better in these areas.
          </p>
        </div>

        {/* Third timeline element */}
        <div className="timeline-element">
          <h4 className="mbr-timeline-title pb-3 mbr-fonts-style display-5">What I Offer</h4>
          <p className="mbr-timeline-text mbr-fonts-style display-7">
            My ability to translate data into insights, communicate with non-technical
            audiences, conduct market research, and break down ambiguous asks into
            a structured form by asking key questions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
