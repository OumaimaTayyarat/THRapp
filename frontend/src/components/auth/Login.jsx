import React, { useState } from 'react'
import Navbar1 from '../shared/Navbar1'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import Footer from '../shared/Footer'

const Login = () => {
  const { loading } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      // Check if the response indicates success
      if (res.data.success) {
        const token = res.data.token;
        if (token) {
          // Save token in localStorage
          localStorage.setItem('token', token);
          console.log('Token saved:', localStorage.getItem('token'));  // Verify token is saved
          dispatch(setUser(res.data.user));  // Update the user in Redux store
          navigate('/');  // Navigate to home page or wherever you want
          toast.success(res.data.message);  // Show success message
        } else {
          console.error('Token is missing in the response.');
          toast.error('Login failed. Token not found.');
        }
      } else {
        console.error('Login failed:', res.data.message);
        toast.error(res.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(error.response?.data?.message || 'An error occurred during login');
    } finally {
      dispatch(setLoading(false));  // Stop loading spinner
    }
  };

  return (
    <div>
      <Navbar1 />
      <br />
      <br />
      <br />
      <br />

      <div className='flex items-center justify-center max-w-7xl mx-auto px-2'>
        <form onSubmit={submitHandler} className='w-full sm:w-3/4 md:w-1/2 lg:w-1/3 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-lg sm:text-xl mb-5' style={{ color: '#7f99b5' }}>Login</h1>

          <div className='my-2'>
            <Label style={{ color: '#7f99b5' }}>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="expl@gmail.com"
              className="w-full" // Occupies full width
            />
          </div>

          <div className='my-2'>
            <Label style={{ color: '#7f99b5' }}>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
              className="w-full" // Occupies full width
            />
          </div>

          <div className='flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
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
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer small-checkbox"
                />
                <Label htmlFor="r2" style={{ color: '#7f99b5' }}>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className='w-full my-4'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 border-[#edb526] text-[#edb526] hover:bg-[#edb526] hover:text-white">Login</Button>
          )}

          <p className='text-sm' style={{ color: '#7f99b5' }}>
            Don't have an account? <Link to="/signup" className='text-blue-600'>Sign up</Link>
          </p>
        </form>
      </div>

      <style jsx>{`
        .small-checkbox {
          width: 16px !important;
          height: 16px !important;
        }

        @media (max-width: 660px) {
          form {
            margin-top: 7rem !important;
            margin-bottom: 7rem !important;
          }

          .small-checkbox {
            width: 10px !important;
            height: 10px !important;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
}

export default Login;
