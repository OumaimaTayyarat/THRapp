import { setCompanies} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const token = localStorage.getItem('token'); // Si vous utilisez localStorage pour stocker le token
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
  headers: {
    Authorization: `Bearer ${token}`,  // Include token in Authorization header
  },
  withCredentials: true,
});                console.log('called');
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies
