
import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import Footer from '../shared/Footer'
import Navbar1 from '../shared/Navbar1'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Si vous utilisez localStorage pour stocker le token
    console.log(token);
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json',
                     Authorization: `Bearer ${token}`, // Ajoute le token dans les en-têtes

                },
                withCredentials: true
            });
            console.log(res)
            console.log(res?.data?.success)

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));

                toast.success(res.data.message);

                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)

        }
    }
    return (
        <div className='body'>
            <Navbar1 />

            <br />
            <br />
            <br />
            <br />

            {/* Centered Phrase */}
            <div className="title">
            Register your company<br />   <span>on THR</span><br />

            </div>

            <br />
            <br />
            <br />
            <div className='max-w-4xl mx-auto' style={{ color: '#7f99b5' }}>
    <div className='my-10'></div>

    <Label style={{ color: '#7f99b5' }}>Company Name</Label>
    <Input
        type="text"
        className="my-2 text-[#7f99b5]" // Apply color to input text
        placeholder="JobHunt, Microsoft etc."
        onChange={(e) => setCompanyName(e.target.value)}
    />

    <div className='flex items-center gap-2 my-10'>
        <Button variant="outline" onClick={() => navigate("/admin/companies")} style={{ color: '#7f99b5' }}>Cancel</Button>
        <Button onClick={registerNewCompany} className="border-[#edb526] text-[#edb526] hover:bg-[#edb526] hover:text-white">Continue</Button>
    </div>
</div>

            <br />
            <br />
            <Footer />
        </div>
    )
}

export default CompanyCreate
