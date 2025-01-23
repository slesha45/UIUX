import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import heart icon
import { useNavigate } from 'react-router-dom';
import { addToPlansApi, addToWishlistApi, removeFromWishlistApi } from '../apis/Api';
import { toast } from 'react-toastify';

const EventCard = ({ event }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setIsWishlisted(wishlist.includes(event._id));
  }, [event._id]);

  const handleWishlistToggle = async () => {
    try {
      if (isWishlisted) {
        const response = await removeFromWishlistApi(event._id);
        if (response.data.success) {
          setIsWishlisted(false);
          toast.success(response.data.message || "Removed from wishlist");

          let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
          wishlist = wishlist.filter((item) => item !== event._id);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
        } else {
          toast.error(response.data.message || "Failed to remove from wishlist");
        }
      } else {
        const response = await addToWishlistApi(event._id);
        if (response.data.success) {
          setIsWishlisted(true);
          toast.success(response.data.message || "Added to wishlist");

          let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
          wishlist.push(event._id);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
        } else {
          toast.error(response.data.message || "Failed to add to wishlist");
        }
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
      toast.error('An error occurred while updating the wishlist');
    }
  }

  const handleSeeMore = () => {
    navigate(`/details/${event._id}`);
  };

  const handleAddToPlans = async () => {
    try {
      const response = await addToPlansApi(event._id);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to add to plans");
      }
    } catch (error) {
      console.error("Failed to add to plans:", error);
      toast.error("An error occurred while adding to plans");
    }
  }

  return (
    <div className="relative border rounded-lg shadow-md font-poppins overflow-hidden">
      {/* Badge */}
      <div className="absolute top-2 left-2 bg-primary text-white text-sm px-3 py-1 rounded-full z-10">
        {event.eventCategory}
      </div>

      {/* Wishlist Button */}
      <button 
      onClick={handleWishlistToggle} 
      className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-2 shadow z-10 hover:text-red-600">
         {isWishlisted ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-500" />
        )}
      </button>

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
        <button
          onClick={handleAddToPlans}
          className="bg-primary text-white py-1 px-4 rounded hover:bg-secondary-dark">
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
