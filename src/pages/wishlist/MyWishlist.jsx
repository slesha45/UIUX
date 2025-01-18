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
  }, [])

  const fetchWishlist = async () => {
    try {
      const res = await getUserWishlistApi();
      if (Array.isArray(res.data.data)) {
        setWishlist(res.data.data);
      } else {
        throw new Error('Wishlist data is not an array');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching wishlist");
    }
  };

  const handleRemove = async (eventId) => {
    const confirmDialog = window.confirm("Are you sure you want to remove this event from your wishlist?");
    if (confirmDialog) return;
    try {
      await removeFromWishlistApi(eventId);
      toast.success("Event removed from wishlist");
      fetchWishlist();
    } catch (err) {
      setError(err.response?.data?.message || "Error removing event from wishlist");
      toast.error('Error removing event from wishlist');
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-jacques mb-6">My Wishlist</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 font-poppins">
            <div className="border rounded-lg shadow-sm hover:shadow-lg overflow-hidden">
              <img
                src="wedding.png" // Replace with actual image URL
                alt="Royal red and white stage"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">Royal red and white stage</h2>
                <p className="text-red-500 font-bold mb-4">Rs 9,000</p>
                <div className='flex justify-center'>
                  <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
                    Add to plans
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyWishlist;
