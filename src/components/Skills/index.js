import React, { useEffect, useState } from 'react';
import WordCloud from 'react-wordcloud';
import AnimatedLetters from '../AnimatedLetters';  
import './index.scss';

// Skills data
const skills = [
  { text: 'HTML5', value: 30 },
  { text: 'CSS3', value: 30 },
  { text: 'JavaScript', value: 40 },
  { text: 'Python', value: 50 },
  { text: 'SQL', value: 40 },
  { text: 'React', value: 25 },
  { text: 'PostgreSQL', value: 35 },
  { text: 'Tableau', value: 35 },
  { text: 'Bootstrap', value: 25 },
  { text: 'Git', value: 40 },
  { text: 'APIs', value: 26 },
  { text: 'JSON', value: 14 },
  { text: 'R', value: 20 },
  { text: 'MongoDB', value: 26 },
  { text: 'AWS', value: 30 },
  { text: 'npm', value: 19 },
  { text: 'brew', value: 19 },
  { text: 'linux', value: 25 },
  { text: 'snowflake', value: 19 },
  { text: 'databricks', value: 19 },
  { text: 'vba', value: 15}
];

// Options for the WordCloud
const options = {
  rotations: 2,
  rotationAngles: [-90, 0],
  fontSizes: [20, 60],  // Adjust font sizes to ensure some variance
};

// WordCloud callbacks (e.g., color, on-click action)
const callbacks = {
  getWordColor: word => word.value > 30 ? "#d4a017" : "#000",  // Example coloring by value
  onWordClick: word => window.open(`https://www.google.com/search?q=${word.text}`, "_blank"),  // Open a new tab with search
};

const Skills = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const [shuffledSkills, setShuffledSkills] = useState(skills);  // State for shuffling the skills

  // Shuffle the words every 5 seconds
  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffled = [...array].sort(() => Math.random() - 0.8);
      return shuffled;
    };

    const intervalId = setInterval(() => {
      setShuffledSkills(shuffleArray(skills));
    }, 5000);  // Shuffle every 5 seconds

    return () => clearInterval(intervalId);  // Cleanup interval on unmount
  }, []);

  // Animate the text letters
  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="skills-page">
      <div className="container skills-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['S', 'k', 'i', 'l', 'l', 's', ' ', '&', ' ', 'E', 'x', 'p', 'e', 'r', 'i', 'e', 'n', 'c', 'e']}
              idx={15}
            />
          </h1>
          <p>
            Expert in back-end development and data analysis including technologies like
            <span className="tech-tag">Python</span>,
            <span className="tech-tag">PostgreSQL</span>,
            <span className="tech-tag">MongoDB</span>,
            <span className="tech-tag">R</span>,
            <span className="tech-tag">Tableau</span>,
            <span className="tech-tag">JavaScript</span>,
            <span className="tech-tag">HTML5</span>,
            <span className="tech-tag">CSS3</span>,
            <span className="tech-tag">React</span>,
            <span className="tech-tag">Bootstrap</span>,
            <span className="tech-tag">Git</span>, etc.
          </p>
          <p>
            I’m not a designer but I have a good sense of aesthetics, and experience in responsive, mobile-first web design. I put special effort into optimizing my code and providing the best user experience. I would love to give you any kind of support also after the project's completion. I guarantee a commitment during work on your project.
          </p>
   
        <div className="skills-charts">
          <WordCloud 
            words={shuffledSkills}  // Use shuffled words
            options={options}
            callbacks={callbacks}
          />
        </div>
      </div>
      </div>

    </div>
  );
};

export default Skills;
