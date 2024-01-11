// Create your Skills component here
import { FaJs, FaHtml5, FaCss3, FaGithub, FaPython, FaDatabase, FaRProject, FaAws } from "react-icons/fa";
import { SiLinux,SiTableau, SiMicrosoftexcel, SiVisualstudio } from "react-icons/si";


const Skills = () => {
    const skillsArr = [
        {
            "name" : "Linux",
            "icon" : SiLinux
        },
        {
            "name" : 'JavaScript',
            "icon" : FaJs
        },
        {
            "name" : "HTML",
            "icon" : FaHtml5
        },
        {
            "name" : "CSS",
            "icon" : FaCss3
        },
        {
            "name" : "Git",
            "icon" : FaGithub
        },
        {
            "name" : "Python",
            "icon" : FaPython
        },
        {
            "name" : "Databases",
            "icon" : FaDatabase
        }, 
        {
            "name" : "R",
            "icon" : FaRProject
        },
        {
            "name" : "AWS",
            "icon" : FaAws
        },
        {
            "name" : "Tableau",
            "icon" : SiTableau
        },
        {
            "name" : "Excel",
            "icon" : SiMicrosoftexcel
        }, 
        {
            "name" : "Visual Studio",
            "icon" : SiVisualstudio
        }
    
    ];

    return (
        <div id='skills' className='skills'>
            <h2 className='title'>Skills</h2>
            <div className='skill-holder'>
                {
                    skillsArr.map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                            <i key={index} className='skill-cards'>
                                <Icon className='skill-icon'/>
                                <p
                                className="skill"
                                >
                                    {skill.name}
                                </p>
                            </i>
                        )
                    })                    
                }
            </div>
        </div>
    )
}

export default Skills;