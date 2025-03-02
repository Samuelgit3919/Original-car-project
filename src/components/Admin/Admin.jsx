import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../Layout';

const Admin = () => {
    const [cars, setCars] = useState([]);
    const [editingCar, setEditingCar] = useState(null); // Track the car being edited
    const [editingNote, setEditingNote] = useState(null); // Track the note being edited
    const [showAddForm, setShowAddForm] = useState(false); // Toggle add car form
    const [newCar, setNewCar] = useState({ // State for adding a new car
        vehicle: '',
        stock: '',
        age: '',
        detailed: '',
        location: '',
        person: '',
        status: '',
        note: ''
    });

    // Fetch car data
    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get('./db.json');
            setCars(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Handle editing a car
    const handleEdit = (car) => {
        setEditingCar(car);
    };

    // Handle saving edited car
    const handleSave = () => {
        const updatedCars = cars.map(car =>
            car.id === editingCar.id ? editingCar : car
        );
        setCars(updatedCars);
        setEditingCar(null); // Exit edit mode
    };

    // Handle editing the note separately
    const handleEditNote = (car) => {
        setEditingNote(car);
    };

    // Handle saving the edited note
    const handleSaveNote = () => {
        const updatedCars = cars.map(car =>
            car.id === editingNote.id ? editingNote : car
        );
        setCars(updatedCars);
        setEditingNote(null); // Exit note edit mode
    };

    // Handle deleting a car
    const handleDelete = (id) => {
        const updatedCars = cars.filter(car => car.id !== id);
        setCars(updatedCars);
    };

    // Handle adding a new car
    const handleAdd = () => {
        const carWithId = { ...newCar, id: cars.length + 1 }; // Add a unique ID
        setCars([...cars, carWithId]);
        setNewCar({ // Reset the new car form
            vehicle: '',
            stock: '',
            age: '',
            detailed: '',
            location: '',
            person: '',
            status: '',
            note: ''
        });
        setShowAddForm(false); // Hide the add car form
    };

    return (
        <Layout className="p-8">
            <h1 className="text-2xl text-center mt-5 font-bold mb-12">Admin Dashboard</h1>

            {/* Add Car Button */}
            <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="mb-4 md:mx-24 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                {showAddForm ? 'Cancel' : 'Add Car'}
            </button>

            {/* Add New Car Form (Conditionally Rendered) */}
            {showAddForm && (
                <>
                    <div className="mb-12 md:mx-24 p-6 bg-gray-50  text-center  rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Add New Car</h2>
                        <div className="grid grid-cols-2 gap-4">
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
                                placeholder="Verified in Person"
                                value={newCar.person}
                                onChange={(e) => setNewCar({ ...newCar, person: e.target.value })}
                                className="p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Status"
                                value={newCar.status}
                                onChange={(e) => setNewCar({ ...newCar, status: e.target.value })}
                                className="p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Extra Note"
                                value={newCar.note}
                                onChange={(e) => setNewCar({ ...newCar, note: e.target.value })}
                                className="p-2 border rounded"
                            />
                        </div>

                        <button
                            onClick={handleAdd}
                            className="mt-4 px-4 flex py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Add Car
                        </button>
                    </div>

                </>

            )}


            {/* Car Table */}
            <div className="bg-white rounded-md md:mx-24 h-full text-sm text-center shadow-md overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="p-4 text-center border-b font-roboto">Vehicle</th>
                            <th className="p-4 text-center border-b font-roboto">Stock #</th>
                            <th className="p-4 text-center border-b font-roboto">Age</th>
                            <th className="p-4 text-center border-b font-roboto">Detailed ?</th>
                            <th className="p-4 text-center border-b font-roboto">Location</th>
                            <th className="p-4 text-center border-b font-roboto">Verified in person</th>
                            <th className="p-4 text-center border-b font-roboto">Status</th>
                            <th className="p-4 text-center border-b font-roboto">Extra Note</th>
                            <th className="p-4 text-center border-b font-roboto">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car => (
                            <tr key={car.id} className={`hover:bg-gray-50 ${car.status === 'Available' ? 'bg-green-100' : 'bg-red-100'}`}>
                                <td className="px-8 py-4 border-b">
                                    {editingCar?.id === car.id ? (
                                        <input
                                            type="text"
                                            value={editingCar.vehicle}
                                            onChange={(e) => setEditingCar({ ...editingCar, vehicle: e.target.value })}
                                            className="p-1 border rounded"
                                        />
                                    ) : (
                                        car.vehicle
                                    )}
                                </td>
                                <td className="px-8 py-4 border-b">
                                    {editingCar?.id === car.id ? (
                                        <input
                                            type="text"
                                            value={editingCar.stock}
                                            onChange={(e) => setEditingCar({ ...editingCar, stock: e.target.value })}
                                            className="p-1 border rounded"
                                        />
                                    ) : (
                                        car.stock
                                    )}
                                </td>
                                <td className="px-8 py-4 border-b">
                                    {editingCar?.id === car.id ? (
                                        <input
                                            type="text"
                                            value={editingCar.age}
                                            onChange={(e) => setEditingCar({ ...editingCar, age: e.target.value })}
                                            className="p-1 border rounded"
                                        />
                                    ) : (
                                        car.age
                                    )}
                                </td>
                                <td className="px-8 py-4 border-b">
                                    {editingCar?.id === car.id ? (
                                        <input
                                            type="text"
                                            value={editingCar.detailed}
                                            onChange={(e) => setEditingCar({ ...editingCar, detailed: e.target.value })}
                                            className="p-1 border rounded"
                                        />
                                    ) : (
                                        car.detailed
                                    )}
                                </td>
                                <td className="px-8 py-4 border-b">
                                    {editingCar?.id === car.id ? (
                                        <input
                                            type="text"
                                            value={editingCar.location}
                                            onChange={(e) => setEditingCar({ ...editingCar, location: e.target.value })}
                                            className="p-1 border rounded"
                                        />
                                    ) : (
                                        car.location
                                    )}
                                </td>
                                <td className="px-8 py-4 border-b">
                                    {editingCar?.id === car.id ? (
                                        <input
                                            type="text"
                                            value={editingCar.person}
                                            onChange={(e) => setEditingCar({ ...editingCar, person: e.target.value })}
                                            className="p-1 border rounded"
                                        />
                                    ) : (
                                        car.person
                                    )}
                                </td>
                                <td className="px-8 py-4 border-b">
                                    {editingCar?.id === car.id ? (
                                        <input
                                            type="text"
                                            value={editingCar.status}
                                            onChange={(e) => setEditingCar({ ...editingCar, status: e.target.value })}
                                            className="p-1 border rounded"
                                        />
                                    ) : (
                                        <span className={`px-2 py-1 rounded ${car.status === 'Available' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                                            {car.status}
                                        </span>
                                    )}
                                </td>
                                <td className="px-8 py-4 border-b">
                                    {editingNote?.id === car.id ? (
                                        <input
                                            type="text"
                                            value={editingNote.note}
                                            onChange={(e) => setEditingNote({ ...editingNote, note: e.target.value })}
                                            className="p-1 border rounded"
                                        />
                                    ) : (
                                        car.note
                                    )}
                                </td>
                                <td className="px-8 py-4 border-b">
                                    {editingCar?.id === car.id ? (
                                        <button
                                            onClick={handleSave}
                                            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <div className='flex items-center'>
                                            <button
                                                onClick={() => handleEdit(car)}
                                                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleEditNote(car)}
                                                className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2 w-24"
                                            >
                                                Edit Note
                                            </button>
                                            <button
                                                onClick={() => handleDelete(car.id)}
                                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Admin;