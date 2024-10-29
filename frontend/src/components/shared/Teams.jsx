import React from 'react';
import './Teams.css'; 
import "./Team.css"
import logoImage from '../../assets/Capture_d_écran_2024-10-15_144945-removebg-preview.png'; // Import the image// Make sure you have your CSS file imported

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
 
      <h2 className="title">Our team   <span>of excellence</span></h2>
      <br />
      <br />
      <div className="container1">
  
        <div className="profile1">
          <img src="https://media.licdn.com/dms/image/v2/C4D03AQFoqgDLMhOSCw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1646966331837?e=2147483647&v=beta&t=WPgCuTHKJy6iEKRYtgApU3TdmRFOmCqorgz3-oiu14A" alt=""/><span className="name">Jamil Wahbi</span>
        </div>
        <div className="profile1">
          <img src="https://images.unsplash.com/photo-1484186139897-d5fc6b908812?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt=""/><span className="name"> Profile utilsateur</span>
        </div>
        <div className="profile1">
          <img src="https://media.licdn.com/dms/image/v2/D4E03AQF5PGCPkLs1Rg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724983531102?e=1735776000&v=beta&t=SRX1qMea-EPmitVfAs2Tx_eP4a7oJKTRaJ6tvC9my3k" alt=""/><span className="name">Oumaima Tayyarat</span>
        </div>
   
      </div>
    </div>
    </div>
  );
};

export default Teams;
