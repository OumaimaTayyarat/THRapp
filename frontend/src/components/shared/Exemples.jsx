import React, { useEffect } from 'react'
import "./Exemples.css"
import logoImage from '../../assets/adil-removebg-preview.png'; // Import the image
import logoImage1 from '../../assets/YASSIR_ZENAGUI-removebg-preview.png'; // Import the image
import logoImage3 from '../../assets/R-removebg-preview.png'; // Import the image


// import Swiper from 'swiper/swiper-bundle.min.js';  // Import swiper-bundle.min.js

function Exemples() {
    useEffect(() => {
        // Dynamically load Swiper.js
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.js";
        script.async = true;

        script.onload = () => {
            // Initialize Swiper after script is loaded
            const swiper = new window.Swiper('.swiper', {
                grabCursor: true,
                speed: 500,
                effect: "fade",
                loop: true,
                clickable: true,
                mousewheel: {
                    invert: false,
                    sensitivity: 1,
                },
            });

            // Log the Swiper version
            console.log('Swiper version:', window.Swiper.version);

            // Sidebars
            const moreBtns = document.querySelectorAll(".more-btn");
            const closeBtns = document.querySelectorAll(".close-btn");
            const boxContainers = document.querySelectorAll(".box-container");
            const body = document.querySelector("body");
            const mobileBoxes = document.querySelectorAll(".box-mobile");

            moreBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    const modal = btn.getAttribute("data-modal");
                    document.getElementById(modal).style.display = "block";
                    body.classList.add("prevent-background-scroll");
                    boxContainers.forEach((container) => {
                        container.style.display = "none";
                    });
                });
            });

            closeBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    const modal = btn.closest(".sidebar");
                    modal.style.display = "none";
                    body.classList.remove("prevent-background-scroll");
                    boxContainers.forEach((container) => {
                        container.style.display = "grid";
                    });
                });
            });

            const closeSidebar = (e) => {
                if (e.target.classList.contains("sidebar")) {
                    e.target.style.display = "none";
                    body.classList.remove("prevent-background-scroll");
                    boxContainers.forEach((container) => {
                        container.style.display = "grid";
                    });
                }
            };
            document.addEventListener("click", closeSidebar);

            mobileBoxes.forEach((btn) => {
                btn.addEventListener("click", () => {
                    const modal = btn.getAttribute("data-modal");
                    document.getElementById(modal).style.display = "block";
                    body.classList.add("prevent-background-scroll");
                    boxContainers.forEach((container) => {
                        container.style.display = "none";
                    });
                });
            });

            // Audio
            const audio = document.getElementById("background-music");
            // const playPauseButton = document.getElementById("play-pause-button");
            const playIcon = document.getElementById("play-music");
            const pauseIcon = document.getElementById("pause-music");

            let isPlaying = false;

            function togglePlayPause() {
                if (isPlaying) {
                    audio.pause();
                    playIcon.classList.remove("hidden");
                    pauseIcon.classList.add("hidden");
                } else {
                    audio.play();
                    playIcon.classList.add("hidden");
                    pauseIcon.classList.remove("hidden");
                }
                isPlaying = !isPlaying;
            }

            // Add an event listener for when the music ends
            // if (audio) {
            //     audio.addEventListener("ended", function () {
            //         audio.currentTime = 0;
            //         audio.play();
            //     });

            //     playPauseButton.addEventListener("click", togglePlayPause);
            // }

            // Cleanup function to remove event listeners
            return () => {
                moreBtns.forEach((btn) => {
                    btn.removeEventListener("click", () => { });
                });

                closeBtns.forEach((btn) => {
                    btn.removeEventListener("click", () => { });
                });

                document.removeEventListener("click", closeSidebar);

                // if (audio) {
                //     audio.removeEventListener("ended", () => { });
                //     playPauseButton.removeEventListener("click", togglePlayPause);
                // }
            };
        };

        document.body.appendChild(script);

        // Cleanup: remove the script from the document if the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div className='exemples'> 
            <head>
                {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.css" /> */}

            </head>

            <audio id="background-music" loop>
                <source
                    src="https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Positive-Fuse.mp3"
                    type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
       

            <section>
                <div className="swiper">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="gradient"></div>
                            <h1 data-animate="bottom" className="titles">Adil Douiri</h1>
                            <img
                                className="hero"
                                src={logoImage}
                                alt="dua lipa"
                                loading="lazy"
                                style={{ width: '860px', height: 'auto' }}
                            />
                            <div className="box-container">


                                <div data-animate="bottom" className="box overview">
                                    <h1 style={{ alignSelf: 'center' }}>Overview</h1>
                                    <p>

                                    He founded Casablanca Finance Group in 1992 and later established Mutandis in 2008, a fast-growing Moroccan company with international reach, with modern factories in Berrechid and Dakhla, and an international footprint. </p>
                                </div>
                                <div className="box-mobile" data-modal="dua-bio">
                                    <h1 style={{ alignSelf: 'center' }}>Overview</h1>
                                </div>
                            </div>
                        </div>

                        <div className="swiper-slide">
                            <div className="gradient"></div>
                            <h1 data-animate="bottom" className="titles">Yassir Zenagui</h1>
                            <img
                                className="hero"
                                src={logoImage1}
                                style={{ width: '911px', height: 'auto' }}
                                alt="taylor swift" loading="lazy" />
                            <div className="box-container">

                                <div data-animate="bottom" className="box overview">
                                    <h1 style={{ alignSelf: 'center' }}>Overview</h1>
                                    <p>
                                    A promising young leader in the Moroccan tourism sector is Yassir Zenagui. A former Minister of Tourism, he played a key role in promoting Morocco as a top tourist destination. Under his leadership, several initiatives were launched to attract more international visitors and improve the country’s tourism infrastructure.                                    </p>

                                </div>
                                <div className="box-mobile" data-modal="taylor-bio">
                                    <h1 style={{ alignSelf: 'center' }}>Overview</h1>
                                </div>
                            </div>
                        </div>

                        <div className="swiper-slide">
                            <div className="gradient"></div>
                            <h1 data-animate="bottom" className="titles">Choumicha <br /> Chafay</h1>
                            <img className="hero" src={logoImage3} style={{ width: '900px', height: 'auto' }}
                                alt="ed sheeran" loading="lazy" />
                            <div className="box-container">

                           
                                <div data-animate="bottom" className="box overview">
                                    <h1 style={{ alignSelf: 'center' }}>Overview</h1>
                                    <p>
                                    She is a renowned chef, culinary show host, cookbook author, and businesswoman. Choumicha is considered the ultimate ambassador of Moroccan cuisine, drawing her expertise and creativity from the culinary traditions of Morocco.
                                </p>
                                </div>

                                <div className="box-mobile" data-modal="ed-bio">
                                    <h1 style={{ alignSelf: 'center' }}>Overview</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


          

            <div className="sidebar" id="dua-bio">
                <div className="sidebar-container">
                    <div className="sidebar-header">
                        <button className="close-btn">
                            <ion-icon className="close-icon" name="arrow-back-outline"></ion-icon>Back
                        </button>
                    </div>
             
                </div>
            </div>

          

         


       
        </div>
    )
}

export default Exemples
