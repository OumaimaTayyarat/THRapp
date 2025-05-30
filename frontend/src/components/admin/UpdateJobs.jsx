import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Navbar1 from '../shared/Navbar1';
import Footer from '../shared/Footer';
import './PostJob.css';
import useGetJobById from '@/hooks/useGetJobById';

const UpdateJobs = () => {
    const params = useParams();
    useGetJobById(params.id);
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);
const token = localStorage.getItem('token'); // Si vous utilisez localStorage pour stocker le token

    useEffect(() => {
        const combobox = document.querySelector('button[role="combobox"] > span');
        if (combobox) {
            combobox.style.color = '#7f99b5';
            combobox.style.fontSize = '0.875rem';
            combobox.style.fontWeight = '300';
        }
    }, []);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value.toLowerCase());
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const selectChangeHandler1 = (companyId) => {
        setInput((prevInput) => ({ ...prevInput, companyId })); // Exemple si vous utilisez useState pour gérer input
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, input, {
                headers: {
                    'Content-Type': 'application/json',
                     Authorization: `Bearer ${token}`, // Ajoute le token dans les en-têtes

                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs/");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar1 />
            <br /><br /><br /><br />

            <div className="flex items-center justify-center min-h-screen px-4 py-4">
    <div className="w-full max-w-lg mx-auto my-5">
        <form
            onSubmit={submitHandler}
            className="p-6 border border-gray-200 shadow-lg rounded-md "
            style={{ color: '#7f99b5' }}
        >
            {/* Header with Back Button */}
            <div className="flex items-center justify-between mb-5 gap-3">
                <Button
                    onClick={() => navigate("/admin/jobs")}
                    variant="outline"
                    className="flex items-center gap-2 font-semibold border-[#edb526] text-[#edb526] hover:bg-[#edb526] hover:text-white"
                >
                    <ArrowLeft />
                    <p>Back</p>
                </Button>
                <h1 className="font-bold text-lg text-center" style={{ color: '#7f99b5' }}>Job Setup</h1>
            </div>
            
            {/* Form fields */}
            <div className="grid grid-cols-1 gap-4"> {/* Single column layout on small devices */}
                <div>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        name="title"
                        value={input.title}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1"
                    />
                </div>
                <div>
                    <Label>Description</Label>
                    <Input
                        type="text"
                        name="description"
                        value={input.description}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1"
                    />
                </div>
                <div>
                    <Label>Requirements</Label>
                    <Input
                        type="text"
                        name="requirements"
                        value={input.requirements}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1"
                    />
                </div>
                <div>
                    <Label>Salary (k)</Label>
                    <Input
                        type="text"
                        name="salary"
                        value={input.salary}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1"
                    />
                </div>
                <div>
                    <Label>Location</Label>
                    <Input
                        type="text"
                        name="location"
                        value={input.location}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1"
                    />
                </div>
                <div>
                    <Label>Job Type</Label>
                    <Input
                        type="text"
                        name="jobType"
                        value={input.jobType}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1"
                    />
                </div>
                <div>
                    <Label>Experience Level (yrs)</Label>
                    <Input
                        type="text"
                        name="experience"
                        value={input.experience}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1"
                    />
                </div>
                <div>
                    <Label>No of Position</Label>
                    <Input
                        type="number"
                        name="position"
                        value={input.position}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1"
                    />
                </div>
                {/* Company Selection */}
                {companies.length > 0 && (
                    <div>
                        <Label>Company</Label>
                        <select
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 mt-1 bg-transparent border border-blue-300 rounded p-2 w-full"
                            onChange={(e) => selectChangeHandler1(e.target.value)}
                            value={input.companyId || ""}
                        >
                            <option value="" disabled>-- Select Company --</option>
                            {companies.map((company) => (
                                <option
                                    key={company._id}
                                    value={company._id}
                                >
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            
            {/* Submit Button */}
            {loading ? (
                <Button className="w-full my-4">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
            ) : (
                <Button
                    type="submit"
                    className="w-full my-4 border-[#edb526] text-[#edb526] hover:bg-[#edb526] hover:text-white"
                >
                    Update
                </Button>
            )}
            
            {/* Message if no companies */}
            {companies.length === 0 && (
                <p className="text-xs text-red-600 font-bold text-center my-3">
                    *Please register a company first, before posting a job
                </p>
            )}
        </form>
    </div>
</div>

            <br /><br />
            <Footer />
            <style jsx>{`
                @media (max-width: 660px) {
.py-4 {
    padding-top: 6rem !important;
    padding-bottom: 1rem;
}                }
            `}</style>
        </div>
    );
};

export default UpdateJobs;
