import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import Navbar1 from '../shared/Navbar1'
import Footer from '../shared/Footer'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        // Vérifier si le fichier est absent et afficher un toast d'erreur
        if (!input.file) {
            toast.error("Please upload a profile photo.");
            return;  // Empêcher la soumission si le fichier n'est pas présent
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        formData.append("file", input.file);

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <Navbar1 />
            <br />
            <br />
            <br />
            <br />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-2'>
                <form onSubmit={submitHandler} className='w-full sm:w-3/4 md:w-1/2 lg:w-1/2.5 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-lg sm:text-xl mb-5' style={{ color: '#7f99b5' }}>Sign Up</h1>

                    <div className='my-2'>
                        <Label style={{ color: '#7f99b5' }}>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="patel"
                            className="w-full"
                        />
                    </div>

                    <div className='my-2'>
                        <Label style={{ color: '#7f99b5' }}>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
                            className="w-full"
                        />
                    </div>

                    <div className='my-2'>
                        <Label style={{ color: '#7f99b5' }}>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                            className="w-full"
                        />
                    </div>

                    <div className='my-2'>
                        <Label style={{ color: '#7f99b5' }}>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="***********"
                            className="w-full"
                        />
                    </div>

                    <div className='flex flex-wrap items-center justify-between '>

                        <div className="flex flex-col items-start gap-2 mt-4 sm:mt-0 w-full">
                            <Label className="text-[#7f99b5]">Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer w-full" // Prend toute la largeur
                                aria-label="Choose a file"
                            />
                        </div>

                        <RadioGroup className="flex items-center gap-4 pt-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer small-checkbox"
                                />
                                <Label htmlFor="r1" style={{ color: '#7f99b5' }}>Candidate</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer small-checkbox"
                                />
                                <Label htmlFor="r2" style={{ color: '#7f99b5' }}>Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <br />

                    </div>

                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 border-[#edb526] text-[#edb526] hover:bg-[#edb526] hover:text-white">
                            Signup
                        </Button>
                    )}

                    <p className='text-sm' style={{ color: '#7f99b5' }}>
                        Already have an account? <Link to="/login" className='text-blue-600'>Login</Link>
                    </p>
                </form>
            </div>
            <Footer />
            <style jsx>{`
                .small-checkbox {
            width: 16px !important;
            height: 16px !important;
          }
    @media (max-width: 660px) {
  .form-container {
    width: 90%; /* Formulaire prend presque toute la largeur */
    padding: 1rem; /* Réduit le padding */
  }

  .input-field {
    width: 100%; /* Champs prennent toute la largeur */
  }

  .button {
    font-size: 0.875rem; /* Réduit la taille de la police du bouton */
  }
    form{
    margin-top: 7rem !important;
    margin-bottom: 6rem !important;
}
   .small-checkbox {
            width: 10px !important;
            height: 10px !important;
          }
    }
    
`}</style>
        </div>
    );
}

export default Signup;
