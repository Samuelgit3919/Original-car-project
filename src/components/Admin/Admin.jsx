import React, { useEffect, useState } from 'react';
import { LogOut, Plus, Edit, Save, Trash } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import Layout from '../../Layout';
import { Bar, Pie } from 'react-chartjs-2'; // Add Pie import
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components (add ArcElement for Pie Chart)
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

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
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCar, setNewCar] = useState({
        vehicle: '',
        stock: '',
        age: '',
        detailed: '',
        location: '',
        person: '',
        status: 'Available',
        note: ''
    });
    const [editingNote, setEditingNote] = useState({ id: '', note: '' });
    const [editingStatus, setEditingStatus] = useState({ id: '', status: '' });

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
        setCars(cars.filter(car => car.id !== id));
    };

    const handleAddCar = () => {
        const carWithId = { ...newCar, id: String(cars.length + 1) };
        setCars([...cars, carWithId]);
        setNewCar({
            vehicle: '',
            stock: '',
            age: '',
            detailed: '',
            location: '',
            person: '',
            status: 'Available',
            note: ''
        });
        setShowAddForm(false);
    };

    const handleEditNote = (car) => {
        setEditingNote({ id: car.id, note: car.note });
    };

    const handleSaveNote = () => {
        setCars(cars.map(car =>
            car.id === editingNote.id ? { ...car, note: editingNote.note } : car
        ));
        setEditingNote({ id: '', note: '' });
    };

    const handleEditStatus = (car) => {
        setEditingStatus({ id: car.id, status: car.status });
    };

    const handleSaveStatus = () => {
        setCars(cars.map(car =>
            car.id === editingStatus.id ? { ...car, status: editingStatus.status } : car
        ));
        setEditingStatus({ id: '', status: '' });
    };

    const filteredCars = cars.filter(car => {
        return (
            (car.vehicle || '').toLowerCase().includes(filters.vehicle.toLowerCase()) &&
            (car.type || '' || car.vehicle.toLowerCase().includes(filters.type.toLowerCase())) &&
            (car.location || '').toLowerCase().includes(filters.location.toLowerCase()) &&
            (filters.status === '' || car.status.toLowerCase() === filters.status.toLowerCase())
        );
    });

    // Chart Data Preparation
    const statusCounts = filteredCars.reduce((acc, car) => {
        acc[car.status] = (acc[car.status] || 0) + 1;
        return acc;
    }, {});

    const barChartData = {
        labels: Object.keys(statusCounts),
        datasets: [
            {
                label: 'Vehicle Count by Status',
                data: Object.values(statusCounts),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', // Available
                    'rgba(255, 99, 132, 0.6)', // Unavailable
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Vehicle Status Distribution (Bar)',
                font: {
                    size: 18,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Vehicles',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Status',
                },
            },
        },
    };

    const pieChartData = {
        labels: Object.keys(statusCounts),
        datasets: [
            {
                label: 'Vehicle Status',
                data: Object.values(statusCounts),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', // Available
                    'rgba(255, 99, 132, 0.6)', // Unavailable
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Vehicle Status Distribution (Pie)',
                font: {
                    size: 18,
                },
            },
        },
    };

    return (
        <Layout>
            <div className="md:flex m-4 justify-between items-center mb-12 md:mx-24">
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
                            <option value="Toyota Camry">Toyota Camry</option>
                            <option value="Honda Civic">Honda Civic</option>
                            <option value="Toyota Corolla">Toyota Corolla</option>
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
                            <option value="Location 3">Location 3</option>
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
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="p-2 md:p-4 text-center border-b font-roboto whitespace-nowrap">Vehicle</th>
                            <th className="p-2 md:p-4 text-center border-b font-roboto whitespace-nowrap">Stock #</th>
                            <th className="p-2 md:p-4 text-center border-b font-roboto whitespace-nowrap">Age</th>
                            <th className="p-2 md:p-4 text-center border-b font-roboto whitespace-nowrap">Detailed</th>
                            <th className="p-2 md:p-4 text-center border-b font-roboto whitespace-nowrap">Location</th>
                            <th className="p-2 md:p-4 text-center border-b font-roboto whitespace-nowrap">Verified By</th>
                            <th className="p-2 md:p-4 text-center border-b font-roboto whitespace-nowrap">Status</th>
                            <th className="p-2 md:p-4 text-center border-b font-roboto whitespace-nowrap">Extra Note</th>
                            <th className="p-2 md:p-4 text-center border-b font-roboto whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="9" className="py-10">
                                    <div className="flex items-center justify-center h-48">
                                        <ScaleLoader color="#6B7280" />
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredCars.map(car => (
                                <tr key={car.id} className={`hover:bg-gray-50 ${car.status === 'Unavailable' ? 'bg-red-100' : 'bg-green-100'}`}>
                                    <td className="px-2 md:px-4 py-1 md:py-2 border-b whitespace-nowrap">{car.vehicle}</td>
                                    <td className="px-2 md:px-4 py-1 md:py-2 border-b">{car.stock}</td>
                                    <td className="px-2 md:px-4 py-1 md:py-2 border-b whitespace-nowrap">{car.age}</td>
                                    <td className="px-2 md:px-4 py-1 md:py-2 border-b">{car.detailed}</td>
                                    <td className="px-2 md:px-4 py-1 md:py-2 border-b whitespace-nowrap">{car.location}</td>
                                    <td className="px-2 md:px-4 py-1 md:py-2 border-b">{car.person}</td>
                                    <td className="px-2 md:px-4 py-1 md:py-2 border-b">
                                        <div className="flex items-center justify-center gap-1">
                                            {editingStatus.id === car.id ? (
                                                <select
                                                    value={editingStatus.status}
                                                    onChange={(e) => setEditingStatus({ ...editingStatus, status: e.target.value })}
                                                    className="p-1 border rounded text-sm w-full"
                                                >
                                                    <option value="Available">Available</option>
                                                    <option value="Unavailable">Unavailable</option>
                                                </select>
                                            ) : (
                                                <span className={`px-2 py-1 w-22 rounded text-sm whitespace-nowrap ${car.status === 'Available' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                                                    {car.status}
                                                </span>
                                            )}
                                            {editingStatus.id === car.id ? (
                                                <button
                                                    onClick={handleSaveStatus}
                                                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                                                >
                                                    <Save className="h-4 w-4" />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleEditStatus(car)}
                                                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-2 md:px-4 py-1 md:py-2 border-b">
                                        <div className="flex items-center justify-center gap-1">
                                            {editingNote.id === car.id ? (
                                                <input
                                                    type="text"
                                                    value={editingNote.note}
                                                    onChange={(e) => setEditingNote({ ...editingNote, note: e.target.value })}
                                                    className="p-1 border rounded text-sm w-24 md:w-auto"
                                                />
                                            ) : (
                                                <span className="text-sm truncate max-w-[100px] md:max-w-none">{car.note}</span>
                                            )}
                                            {editingNote.id === car.id ? (
                                                <button
                                                    onClick={handleSaveNote}
                                                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                                                >
                                                    <Save className="h-4 w-4" />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleEditNote(car)}
                                                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-2 md:px-4 py-1 md:py-2 border-b">
                                        <button
                                            onClick={() => handleDelete(car.id)}
                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
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

            {/* Chart Section */}
            <div className="mb-12 mt-8 md:mx-24 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Vehicle Status Overview</h2>
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <ScaleLoader color="#6B7280" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
                        {/* Bar Chart */}
                        <div>
                            <Bar data={barChartData} options={barChartOptions} />
                        </div>
                        {/* Pie Chart */}
                        <div>
                            <Pie data={pieChartData} options={pieChartOptions} />
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Admin;