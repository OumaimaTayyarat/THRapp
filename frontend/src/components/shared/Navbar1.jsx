import React, { useEffect, useRef, useState } from 'react';
import './Navbar1.css'; // Assurez-vous que le chemin soit correct
import logoImage from '../../assets/Capture_d_écran_2024-10-15_144945-removebg-preview.png'; // Import the image
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar1 = () => {
    const { user } = useSelector(store => store.auth);
    console.log(user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    const bodyRef = useRef(null);
    const menuRef = useRef(null);
    const menuItemsRef = useRef([]);
    const debounceTimerRef = useRef(null); // Ref for debounce timer

    useEffect(() => {
        bodyRef.current = document.querySelector('body');
        menuRef.current = document.querySelector('.menu-icon');

        // Collect all navigation list items
        menuItemsRef.current = document.querySelectorAll('.nav__list-item');

        // Add event listener for menu toggle
        const toggleNav = () => {
            toggleClass(bodyRef.current, 'nav-active');
        };

        menuRef.current.addEventListener('click', toggleNav);

        // Initialize the light/dark switch
        initLightDarkSwitch();

        // Cleanup event listeners on component unmount
        return () => {
            menuRef.current.removeEventListener('click', toggleNav);
            clearTimeout(debounceTimerRef.current); // Clear debounce timer on unmount
        };
    }, []);

    const toggleClass = (element, stringClass) => {
        if (element.classList.contains(stringClass)) {
            element.classList.remove(stringClass);
        } else {
            element.classList.add(stringClass);
        }
    };

    const initLightDarkSwitch = () => {
        const body = document.body;
        const switchButton = document.getElementById("switch");

        // Check if the button exists
        if (!switchButton) {
            console.error("Le bouton de changement de thème n'a pas été trouvé.");
            return;
        }

        // Ensure the initial state is set correctly
        if (body.classList.contains("light")) {
            switchButton.classList.add("switched");
        } else {
            switchButton.classList.remove("switched");
        }

        // Function to toggle the theme
        const toggleTheme = (event) => {
            event.preventDefault(); // Prevents default behavior of the button
            console.log("Bouton cliqué");

            // Determine the current theme
            const isLightMode = body.classList.contains("light");

            if (isLightMode) {
                console.log("Passage au mode sombre");
                body.classList.remove("light");
                body.classList.add("dark"); // Adds a class for dark mode
                switchButton.classList.remove("switched");
            } else {
                console.log("Passage au mode clair");
                body.classList.remove("dark"); // Ensures the dark class is removed
                body.classList.add("light");
                switchButton.classList.add("switched");
            }
        };

        // Debounce function to limit the rate at which the toggleTheme can be called
        const debounce = (func, delay) => {
            return (...args) => {
                clearTimeout(debounceTimerRef.current);
                debounceTimerRef.current = setTimeout(() => func.apply(this, args), delay);
            };
        };

        // Add event listener for the button click with debounce
        switchButton.addEventListener("click", debounce(toggleTheme, 300)); // Adjust delay as needed
    };
    return (
        <div>

            <div id="cursor" className="cursor" ></div>
            <div id="cursor2" className="cursor" ></div>
            <div id="cursor3" className="cursor" ></div>


            <header className="cd-header">
                <div className="header-wrapper">
                    <div className="logo-wrap">
                        <a href="#" className="hover-target">   <img
                            src={logoImage}
                            alt="Your Logo"
                            style={{ width: '160px', height: 'auto' }} // Adjust styles as needed
                        /> </a>

                        <div id="switch" className="hover-target">
                            <div id="circle"> </div>
                            <div className='lD'>Dark/Light</div>
          

                        </div>

                    </div>

                    <div className="nav-but-wrap">
                        <div className="menu-icon hover-target">
                            <span className="menu-icon__line menu-icon__line-left"></span>
                            <span className="menu-icon__line"></span>
                            <span className="menu-icon__line menu-icon__line-right"></span>
                        </div>
                    </div>
                </div>
            </header>
            <div className="nav">
                <div className="nav__content">
                    <ul className="nav__list">
                        {
                            user && user.role === 'recruiter' ? (
                                <>

                                    <li className="nav__list-item"><Link to="/" className="hover-target">Home</Link></li>
                                    <li className="nav__list-item"><Link to="/admin/companies" className="hover-target">Companies</Link></li>
                                    <li className="nav__list-item"><Link to="/admin/jobs" className="hover-target">Jobs</Link></li>

                                </>
                            ) : (
                                <>
                                    <li className="nav__list-item"><Link to="/" className="hover-target">Home</Link></li>
                                    <li className="nav__list-item"><Link to="/jobs" className="hover-target">Jobs</Link></li>
                                    <li className="nav__list-item"><Link to="/browse" className="hover-target">Browse</Link></li>
                                </>
                            )
                        }

                        {
                            !user ? (
                                <>
                                    {/* Bouton Login */}
                                    <li className="nav__list-item">
                                        <Link to="/login" className="hover-target">Login</Link>
                                    </li>
                                    {/* Bouton Sign up */}
                                    <li className="nav__list-item">
                                        <Link to="/signup" className="hover-target">Sign up</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {/* Avatar remplaçant le bouton Login */}
                                    <li className="nav__list-item">
                                        <Link className="hover-target">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Avatar className="cursor-pointer">
                                                        <AvatarImage src={user?.profile?.profilPhoto} alt="User Avatar" />
                                                    </Avatar>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    align="end"
                                                    side="top"  // Positionne le popover juste au-dessus de l'avatar
                                                    className="popover__content"
                                                    style={{
                                                        // backgroundColor: 'black',  // Fond noir
                                                        // color: 'white',  // Texte en blanc
                                                        zIndex: 1000
                                                    }}
                                                >
                                                    <div className="popover__profile">
                                                        <div className="popover__profile-info" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <Avatar className="cursor-pointer">
                                                                <AvatarImage src={user?.profile?.profilPhoto} alt="User Avatar" />
                                                            </Avatar>
                                                            <div style={{ maxWidth: '180px', wordWrap: 'break-word' }}>
                                                                <h4 className="font-medium">{user?.fullname}</h4>
                                                                <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                                            </div>
                                                        </div>


                                                        <div className="popover__actions">
                                                            {
                                                                user.role === 'student' && (
                                                                    <div className=" flex w-fit items-center gap-2 cursor-pointer">
                                                                        <User2 />
                                                                        <Button variant="link" style={{ color: 'white' }}>
                                                                            <Link to="/profile">View Profile</Link>
                                                                        </Button>
                                                                    </div>
                                                                )
                                                            }
                                                            <div className="n flex w-fit items-center gap-2 cursor-pointer">
                                                                <LogOut />
                                                                <Button onClick={logoutHandler} variant="link" style={{ color: 'white' }}>Logout</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>













        </div>

    );
};

export default Navbar1;



