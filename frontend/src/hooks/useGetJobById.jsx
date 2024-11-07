import { setSingleJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetJobById = (jobId) => {
    const dispatch = useDispatch();
const token = localStorage.getItem('token');  // Retrieve the token from localStorage

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
  headers: {
    Authorization: `Bearer ${token}`,  // Add the token in the Authorization header
  },
  withCredentials: true,  // Include cookies if needed
});                console.log(res.data.job);
                
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));  // Dispatch job to Redux store
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch]);
};

export default useGetJobById;
