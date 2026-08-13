import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
} from "react-icons/fa";

import {
    HiOutlineEnvelope,
    HiOutlineMapPin,
    HiOutlinePhone,
} from "react-icons/hi2";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="mt-auto border-t border-gray-200 bg-white">

            <div className="mx-auto max-w-7xl px-8 py-10">

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}

                    <div>

                        <motion.h2
                            whileHover={{ scale: 1.03 }}
                            className="text-3xl font-extrabold text-indigo-600"
                        >
                            SalesSavvy
                        </motion.h2>

                        <p className="mt-4 leading-7 text-gray-600">
                            Shop smarter with SalesSavvy. Discover premium
                            products with secure payments and lightning-fast
                            delivery.
                        </p>

                        <div className="mt-6 flex gap-3">

                            <motion.a
                                // whileHover={{ y: -4 }}
                                href="https://Facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-gray-200 p-3 transition hover:border-gray-800 hover:bg-blue-600 hover:text-white"
                            >
                                <FaFacebook size={18} />
                            </motion.a>

                            <motion.a
                                // whileHover={{ y: -4 }}
                                href="https://instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-gray-200 p-3 transition hover:border-pink-500 hover:bg-pink-500 hover:text-white"
                            >
                                <FaInstagram size={18} />
                            </motion.a>

                            <motion.a
                                // whileHover={{ y: -4 }}
                                href="https://linkedin.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-gray-200 p-3 transition hover:border-blue-600 hover:bg-blue-900 hover:text-white"
                            >
                                <FaLinkedin size={18} />
                            </motion.a>

                        </div>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="mb-5 text-lg font-bold text-gray-900">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link
                                    to="/customerhome"
                                    className="text-gray-600 transition hover:text-indigo-600"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/wishlist"
                                    className="text-gray-600 transition hover:text-indigo-600"
                                >
                                    Wishlist
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/cart"
                                    className="text-gray-600 transition hover:text-indigo-600"
                                >
                                    Cart
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/orders"
                                    className="text-gray-600 transition hover:text-indigo-600"
                                >
                                    Orders
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Customer Care */}

                    <div>

                        <h3 className="mb-5 text-lg font-bold text-gray-900">
                            Customer Care
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 transition hover:text-indigo-600"
                                >
                                    About Us
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 transition hover:text-indigo-600"
                                >
                                    Contact
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 transition hover:text-indigo-600"
                                >
                                    Privacy Policy
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 transition hover:text-indigo-600"
                                >
                                    Terms & Conditions
                                </a>
                            </li>

                        </ul>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="mb-5 text-lg font-bold text-gray-900">
                            Contact Us
                        </h3>

                        <div className="space-y-4">

                            <div className="flex items-center gap-3 text-gray-600">

                                <HiOutlineMapPin
                                    size={20}
                                    className="text-indigo-600"
                                />

                                Kerala, India

                            </div>

                            <div className="flex items-center gap-3 text-gray-600">

                                <HiOutlinePhone
                                    size={20}
                                    className="text-indigo-600"
                                />

                                +91 98765 43210

                            </div>

                            <div className="flex items-center gap-3 text-gray-600">

                                <HiOutlineEnvelope
                                    size={20}
                                    className="text-indigo-600"
                                />

                                support@salessavvy.com

                            </div>

                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <div className="mt-12 border-t border-gray-200 pt-6">

                    <div className="flex flex-col items-center justify-between gap-3 text-sm text-gray-500 md:flex-row">

                        <p>
                            © {new Date().getFullYear()} SalesSavvy. All rights reserved.
                        </p>


                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;