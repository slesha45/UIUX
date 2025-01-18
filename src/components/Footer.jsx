import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-10 font-poppins">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-4">
                {/* Container 1 (40%) */}
                <div className="md:col-span-2">
                    <h3 className="font-jacques text-4xl mb-4 ">JHAKAS</h3>
                    <h3 className="font-jacques text-4xl mb-4 ">EVENTS</h3>
                    <p className="text-sm leading-relaxed">Our journey has been extensive, giving</p>
                    <p className="text-sm leading-relaxed">us the expertise to provide you with the</p>
                    <p className="text-sm leading-relaxed">services that are efficient as well as</p>
                    <p className="text-sm leading-relaxed">cost-effective.</p>
                </div>

                {/* Container 2 (20%) */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li className="text-sm hover:underline cursor-pointer">
                            Maitidevi, Kathmandu
                        </li>
                        <li className="text-sm hover:underline cursor-pointer">
                            jhakasevents@gmail.com
                        </li>
                        <li className="text-sm hover:underline cursor-pointer">
                            +977 9874563214
                        </li>
                    </ul>
                </div>

                {/* Container 3 (20%) */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Account</h3>
                    <ul className="space-y-2">
                        <li className="text-sm hover:underline cursor-pointer">My Account</li>
                        <li className="text-sm hover:underline cursor-pointer">Login / Register</li>
                        <li className="text-sm hover:underline cursor-pointer">My Plans</li>
                        <li className="text-sm hover:underline cursor-pointer">My Wishlist</li>
                        <li className="text-sm hover:underline cursor-pointer">My Bookings</li>
                    </ul>
                </div>

                {/* Container 4 (20%) */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Quick Link</h3>
                    <ul className="space-y-2">
                        <li className="text-sm hover:underline cursor-pointer">Our Services</li>
                        <li className="text-sm hover:underline cursor-pointer">Terms of Use</li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center text-sm mt-10 pt-4">
                <div className="flex justify-center space-x-6 mb-4">
                    <FaFacebook className="text-white hover:text-gray-400 transition text-lg" />
                    <FaInstagram className="text-white hover:text-gray-400 transition text-lg" />
                    <FaLinkedin className="text-white hover:text-gray-400 transition text-lg" />
                </div>
                <p>&copy; Copyright 2025. All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
