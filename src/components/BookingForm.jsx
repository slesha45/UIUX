import React, { useState, useEffect } from "react";
import { createBooking, getUserProfileApi } from "../apis/Api";
import { toast } from "react-toastify";

const BookingForm = ({ onClose, onBookingCreated, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    eventType: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfileApi();
        setFormData((prevData) => ({
          ...prevData,
          name: response.data.fullName,
          email: response.data.email,
        }));
      } catch (error) {
        toast.error("Failed to fetch user details.");
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors as the user types
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.time) newErrors.time = "Time is required.";
    if (!formData.eventType) newErrors.eventType = "Event type is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.warning("Please fill all the required fields.");
      return;
    }

    try {
      const response = await createBooking({
        ...formData,
        planId: initialData.planId, // Add planId
        totalPrice: initialData.price,
      });
      onBookingCreated(response.data.booking);
      onClose();
    } catch (error) {
      console.error("Failed to create booking:", error);
      toast.error("Booking failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white w-96 rounded-lg shadow-lg p-6 relative overflow-hidden"
        style={{ marginTop: "5rem" }}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &#x2715;
        </button>

        <h2 className="text-lg font-medium text-primary mb-2">Book your event</h2>

        <div className="text-right text-red-500 font-medium text-sm mb-4">
          Price: Rs {initialData.price}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${
                errors.phone ? "border-red-500" : "focus:ring-blue-400"
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${
                errors.date ? "border-red-500" : "focus:ring-blue-400"
              }`}
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          {/* Time Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${
                errors.time ? "border-red-500" : "focus:ring-blue-400"
              }`}
            />
            {errors.time && (
              <p className="text-red-500 text-sm mt-1">{errors.time}</p>
            )}
          </div>

          {/* Event Type Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select event type
            </label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${
                errors.eventType ? "border-red-500" : "focus:ring-blue-400"
              }`}
            >
              <option value="">Select Event Type</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
              <option value="Engagement">Engagement</option>
              <option value="Mehendi">Mehendi</option>
              <option value="Reception">Reception</option>
              <option value="Wedding">Wedding</option>
            </select>
            {errors.eventType && (
              <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white rounded-md py-2 hover:bg-gray-800"
          >
            BOOK
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;