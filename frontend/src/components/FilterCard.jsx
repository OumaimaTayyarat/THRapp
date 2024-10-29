import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Tanger", "Marrakech", "Rabat", "Fes", "Kenitra"]
    },
    {
        fitlerType: "Industry",
        array:  [
            "Front-Office",
            "Middle-Office",
            "Support-Office",
            "Specialty-Offices",
            "Back-Office"
        ]
    },
 
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
        <div className='w-full bg-transparent p-3 rounded-md shadow-lg'>
        <h1 className='font-bold text-lg text-[#7f99b5]'>Filter Jobs</h1>
        <hr className='mt-3 border-[#7f99b5]' />
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {
                fitlerData.map((data, index) => (
                    <div key={index}>
                        <h1 className='font-bold text-lg text-[#7f99b5]'>{data.fitlerType}</h1>
                        {
                            data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`;
                                return (
                                    <div className='flex items-center space-x-2 my-2' key={itemId}>
                                        <RadioGroupItem value={item} id={itemId} />
                                        <Label htmlFor={itemId} className='text-[#7f99b5]'>{item}</Label>
                                    </div>
                                );
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
    
    )
}

export default FilterCard