import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Changed Link to NavLink
import { Car, LogOut, Menu, X } from 'lucide-react';

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

    // Style for active link
    const activeLinkStyle = ({ isActive }) =>
        isActive
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-blue-600';

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
                        <NavLink
                            to="/"
                            className={activeLinkStyle}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/viewCar"
                            className={activeLinkStyle}
                        >
                            ViewCars
                        </NavLink>

                        {isLoggedIn && userRole === 'manager' && (
                            <NavLink
                                to="/manager"
                                className={activeLinkStyle}
                            >
                                Manager
                            </NavLink>
                        )}

                        {isLoggedIn && userRole === 'admin' && (
                            <NavLink
                                to="/admin"
                                className={activeLinkStyle}
                            >
                                Admin
                            </NavLink>
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
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'px-4 py-2 text-blue-600 border-b-2 border-blue-600'
                                            : 'px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
                                    }
                                >
                                    Sign In
                                </NavLink>
                                <NavLink
                                    to="/signup"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'px-4 py-2 bg-blue-600 text-white border-b-2 border-blue-800 rounded-md'
                                            : 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
                                    }
                                >
                                    Sign Up
                                </NavLink>
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
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'block px-3 py-2 text-blue-600 bg-gray-100 rounded-md'
                                        : 'block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md'
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/viewCar"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'block px-3 py-2 text-blue-600 bg-gray-100 rounded-md'
                                        : 'block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md'
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                ViewCars
                            </NavLink>

                            {isLoggedIn && userRole === 'manager' && (
                                <NavLink
                                    to="/manager"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'block px-3 py-2 text-blue-600 bg-gray-100 rounded-md'
                                            : 'block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md'
                                    }
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Manager
                                </NavLink>
                            )}

                            {isLoggedIn && userRole === 'admin' && (
                                <NavLink
                                    to="/admin"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'block px-3 py-2 text-blue-600 bg-gray-100 rounded-md'
                                            : 'block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md'
                                    }
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Admin
                                </NavLink>
                            )}

                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors w-full text-left"
                                >
                                    <span className="flex items-center">
                                        <LogOut className="h-5 w-5 mr-2" />
                                        Logout
                                    </span>
                                </button>
                            ) : (
                                <div className="pt-4 border-t border-gray-200">
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'block px-3 py-2 text-blue-600 bg-blue-50 rounded-md'
                                                : 'block px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md'
                                        }
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </NavLink>
                                    <NavLink
                                        to="/signup"
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'block px-3 py-2 mt-2 bg-blue-600 text-white border-b-2 border-blue-800 rounded-md'
                                                : 'block px-3 py-2 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                                        }
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign Up
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;