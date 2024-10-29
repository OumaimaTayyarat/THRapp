import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import Navbar1 from '../shared/Navbar1';
import Footer from '../shared/Footer';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);
    return (
        <div className='body'>
                <br />

<br />
<br />
<br />
<br />
<br />

{/* Centered Phrase */}
<div className="title">
Applicants {applicants?.applications?.length}<br />
</div>

<br />
<br />
<br />
<br />

<Navbar1/>
            <div className='max-w-7xl mx-auto'>
                <ApplicantsTable />
            </div>
            <br />
            <br />
            <Footer/>
        </div>
    )
}

export default Applicants