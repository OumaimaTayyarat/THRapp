import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import Footer from '../shared/Footer'
import Navbar1 from '../shared/Navbar1'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);
    return (
        <div>
            <Navbar1 />
      
            <br />
        <br />
        <br />
        <br />
    
        {/* Centered Phrase */}
        <div className="title">
        Refine Your Search to <br /> <span>Discover  What You Seek.</span>
        </div>
  
        <br />
        <br />
        <br />

            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button className="border-[#edb526] text-[#edb526] hover:bg-[#edb526] hover:text-white" onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>
                <CompaniesTable />
            </div>
            <br />
            <br />
            
            <Footer />
        </div>
    )
}

export default Companies