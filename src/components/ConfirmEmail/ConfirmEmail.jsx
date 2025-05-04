import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = "https://car-availability.onrender.com/api";

export default function ConfirmEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const [message, setMessage] = useState('Verifying your email...');
    const [error, setError] = useState('');

    useEffect(() => {
        if (token) {
            axios.post(`${api}/auth/confirm-email`, { token })
                .then(() => {
                    setMessage('Your email has been confirmed! You can now log in.');
                    setTimeout(() => navigate('/login'), 3000); // redirect after 3 sec
                })
                .catch(() => {
                    setError('Invalid or expired token. Please request a new confirmation email.');
                });
        } else {
            setError('No token provided.');
        }
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow text-center max-w-md">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Email Confirmation</h2>
                {error ? (
                    <p className="text-red-600">{error}</p>
                ) : (
                    <p className="text-gray-700">{message}</p>
                )}
            </div>
        </div>
    );
}
