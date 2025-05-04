import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [role, setRole] = useState('');

    // Base API URL - adjust this to your backend endpoint
    // const API_BASE_URL = https://car-availability.onrender.com
    const api = "https://car-availability.onrender.com/api";

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email');
            setLoading(false);
            return;
        }
        if (!role) {
            setError('Please select a role');
            setLoading(false);
            return;
        }

        try {
            console.log("sending registration request to backend")
            const response = await axios.post(`${api}/auth/register`, {
                name,
                role,
                email,
                password,
            });

            console.log("response.status:", response.status);
            console.log("response.data:", response.data);

            if (response.status >= 200 && response.status < 300) {
                console.log('Registration successful, navigating to login...');
                navigate('/emailConfirmation', { replace: true });
            } else {
                throw new Error(response.data?.message || 'Registration failed');
            }
        }
        catch (err) {
            console.error('Registration error:', err);

            if (err.response) {
                const msg = err.response.data?.msg || '';

                if (err.response.status === 403 && msg.includes('verify your email')) {
                    // ✅ Treat it as a success and navigate to emailConfirmation
                    navigate('/emailConfirmation', {
                        replace: true,
                        state: { email, message: msg },
                    });
                } else if (err.response.status === 400) {
                    setError(err.response.data.message || 'Validation error');
                } else if (err.response.status === 409) {
                    setError('Email already exists');
                } else {
                    setError('Registration failed. Please try again.');
                }
            } else if (err.request) {
                setError('Network error. Please check your connection.');
            } else {
                setError("Unexpected error. Please try again.");
            }
        }

        finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="flex items-center justify-center mb-8">
                    {/* You can uncomment this if you want the car icon */}
                    {/* <Car className="h-12 w-12 text-blue-600" /> */}
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            minLength="6"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            minLength="6"
                        />

                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Select Role
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">-- Select Role --</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
                                Creating Account...
                            </span>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-blue-600 hover:underline focus:outline-none"
                    >
                        Sign in here
                    </button>
                </p>
            </div>
        </div>
    );
}