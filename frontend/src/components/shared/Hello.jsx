import React, { useState, useRef, useEffect } from 'react';
import './Hello.css'; // Make sure to include your CSS file

const Card = ({ dataImage, header, content }) => {
  const cardRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [mouseLeaveDelay, setMouseLeaveDelay] = useState(null);

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      setWidth(card.offsetWidth);
      setHeight(card.offsetHeight);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left - width / 2);
      setMouseY(e.clientY - rect.top - height / 2);
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(mouseLeaveDelay);
  };

  const handleMouseLeave = () => {
    setMouseLeaveDelay(setTimeout(() => {
      setMouseX(0);
      setMouseY(0);
    }, 1000));
  };

  const mousePX = mouseX / width;
  const mousePY = mouseY / height;

  const cardStyle = {
    transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
  };

  const cardBgTransform = {
    transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`,
  };

  const cardBgImage = {
    backgroundImage: `url(${dataImage})`,
  };

  return (
    <div
      className="card-wrap"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div className="card" style={cardStyle}>
        <div className="card-bg" style={{ ...cardBgTransform, ...cardBgImage }}></div>
        <div className="card-info">
          <h1>{header}</h1>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

const Hello = () => {
  const cardsData = [
    {
      title: 'Offers',
      content: 'Our solutions combine innovation and expertise for a tailored approach.',
      image: 'https://images.pexels.com/photos/9832700/pexels-photo-9832700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'Talents',
      content: 'Express your potential and be part of the best talents in the tourism sector.',
      image: 'https://images.pexels.com/photos/4491458/pexels-photo-4491458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'Career',
      content: 'Your career in tourism starts here, with positions tailored to your ambitions.',
      image: 'https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },


  ];

  return (
    <div className="hello">
      <h1 className="title">Search, Apply & Get Your <br /> <span className='spano'> Dream Jobs</span>    
   </h1>
      <div id="Hello" className="container">
        {cardsData.map((card, index) => (
          <Card key={index} dataImage={card.image} header={card.title} content={card.content} />
        ))}
      </div>
    </div>
  );
};

export default Hello;
