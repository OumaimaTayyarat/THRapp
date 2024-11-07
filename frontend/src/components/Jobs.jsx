import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Navbar1 from './shared/Navbar1';
import Footer from './shared/Footer';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    const safeIncludes = (jobField, query) => {
        return (jobField || '').toLowerCase().includes(query.toLowerCase());
    };
    
    useEffect(() => {
        if (searchedQuery && searchedQuery.length > 0) {
            const filteredJobs = allJobs.filter((job) => {
                // Check if the job matches any of the selected filters
                return searchedQuery.some(query => 
                    safeIncludes(job.jobType, query) ||
                    safeIncludes(job.description, query) ||
                    safeIncludes(job.location, query) ||
                    safeIncludes(job.department, query)
                );
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='body'>
            <br />
            <br />
            <br />
            <br />
            <br />

            {/* Centered Phrase */}
            <div id='refine' className="title">
                Refine Your Search to <br /> <span>Discover What You Seek.</span>
            </div>

            <br />
            <br />

            <Navbar1 />
            <div className='max-w-7xl mx-auto mt-5 px-4'>
                <div className='flex flex-col lg:flex-row gap-5'>
                    {/* Sidebar with FilterCard */}
                    <div className='w-full lg:w-1/4'>
                        <FilterCard />
                    </div>

                    {/* Main Content Area */}
                    {filterJobs.length <= 0 ? (
                        <span className='text-center w-full text-lg text-gray-500'>Job not found</span>
                    ) : (
                        <div className='flex-1 pb-5'>
                            {/* Responsive grid for job cards */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                        className="w-full"
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
            
            <style jsx>{`
                @media (max-width: 660px) {
                    #refine {
                        margin-top: 7rem !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default Jobs;
