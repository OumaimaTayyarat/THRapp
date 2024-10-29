import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import Navbar1 from '../shared/Navbar1'
import Footer from '../shared/Footer'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        ice:"",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        formData.append("ice", input.ice);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            console.log(res)

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || ""
        })
    }, [singleCompany]);

    return (
        <div>
            <Navbar1 />
            <br />
            <br />
            <br />
            <br />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler} className="border border-gray-300 shadow-md p-8 rounded-md">
                    <div className='flex items-center justify-center gap-5 mb-5'>
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 font-semibold border-[#edb526] text-[#edb526] hover:bg-[#edb526] hover:text-white ">
                            <ArrowLeft />
                            <p >Back</p>
                        </Button>
                        <h1 className='font-bold text-xl' style={{ color: '#7f99b5' }}>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label style={{ color: '#7f99b5' }}>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                style={{ color: '#7f99b5' }} // Change input text color
                            />
                        </div>
                        <div>
                            <Label style={{ color: '#7f99b5' }}>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                style={{ color: '#7f99b5' }} // Change input text color
                            />
                        </div>
                        <div>
                            <Label style={{ color: '#7f99b5' }}>ICE</Label>
                            <Input
                                    type="text"
                                    name="ice"
                                    value={input.ice}
                                    onChange={changeEventHandler}
                                    style={{ color: '#7f99b5' }} // Change input text color
                            />
                        </div>
                        <div>
                            <Label style={{ color: '#7f99b5' }}>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                style={{ color: '#7f99b5' }} // Change input text color
                            />
                        </div>
                        <div>
                            <Label style={{ color: '#7f99b5' }}>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                style={{ color: '#7f99b5' }} // Change input text color
                            />
                        </div>
                        <div>
                            <Label style={{ color: '#7f99b5' }}>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {
                        loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 border-[#edb526] text-[#edb526] hover:bg-[#edb526] hover:text-white border-[#edb526] text-[#edb526] hover:bg-[#edb526] hover:text-white ">Update</Button>
                        )
                    }
                </form>
            </div>
            <Footer />

        </div>
    )
}

export default CompanySetup