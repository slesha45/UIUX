import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getUserWishlistApi, removeFromWishlistApi } from '../../apis/Api';
import { toast } from 'react-toastify';

const MyWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await getUserWishlistApi();
      if (res.data.success && Array.isArray(res.data.data)) {
        setWishlist(res.data.data);
      } else {
        toast.error("Failed to fetch wishlist");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching wishlist");
    }
  };

  const handleRemove = async (eventId) => {
    const confirmDialog = window.confirm("Are you sure you want to remove this event from your wishlist?");
    if (!confirmDialog) return;

    try {
      const response = await removeFromWishlistApi(eventId);
      if (response.data.success) {
        toast.success(response.data.message || "Event removed from wishlist");
        fetchWishlist();
      } else {
        toast.error(response.data.message || "Failed to remove from wishlist");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error removing event from wishlist");
    }
  };

  return (
    <div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h1 className="text-5xl font-jacques mb-6">My Wishlist</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {wishlist.length === 0 ? (
          <p className='mb-40'>Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 font-poppins">
            {wishlist.map((event) => (
              <div key={event._id} className="border rounded-lg shadow-sm hover:shadow-lg overflow-hidden mb-6">
                <img
                  src={`http://localhost:5000/public/eventMain/${event.eventImage}`}
                  alt={event.eventTitle}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{event.eventTitle}</h2>
                  <p className="text-red-500 font-bold mb-4">Rs {event.eventPrice}</p>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleRemove(event._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                    <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
                      Add to plans
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyWishlist;
