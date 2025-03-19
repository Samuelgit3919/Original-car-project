import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Simulate login - replace with actual API call in production
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Store token and role in localStorage
            localStorage.setItem('token', 'some-auth-token');
            const role = email.includes('admin') ? 'admin' : 'manager';
            localStorage.setItem('role', role);

            // Navigate based on role
            navigate(role === 'admin' ? '/admin' : '/manager');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center justify-center mb-8">
                    <Car className="h-12 w-12 text-blue-600 animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    Car Management System
                </h2>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm animate-fade-in">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} noValidate>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-semibold mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${error && !email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter your email"
                            required
                            disabled={loading}
                            aria-describedby={error && !email ? 'email-error' : undefined}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-semibold mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${error && !password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter your password"
                            required
                            disabled={loading}
                            aria-describedby={error && !password ? 'password-error' : undefined}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    />
                                </svg>
                                Signing In...
                            </span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                        onClick={() => navigate('/signup')}
                        disabled={loading}
                        className="text-blue-600 hover:underline focus:outline-none disabled:opacity-50"
                    >
                        Create account
                    </button>
                </p>

                <p className="mt-2 text-center text-xs text-gray-500">
                    Forgot password?{' '}
                    <button
                        onClick={() => navigate('/forgot-password')} // Fixed typo in route
                        disabled={loading}
                        className="text-blue-600 hover:underline focus:outline-none disabled:opacity-50"
                    >
                        Reset here
                    </button>
                </p>
            </div>
        </div>
    );
}