import React, { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact/contact",
        formData
      );
      toast.success(response.data.message || "Message submitted successfully");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
      setErrors({}); // Clear errors on successful submission
    } catch (error) {
      toast.error(
        (error.response && error.response.data && error.response.data.message) ||
        "Error submitting form"
      );
    }
  };

  return (
    <div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h1 className="text-5xl font-jacques mb-6">Contact Us</h1>
        <p className="text-gray-400 mb-6">
          We are available 24/7 for you. Feel free to reach out to us.
        </p>

        {/* Main Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Form */}
          <div className="w-full lg:w-2/5">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-white p-4 rounded shadow-md"
              aria-label="Contact Us Form"
            >
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.firstName ? "border-red-500" : "border-gray-300"
                    } rounded focus:border-primary focus:ring-2 focus:ring-primary outline-none text-sm`}
                  aria-required="true"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"
                    } rounded focus:border-primary focus:ring-2 focus:ring-primary outline-none text-sm`}
                  aria-required="true"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                    } rounded focus:border-primary focus:ring-2 focus:ring-primary outline-none text-sm`}
                  aria-required="true"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full p-2 border ${errors.message ? "border-red-500" : "border-gray-300"
                    } rounded focus:border-primary focus:ring-2 focus:ring-primary outline-none text-sm`}
                  aria-required="true"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark transition text-sm"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Google Map */}
          <div className="w-full lg:w-3/5">
            <iframe
              title="Google Map"
              className="w-full h-72 lg:h-full border-0 rounded"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.122217439391!2d85.31679601505892!3d27.7090313322831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1991e898e9b3%3A0xdb8c53a63e73e541!2sMaitidevi%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1602573320345!5m2!1sen!2snp"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Call Us */}
          <div className="flex flex-col items-center bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black ">
              <MdCall className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-500">+977 9874563214</p>
          </div>

          {/* Mail Us */}
          <div className="flex flex-col items-center bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black ">
              <IoMail className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mail Us</h3>
            <p className="text-gray-500">jhakasevents@gmail.com</p>
          </div>

          {/* Visit Us */}
          <div className="flex flex-col items-center bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black ">
              <FaLocationDot className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-500">Maitidevi, Kathmandu</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
