import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Navbar1 from './shared/Navbar1';
import Footer from './shared/Footer';
import './Home.css';
import { motion } from 'framer-motion';

const Browse = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true); // Indicateur de chargement
    const { allJobs } = useSelector(store => store.job);
    dispatch(setSearchedQuery(""));
    // Utiliser le hook pour récupérer les jobs
    useGetAllJobs();

    useEffect(() => {
        // Réinitialiser `searchedQuery` au montage de `Browse`
        dispatch(setSearchedQuery(""));

        // Vérifier si `allJobs` a bien des éléments une fois récupéré
        if (allJobs.length > 0) {
            setIsLoading(false); // Arrêter le chargement une fois les jobs disponibles
        }
    }, [allJobs, dispatch]);

    return (
        <div className='body'>
            <br />
            <br />
            <br />
            <br />
            <br />

            {/* Centered Phrase */}
            <div className="title">
                All jobs ({allJobs.length})<br />
            </div>

            <br />
            <br />
    

            <Navbar1 />

            <div className="max-w-7xl mx-auto my-10 px-4">
                <h1 className="font-bold text-xl my-10 text-[#7f99b5]"></h1>

                {isLoading ? (
                    <p className="text-center text-lg text-gray-500">Loading jobs...</p> // Loading indicator
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allJobs.length > 0 ? (
                            allJobs.map((job) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    key={job._id}
                                    className="w-full"
                                >
                                    <Job job={job} />
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-center w-full text-lg text-gray-500">No jobs found</p>
                        )}
                    </div>
                )}
            </div>


            <Footer />
        </div>
    );
}

export default Browse;
