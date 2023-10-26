// Create your About component here
import IMG from '../assets/Detective.png';

const About = () => {
    return (
        <div id="about" className="about">
            <h1 className="about-heading">About Me</h1>
            <div className="about-info">
                <p className="about-desc">I am a Full Stack Data Scientist with a robust foundation in statistics, mathematics, computer science, database management, analytical tools, and machine learning methodologies. Proficient in Python, SQL, and R, I approach my work with a pragmatic vision, firmly believing in the potential of data analytics. I thrive in collaborative team settings and embrace healthy competition, always striving to achieve. My proactive attitude is complemented by effective communication skills, and I possess an unwavering passion for acquiring proficiency in emerging technologies.</p>
                <div className="about-img">
                    <div className="about-img-wrapper">
                        <img src={IMG} alt="Detective" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;