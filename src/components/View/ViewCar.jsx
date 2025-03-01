import React from 'react'
import ViewCard from '../View/ViewCard'
import Layout from '../../Layout'

const ViewCar = () => {
    return (
        <Layout>
            <div className='flex justify-center h-screen items-start'>
                <div className='bg-white p-6 rounded-lg shadow-md mt-5'>
                    <form className='flex flex-col gap-4'>
                        <input
                            type="text"
                            placeholder='Search cars...'
                            className='flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                        />
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col'>
                                <label htmlFor="type" className='text-sm text-gray-600 mb-1'>Type</label>
                                <select
                                    name="type"
                                    id="type"
                                    className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                                >
                                    <option value="">All Types</option>
                                    <option value="Toyota">Toyota</option>
                                    <option value="Ford">Ford</option>
                                    <option value="Tesla">Tesla</option>
                                    <option value="BYD">BYD</option>
                                </select>
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="availability" className='text-sm text-gray-600 mb-1'>Availability</label>
                                <select
                                    name="availability"
                                    id="availability"
                                    className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                                >
                                    <option value="">All</option>
                                    <option value="Available">Available</option>
                                    <option value="Not Available">Not Available</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <ViewCard />
                </div>
            </div>
        </Layout>
    )
}

export default ViewCar