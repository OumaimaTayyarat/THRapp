import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Navbar1 from './shared/Navbar1';
import Footer from './shared/Footer';
import "./Home.css"

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])
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
                Search Results ({allJobs.length})<br />
            </div>

            <br />
            <br />
            <br />
            <br />

            <Navbar1 />

            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'></h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    }
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Browse