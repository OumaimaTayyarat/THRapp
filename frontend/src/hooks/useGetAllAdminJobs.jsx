import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const token = localStorage.getItem('token'); // Si vous utilisez localStorage pour stocker le token
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
  headers: {
    Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
  },
  withCredentials: true,
});                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs
