import React from 'react'
// import Layout from '../../Layout'
import axios from 'axios'
import { useEffect, useState } from 'react'

const CarTable = () => {
    const [cars, setCars] = useState([])

    useEffect(() => {
        try {
            axios.get('./db.json')
                // .then(response => response.json())
                .then(res => {
                    // console.log(res.data);
                    setCars(res.data)
                    // console.log(res.data);
                })
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <>
            <div className="bg-white rounded-lg text-sm text-center shadow-md overflow-x-auto m-12">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="p-4 text-left border-b font-roboto">Vehicle</th>
                            <th className="p-4 text-left border-b font-roboto">Stock #</th>
                            <th className="p-4 text-left border-b font-roboto">Age</th>
                            <th className="p-4 text-left border-b font-roboto">Detailed ?</th>
                            <th className="p-4 text-left border-b font-roboto">Location</th>
                            <th className="p-4 text-left border-b font-roboto">Verified in person</th>
                            <th className="p-4 text-left border-b font-roboto">Status</th>
                            <th className="p-4 text-left border-b font-roboto">Extra Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cars.map(car => (
                                <tr key={car.id} className={`bg-green-100 hover:bg-gray-50 ${car.status === 'Available' ? 'bg-green-100' : 'bg-red-100'}`}>
                                    <td className="p-4 border-b">{car.vehicle}</td>
                                    <td className="p-4 border-b">{car.stock}</td>
                                    <td className="p-4 border-b">{car.age}</td>
                                    <td className="p-4 border-b">{car.detailed}</td>
                                    <td className="p-4 border-b">{car.location}</td>
                                    <td className="p-4 border-b">{car.person}</td>
                                    <td className="p-4 border-b">
                                        <span className={`px-2 py-1 rounded ${car.status === 'Available' ? 'bg-green-500' : 'bg-red-500'} text-white`}>{car.status}</span>
                                    </td>
                                    <td className="p-4 border-b">{car.note}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default CarTable