import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [isSaved, setIsSaved] = useState(singleJob?.savedBy?.includes(user?._id) || false);
    
    const jobId = job?._id;

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsSaved(res.data.job.savedBy.includes(user?._id));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const toggleSaveJobHandler = async () => {
        try {
            const res = await axios.post(`${JOB_API_END_POINT}/save/${jobId}`, {}, { withCredentials: true });
            if (res.data.success) {
                const updatedIsSaved = !isSaved;
                setIsSaved(updatedIsSaved);
                const updatedSingleJob = {
                    ...singleJob,
                    savedBy: updatedIsSaved
                        ? [...singleJob.savedBy, user?._id]
                        : singleJob.savedBy.filter(id => id !== user?._id)
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days
    };

    return (
        <div className='p-5 rounded-md shadow-xl bg-transparent border border-gray-300'>
        <div className='flex items-center justify-between'>
            <p className='text-sm text-[#7f99b5]'>
                {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
            </p>
        </div>
        <div className='flex items-center gap-2 my-2'>
            <Button className="p-6">
                <Avatar>
                    <AvatarImage src={job?.company?.logo} />
                </Avatar>
            </Button>
            <div>
                <h1 className='font-medium text-lg text-[#7f99b5]' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job?.company?.name}</h1>
                <p className='text-sm text-[#7f99b5]'>{job?.location}</p>
            </div>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2 text-[#7f99b5]' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job?.title}</h1>
            <p className='text-sm text-[#7f99b5]' style={{ overflow: 'hidden', whiteSpace: 'normal' }}>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-[#7f99b5] font-bold'} variant="ghost">{job?.position} Positions</Badge>
            <Badge className={'text-[#edb526] font-bold'} variant="ghost">{job?.jobType}</Badge>
            <Badge className={'text-[#7f99b5] font-bold'} variant="ghost">{job?.salary}k Dhs/mois</Badge>
        </div>
        <div className='flex items-center gap-4 mt-4'>
            <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className='text-[#7f99b5]'>
                Details
            </Button>
            <Button
                onClick={toggleSaveJobHandler}
                className={`rounded-lg ${isSaved ? 'bg-green-600 text-white' : 'bg-[#edb526] text-white'}`}>
                {isSaved ? 'Saved' : 'Save for Later'}
            </Button>
        </div>
    </div>
    
    );
};

export default Job;
