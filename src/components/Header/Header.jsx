import React, { useState } from 'react';
import { FaCarSide, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className='text-xl sticky top-0 left-0 w-full z-50 px-8 text-md font-semibold flex justify-between items-center bg-teal-900 p-2 text-white'>
            <div className='flex items-center gap-4'>
                <FaCarSide className='text-3xl text-blue-200' />
                <h1 className='font-semibold'>Car Management</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className='hidden md:flex  space-x-4 justify-center items-center gap-4'>
                <ul className='flex space-x-4'>
                    <li>
                        <Link to="/viewcar" className='hover:text-blue-200 transition-colors duration-200'>View</Link>
                    </li>
                    <li>
                        <Link to="/" className='hover:text-blue-200 transition-colors duration-200'>Table</Link>
                    </li>
                </ul>
            </nav>

            {/* Mobile Menu Toggle Button */}
            <button
                className='md:hidden text-2xl focus:outline-none'
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
            >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Mobile Navigation */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-12 right-0 bg-teal-900 w-full p-2`}>
                <ul className='flex flex-col space-y-4'>
                    <li>
                        <Link to="/view" className='hover:text-blue-200 text-xl transition-colors duration-200'>View</Link>
                    </li>
                    <li>
                        <Link to="/table" className='hover:text-blue-200 text-xl transition-colors duration-200'>Table</Link>
                    </li>
                    <li>
                        <Link to="/signup" className='hover:text-blue-200 text-xl transition-colors duration-200'>SignUp</Link>
                    </li>
                    <li>
                        <Link to="/login" className='bg-[#0d0c22] border-none px-4 py-2 flex items-center justify-center border rounded-lg hover:bg-[#1a1a2e] transition-colors duration-200'>Login</Link>
                    </li>
                </ul>
            </div>

            {/* Desktop Auth Links */}
            <div className='hidden md:flex justify-center items-center gap-4 text-xl'>
                <Link to="/signup" className='hover:text-blue-200 text-sm font-semibold transition-colors duration-200'>SignUp</Link>
                <Link to="/login" className='bg-[#0d0c22] py-2 px-4 flex items-center font-semibold text-sm justify-center border rounded-lg hover:bg-[#1a1a2e] transition-colors duration-200'>Login</Link>
            </div>
        </header>
    );
};

export default Header;