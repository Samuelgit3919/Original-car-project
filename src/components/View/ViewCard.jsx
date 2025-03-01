import React, { useState } from 'react';

const ViewCard = () => {
    const CarsData = [
        {
            id: 1,
            vehicle: 'Tesla Model S',
            image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
            location: 'USA',
            status: 'Available',
            type: 'Luxury',
            year: '2023',
            transmission: "Automatic",
            fuelType: "Electric"
        },
        {
            id: 2,
            vehicle: 'BMW M5',
            image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
            location: 'Germany',
            status: 'Available',
            type: 'Sports',
            year: '2023',
            transmission: "Automatic",
            fuelType: "Petrol"
        },
        {
            id: 3,
            vehicle: 'Mercedes GLE',
            image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
            location: 'Germany',
            status: 'Not Available',
            type: 'SUV',
            year: '2023',
            transmission: "Automatic",
            fuelType: "Diesel"
        }
    ];

    const [card, setCard] = useState(CarsData);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
            {card.map((car) => (
                <div key={car.id} className='bg-white rounded-lg shadow-md overflow-hidden'>
                    <img src={car.image} alt={car.vehicle} className='w-full h-48 object-cover' />
                    <div className='p-4'>
                        <div className='flex justify-between items-center mb-2'>
                            <h1 className='text-xl font-semibold'>{car.vehicle}</h1>
                            <p className={`text-sm ${car.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>{car.status}</p>
                        </div>
                        <p className='text-gray-600 mb-2'>{car.type}</p>
                        <div className='text-sm text-gray-500 mb-2'>
                            <p>Fuel Type: {car.fuelType}</p>
                            <p>Transmission: {car.transmission}</p>
                        </div>
                        <div className='text-sm text-gray-500'>
                            <p>Year: {car.year}</p>
                        </div>
                        <div className='mt-4'>
                            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200'>
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ViewCard;