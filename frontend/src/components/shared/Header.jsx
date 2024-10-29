import React from 'react';
import './Navbar1.css'; // Assurez-vous que le chemin soit correct


const Header = () => {
  return (
    <header id="welcome-section">
      {/* Divs pour les effets visuels */}
      <div className="forest" />
      <div className="silhouette" />
      <div className="moon" />

      {/* Contenu principal du header */}
      <div className="container">
        <h1>
          {/* Texte avec différentes lignes */}
          <span className="line">I do</span>
          <span className="line">graphic design</span>
          <span className="line">
            <span className="color">&</span> code.
          </span>
        </h1>

        {/* Boutons pour naviguer dans le portfolio et la section contact */}
        <div className="buttons">
          <a href="#projects">my portfolio</a>
          <a href="#contact" className="cta">
            get in touch
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
