import React from 'react';
import './Teams.css'; 
import "./Team.css"
import logoImage from '../../assets/Capture_d_écran_2024-10-15_144945-removebg-preview.png'; // Import the image// Make sure you have your CSS file imported
import Image1 from '../../assets/WhatsApp Image 2024-11-09 at 12.09.37.jpeg'; // Import the image// Make sure you have your CSS file imported

const Teams = () => {
  return (
  
<div className='teamo'>

<div class="container7">

  <main1>
 



    <section>

     
    </section>
    <div class="callout">
      {/* <h3> Make a Difference!</h3> */}
      {/* <p> Whether you're looking for exciting challenges or an inspiring work environment, we have opportunities waiting for you. Apply today to join a passionate team and contribute to impactful projects. Together, let's build an ambitious future!</p> */}
    </div>

    <img src={logoImage} alt=''/>
  </main1>
</div>
<div class="container8">

<main1>




  <section>

   
  </section>
  <div class="callout">
    {/* <h3> Make a Difference!</h3> */}
    {/* <p> Whether you're looking for exciting challenges or an inspiring work environment, we have opportunities waiting for you. Apply today to join a passionate team and contribute to impactful projects. Together, let's build an ambitious future!</p> */}
  </div>

  <img src={logoImage} alt=''/>
</main1>
</div>
    <div className="team">
 
      <h2 className="titless">Our team  <span>of excellence</span></h2>
      <br />
      <br />
           <br />
 
      <div className="container1">
  
       
  
        <div className="profile1">
          <img src={Image1} alt=""/><span className='name'>Jamil Wahbi <h2 className='details'>CEO/Founder</h2></span>
        </div>
        <div className="profile1">
          <img src="https://media.licdn.com/dms/image/v2/D4E03AQF5PGCPkLs1Rg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724983531102?e=1753920000&v=beta&t=8NyuO12DqbLm1wLvad1sXTzmUCQfk0sAdkoUqwl-dqk" alt=""/><span className='name'>Oumaima Tayyarat <h2 className='details'>web developer</h2></span>
        </div>
   
      </div>




 

    </div>
    </div>
  );
};

export default Teams;
