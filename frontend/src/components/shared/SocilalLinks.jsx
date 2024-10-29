// SocialLinks.js
import React from 'react';

// Assurez-vous d'avoir des icônes, vous pouvez utiliser FontAwesome ou un autre pack d'icônes
const SocialLinks = () => {
  return (
    <div className="social-links">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <i className="fa fa-facebook"></i> {/* FontAwesome Facebook icon */}
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
        <i className="fa fa-twitter"></i> {/* FontAwesome Twitter icon */}
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
        <i className="fa fa-linkedin"></i> {/* FontAwesome LinkedIn icon */}
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <i className="fa fa-instagram"></i> {/* FontAwesome Instagram icon */}
      </a>
    </div>
  );
};

export default SocialLinks;
