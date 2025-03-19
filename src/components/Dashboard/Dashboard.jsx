import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../Layout';

// Debounce function to optimize search performance
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

const Dashboard = () => {
    // Sample car data (you can replace this with dynamic data from an API)
    const initialCars = [
        {
            id: 1,
            name: 'Tesla Model S',
            year: 2023,
            image: 'https://i.pinimg.com/736x/c8/63/4b/c8634bf3a3c5396941ebb7cd37ca46c8.jpg',
            available: true,
            type: 'Luxury',
            fuelType: 'Electric',
            transmission: 'Automatic',
        },
        {
            id: 2,
            name: 'BMW M5',
            year: 2023,
            image: 'https://i.pinimg.com/736x/5b/cd/d6/5bcdd6816bfeb80f1de8d0fc50f7fec7.jpg',
            available: true,
            type: 'Sports',
            fuelType: 'Petrol',
            transmission: 'Automatic',
        },
        {
            id: 3,
            name: 'Mercedes GLE',
            year: 2023,
            image: 'https://i.pinimg.com/736x/22/fb/78/22fb7858f90a79c917a4a2efae786ce1.jpg',
            available: false,
            type: 'SUV',
            fuelType: 'Diesel',
            transmission: 'Automatic',
        },
        {
            id: 4,
            name: 'Porsche 911',
            year: 2022,
            image: 'https://i.pinimg.com/736x/8d/81/14/8d8114ddbcb7a28080b420a07a6247ed.jpg',
            available: true,
            type: 'Sports',
            fuelType: 'Petrol',
            transmission: 'Manual',
        },
    ];

    // State for filtered cars, filter options, and sort option
    const [cars, setCars] = useState(initialCars);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [availabilityFilter, setAvailabilityFilter] = useState('All');
    const [sortOption, setSortOption] = useState('name-asc');
    const [isLoading, setIsLoading] = useState(false);

    // Filter cars based on search query, type, and availability
    const filterCars = useCallback(() => {
        setIsLoading(true);
        let filteredCars = [...initialCars];

        // Search filter
        if (searchQuery) {
            filteredCars = filteredCars.filter((car) =>
                car.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Type filter
        if (typeFilter !== 'All Types') {
            filteredCars = filteredCars.filter((car) => car.type === typeFilter);
        }

        // Availability filter
        if (availabilityFilter !== 'All') {
            const isAvailable = availabilityFilter === 'Available';
            filteredCars = filteredCars.filter((car) => car.available === isAvailable);
        }

        // Sort cars
        filteredCars.sort((a, b) => {
            switch (sortOption) {
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'year-asc':
                    return a.year - b.year;
                case 'year-desc':
                    return b.year - a.year;
                default:
                    return 0;
            }
        });

        setTimeout(() => {
            setCars(filteredCars);
            setIsLoading(false);
        }, 500); // Simulate API delay
    }, [searchQuery, typeFilter, availabilityFilter, sortOption]);

    // Debounced search handler
    const debouncedHandleSearchChange = useCallback(
        debounce((value) => {
            setSearchQuery(value);
            filterCars();
        }, 300),
        [filterCars]
    );

    // Handle filter and sort changes
    const handleTypeChange = (e) => setTypeFilter(e.target.value);
    const handleAvailabilityChange = (e) => setAvailabilityFilter(e.target.value);
    const handleSortChange = (e) => setSortOption(e.target.value);

    // Reset filters
    const resetFilters = () => {
        setSearchQuery('');
        setTypeFilter('All Types');
        setAvailabilityFilter('All');
        setSortOption('name-asc');
        setCars(initialCars);
    };

    // Run filter on initial load and when dependencies change
    useEffect(() => {
        filterCars();
    }, [filterCars]);

    return (
        <Layout>
            <div className="flex mt-8 flex-col justify-center lg:flex-row gap-6">
                {/* Filter Section (Right) */}
                <div className="lg:w-1/5 mx-2">
                    <div className="bg-white p-6 rounded-lg shadow-lg sticky top-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Filter Cars</h3>

                        {/* Search Input */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search cars..."
                                value={searchQuery}
                                onChange={(e) => debouncedHandleSearchChange(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        {/* Type Filter */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Type</label>
                            <select
                                value={typeFilter}
                                onChange={handleTypeChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            >
                                <option>All Types</option>
                                <option>Luxury</option>
                                <option>Sports</option>
                                <option>SUV</option>
                            </select>
                        </div>

                        {/* Availability Filter */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Availability</label>
                            <select
                                value={availabilityFilter}
                                onChange={handleAvailabilityChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            >
                                <option>All</option>
                                <option>Available</option>
                                <option>Not Available</option>
                            </select>
                        </div>

                        {/* Sort Options */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Sort By</label>
                            <select
                                value={sortOption}
                                onChange={handleSortChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            >
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="year-asc">Year (Oldest)</option>
                                <option value="year-desc">Year (Newest)</option>
                            </select>
                        </div>

                        {/* Reset Button */}
                        <button
                            onClick={resetFilters}
                            className="w-full py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-all"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                {/* Car Cards Section (Left) */}
                <div className="lg:w-3/5 mx-2">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Available Cars</h2>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : cars.length === 0 ? (
                        <p className="text-gray-600">No cars match your filters.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cars.map((car) => (
                                <div
                                    key={car.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all "
                                >
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800">{car.name}</h3>
                                        <p className="text-gray-600">{car.year}</p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            {car.available ? (
                                                <span className="text-green-600 font-medium">✔ Available</span>
                                            ) : (
                                                <span className="text-red-600 font-medium">✖ Not Available</span>
                                            )}
                                            <span className="text-blue-500 bg-blue-100 px-2 py-1 rounded-full text-sm">
                                                {car.type}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 mt-2">Fuel Type: {car.fuelType}</p>
                                        <p className="text-gray-700">Transmission: {car.transmission}</p>
                                        <button
                                            className={`mt-4 w-full py-2 rounded-lg text-white font-medium transition-colors ${car.available
                                                ? 'bg-green-600 hover:bg-green-700'
                                                : 'bg-gray-400 cursor-not-allowed'
                                                }`}
                                            disabled={!car.available}
                                        >
                                            {car.available ? 'Contact Us' : 'Unavailable'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;