"use client"

import { useEffect, useState } from "react"
import { Plus, Edit, Save, Trash, X } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ScaleLoader } from "react-spinners"
import Layout from "../../Layout"
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

// Function to generate dynamic background colors
const generateBackgroundColors = (count) => {
    const colors = []
    for (let i = 0; i < count; i++) {
        colors.push(
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
        )
    }
    return colors
}

// Function to generate dynamic border colors
const generateBorderColors = (count) => {
    const colors = []
    for (let i = 0; i < count; i++) {
        colors.push(
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
        )
    }
    return colors
}

const Admin = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("") // New state for error handling
    const navigate = useNavigate()
    const [filters, setFilters] = useState({
        vehicle: "",
        type: "",
        location: "",
        status: "",
    })
    const [showAddForm, setShowAddForm] = useState(false)
    const [newCar, setNewCar] = useState({
        vehicle: "",
        stock: "",
        age: "",
        detailed: "",
        location: "",
        person: "",
        status: "Available",
        notes: [],
    })

    const [noteInput, setNoteInput] = useState("")
    const [editingNote, setEditingNote] = useState({ id: "", note: "" })
    const [editingStatus, setEditingStatus] = useState({ id: "", status: "" })

    useEffect(() => {
        fetchCars()
    }, [])

    const database = 'https://car-availability.onrender.com/api'

    const fetchCars = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${database}/vehicles/createVehicle`, API_CONFIG)
            const enhancedData = response.data.map((car) => ({
                ...car,
                vehicle: car.vehicle || "",
                type: car.type || "Others",
                location: car.location || "",
                status: car.status || "Available",
                notes: Array.isArray(car.notes) ? car.notes :
                    car.note ? [{ id: "1", text: car.note, timestamp: new Date().toLocaleString() }] : []
            }))
            setCars(enhancedData)
        } catch (error) {
            console.error("Fetch error:", error)
            if (error.response?.status === 401) {
                setError("Session expired. Please login again.")
                // Redirect to login if unauthorized
                navigate('/login')
            } else {
                setError("Failed to fetch vehicles. Please try again later.")
            }
        } finally {
            setLoading(false)
        }
    }
    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters({ ...filters, [name]: value })
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${database}/vehicles/${id}`)
            setCars(cars.filter((car) => car.id !== id))
        } catch (error) {
            console.error("Error deleting vehicle:", error)
            setError("Failed to delete vehicle. Please try again.")
        }
    }

    const handleAddCar = async () => {
        try {
            setError("") // Clear any previous errors
            const carWithId = {
                ...newCar,
                notes: newCar.notes.length > 0 ? newCar.notes : [],
            }
            const response = await axios.post(`${database}/vehicles/createVehicle`, carWithId) // Updated endpoint
            setCars([...cars, response.data])
            setNewCar({
                vehicle: "",
                stock: "",
                age: "",
                detailed: "",
                location: "",
                person: "",
                status: "Available",
                notes: [],
            })
            setShowAddForm(false)
        } catch (error) {
            console.error("Error adding vehicle:", error)
            setError("Failed to add vehicle. Please check the server and try again.")
        }
    }

    const handleAddNote = async (carId) => {
        if (noteInput.trim() === "") return

        try {
            const newNote = {
                id: Date.now().toString(),
                text: noteInput,
                timestamp: new Date().toLocaleString(),
            }
            await axios.post(`${database}/vehicles/${id}`, newNote)
            setCars(
                cars.map((car) => {
                    if (car.id === carId) {
                        const updatedNotes = Array.isArray(car.notes) ? [...car.notes, newNote] : [newNote]
                        return { ...car, notes: updatedNotes }
                    }
                    return car
                }),
            )
            setNoteInput("")
        } catch (error) {
            console.error("Error adding note:", error)
            setError("Failed to add note. Please try again.")
        }
    }

    const handleDeleteNote = async (carId, noteId) => {
        try {
            await axios.delete(`${database}/vehicles/${id}`)
            setCars(
                cars.map((car) => {
                    if (car.id === carId && Array.isArray(car.notes)) {
                        return {
                            ...car,
                            notes: car.notes.filter((note) => note.id !== noteId),
                        }
                    }
                    return car
                }),
            )
        } catch (error) {
            console.error("Error deleting note:", error)
            setError("Failed to delete note. Please try again.")
        }
    }

    const handleEditNote = (car) => {
        setEditingNote({ id: car.id, note: car.note })
    }

    const handleSaveNote = async () => {
        try {
            await axios.put(`${database}/vehicles/${editingNote.id}`, { note: editingNote.note })
            setCars(cars.map((car) => (car.id === editingNote.id ? { ...car, note: editingNote.note } : car)))
            setEditingNote({ id: "", note: "" })
        } catch (error) {
            console.error("Error saving note:", error)
            setError("Failed to save note. Please try again.")
        }
    }

    const handleEditStatus = (car) => {
        setEditingStatus({ id: car.id, status: car.status })
    }

    const handleSaveStatus = async () => {
        try {
            await axios.put(`${database}/vehicles/${editingStatus.id}`, { status: editingStatus.status })
            setCars(cars.map((car) => (car.id === editingStatus.id ? { ...car, status: editingStatus.status } : car)))
            setEditingStatus({ id: "", status: "" })
        } catch (error) {
            console.error("Error saving status:", error)
            setError("Failed to save status. Please try again.")
        }
    }

    const filteredCars = cars.filter((car) => {
        return (
            (car.vehicle || "").toLowerCase().includes(filters.vehicle.toLowerCase()) &&
            (car.type || "").toLowerCase().includes(filters.type.toLowerCase()) &&
            (car.location || "").toLowerCase().includes(filters.location.toLowerCase()) &&
            (filters.status === "" || car.status.toLowerCase() === filters.status.toLowerCase())
        )
    })

    // Chart Data Preparation for Dealership Types
    const dealershipCounts = filteredCars.reduce((acc, car) => {
        const dealership = car.type || "Others"
        acc[dealership] = (acc[dealership] || 0) + 1
        return acc
    }, {})

    const totalVehicles = filteredCars.length

    const uniqueDealerships = Object.keys(dealershipCounts)
    const backgroundColors = generateBackgroundColors(uniqueDealerships.length)
    const borderColors = generateBorderColors(uniqueDealerships.length)

    const barChartData = {
        labels: uniqueDealerships,
        datasets: [
            {
                label: "Vehicle Count",
                data: Object.values(dealershipCounts),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 0,
                barThickness: 30,
            },
        ],
    }

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Vehicle Distribution by Dealership (Bar)",
                font: {
                    size: 18,
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const dealership = context.label
                        const value = context.raw
                        const percentage = totalVehicles > 0 ? ((value / totalVehicles) * 100).toFixed(2) : 0
                        return `${dealership}: ${value} (${percentage}%)`
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Number of Vehicles",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Vehicles",
                },
                ticks: {
                    callback: (value, index) => {
                        const label = uniqueDealerships[index]
                        return label.length > 10 ? label.substring(0, 10) + "..." : label
                    },
                },
            },
        },
    }

    const pieChartData = {
        labels: Object.keys(dealershipCounts),
        datasets: [
            {
                label: "Vehicle Distribution",
                data: Object.values(dealershipCounts),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 0,
            },
        ],
    }

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    boxWidth: 20,
                    padding: 20,
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: true,
                text: "Vehicle Distribution by Dealership (Pie)",
                font: {
                    size: 18,
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const dealership = context.label
                        const value = context.raw
                        const percentage = totalVehicles > 0 ? ((value / totalVehicles) * 100).toFixed(2) : 0
                        return `${dealership}: ${value} (${percentage}%)`
                    },
                },
            },
        },
    }

    return (
        <Layout>
            <div className="md:flex m-4 justify-between items-center mb-12 md:mx-24">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                    >
                        {showAddForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                        {showAddForm ? "Cancel" : "Add Car"}
                    </button>
                </div>
            </div>

            {/* Error Message Display */}
            {error && (
                <div className="mb-4 mx-4 md:mx-24 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

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
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add a note"
                                    value={noteInput}
                                    onChange={(e) => setNoteInput(e.target.value)}
                                    className="p-2 border rounded flex-grow"
                                />
                                <button
                                    onClick={() => {
                                        if (noteInput.trim() !== "") {
                                            setNewCar({
                                                ...newCar,
                                                notes: [
                                                    ...(Array.isArray(newCar.notes) ? newCar.notes : []),
                                                    {
                                                        id: Date.now().toString(),
                                                        text: noteInput,
                                                        timestamp: new Date().toLocaleString(),
                                                    },
                                                ],
                                            })
                                            setNoteInput("")
                                        }
                                    }}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Add Note
                                </button>
                            </div>
                            {Array.isArray(newCar.notes) && newCar.notes.length > 0 && (
                                <div className="mt-2 max-h-32 overflow-y-auto">
                                    {newCar.notes.map((note, index) => (
                                        <div
                                            key={note.id || index}
                                            className="flex justify-between items-center p-2 bg-gray-100 rounded mb-1"
                                        >
                                            <div>
                                                <p className="text-sm">{note.text}</p>
                                                <p className="text-xs text-gray-500">{note.timestamp}</p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setNewCar({
                                                        ...newCar,
                                                        notes: newCar.notes.filter((_, i) => i !== index),
                                                    })
                                                }
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <button onClick={handleAddCar} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Save Vehicle
                    </button>
                </div>
            )}

            <div className="mb-12 mx-4 md:mx-24 p-6 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Vehicle Filters</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">
                            Vehicle Name
                        </label>
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
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                            className="mt-1 p-2 border rounded w-full"
                        >
                            <option value="">All Types</option>
                            {[...new Set(cars.map((car) => car.type || "Others"))].map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
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
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
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

            <div className="bg-white mx-4 md:mx-24 h-full text-sm text-center shadow-md overflow-x-auto">
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
                            <th className="p-2 md:p-4 text-center border-b font-roboto whitespace-nowrap">Notes</th>
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
                            filteredCars.map((car) => (
                                <tr
                                    key={car.id}
                                    className={`hover:bg-gray-50 ${car.status === "Unavailable" ? "bg-red-100" : "bg-green-100"}`}
                                >
                                    <td className="px-2 md:px-4 py-1 md:py-2 border-b whitespace-nowrap">{car.vehicle}</td>
                                    <td className="px-2 md:px-4 py-1 md:py-2 border-b">{car.stock}</td>
                                    <td className="px-2 md:px-4 py-1 md:py-2 border-b whitespace-nowrap">{car.age}</td>
                                    <td className="px-2 md:px-4 py-1 md:py-2 border-b">{car.detailed}</td>
                                    <td className="px-2 md:px-4 py-1 md:py-2 border-b whitespace-nowrap">{car.location}</td>
                                    <td className="px-2 md:px-4 py-1 md:py-2 border-b">{car.person}</td>
                                    <td className="px-2 md:p-4 py-1 md:py-2 border-b">
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
                                                <span
                                                    className={`px-2 py-1 w-22 rounded text-sm whitespace-nowrap ${car.status === "Available" ? "bg-green-500" : "bg-red-500"} text-white`}
                                                >
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
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="max-h-20 overflow-y-auto w-full">
                                                {Array.isArray(car.notes) && car.notes.length > 0 ? (
                                                    car.notes.map((note) => (
                                                        <div
                                                            key={note.id}
                                                            className="flex justify-between items-center p-1 bg-gray-100 rounded mb-1 text-left"
                                                        >
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs truncate">{note.text}</p>
                                                                <p className="text-xs text-gray-500">{note.timestamp}</p>
                                                            </div>
                                                            <button
                                                                onClick={() => handleDeleteNote(car.id, note.id)}
                                                                className="text-red-500 hover:text-red-700 ml-1 flex-shrink-0"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-gray-500">No notes</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1 w-full">
                                                <input
                                                    type="text"
                                                    placeholder="Add note"
                                                    value={car.id === editingNote.id ? noteInput : ""}
                                                    onChange={(e) => setNoteInput(e.target.value)}
                                                    onFocus={() => setEditingNote({ id: car.id, note: "" })}
                                                    className="p-1 border rounded text-xs w-full"
                                                />
                                                <button
                                                    onClick={() => handleAddNote(car.id)}
                                                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
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

            <div className="mb-12 mt-8 md:mx-24 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Vehicle Overview</h2>
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <ScaleLoader color="#6B7280" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
                        <div>
                            <Bar data={barChartData} options={barChartOptions} />
                            <div className="mt-4 text-start">
                                {Object.entries(dealershipCounts).map(([dealership, count]) => (
                                    <span key={dealership} className="text-sm flex gap-2 text-gray-600">
                                        <p className="font-bold">{dealership}: </p>
                                        <p>{count} vehicle</p>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Pie data={pieChartData} options={pieChartOptions} />
                        </div>
                    </div>
                )}
                <p className="text-center font-bold mt-4 text-sm text-gray-600">Total: {totalVehicles} vehicles</p>
            </div>
        </Layout>
    )
}

export default Admin