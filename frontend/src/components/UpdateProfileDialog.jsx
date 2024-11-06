import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || "",
        profilPhoto: user?.profile?.profilPhoto || "" // Profile photo file

    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];

        const name = e.target.name;
        setInput({ ...input, [name]: file });
        console.log("name", name,file)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.resume) {
            formData.append("resume", input.resume);
            console.log(input.resume)
            
        }
        if (input.profilPhoto) { // Assuming you've added a state for the profile picture
            formData.append("profilPhoto", input.profilPhoto);
            console.log("yeey")
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                     'Authorization': `Bearer ${token}` // Inclure le jeton ici

                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        setOpen(false);
        console.log("update", user?.profile)

    }



    return (

        <div className='body'>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent 
                className="w-[95%] max-w-[425px] p-4 sm:p-6" 
                onInteractOutside={() => setOpen(false)}
            >
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl text-center sm:text-left">
                        Update Profile
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-2 sm:py-4'>
                        {/* Form Fields */}
                        {[
                            { id: 'name', label: 'Name', type: 'text', value: input.fullname },
                            { id: 'email', label: 'Email', type: 'email', value: input.email },
                            { id: 'number', label: 'Number', type: 'text', value: input.phoneNumber },
                            { id: 'bio', label: 'Bio', type: 'text', value: input.bio },
                            { id: 'skills', label: 'Skills', type: 'text', value: input.skills },
                            { 
                                id: 'resume', 
                                label: 'Resume', 
                                type: 'file', 
                                accept: 'application/pdf',
                                handler: fileChangeHandler 
                            },
                            { 
                                id: 'profilPhoto', 
                                label: 'Profile', 
                                type: 'file', 
                                accept: 'image/*',
                                handler: fileChangeHandler 
                            }
                        ].map((field) => (
                            <div 
                                key={field.id}
                                className='grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-start sm:items-center'
                            >
                                <Label 
                                    htmlFor={field.id} 
                                    className="text-left sm:text-right text-sm sm:text-base"
                                >
                                    {field.label}
                                </Label>
                                <Input
                                    id={field.id}
                                    name={field.id}
                                    type={field.type}
                                    accept={field.accept}
                                    value={field.value}
                                    onChange={field.handler || changeEventHandler}
                                    className="col-span-1 sm:col-span-3 h-9 sm:h-10 text-sm sm:text-base"
                                />
                            </div>
                        ))}
                    </div>

                    <DialogFooter className="mt-4 sm:mt-6">
                        {loading ? (
                            <Button disabled className="w-full">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full">
                                Update
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
    )
}

export default UpdateProfileDialog
