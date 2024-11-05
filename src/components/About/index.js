import { useEffect, useState } from 'react'
import proPic from '../../assets/images/sath2.png'
import {
  faPython,
  faAws,
  faHtml5,
  faJsSquare,
  faReact,
  faRProject
} from '@fortawesome/free-brands-svg-icons'


//import { SiLinux,SiTableau, SiMicrosoftexcel, SiVisualstudio } from "react-icons/si";


import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover');
      setIsVisible(true); 
    }, 3000)
  }, [])

  return (
    <>
      <div className="container about-page">
        {/* Add your photo */}
        <img
            src={proPic}
            alt="Sathwik"
            className={`photo ${isVisible ? 'slide-in' : ''}`}
        />
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
          I'm just a naturally curious individual with an insatiable appetite for ideas and theories. 
          My site is to invite you into my world of perpetual curiosity.  
          </p>
          <p>
          My journey revolves around crafting software and tinkering with electronics, but it's more than just a tech playground. 
          I've dedicated considerable time to distill my experiences into written narratives. 
          </p>
          <p>
          Expect a unique blend of innovation and storytelling as I unfold the logic, reasoning, and challenges encountered on my engineering exploration.
          Join me on this dynamic journey where curiosity fuels innovation, and every project is a story waiting to be told.
          </p>
          <p align="LEFT">
          </p>
          <p>
            If I need to define myself in one sentence that would be a family
            person, a sports fanatic, photography enthusiast, tech-obsessed, and movie junkie!!!
          </p>



        </div>

        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
              <FontAwesomeIcon icon={faPython} color="#DD0031" />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faHtml5} color="#F06529" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faAws} color="#28A4D9" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faJsSquare} color="#5ED4F4" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faRProject} color="#EFD81D" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faReact} color="#EC4D28" />
            </div>

          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
