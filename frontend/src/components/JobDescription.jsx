import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Navbar1 from './shared/Navbar1';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const token = localStorage.getItem('token'); // Récupère le token stocké dans localStorage

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
const res = await axios.get(
    `${APPLICATION_API_END_POINT}/apply/${jobId}`, 
    {
        headers: {
            Authorization: `Bearer ${token}`, // Ajoute le token ici
        },
        withCredentials: true // Inclut les cookies si nécessaire pour l'authentification
    }
);            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='body'>
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="title">
                Offre <span>Details</span>
            </div>

            <br />
            <br />

            <Navbar1 />

            <div className='max-w-7xl mx-auto my-10 px-4'>
                {/* Header Section */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0'>
                    <div className='w-full sm:w-auto'>
                        <h1 className='font-bold text-xl mb-4 sm:mb-0'>{singleJob?.title}</h1>
                        <div className='flex flex-wrap items-center gap-2 mt-4'>
                            <Badge className='text-[#7f99b5] font-bold' variant="ghost">
                                {singleJob?.position} Positions
                            </Badge>
                            <Badge className='text-[#edb526] font-bold' variant="ghost">
                                {singleJob?.jobType}
                            </Badge>
                            <Badge className='text-[#7f99b5] font-bold' variant="ghost">
                                {singleJob?.salary} k Dhs/mois
                            </Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`w-full sm:w-auto rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'border-[#edb526] text-[#edb526] hover:bg-[#edb526] hover:text-white'}`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                {/* Details Section */}
                <div className='mt-8'>
                    <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
                    <div className='my-4 space-y-4'>
                        <DetailItem label="Role" value={singleJob?.title} />
                        <DetailItem label="Location" value={singleJob?.location} />
                        <DetailItem label="Description" value={singleJob?.description} />
                        <DetailItem label="Experience" value={`${singleJob?.experience} yrs`} />
                        <DetailItem label="Salary" value={`${singleJob?.salary} k Dhs/mois`} />
                        <DetailItem label="Total Applicants" value={singleJob?.applications?.length} />
                        <DetailItem label="Posted Date" value={singleJob?.createdAt?.split("T")[0]} />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 640px) {
                    .title {
                        font-size: 1.5rem;
                        text-align: center;
                        margin-bottom: 1rem;
                    }
                }
            `}</style>
        </div>
    )
}

// Composant réutilisable pour les éléments de détail
const DetailItem = ({ label, value }) => (
    <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0'>
        <h1 className='font-bold min-w-[120px]'>{label}:</h1>
        <span className='text-[#7f99b5] text-sm font-medium pl-0 sm:pl-4'>{value}</span>
    </div>
)

export default JobDescription;
