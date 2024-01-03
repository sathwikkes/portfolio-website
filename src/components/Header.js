// Create your Header component here
import { Link } from "react-smooth-scroll";

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
      <a href = "#app"> 
          <h3 className="header-name">SATHMATH</h3>
      </a>
      </div>
      <div className="header-container">
        <div className="nav-item">
          <a href="#about">About</a>
        </div>
        <div className="nav-item">
          <a href="#projects">Projects</a>
        </div>
        <div className="nav-item">
          <a href="#skills">Skills</a>
        </div>
        <div className="nav-item">
          <a href="#timeline">Fun Facts</a>
        </div>
        <div className="nav-item">
          <a href="https://github.com/sathwikkes/Python-Essentials">MemoryLog</a>
        </div>
        <div className="nav-item">
          <a href="#footer">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default Header;



