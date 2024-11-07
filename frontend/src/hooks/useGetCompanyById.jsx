import { setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');  // Retrieve token from localStorage

    useEffect(()=>{
        const fetchSingleCompany = async () => {
            try {
const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
  headers: {
    Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
  },
  withCredentials: true,
});                console.log(res.data.company);
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany();
    },[companyId, dispatch])
}

export default useGetCompanyById
