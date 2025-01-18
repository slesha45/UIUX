import React, { useState } from 'react';

const BookingForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    eventType: '',
    eventPrice: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Book Your Event</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
              placeholder="Your Phone Number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Event Type</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
              required
            >
              <option value="">Select event type</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Corporate">Corporate</option>
              <option value="Engagement">Engagement</option>
              <option value="Mehendi">Mehendi</option>
              <option value="Reception">Reception</option>
              <option value="Wedding">Wedding</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Event Price</label>
            <input
              type="number"
              name="eventPrice"
              value={formData.eventPrice}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
              placeholder="Event Price"
              required
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md w-full hover:bg-primary transition"
            >
              BOOK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;