import React from 'react';

export default function EmailConfirmation() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow text-center max-w-md">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Confirm Your Email</h2>
                <p className="text-gray-700">
                    We've sent a confirmation link to your email address. Please check your inbox and click the link to activate your account.
                </p>
                <p className="mt-4 text-sm text-gray-500">Didn't receive the email? Check your spam folder or contact support.</p>
            </div>
        </div>
    );
}
