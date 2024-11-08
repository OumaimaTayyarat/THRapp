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
        <div className="min-h-screen">
      
            <Navbar1 />
            <br />
            <br />
            <br />
            <br />
            
     

        <main className="px-4 py-20 max-w-7xl mx-auto">
            {/* Profile Card */}
            <div className="border border-gray-200 rounded-2xl p-4 md:p-8 shadow-lg bg-transparent mb-8">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Avatar className="h-20 w-20 md:h-24 md:w-24">
                            <AvatarImage src={user?.profile?.profilPhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className="font-medium text-lg md:text-xl" style={{ color: '#7f99b5' }}>
                                {user?.fullname}
                            </h1>
                            <p className="text-sm md:text-base" style={{ color: '#7f99b5' }}>
                                {user?.profile?.bio}
                            </p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline" className="self-start">
                        <Pen className="w-4 h-4" />
                    </Button>
                </div>

                {/* Contact Info */}
                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail className="w-4 h-4" />
                        <p className="text-sm md:text-base break-all" style={{ color: '#7f99b5' }}>
                            {user?.email}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact className="w-4 h-4" />
                        <p className="text-sm md:text-base" style={{ color: '#7f99b5' }}>
                            {user?.phoneNumber}
                        </p>
                    </div>
                </div>

                {/* Establishment */}
                <div className="my-5">
                    <h1 className="text-sm md:text-base mb-2" style={{ color: '#7f99b5' }}>
                        Establishment
                    </h1>
                    <div className="flex flex-wrap items-center gap-2">
                        {user?.profile?.Establishment.length !== 0 ? (
                            user?.profile?.Establishment.map((item, index) => (
                                <Badge key={index} className="text-xs md:text-sm">
                                    {item}
                                </Badge>
                            ))
                        ) : (
                            <p style={{ color: '#7f99b5' }}>NA</p>
                        )}
                    </div>
                </div>

                {/* Resume */}
                <div className="w-full">
                    <Label className="text-sm md:text-md font-bold" style={{ color: '#7f99b5' }}>
                        Resume
                    </Label>
                    {isResume ? (
                        <a
                            target="blank"
                            href={user?.profile?.resume}
                            className="text-blue-500 text-sm md:text-base hover:underline cursor-pointer break-all"
                        >
                            {user?.profile?.resumeOriginalName}
                        </a>
                    ) : (
                        <p style={{ color: '#7f99b5' }}>NA</p>
                    )}
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="rounded-2xl mb-8 shadow-lg bg-transparent">
                <h1 className="font-bold text-base md:text-lg mb-5" style={{ color: '#7f99b5' }}>
                    Applied Jobs
                </h1>
                <AppliedJobTable />
            </div>

            {/* Saved Jobs Section */}
            <div className="rounded-2xl mb-8 shadow-lg bg-transparent">
                <h1 className="font-bold text-base md:text-lg mb-5" style={{ color: '#7f99b5' }}>
                    Saved Jobs
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allJobs
                        .filter(job => job.savedBy.includes(user?._id))
                        .map(job => (
                            <Job key={job._id} job={job} />
                        ))}
                </div>
            </div>
        </main>

        <UpdateProfileDialog open={open} setOpen={setOpen} />
        <Footer />
    </div>
    </div>

    )
}

export default Profile
