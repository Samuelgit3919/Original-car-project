import React, { useEffect, useState } from 'react';
import { LogOut, Plus, Edit, Save, Trash, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        vehicle: '',
        type: '',
        location: '',
        status: ''
    });
    const [showAddForm, setShowAddForm] = useState(false); // Toggle add vehicle form
    const [newCar, setNewCar] = useState({ // State for new vehicle
        vehicle: '',
        stock: '',
        age: '',
        detailed: '',
        location: '',
        person: '',
        status: 'Available',
        note: ''
    });
    const [editingNote, setEditingNote] = useState({ id: '', note: '' }); // State for editing notes
    const [editingStatus, setEditingStatus] = useState({ id: '', status: '' }); // State for editing status

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get('./db.json');
            const enhancedData = response.data.map(car => ({
                ...car,
                vehicle: car.vehicle || '',
                type: car.type || '',
                location: car.location || '',
                status: car.status || '',
            }));
            setCars(enhancedData);
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

    const handleDelete = (id) => {
        setCars(cars.filter(car => car.id !== id)); // Delete vehicle
    };

    const handleAddCar = () => {
        const carWithId = { ...newCar, id: String(cars.length + 1) }; // Add unique ID
        setCars([...cars, carWithId]); // Add new vehicle
        setNewCar({ // Reset form
            vehicle: '',
            stock: '',
            age: '',
            detailed: '',
            location: '',
            person: '',
            status: 'Available',
            note: ''
        });
        setShowAddForm(false); // Hide form
    };

    const handleEditNote = (car) => {
        setEditingNote({ id: car.id, note: car.note }); // Set note to edit
    };

    const handleSaveNote = () => {
        setCars(cars.map(car =>
            car.id === editingNote.id ? { ...car, note: editingNote.note } : car
        )); // Update note
        setEditingNote({ id: '', note: '' }); // Reset editing state
    };

    const handleEditStatus = (car) => {
        setEditingStatus({ id: car.id, status: car.status }); // Set status to edit
    };

    const handleSaveStatus = () => {
        setCars(cars.map(car =>
            car.id === editingStatus.id ? { ...car, status: editingStatus.status } : car
        )); // Update status
        setEditingStatus({ id: '', status: '' }); // Reset editing state
    };

    const filteredCars = cars.filter(car => {
        return (
            (car.vehicle || '').toLowerCase().includes(filters.vehicle.toLowerCase()) &&
            (car.type || '').toLowerCase().includes(filters.type.toLowerCase()) &&
            (car.location || '').toLowerCase().includes(filters.location.toLowerCase()) &&
            (filters.status === '' || car.status.toLowerCase() === filters.status.toLowerCase())
        );
    });

    return (
        <div className="p-8">
            <div className="md:flex justify-between items-center mb-12 md:mx-24">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                    >
                        <Plus className="h-5 w-5" />
                        {showAddForm ? 'Cancel' : 'Add Car'}
                    </button>
                    <button
                        onClick={() => navigate('/auth')}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Add Vehicle Form */}
            {showAddForm && (
                <div className="mb-12 md:mx-24 p-6 bg-gray-50 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Add New Vehicle</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Vehicle"
                            value={newCar.vehicle}
                            onChange={(e) => setNewCar({ ...newCar, vehicle: e.target.value })}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Stock #"
                            value={newCar.stock}
                            onChange={(e) => setNewCar({ ...newCar, stock: e.target.value })}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Age"
                            value={newCar.age}
                            onChange={(e) => setNewCar({ ...newCar, age: e.target.value })}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Detailed"
                            value={newCar.detailed}
                            onChange={(e) => setNewCar({ ...newCar, detailed: e.target.value })}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={newCar.location}
                            onChange={(e) => setNewCar({ ...newCar, location: e.target.value })}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Verified By"
                            value={newCar.person}
                            onChange={(e) => setNewCar({ ...newCar, person: e.target.value })}
                            className="p-2 border rounded"
                        />
                        <select
                            value={newCar.status}
                            onChange={(e) => setNewCar({ ...newCar, status: e.target.value })}
                            className="p-2 border rounded"
                        >
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Extra Note"
                            value={newCar.note}
                            onChange={(e) => setNewCar({ ...newCar, note: e.target.value })}
                            className="p-2 border rounded"
                        />
                    </div>
                    <button
                        onClick={handleAddCar}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Save Vehicle
                    </button>
                </div>
            )}

            {/* Vehicle Filters */}
            <div className="mb-12 md:mx-24 p-6 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Vehicle Filters</h2>
                <div className="grid grid-cols-1 items-center md:grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">Vehicle Name</label>
                        <input
                            type="text"
                            id="vehicle"
                            name="vehicle"
                            value={filters.vehicle}
                            onChange={handleFilterChange}
                            className="mt-1 p-1 border rounded w-full"
                            placeholder='search by vehicle name'
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
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Truck">Truck</option>
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
                            <option value="Lot A">Lot A</option>
                            <option value="Lot B">Lot B</option>
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
            <div className="bg-white rounded-md md:mx-24 h-full text-sm text-center shadow-md overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="p-4 text-center border-b font-roboto">Vehicle</th>
                            <th className="p-4 text-center border-b font-roboto">Stock #</th>
                            <th className="p-4 text-center border-b font-roboto">Age</th>
                            <th className="p-4 text-center border-b font-roboto">Detailed</th>
                            <th className="p-4 text-center border-b font-roboto">Location</th>
                            <th className="p-4 text-center border-b font-roboto">Verified By</th>
                            <th className="p-4 text-center border-b font-roboto">Status</th>
                            <th className="p-4 text-center border-b font-roboto">Extra Note</th>
                            <th className="p-4 text-center border-b font-roboto">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="9" className="text-center flex justify-center items-center h-64">
                                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                                </td>
                            </tr>
                        ) : (
                            filteredCars.map(car => (
                                <tr key={car.id} className={`hover:bg-gray-50 ${car.status === 'Unavailable' ? 'bg-red-100' : 'bg-green-100'}`}>
                                    <td className="px-8 py-4 border-b">{car.vehicle}</td>
                                    <td className="px-8 py-4 border-b">{car.stock}</td>
                                    <td className="px-8 py-4 border-b">{car.age}</td>
                                    <td className="px-8 py-4 border-b">{car.detailed}</td>
                                    <td className="px-8 py-4 border-b">{car.location}</td>
                                    <td className="px-8 py-4 border-b">{car.person}</td>
                                    <td className="px-8 py-4 border-b md:flex">
                                        {editingStatus.id === car.id ? (
                                            <select
                                                value={editingStatus.status}
                                                onChange={(e) => setEditingStatus({ ...editingStatus, status: e.target.value })}
                                                className="p-1 border rounded"
                                            >
                                                <option value="Available">Available</option>
                                                <option value="Unavailable">Unavailable</option>
                                            </select>
                                        ) : (
                                            <span className={`px-2 py-1  rounded w-22  ${car.status === 'Available' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                                                {car.status}
                                            </span>
                                        )}
                                        {editingStatus.id === car.id ? (
                                            <button
                                                onClick={handleSaveStatus}
                                                className="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                <Save className="h-4 w-4" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEditStatus(car)}
                                                className="ml-2 px-2 py-1 mt-2 md:mt-0 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                <Edit className="h-4 w-4 " />
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-8 py-4 border-b">
                                        {editingNote.id === car.id ? (
                                            <input
                                                type="text"
                                                value={editingNote.note}
                                                onChange={(e) => setEditingNote({ ...editingNote, note: e.target.value })}
                                                className="p-1 border rounded"
                                            />
                                        ) : (
                                            car.note
                                        )}
                                        {editingNote.id === car.id ? (
                                            <button
                                                onClick={handleSaveNote}
                                                className="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                <Save className="h-4 w-4" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEditNote(car)}
                                                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-8 py-4 border-b">
                                        <button
                                            onClick={() => handleDelete(car.id)}
                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;