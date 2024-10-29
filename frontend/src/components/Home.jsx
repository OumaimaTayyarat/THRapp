import React, { useEffect, useState } from 'react';
import Navbar1 from './shared/Navbar1.jsx';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Hello from './shared/hello.jsx';
import GlobeComponent from './shared/GlobeComponent.jsx';
import Teams from './shared/teams.jsx';
import LoupeSection from './shared/LoupeSection.jsx';
import Exemples from './shared/Exemples.jsx';
import Examples from './shared/Examples.jsx';
import ContactUs from './shared/ContactUs.jsx';
import "./Home.css"
const Home = () => {
  // État pour gérer l'état du menu
  const [menuState, setMenuState] = useState(false);
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  // Hook pour récupérer tous les emplois
  useGetAllJobs();

  // Hook pour la navigation
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/");
    }
  }, [user, navigate]); // Ajoute `user` et `navigate` comme dépendances

  // Fonction pour basculer l'état du menu

  return (
    <div>

      <Navbar1  />

    <Examples/>
      {/* <Exemples/> */}
      <CategoryCarousel />
      {/* <LatestJobs /> */}

    
      <Hello/>  
     
      {/* <LoupeSection/> */}
      <GlobeComponent/>
      <br />
      <br />
 
      <br />
      {/* <Team/> */}
      <Teams/>
      <br />
      <br />
 
      <br />
      <br />
      <br />
      <br />
      <ContactUs/>
      <Footer />
      </div>

  );
};

export default Home;
