import React, { useState } from 'react';
import BookingForm from './Bookingform';


const PackageCard = ({ title, description, price, imageUrl, backgroundColor }) => {
  const [showForm, setShowForm] = useState(false);

  const handleBookingSubmit = (formData) => {
    console.log('Booking Data:', formData);
    setShowForm(false);
    // Call API to submit booking data
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg flex flex-col font-poppins" style={{ backgroundColor }}>
      <div className="text-center">
        <h2 className="text-white text-lg uppercase" style={{ backgroundColor }}>
          {title}
        </h2>
      </div>
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <p className="text-white text-sm mb-4">{description}</p>
        <p className="text-white text-lg font-semibold mb-4">Price - {price}</p>
        <div className="flex justify-center">
          <button
            className="bg-white text-gray-900 py-2 rounded shadow hover:bg-gray-200 transition text-sm w-24"
            onClick={() => setShowForm(true)}
          >
            BOOK
          </button>
        </div>
      </div>
      {showForm && <BookingForm onClose={() => setShowForm(false)} onSubmit={handleBookingSubmit} />}
    </div>
  );
};

export default PackageCard;
