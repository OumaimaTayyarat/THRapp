import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    const handleDelete = async (jobId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (confirmDelete) {
            try {
                const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
                    withCredentials: true
                });
    
                if (res.data.success) {
                    toast.success(res.data.message);
                    // Update the job list after deletion
                    setFilterJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred while deleting the job.");
            }
        }
    };
    
    useEffect(() => { 
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div>
            <Table>
                <TableCaption style={{ color: '#7f99b5' }}>A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead style={{ color: '#7f99b5' }}>Company Name</TableHead>
                        <TableHead style={{ color: '#7f99b5' }}>Role</TableHead>
                        <TableHead style={{ color: '#7f99b5' }}>Date</TableHead>
                        <TableHead className="text-right" style={{ color: '#7f99b5' }}>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <TableRow key={job._id}>  {/* Adding a unique key for each row */}
                                <TableCell style={{ color: '#7f99b5' }}>{job?.company?.name}</TableCell>
                                <TableCell style={{ color: '#7f99b5' }}>{job?.title}</TableCell>
                                <TableCell style={{ color: '#7f99b5' }}>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer" style={{ color: '#7f99b5' }}>
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/jobs/update/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <p>Edit</p>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4' />
                                                <p>Applicants</p>
                                            </div>
                                            <div onClick={() => handleDelete(job._id)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Trash2 className='w-4' />
                                                <p>Delete</p>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default AdminJobsTable;
