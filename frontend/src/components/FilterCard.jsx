import React, { useEffect, useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Tanger", "Marrakech", "Rabat", "Fes", "Kenitra"]
    },
    {
        filterType: "Department",
        array: [
            "Top management",
            "Middle management",
            "Frontline management",
        ]
    },
];

const FilterCard = () => {
    const [selectedValues, setSelectedValues] = useState({
        Location: [],
        Department: []
    });
    const dispatch = useDispatch();

    const handleCheckboxChange = (filterType, value) => {
        setSelectedValues(prev => {
            const currentValues = prev[filterType];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(item => item !== value)
                : [...currentValues, value];

            return {
                ...prev,
                [filterType]: newValues
            };
        });
    };

    useEffect(() => {
        // Combine all selected values into one array
        const allSelectedValues = [...selectedValues.Location, ...selectedValues.Department];
        dispatch(setSearchedQuery(allSelectedValues));
    }, [selectedValues]);

    return (
        <div className="w-full bg-transparent p-3 rounded-md shadow-lg">
            <h1 id="filter" className="font-bold text-lg text-[#7f99b5]">Filter Jobs</h1>
            
            <hr className="mt-3 border-t-2 border-[#7f99b5] w-full" />
            
            <div className="filter-grid mt-4">
                {filterData.map((data, index) => (
                    <div key={index} className="filter-section">
                        <h2 className="font-bold text-lg text-[#7f99b5] mb-2">
                            {data.filterType}
                        </h2>
                        <div className="space-y-2">
                            {data.array.map((item, idx) => {
                                const itemId = `${data.filterType}-${idx}`;
                                return (
                                    <div key={itemId} className="flex items-center space-x-2">
                                        <Checkbox 
                                            id={itemId}
                                            checked={selectedValues[data.filterType].includes(item)}
                                            onCheckedChange={(checked) => {
                                                handleCheckboxChange(data.filterType, item);
                                            }}
                                        />
                                        <Label 
                                            htmlFor={itemId}
                                            className="text-[#7f99b5] cursor-pointer"
                                        >
                                            {item}
                                        </Label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .filter-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }

                @media (max-width: 660px) {
                    .filter-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem;
                    }

                    #filter {
                        text-align: center;
                        padding-bottom: 20px;
                    }

                    hr {
                        display: block;
                        height: 1px;
                        margin-bottom: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default FilterCard;