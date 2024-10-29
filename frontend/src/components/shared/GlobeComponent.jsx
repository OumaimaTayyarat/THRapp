import { useEffect } from 'react';
import { Circ } from 'gsap';
import { gsap } from 'gsap';
import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import './GlobeComponent.css'; // Make sure to include your CSS file
import { Button } from '../ui/button';


const GlobeComponent = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  useEffect(() => {
    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;
    const MAX_EFFECT_RADIUS = 100; // Maximum distance from the cursor for the effect

    // Main
    initHeader();
    initAnimation();
    addListeners();
    function initHeader() {
      width = window.innerWidth;
      height = window.innerHeight;
      target = { x: width / 2, y: height / 2}; // Center the target initially

      largeHeader = document.getElementById('large-header');
      largeHeader.style.height = height + 'px';


      canvas = document.getElementById('demo-canvas');
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d');

      // Create points with increased spacing
      points = [];
      const spacingFactor = 30; // Adjust this value to increase/decrease spacing
      for (let x = 0; x < width; x += width / spacingFactor) {
        for (let y = 0; y < height; y += height / spacingFactor) {
          let px = x + Math.random() * (width / spacingFactor);
          let py = y + Math.random() * (height / spacingFactor);
          let p = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }

      // Find the closest points
      points.forEach(p1 => {
        let closest = [];
        points.forEach(p2 => {
          if (p1 !== p2) {
            if (closest.length < 5) closest.push(p2);
            else {
              closest.sort((a, b) => getDistance(p1, a) - getDistance(p1, b));
              if (getDistance(p1, p2) < getDistance(p1, closest[4])) {
                closest[4] = p2;
              }
            }
          }
        });
        p1.closest = closest;
      });

      // Assign circles to points
      points.forEach(p => {
        p.circle = new Circle(p, 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
      });
    }


    // Event handling
    function addListeners() {
      if (!('ontouchstart' in window)) {
        window.addEventListener('mousemove', mouseMove);
      }
      window.addEventListener('scroll', scrollCheck);
      window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
      var posx = 0;
      var posy = 0;

      // Get mouse position
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }

      // Restrict cursor influence to within MAX_EFFECT_RADIUS from the canvas center
      const distanceFromCenter = getDistance({ x: posx, y: posy }, { x: width / 2, y: height / 2 });
      if (distanceFromCenter <= MAX_EFFECT_RADIUS) {
        target.x = posx;
        target.y = posy;
      } else {
        // If outside the radius, move the target to the edge of the effect boundary
        const angle = Math.atan2(posy - height / 2, posx - width / 2);
        target.x = width / 2 + Math.cos(angle) * MAX_EFFECT_RADIUS;
        target.y = height / 2 + Math.sin(angle) * MAX_EFFECT_RADIUS;
      }
    }

    function scrollCheck() {
      if (document.body.scrollTop > height) animateHeader = false;
      else animateHeader = true;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      largeHeader.style.height = height + 'px';
      canvas.width = width;
      canvas.height = height;
    }

    // animation
    function initAnimation() {
      animate();
      for (var i in points) {
        shiftPoint(points[i]);
      }
    }

    function animate() {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (var i in points) {
          // detect points in range
          const distanceToCursor = Math.abs(getDistance(target, points[i]));
          if (distanceToCursor < 4000) {
            points[i].active = 0.3;
            points[i].circle.active = 0.6;
          } else if (distanceToCursor < 20000) {
            points[i].active = 0.1;
            points[i].circle.active = 0.3;
          } else if (distanceToCursor < 40000) {
            points[i].active = 0.02;
            points[i].circle.active = 0.1;
          } else {
            points[i].active = 0;
            points[i].circle.active = 0;
          }

          drawLines(points[i]);
          points[i].circle.draw();
        }
      }
      requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
      gsap.to(p, {
        duration: 1 + 1 * Math.random(),
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Circ.easeInOut,
        onComplete: function () {
          shiftPoint(p);
        },
      });
    }

    // Canvas manipulation
    function drawLines(p) {
      if (!p.active) return;
      for (var i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
        ctx.stroke();
      }
    }

    function Circle(pos, rad, color) {
      var _this = this;

      // constructor
      (function () {
        _this.pos = pos || null;
        _this.radius = rad || null;
        _this.color = color || null;
      })();

      this.draw = function () {
        if (!_this.active) return;
        ctx.beginPath();
        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(156,217,249,' + _this.active + ')';
        ctx.fill();
      };
    }

    // Util
    function getDistance(p1, p2) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    // Clean up
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('scroll', scrollCheck);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
<div id="large-header" className="large-header">
  <canvas id="demo-canvas"></canvas>

  <h1 className="main-title">
  Connect and Explore <span className="thin"> The Top Job Openings </span>
  <br />
  <br />
    <div className='flex w-[100%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        className='outline-none border-none w-full placeholder-transparent' // Ajout de 'placeholder-transparent'
        placeholder="Search jobs..." // Ajout du texte de placeholder
      />
      <Button onClick={searchJobHandler} className="rounded-r-full">
        <Search className='h-5 w-5' />
      </Button>
    </div>
  </h1>


</div>

  );
};

export default GlobeComponent;
