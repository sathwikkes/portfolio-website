// Create your Projects component here

//import Project from '../assets/login.png';
//import data from '../data/projects.json';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import basicImage from "../assets/Software.png";
import proj1 from "../assets/movie.png"
import projImg2 from "../assets/yelp-classification.jpeg";
import projImg3 from "../assets/cwc2023.jpeg";



const Projects = () => {
    const  projects = [
        {
            "name" : "Movie Recommender System",
            "description" : "Identify which key characteristics affect the rating of a film",
            "link" : "https://github.com/sathwikkes/Movie-Recommender-System", 
            "s3Link": "https://aws-portfolio-website-bucket.s3.us-west-1.amazonaws.com/Movie-Recommender.pdf",
            "image": proj1,
        },
        {
            "name" : "Yelp Image Classification",
            "description" : "Classifying pictures from Yelp's image data set into respective categories",
            "link" : "https://github.com/sathwikkes/Yelp-Image-Classification", 
            "s3Link": "https://aws-portfolio-website-bucket.s3.us-west-1.amazonaws.com/Image-Classification.pdf",
            "image": projImg2,
        },
        {
            "name" : "Cricket Web Scraper",
            "description" : "Daily scraping tournament stats to keep track of who stays on top the longest.",
            "link" : "https://github.com/sathwikkes/cricket-world-cup-tracking-web-scraper", 
            "s3Link": "https://aws-portfolio-website-bucket.s3.us-west-1.amazonaws.com/Movie-Recommender.pdf",
            "image":projImg3,
        },
        {
            "name" : "Project 4",
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "link" : "https://github.com/", 
            "s3Link": "https://aws-portfolio-website-bucket.s3.us-west-1.amazonaws.com/Movie-Recommender.pdf",
            "image": basicImage,
        },
        {
            "name" : "Project 5",
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "link" : "https://github.com/", 
            "s3link": "https://aws-portfolio-website-bucket.s3.us-west-1.amazonaws.com/Movie-Recommender.pdf",
            "image": basicImage,
        },
    ];
    
    
    const settings = {
        dots: true,
        infinite: false,
        initialSlide: 0,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
        {
          breakpoint: 600,
          settings: {
            infinite: false,
            initialSlide: 0,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
        <div id='projects' className='projects'>
            <div className="heading">
                <h2>MY WORK</h2>
            </div>
                <div className="projects-container">
                    <Slider {...settings}>
                    {
                        projects.map((project, key) => {
                            return (
                                <div key={key} className="project">
                                    <div className="content">
                                        <img src={project.image} alt="Project" />
                                        <h2 className="name">{project.name}</h2>
                                        {
                                            project.description.length > 130 
                                            ? <p className='description-min'>{project.description}</p>
                                            :  <p className='description'>{project.description}</p>                                            
                                        }
                                        <div>
                                            <a
                                            className="project-button"
                                            target="_blank"
                                            href={project.link}
                                            rel="noreferrer"
                                            >GitHub
                                            </a>
                                            {project.s3Link && (
                                                <a
                                                    className="project-button"
                                                    target="_blank"
                                                    href={project.s3Link}
                                                    rel="noreferrer"
                                                >
                                                    Slide Deck
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </Slider>
                </div>
        </div>
    )
}

export default Projects;