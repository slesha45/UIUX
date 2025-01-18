import React from 'react';
import { FaHeart } from 'react-icons/fa'; // Import heart icon
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {

  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate(`/details/${event._id}`);
  };

  return (
    <div className="relative border rounded-lg shadow-md font-poppins overflow-hidden">
      {/* Badge */}
      <div className="absolute top-2 left-2 bg-primary text-white text-sm px-3 py-1 rounded-full z-10">
        {event.eventCategory}
      </div>

      {/* Wishlist Button */}
      {/* <button className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-2 shadow z-10 hover:text-red-600">
        <FaHeart />
      </button> */}

      {/* Event Image */}
      <img
        src={`http://localhost:5000/public/eventMain/${event.eventImage}`}
        alt={event.eventTitle}
        className="w-full h-52 object-cover"
      />

      {/* Event Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{event.eventTitle}</h3>
        <p className="text-red-600 text-sm">Price: NPR {event.eventPrice}</p>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between px-4 pb-4">
        <button className="bg-primary text-white py-1 px-4 rounded hover:bg-secondary-dark">
          Add to Plans
        </button>
        <button 
          onClick={handleSeeMore} className="bg-white text-black py-1 px-4 rounded hover:bg-primary-dark">
          See More »
        </button>
      </div>
    </div>
  );
};

export default EventCard;
