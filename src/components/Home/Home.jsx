"use client"

/* eslint-disable no-unused-vars */
import { Car, Settings, Shield, BarChart, ArrowRight, CheckCircle, Users } from "lucide-react"
import { Link } from "react-router-dom"
import Layout from "../../Layout"
import { motion } from "framer-motion"
import { useState } from "react"

const WelcomePage = () => {
    const [hovered, setHovered] = useState(null)

    // Enhanced animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut",
            },
        },
    }

    const fadeInRight = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut",
            },
        },
    }

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    }

    const pulseAnimation = {
        scale: [1, 1.05, 1],
        transition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
    }

    // Features data with enhanced descriptions
    const features = [
        {
            icon: Car,
            title: "Real-Time Vehicle Tracking",
            description: "Monitor location, status, and availability of all vehicles in your fleet with instant updates.",
        },
        {
            icon: Settings,
            title: "Customizable Dashboard",
            description: "Configure your admin view with the metrics and data points most important to your operation.",
        },
        {
            icon: Shield,
            title: "Enterprise-Grade Security",
            description: "Role-based access control ensures data is only accessible to authorized personnel.",
        },
        {
            icon: BarChart,
            title: "Advanced Analytics",
            description: "Gain insights through comprehensive reports on vehicle usage, maintenance, and efficiency.",
        },
    ]

    // Benefits data for the new section
    const benefits = [
        "Reduce vehicle downtime by up to 35%",
        "Streamline maintenance scheduling",
        "Improve resource allocation",
        "Enhance accountability across teams",
        "Simplify compliance reporting",
    ]

    return (
        <Layout>
            {/* Hero Section with enhanced gradient and animations */}
            <motion.header
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
            >
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 py-20 sm:py-28 lg:py-32 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600">
                                    Fleet Management Simplified
                                </span>
                            </h1>
                        </motion.div>
                        <motion.p
                            variants={fadeInUp}
                            className="mt-4 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
                        >
                            A powerful platform that connects admins and managers for seamless vehicle oversight, maintenance
                            tracking, and resource optimization.
                        </motion.p>
                        <motion.div variants={staggerChildren} className="mt-10 max-w-md mx-auto sm:flex sm:justify-center gap-4">
                            <motion.div variants={fadeInUp}>
                                <Link
                                    to="/login"
                                    className="group inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    Manager Login
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <Link
                                    to="/login"
                                    className="mt-3 sm:mt-0 inline-flex items-center px-6 py-3 border-2 border-teal-600 text-base font-medium rounded-lg text-teal-600 bg-transparent hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    Admin Access
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative elements */}
                <motion.div
                    className="absolute top-20 right-10 w-20 h-20 rounded-full bg-gradient-to-r from-teal-300 to-cyan-300 opacity-20 blur-xl"
                    animate={pulseAnimation}
                ></motion.div>
                <motion.div
                    className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-emerald-300 to-teal-300 opacity-20 blur-xl"
                    animate={{
                        ...pulseAnimation,
                        transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 },
                    }}
                ></motion.div>
            </motion.header>

            {/* Features Grid with hover effects */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerChildren}
                className="py-20 bg-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <motion.h2 variants={fadeInUp} className="text-base text-teal-600 font-semibold tracking-wide uppercase">
                            Powerful Features
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                        >
                            Everything You Need in One Place
                        </motion.p>
                    </div>

                    <motion.div variants={staggerChildren} className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                onHoverStart={() => setHovered(idx)}
                                onHoverEnd={() => setHovered(null)}
                                className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
                            >
                                {/* Background gradient that appears on hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br from-teal-50 to-cyan-50 transition-opacity duration-300 ${hovered === idx ? "opacity-100" : "opacity-0"}`}
                                ></div>

                                <div className="relative z-10">
                                    <div className="h-14 w-14 rounded-full bg-teal-100 flex items-center justify-center mx-auto">
                                        <feature.icon className="h-8 w-8 text-teal-600" />
                                    </div>
                                    <h3 className="mt-5 text-xl font-semibold text-gray-900 text-center">{feature.title}</h3>
                                    <p className="mt-3 text-base text-gray-600 text-center">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* New Benefits Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerChildren}
                className="py-16 bg-gradient-to-br from-teal-900 to-cyan-900 text-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <motion.div variants={fadeInRight}>
                            <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">Why Organizations Choose Our Platform</h2>
                            <p className="text-lg text-teal-100 mb-8">
                                Our comprehensive solution helps fleet managers and administrators streamline operations and make
                                data-driven decisions.
                            </p>
                            <ul className="space-y-4">
                                {benefits.map((benefit, idx) => (
                                    <motion.li key={idx} variants={fadeInUp} className="flex items-start">
                                        <CheckCircle className="h-6 w-6 text-teal-300 mr-3 flex-shrink-0 mt-0.5" />
                                        <span className="text-teal-50">{benefit}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="mt-12 lg:mt-0 flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl transform rotate-3 scale-105 opacity-20"></div>
                                <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-teal-200/20 shadow-xl">
                                    <div className="flex justify-center mb-6">
                                        <Users className="h-16 w-16 text-teal-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-center mb-4">Join 500+ Organizations</h3>
                                    <p className="text-teal-100 text-center mb-6">
                                        Companies across industries trust our platform for their fleet management needs.
                                    </p>
                                    <div className="flex justify-center">
                                        <Link
                                            to="/contact"
                                            className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-lg text-teal-900 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-800 focus:ring-teal-100 transition-all duration-300"
                                        >
                                            Request Demo
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Testimonial Section with enhanced styling */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-2">What Our Team Says</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-12 rounded-full"></div>

                        <div className="mt-12 max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-500 rounded-full p-3">
                                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                                </svg>
                            </div>
                            <blockquote className="text-xl text-gray-600 italic leading-relaxed">
                                "As a fleet manager, I can now track every vehicle's status in real-time. The maintenance alerts have
                                reduced our downtime by 40%, and the admin dashboard gives me all the insights I need at a glance."
                            </blockquote>
                            <div className="mt-6 flex items-center justify-center">
                                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xl">
                                    JS
                                </div>
                                <div className="ml-4 text-left">
                                    <p className="text-gray-900 font-medium">Jane Smith</p>
                                    <p className="text-teal-600 text-sm">Operations Manager, Acme Logistics</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CTA Section with enhanced gradient and button */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-gradient-to-r from-teal-800 via-teal-700 to-cyan-800 relative overflow-hidden"
            >
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                    <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-white"></div>
                    <div className="absolute top-60 right-0 w-64 h-64 rounded-full bg-white"></div>
                </div>

                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            <span className="block">Ready to transform your fleet management?</span>
                            <span className="block text-teal-200 mt-2">Get started in minutes</span>
                        </h2>
                        <p className="mt-6 max-w-2xl mx-auto text-xl text-teal-100">
                            Join hundreds of organizations that have streamlined their operations with our platform.
                        </p>
                        <motion.div
                            className="mt-10 flex justify-center gap-6"
                            whileInView={{
                                opacity: [0, 1],
                                y: [20, 0],
                                transition: { duration: 0.8, delay: 0.2 },
                            }}
                        >
                            <Link
                                to="/login"
                                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg text-teal-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-800 focus:ring-white transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Get Started
                            </Link>
                            <Link
                                to="/demo"
                                className="inline-flex items-center px-8 py-4 border border-teal-200 text-lg font-semibold rounded-lg text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-800 focus:ring-teal-200 transition-all duration-300"
                            >
                                Watch Demo
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </Layout>
    )
}

export default WelcomePage
