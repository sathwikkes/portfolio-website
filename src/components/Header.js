import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
        {location.pathname === '/' && (
          <>
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
          </>
        )}
        <div className="nav-item">
          <a href="/photography">Photography</a>
        </div>
        <div className="nav-item">
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