import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Navbar1 from './shared/Navbar1'
import Footer from './shared/Footer'
import Job from './Job'
import useGetAllJobs from '@/hooks/useGetAllJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    return (
        <div className='body'>
            <Navbar1 />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className='max-w-4xl mx-auto border border-gray-200 rounded-2xl my-5 p-8 shadow-lg bg-transparent'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-auto w-24">
                            <AvatarImage src={user?.profile?.profilPhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl' style={{ color: '#7f99b5' }}>{user?.fullname}</h1>
                            <p style={{ color: '#7f99b5' }}>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <p style={{ color: '#7f99b5' }}>{user?.email}</p>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <p style={{ color: '#7f99b5' }}>{user?.phoneNumber}</p>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 style={{ color: '#7f99b5' }}>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <p style={{ color: '#7f99b5' }}>NA</p>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold" style={{ color: '#7f99b5' }}>Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <p style={{ color: '#7f99b5' }}>NA</p>
                    }
                </div>
            </div>

            <div className='max-w-4xl mx-auto rounded-2xl my-5 shadow-lg bg-transparent'>
                <h1 className='font-bold text-lg my-5' style={{ color: '#7f99b5' }}>Applied Jobs</h1>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </div>
            <div className='max-w-4xl mx-auto rounded-2xl my-5 shadow-lg bg-transparent'>

            <h1 className='font-bold text-lg my-5' style={{ color: '#7f99b5' }}>Saved Jobs</h1>

            <div className='max-w-7xl mx-auto my-10'>
   
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs
                            .filter(job => job.savedBy.includes(user?._id)) // Filter for saved jobs
                            .map((job) => (
                                <Job key={job._id} job={job} />
                            ))
                    }
                </div>
            </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
            <br />
            <br />

            <Footer />
        </div>


    )
}

export default Profile