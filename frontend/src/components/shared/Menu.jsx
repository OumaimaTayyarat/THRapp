
import React from 'react';
import './Navbar1.css'; // Assurez-vous que le chemin soit correct

// import SocialLinks from './SocialLinks'; // Make sure this component is properly imported

const Menu = (props) => {
  return (
    <div className={`menu-container ${props.showMenu}`}>
      <div className="overlay" />
      <div className="menu-items">
        <ul>
          <li>
            <a href="#welcome-section" onClick={props.toggleMenu}>
              HOME
            </a>
          </li>
          <li>
            <a href="#about" onClick={props.toggleMenu}>
              ABOUT
            </a>
          </li>
          <li>
            <a href="#projects" onClick={props.toggleMenu}>
              PORTFOLIO
            </a>
          </li>
          <li>
            <a href="#contact" onClick={props.toggleMenu}>
              CONTACT
            </a>
          </li>
        </ul>
        {/* <SocialLinks /> */}
      </div>
    </div>
  );
};

export default Menu;
