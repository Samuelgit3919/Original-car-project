import { Car, Settings, Shield, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../../Layout';
import { motion } from 'framer-motion';

const WelcomePage = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <Layout>
            {/* Hero Section */}
            <motion.header
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50"
            >
                <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-32 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                                Organization Vehicle Oversight
                            </span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Empower your team with a secure, admin-controlled platform. Admins set up the system, while managers gain real-time visibility into vehicle statuses.
                        </p>
                        <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center gap-4">
                            <Link
                                to="/login"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                            >
                                Manager Login
                            </Link>
                            <Link
                                to="/login"
                                className="mt-3 sm:mt-0 inline-flex items-center px-6 py-3 border-2 border-blue-600 text-base font-medium rounded-full text-blue-600 bg-transparent hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                            >
                                Admin Access
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Features Grid */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerChildren}
                className="py-16 bg-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                            Features
                        </h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Tools for Admins and Managers
                        </p>
                    </div>

                    <motion.div
                        variants={staggerChildren}
                        className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {[
                            {
                                icon: Car,
                                title: "Vehicle Status Updates",
                                description: "Managers monitor real-time vehicle conditions and availability"
                            },
                            {
                                icon: Settings,
                                title: "Admin Configuration",
                                description: "Admins add vehicles, assign managers, and set permissions"
                            },
                            {
                                icon: Shield,
                                title: "Role-Based Security",
                                description: "Secure access with admin-controlled permissions for managers"
                            },
                            {
                                icon: BarChart,
                                title: "Manager Insights",
                                description: "Managers access status reports and vehicle performance data"
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                            >
                                <feature.icon className="h-12 w-12 text-blue-600 mx-auto" />
                                <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-base text-gray-600 text-center">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Testimonial Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            What Our Team Says
                        </h2>
                        <div className="mt-12 max-w-2xl mx-auto">
                            <blockquote className="text-xl text-gray-600 italic">
                                "As a manager, I can now see every vehicle's status instantly. The admin setup made it seamless to get started."
                            </blockquote>
                            <p className="mt-4 text-gray-900 font-medium">
                                - Jane Smith, Operations Manager
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-gradient-to-r from-blue-900 to-indigo-900"
            >
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            <span className="block">Ready to enhance your organization's fleet oversight?</span>
                            <span className="block text-blue-200">Contact your admin to get started</span>
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-200">
                            Managers: Log in to monitor your fleet. Admins: Set up your team today.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Link
                                to="/login"
                                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full text-blue-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-900 focus:ring-white transition-all duration-300"
                            >
                                Manager Login
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Layout>
    );
};

export default WelcomePage;