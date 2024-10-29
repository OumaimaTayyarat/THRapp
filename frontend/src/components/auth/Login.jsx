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
                dispatch(setUser(res.data.user))
                navigate("/")
                toast.success(res.data.message)
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

            <div className='flex items-center justify-center max-w-7xl mx-auto'>
  <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
    <h1 className='font-bold text-xl mb-5' style={{ color: '#7f99b5' }}>Sign up</h1>

    <div className='my-2'>
      <Label style={{ color: '#7f99b5' }}>Email</Label>
      <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="expl@gmail.com" />
    </div>

    <div className='my-2'>
      <Label style={{ color: '#7f99b5' }}>Password</Label>
      <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="" />
    </div>
    
    <div className='flex items-center justify-between'>
      <RadioGroup className="flex items-center gap-4 my-5">
        <div className="flex items-center space-x-2">
          <Input
            type="radio"
            name="role"
            value="student"
            checked={input.role == "student"}
            onChange={changeEventHandler}
            className="cursor-pointer" />
          <Label htmlFor="r1" style={{ color: '#7f99b5' }}>Candidate</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="radio"
            name="role"
            checked={input.role == "recruiter"}
            onChange={changeEventHandler}
            value="recruiter"
            className="cursor-pointer" />
          <Label htmlFor="r2" style={{ color: '#7f99b5' }}>Recruiter</Label>
        </div>
      </RadioGroup>
    </div>

    {
      loading ? (
        <Button className='w-full my-4'>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait
        </Button>
      ) : (
        <Button type="submit" className="w-full my-4 border-[#edb526] text-[#edb526] hover:bg-[#edb526] hover:text-white">Login</Button>
      )
    }

    <p className='text-sm' style={{ color: '#7f99b5' }}> Don't have an account? <Link to="/signup" className='text-blue-600'>Sign up</Link></p>
  </form>
</div>

            <Footer/>
        </div>
    )
}

export default Login