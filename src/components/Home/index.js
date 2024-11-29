import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import LogoTitle from '../../assets/images/logo-s.png'
import Logo from './Logo'
import './index.scss'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  const nameArray = ['a', 't', 'h', 'w', 'i', 'k', ","]
  const jobArray = [
    'D',
    'a',
    't',
    'a',
    ' ',
    'S',
    'c',
    'i',
    'e',
    'n',
    't',
    'i',
    's',
    't',
    "."
  ]

  const roles = [
    "📊 Data Visualization Analyst",
    "🤖 Machine Learning Engineer",
    "💻 Computer Scientist",
    "👨🏽‍🎨 UI/UX Designer",
    "👨🏽‍💻 Tech Enthusiast",
    "👨🏾‍🏫 Tutor",
    "🎬 Cinephile",
    "⛹🏽 Hooper",
    "🏏 Cricketer"
  ];

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (typingIndex < roles[roleIndex].length) {
        setDisplayedRole((prev) => prev + roles[roleIndex][typingIndex]);
        setTypingIndex((prev) => prev + 1);
      } else {
        clearInterval(typingInterval);
        // Start deleting after 2 seconds pause
        setTimeout(() => {
          setTypingIndex(0);
          setDisplayedRole('');
          setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }, 2000); // 2-second pause before deleting
      }
    }, 100); // Typing speed

    return () => clearInterval(typingInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingIndex, roleIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i,</span>
            <br />
            <span className={`${letterClass} _13`}>I</span>
            <span className={`${letterClass} _14`}>'m</span>
            <img
              src={LogoTitle}
              alt="Python Developer Name, Data Analysis Name"
            />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={15}
            />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={jobArray}
              idx={22}
            />
          </h1>
          <h2>{displayedRole}</h2> {/*  <h2>Data Visualization / Business Analyst / Creator</h2> */}
          <Link to="/contact" className="flat-button">
            CONTACT ME
          </Link>
        </div>
        <Logo />
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Home