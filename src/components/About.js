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
//import IMG from '../assets/Detective.png';

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
          {/* <div className="about-img">
            <img src={IMG} alt="Detective" className="about-img-medium" />
          </div> */}
        </div>

        {/* Existing paragraph with detective image */}
        <div className="about-desc">
          <p>
          Welcome to my digital space! I'm not your typical academic achiever – 
          I'm just a naturally curious individual with an insatiable appetite for ideas and theories. 
          My site is to invite you into my world of perpetual curiosity.  
          My journey revolves around crafting software and tinkering with electronics, but it's more than just a tech playground. 
          I've dedicated considerable time to distill my experiences into written narratives. 
          Expect a unique blend of innovation and storytelling as I unfold the logic, reasoning, and challenges encountered on my engineering exploration. <br></br>
          Join me on this dynamic journey where curiosity fuels innovation, and every project is a story waiting to be told.
          </p>
        </div>
      </div>

      {/* Timeline elements displayed horizontally */}
      <div id="about-timeline"  className="timeline-elements">
        {/* First timeline element */}
        <div className="timeline-element">
          <h4 className="mbr-timeline-title pb-3 mbr-fonts-style display-5">What I've done</h4>
          <ul className="mbr-timeline-text mbr-fonts-style display-7">
            <li>Mentored 200+ students during their Data Science journey </li> 
            <li>Participated in events like Springboard’s Rise and DataConLA</li>
            <li>Contributed to open source projects @ Hack for LA </li>
          </ul>
        </div>

        {/* Second timeline element */}
        <div className="timeline-element">
          <h4 className="mbr-timeline-title pb-3 mbr-fonts-style display-5">Specialities</h4>
          <ul className="mbr-timeline-text mbr-fonts-style display-7">
            <li>Translating data into meaningful insights/recommendations that support business decision-making & strategy</li>
            <li>Communicate complex data concepts and findings with non technical audience</li>
            <li>Conduct market research </li>
            <li>Dissect ambiguous questions in a structured format </li>
            <li>Apply ML/DL algorithms to complex and high-dimensional data </li>
            <li>Design, build, maintain data pipelines, databases, and data warehouses </li>
          </ul>
        </div>

        {/* Third timeline element */}
        <div className="timeline-element">
          <h4 className="mbr-timeline-title pb-3 mbr-fonts-style display-5">Future Ventures (Learning Goals for 2023)</h4>
          <ul className="mbr-timeline-text mbr-fonts-style display-7">
            <li>Scalable distributed systems (infrastructure, networks, microservices)</li>
            <li>Image/Video processing</li>
            <li>Security</li>
            <li>File servers / personal datacenter / NAS</li>
            <li>Blockchain</li>
            <li>Embedded Systems (more IoT)</li>
            <li>Electrical Engineering </li>
          </ul>
        </div>
        {/* Fourth timeline element */}
        <div className="timeline-element">
          <h4 className="mbr-timeline-title pb-3 mbr-fonts-style display-5">Cinematography</h4>
          <ul className="mbr-timeline-text mbr-fonts-style display-7">
            <li>Film and video production</li>
            <li>Visual effects</li>
            <li>Sound design</li>
            <li>Cinematic storytelling</li>
            <li>Photo editing</li>
            <li>Film criticism</li>
          </ul>
        </div>




      </div>
    </div>


  );
};

export default About;
