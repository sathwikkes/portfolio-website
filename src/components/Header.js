// Create your Header component here
import { Link } from "react-smooth-scroll";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    // Navigate to the root URL ("/")
    navigate('/');
  };

  return (
    <div className="header">
      <div className="header-logo">
      <a href="/" onClick={handleLogoClick}>
          <h3 className="header-name">IMSATH</h3>
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
          <a href="/photography">Photography</a>
        </div>
        <div className="nav-item">
          {/* <a href="https://github.com/sathwikkes/Python-Essentials">MemoryLog</a> */}
          <a href="/memory-log">MemoryLog</a>
        </div>
        <div className="nav-item">
          <a href="#footer">Contact</a>
        </div>
      </div>
    </div>
    
  );
};

export default Header;



