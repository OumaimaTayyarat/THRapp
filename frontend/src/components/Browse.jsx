import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Navbar1 from './shared/Navbar1';
import Footer from './shared/Footer';
import './Home.css';

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
                Search Results ({allJobs.length})<br />
            </div>

            <br />
            <br />
            <br />
            <br />

            <Navbar1 />

            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'></h1>
                
                {isLoading ? (
                    <p>Loading jobs...</p>  // Indicateur de chargement
                ) : (
                    <div className='grid grid-cols-3 gap-4'>
                        {allJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default Browse;
