import React, { useEffect, useState } from "react";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import {
  getSingleEvent,
  getReviewsApi,
  addToWishlistApi,
  removeFromWishlistApi,
  addReviewApi,
  addToPlansApi,
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
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

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

  const handleAddReview = async () => {
    try {
      const reviewData = { rating, comment };
      const response = await addReviewApi(id, reviewData);
      if (response.data.success) {
        toast.success(response.data.message);
        setReviews([response.data.review, ...reviews]);
        setRating(0);
        setComment("");
      } else {
        toast.error(response.data.message || "Failed to add review");
      }
    } catch (error) {
      console.error("Failed to add review:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Please log in first"); // If unauthorized
      } else {
        toast.error("An error occurred while adding the review");
      }
    }
  }

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <>
      <Navbar/>
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


          {/* Fetch and Display Reviews */}
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="mb-6 border-b pb-4">
                <div className="flex items-center gap-1 mb-2">
                  {/* Render filled stars for rating */}
                  {Array.from({ length: review.rating }, (_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                  {/* Render empty stars for remaining */}
                  {Array.from({ length: 5 - review.rating }, (_, i) => (
                    <FaStar key={i} className="text-gray-300" />
                  ))}
                </div>
                <p className="text-gray-800">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Reviewed by: {review.user?.name || "Anonymous"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}

          {/* Add New Review */}
          <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Add a Review</h3>
            <div className="flex items-center gap-2 mb-4">
              {/* Rating Stars */}
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              rows="4"
              placeholder="Write your review"
            />
            <button
              onClick={handleAddReview}
              className="bg-primary text-white py-2 px-6 rounded hover:bg-secondary-dark"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailsPage;
