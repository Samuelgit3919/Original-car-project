import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Car, LogOut, Menu, X } from 'lucide-react';
import ProtectedRoute from '../ProtetctedRoute';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsMobileMenuOpen(false);
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Car className="h-8 w-8 text-blue-600" />
                        <span className="ml-2 text-xl font-bold text-gray-900">
                            VehicleManagement
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/viewCar"
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            ViewCars
                        </Link>

                        {isLoggedIn && userRole === 'manager' && (
                            <Link
                                to="/manager"
                                className="text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                Manager
                            </Link>
                        )}

                        {isLoggedIn && userRole === 'admin' && (
                            <Link
                                to="/admin"
                                className="text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                Admin
                            </Link>
                        )}

                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                <span className="flex items-center">
                                    <LogOut className="h-5 w-5 mr-2" />
                                    Logout
                                </span>

                            </button>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:text-blue-600"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="pt-4 space-y-2">
                            <Link
                                to="/"
                                className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/viewCar"
                                className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                ViewCars
                            </Link>

                            {isLoggedIn && userRole === 'manager' && (
                                <Link
                                    to="/manager"
                                    className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Manager
                                </Link>
                            )}

                            {isLoggedIn && userRole === 'admin' && (
                                <Link
                                    to="/admin"
                                    className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Admin
                                </Link>
                            )}

                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                >
                                    <span className="flex items-center">
                                        <LogOut className="h-5 w-5 mr-2" />
                                        Logout
                                    </span>

                                </button>
                            ) : (
                                <div className="pt-4 border-t border-gray-200">
                                    <Link
                                        to="/login"
                                        className="block px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="block px-3 py-2 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

// Export both components
export default Header;