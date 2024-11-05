import React, { useEffect, useRef } from 'react';
import './Navbar1.css';
import logoImage from '../../assets/Capture_d_écran_2024-10-15_144945-removebg-preview.png';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar1 = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
                document.body.classList.remove('nav-active'); // Close the nav menu
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const bodyRef = useRef(null);
    const menuRef = useRef(null);
    const debounceTimerRef = useRef(null); // Ref for debounce timer


    useEffect(() => {
        bodyRef.current = document.body;
        menuRef.current = document.querySelector('.menu-icon');

        const toggleNav = () => {
            bodyRef.current.classList.toggle('nav-active');
        };

        menuRef.current.addEventListener('click', toggleNav);

        const navItems = document.querySelectorAll('.nav__list-item');
        navItems.forEach((item) => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.popover-trigger')) {
                    bodyRef.current.classList.remove('nav-active');
                }
            });
        });

        initLightDarkSwitch();


        return () => {
            menuRef.current.removeEventListener('click', toggleNav);
            clearTimeout(debounceTimerRef.current); // Clear debounce timer on unmount

            navItems.forEach((item) => {
                item.removeEventListener('click', (e) => {
                    if (!e.target.closest('.popover-trigger')) {
                        bodyRef.current.classList.remove('nav-active');
                    }
                });
            });
        };
    }, []);

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
            <header className="cd-header">
                <div className="header-wrapper">
                    <div className="logo-wrap">
                        <Link to="/" className="hover-target">
                            <img id="THRLogo" src={logoImage} alt="Your Logo" />
                        </Link>
                        <div id="switch" className="hover-target">
                            <div id="circle"></div>
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
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li className="nav__list-item"><Link to="/" className="hover-target">Home</Link></li>
                                <li className="nav__list-item"><Link to="/admin/companies" className="hover-target">Company</Link></li>
                                <li className="nav__list-item"><Link to="/admin/jobs" className="hover-target">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li className="nav__list-item"><Link to="/" className="hover-target">Home</Link></li>
                                <li className="nav__list-item"><Link to="/jobs" className="hover-target">Jobs</Link></li>
                                <li className="nav__list-item"><Link to="/browse" className="hover-target">Browse</Link></li>
                            </>
                        )}

                        {!user ? (
                            <>
                                <li className="nav__list-item"><Link to="/login" className="hover-target">Login</Link></li>
                                <li className="nav__list-item"><Link to="/signup" className="hover-target">Sign up</Link></li>
                            </>
                        ) : (
                            <>
                                <li className="nav__list-item popover-trigger">
                                <Link className="hover-target">

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilPhoto} alt="User Avatar" />
                                            </Avatar>
                                        </PopoverTrigger>
                                        <PopoverContent align="end" side="top" className="popover__content">
                                            <div className="popover__profile">
                                                <div className="popover__profile-info">
                                                    <Avatar className="cursor-pointer">
                                                        <AvatarImage src={user?.profile?.profilPhoto} alt="User Avatar" />
                                                    </Avatar>
                                                    <div>
                                                        <h4>{user?.fullname}</h4>
                                                        <p>{user?.profile?.bio}</p>
                                                    </div>
                                                </div>
                                                <div className="popover__actions">
                                                    {user.role === 'student' && (
                                                        <div
                                                            className="flex items-center gap-2 cursor-pointer popover-action-item"
                                                            onClick={() => document.body.classList.remove('nav-active')}
                                                        >
                                                            <User2 />
                                                            <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                                        </div>
                                                    )}
                                                    <div
                                                        className="flex items-center gap-2 cursor-pointer popover-action-item"
                                                        onClick={logoutHandler}
                                                    >
                                                        <LogOut />
                                                        <Button variant="link">Logout</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    </Link>

                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar1;
