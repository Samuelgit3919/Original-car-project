"use client";
import React from "react";
import { Link } from "react-router";

function MainComponent() {
    return (
        <div className="flex flex-col">
            <div className="flex-grow">{/* Your main content will go here */}</div>

            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-semibold">Car Management System</h3>
                            <p className="text-gray-400">
                                Simplifying your vehicle management needs
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                            <div>
                                <h4 className="font-medium mb-2">Quick Links</h4>
                                <ul className="text-gray-400">
                                    <li className="hover:text-white cursor-pointer">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="hover:text-white cursor-pointer">
                                        <Link to="/admin">admin</Link>
                                    </li>
                                    <li className="hover:text-white cursor-pointer">
                                        <Link to="/manager">manager</Link>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2">Contact</h4>
                                <ul className="text-gray-400">
                                    <li>Email: sami@example.com</li>
                                    <li>Phone: (+251) 939191959</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-700 text-center text-gray-400">
                        <p>© 2025 Car Management System. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default MainComponent;