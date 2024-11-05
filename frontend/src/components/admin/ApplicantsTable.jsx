import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Card, CardContent } from '../ui/card';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    // Composant pour l'affichage mobile
    const MobileCard = ({ item }) => (
        <Card className="mb-4 ">
            <CardContent className="p-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                        <h3 className="font-medium text-lg text-[#7f99b5]">{item?.applicant?.fullname}</h3>
                        <div className="space-y-1 text-sm">
                            <p className="text-[#7f99b5]">
                                <span className="font-medium">Email:</span> {item?.applicant?.email}
                            </p>
                            <p className="text-[#7f99b5]">
                                <span className="font-medium">Contact:</span> {item?.applicant?.phoneNumber}
                            </p>
                            <p className="text-[#7f99b5]">
                                <span className="font-medium">Resume:</span>{' '}
                                {item.applicant?.profile?.resume ? (
                                    <a 
                                        className="text-blue-600 cursor-pointer" 
                                        href={item?.applicant?.profile?.resume}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    'NA'
                                )}
                            </p>
                            <p className="text-[#7f99b5]">
                                <span className="font-medium">Date:</span> {item?.applicant.createdAt.split("T")[0]}
                            </p>
                        </div>
                    </div>
                    <div>
                        <Popover>
                            <PopoverTrigger>
                                <MoreHorizontal className="text-gray-500 h-6 w-6" />
                            </PopoverTrigger>
                            <PopoverContent className="w-32">
                                {shortlistingStatus.map((status, index) => (
                                    <div 
                                        key={index} 
                                        onClick={() => statusHandler(status, item?._id)}
                                        className="flex w-full items-center px-2 py-1.5 hover:bg-gray-100 rounded cursor-pointer"
                                    >
                                        <p>{status}</p>
                                    </div>
                                ))}
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div>
            {/* Vue Mobile */}
            <div className="block md:hidden">
                <h2 className="text-xl font-semibold mb-4 text-[#7f99b5]">Recent Applications</h2>
                <div className="space-y-4">
                    {applicants?.applications?.map((item) => (
                        <MobileCard key={item._id} item={item} />
                    ))}
                </div>
            </div>

            {/* Vue Tablette/Desktop */}
            <div className="hidden md:block">
                <div className="overflow-x-auto">
                    <Table style={{ color: '#7f99b5' }}>
                        <TableCaption>A list of your recent applied users</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-semibold">FullName</TableHead>
                                <TableHead className="font-semibold">Email</TableHead>
                                <TableHead className="font-semibold">Contact</TableHead>
                                <TableHead className="font-semibold">Resume</TableHead>
                                <TableHead className="font-semibold">Date</TableHead>
                                <TableHead className="text-right font-semibold">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applicants?.applications?.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item?.applicant?.fullname}</TableCell>
                                    <TableCell>{item?.applicant?.email}</TableCell>
                                    <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                    <TableCell>
                                        {item.applicant?.profile?.resume ? (
                                            <a 
                                                className="text-[#7f99b5] cursor-pointer" 
                                                href={item?.applicant?.profile?.resume}
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                {item?.applicant?.profile?.resumeOriginalName}
                                            </a>
                                        ) : (
                                            <p>NA</p>
                                        )}
                                    </TableCell>
                                    <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal className="ml-auto" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                {shortlistingStatus.map((status, index) => (
                                                    <div 
                                                        key={index}
                                                        onClick={() => statusHandler(status, item?._id)}
                                                        className="flex w-full items-center px-2 py-1.5 hover:bg-gray-100 rounded cursor-pointer"
                                                    >
                                                        <p>{status}</p>
                                                    </div>
                                                ))}
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ApplicantsTable;