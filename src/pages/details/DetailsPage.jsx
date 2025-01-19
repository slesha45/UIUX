import React, { useEffect, useState } from "react";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import {
  getSingleEvent,
  getReviewsApi,
  addToWishlistApi,
  removeFromWishlistApi,
} from "../../apis/Api";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";

const DetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch event details and reviews
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventResponse = await getSingleEvent(id);
        if (eventResponse.data.success) {
          setEvent(eventResponse.data.Event);
        }

        const reviewResponse = await getReviewsApi(id);
        if (reviewResponse.data.success) {
          setReviews(reviewResponse.data.reviews);
        }
      } catch (error) {
        console.error("Failed to fetch event details or reviews:", error);
      }
    };

    fetchEventDetails();
  }, [id]);

  // Check if event is already in wishlist (using localStorage)
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlist.includes(event?.id)) {
      setIsWishlisted(true);
    }
  }, [event]);

  // Add/Remove from Wishlist
  const handleWishlistToggle = async () => {
    try {
      if (isWishlisted) {
        const response = await removeFromWishlistApi(event._id);
        if (response.data.success) {
          setIsWishlisted(false);
          toast.success(response.data.message || "Removed from wishlist");

          // Remove from localStorage
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

          // Add to localStorage
          let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
          wishlist.push(event._id);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
        } else {
          toast.error(response.data.message || "Failed to add to wishlist");
        }
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      toast.error("An error occurred while updating the wishlist");
    }
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
    }
  };

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 font-poppins">
        {/* Event Header */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Event Image */}
          <div className="flex-1 relative">
            <img
              src={`http://localhost:5000/public/eventMain/${event.eventImage}`}
              alt={event.eventTitle}
              className="w-full h-auto rounded-lg shadow-md"
            />
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
            >
              {isWishlisted ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-500" />
              )}
            </button>
          </div>

          {/* Event Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-jacques mb-4">{event.eventTitle}</h1>
            <p className="text-lg text-red-600 mb-2">Rs {event.eventPrice}</p>
            <p className="text-sm text-gray-500 mb-6">Views: {event.views} views</p>

            {/* Decoration Description Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-jacques mb-10">Decoration Description</h2>
              <p className="text-gray-700 mb-6">{event.eventDescription}</p>
              <div className="flex justify-center">
                <button
                  onClick={handleAddToPlans}
                  className="bg-primary text-white py-2 px-6 rounded hover:bg-secondary-dark"
                >
                  Add to Plans
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews and Ratings Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Reviews and Ratings</h2>

          {/* Display Reviews */}
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="mb-6">
                <div className="flex items-center gap-1 mb-1">
                  {Array(review.rating)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  {Array(5 - review.rating)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar key={i} className="text-gray-300" />
                    ))}
                </div>
                <p className="text-gray-800 mt-2">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailsPage;
