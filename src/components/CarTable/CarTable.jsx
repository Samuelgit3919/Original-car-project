import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Loader2, LogOut } from 'lucide-react';

const CarTable = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        vehicle: '',
        type: '',
        location: '',
        status: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get('./db.json');
            setCars(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const filteredCars = cars.filter(car => {
        return (
            (car.vehicle || '').toLowerCase().includes(filters.vehicle.toLowerCase()) &&
            (car.type || '' || car.vehicle.toLowerCase().includes(filters.type.toLowerCase())) &&
            (car.location || '').toLowerCase().includes(filters.location.toLowerCase()) &&
            (filters.status === '' || car.status.toLowerCase() === filters.status.toLowerCase())
        );
    });

    return (
        <>
            <div className="rounded-lg text-sm text-start overflow-x-auto md:mx-26 mb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="md:flex md:justify-between md:items-center  gap-4 mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
                        <div className="flex gap-4 items-center">
                            <div className="relative">
                                <div className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                                {/* <input
                                    type="text"
                                    placeholder="Search cars..."
                                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name="vehicle"
                                    value={filters.vehicle}
                                    onChange={handleFilterChange}
                                /> */}
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/auth')}
                            className="bg-gray-600 w-26 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700"
                        >
                            <LogOut className="h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Vehicle Filters */}
                <div className="mb-12 mx-4 md:mx-4 p-6 bg-gray-50 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Vehicle Filters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">Vehicle Name</label>
                            <input
                                type="text"
                                id="vehicle"
                                name="vehicle"
                                value={filters.vehicle}
                                onChange={handleFilterChange}
                                className="mt-1 p-2 border rounded w-full"
                                placeholder="Search by vehicle name"
                            />
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                            <select
                                id="type"
                                name="type"
                                value={filters.type}
                                onChange={handleFilterChange}
                                className="mt-1 p-2 border rounded w-full"
                            >
                                <option value="">All Types</option>
                                <option value="Honda Civic">Honda Civic</option>
                                <option value="Toyota Corolla">Toyota Corolla</option>
                                <option value="Toyota Camry">Toyota Camry</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                            <select
                                id="location"
                                name="location"
                                value={filters.location}
                                onChange={handleFilterChange}
                                className="mt-1 p-2 border rounded w-full"
                            >
                                <option value="">All Locations</option>
                                <option value="Location 1">Location 1</option>
                                <option value="Location 2">Location 2</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                className="mt-1 p-2 border rounded w-full"
                            >
                                <option value="">All Statuses</option>
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Car Table */}
                <div className="bg-white mx-4 rounded-lg md:mx-4 h-full text-sm text-center shadow-md overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="p-4 text-center border-b font-roboto whitespace-nowrap">Vehicle</th>
                                <th className="p-4 text-center border-b font-roboto whitespace-nowrap">Stock #</th>
                                <th className="p-4 text-center border-b font-roboto whitespace-nowrap">Age</th>
                                <th className="p-4 text-center border-b font-roboto whitespace-nowrap">Detailed ?</th>
                                <th className="p-4 text-center border-b font-roboto whitespace-nowrap">Location</th>
                                <th className="p-4 text-center border-b font-roboto whitespace-nowrap">Verified in person</th>
                                <th className="p-4 text-center border-b font-roboto whitespace-nowrap">Status</th>
                                <th className="p-4 text-center border-b font-roboto whitespace-nowrap">Extra Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="text-center  h-64">
                                        {/* <Loader2 className="h-8 w-8 animate-spin text-gray-500" /> */}
                                        Loading...
                                    </td>
                                </tr>
                            ) : (
                                filteredCars.map(car => (
                                    <tr key={car.id} className={`hover:bg-gray-50  ${car.status === 'Available' ? 'bg-green-100' : 'bg-red-100'}`}>
                                        <td className="px-2 md:px-4 py-1 md:py-2 border-b whitespace-nowrap">{car.vehicle}</td>
                                        <td className="px-2 md:px-4 py-1 md:py-2 border-b">{car.stock}</td>
                                        <td className="px-2 md:px-4 py-1 md:py-2 border-b whitespace-nowrap">{car.age}</td>
                                        <td className="px-2 md:px-4 py-1 md:py-2 border-b">{car.detailed}</td>
                                        <td className="px-2 md:px-4 py-1 md:py-2 border-b whitespace-nowrap">{car.location}</td>
                                        <td className="px-2 md:px-4 py-1 md:py-2 border-b">{car.person}</td>
                                        <td className="px-8 border-b ">
                                            <span className={`px-2 py-1 w-22 rounded text-sm whitespace-nowrap ${car.status === 'Available' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                                                {car.status}
                                            </span>
                                        </td>
                                        <td className="p-4 border-b whitespace-nowrap">{car.note}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CarTable;