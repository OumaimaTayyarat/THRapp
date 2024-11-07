import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import Navbar1 from '../shared/Navbar1'
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
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"

        },
        withCredentials: true,

      })
 if (res.data.success) {
      const token = res.data.token;
      if (token) {
        localStorage.setItem('token', token);  // Set token in localStorage
        console.log('Token saved:', localStorage.getItem('token'));  // Verify token is saved
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      } else {
        console.error('Token is missing in the response.');
        toast.error('Login failed. Token not found.');
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)

    } finally {
      dispatch(setLoading(false))

    }

  }
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
  )
}

export default Login
