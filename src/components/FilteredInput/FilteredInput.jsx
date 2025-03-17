import React from 'react'
import { CiSearch } from "react-icons/ci";

const FilteredInput = () => {
    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-4  items-center justify-between">
                {/* Search Input with Icon */}
                <div className="flex flex-grow items-center w-3/4 relative">
                    <CiSearch className="text-gray-500 text-xl absolute left-3" />
                    <input
                        type="text"
                        placeholder="Search cars"
                        className="flex-grow p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Type Select */}
                <select
                    name="type"
                    className="p-2 border border-gray-300 w-3/4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Types</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Ford">Ford</option>
                    <option value="Tesla">Tesla</option>
                    <option value="BYD">BYD</option>
                </select>

                {/* Availability Select */}
                <select
                    name="availability"
                    className="p-2 border border-gray-300 w-3/4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                </select>
            </div>
        </div>
    )
}

export default FilteredInput