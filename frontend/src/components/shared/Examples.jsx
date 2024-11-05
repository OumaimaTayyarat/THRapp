import React, { useEffect } from 'react';
import './Examples.css';
import video1 from '../../assets/6466246-uhd_4096_2160_25fps.mp4';
import video2 from '../../assets/12529965_3840_2160_24fps.mp4';
import video3 from '../../assets/5146942-uhd_4096_2160_25fps (2).mp4';

function Examples() {
  useEffect(() => {
    // Load Swiper library
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.js';
    script.async = true;

    script.onload = () => {
      console.log('Swiper script loaded');
      
      // Initialize Swiper
      const swiper = new window.Swiper('.swiperr-container', {
        direction: 'vertical',
        effect: 'fade',
        speed: 1000,
        loop: true,
        allowTouchMove: false, // Disable touch movement

        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        on: {
          // Reset animations when slides change
          slideChange: function () {
            this.slides.forEach((slide) => {
              let background = slide.querySelector('.background video');
              if (background) {
                background.classList.remove('animation');
              }
            });
            let activeSlide = this.slides[this.activeIndex];
            let background = activeSlide.querySelector('.background video');
            if (background) {
              background.classList.add('animation');
              background.currentTime = 0; // Start the video from the beginning
              background.play(); // Play video on active slide
            }
          },
        },
      });

      // Event listener for each video to move to the next slide when it ends
      const videos = document.querySelectorAll('.background video');
      videos.forEach((video) => {
        video.addEventListener('ended', () => {
          swiper.slideNext();
        });
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {/* Slide 1 */}
          <div className="swiper-slide">
            <div className="content" data-content="one">
              <h1>Hotels</h1>
              <p>Explore our job openings in the hospitality sector and join a dynamic and innovative industry!</p>
            </div>
            <div className="background video" data-item="one">
              <video src={video1} autoPlay muted playsInline></video>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="swiper-slide">
            <div className="content" data-content="two">
              <h1>Tourism</h1>
              <p>Explore exciting career opportunities in the tourism industry and help shape unforgettable experiences!</p>
            </div>
            <div className="background video" data-item="two">
              <video src={video2} autoPlay muted playsInline></video>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="swiper-slide">
            <div className="content" data-content="three">
              <h1>Restaurants</h1>
              <p>Find your passion in the restaurant industry with various career options that celebrate creativity and innovation!</p>
            </div>
            <div className="background video" data-item="three">
              <video src={video3} autoPlay muted playsInline></video>
            </div>
          </div>
        </div>
        {/* <div className="swiper-pagination"></div> */}
      </div>
    </div>
  );
}

export default Examples;
