import { Car, Settings, Shield, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Hero Section */}
            <header className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                Modern Vehicle Management
                            </span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Streamline your vehicle inventory management with our intuitive platform.
                            Track, analyze, and optimize your fleet with real-time data and smart insights.
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 gap-4">
                            <Link
                                to="/login"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                            >
                                Get Started
                            </Link>
                            <Link
                                to="/features"
                                className="mt-3 inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 sm:mt-0"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Grid */}
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                            Features
                        </h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to manage your fleet
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    icon: Car,
                                    title: "Real-time Tracking",
                                    description: "Monitor vehicle status, location, and availability in real-time"
                                },
                                {
                                    icon: Settings,
                                    title: "Inventory Management",
                                    description: "Manage stock numbers, vehicle details, and maintenance records"
                                },
                                {
                                    icon: Shield,
                                    title: "Security First",
                                    description: "Role-based access control and encrypted data storage"
                                },
                                {
                                    icon: BarChart,
                                    title: "Advanced Analytics",
                                    description: "Generate detailed reports and performance insights"
                                }
                            ].map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                                >
                                    <feature.icon className="h-12 w-12 text-blue-600" />
                                    <h3 className="mt-4 text-xl font-semibold text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            <span className="block">Ready to revolutionize your fleet management?</span>
                        </h2>
                        <div className="mt-8 flex justify-center">
                            <Link
                                to="/signup"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 transition-colors duration-200"
                            >
                                Create Free Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;