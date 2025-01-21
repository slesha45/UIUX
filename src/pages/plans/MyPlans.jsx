import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPlansApi, removeFromPlansApi } from '../../apis/Api';
import BookingForm from '../../components/BookingForm';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';


const MyPlans = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getPlansApi();
        setPlans(response.data.plans);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch plans");
        setLoading(false);
      }
    }
    fetchPlans();
  }, [])

  const totalCost = plans.reduce((sum, plan) => sum + (plan.event.eventPrice || 0), 0);

  const deletePlan = async (eventId) => {
    try {
      await removeFromPlansApi(eventId);
      setPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== eventId));
    } catch (error) {
      toast.success("Failed to delete plan");
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h1 className="text-5xl font-jacques mb-6">My Plans</h1>

        {/* Plans Section */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 font-poppins">
          {plans.length > 0 ? (
            plans.map((plan) => (
              console.log("plkjhrekjan", plan),
              <div
                key={plan._id}
                className="border rounded-lg shadow-md overflow-hidden relative"
              >
                {/* Image */}

                <img
                  src={plan.event.eventImage}
                  className="w-full h-48 object-cover"
                />
                {/* Details */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{plan.event.eventTitle}</h2>
                  <p className="text-primary font-bold mb-2">Rs {plan.event.eventPrice}</p>
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {Array.from({ length: plan.event.rating }, (_, i) => (
                      <span key={i} className="text-yellow-500">&#9733;</span>
                    ))}
                  </div>
                  {/* Delete Button */}
                  <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    onClick={() => deletePlan(plan._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No plans yet. Start adding some!
            </p>
          )}

          {/* Add More */}
          <div className="border rounded-lg shadow-md flex items-center justify-center text-gray-400">
            <button
              className="flex flex-col items-center"
              onClick={() => navigate('/')}
            >
              <span className="text-4xl font-bold">+</span>
              <span>Add more</span>
            </button>
          </div>
        </div>
        {/* Total Cost Section */}
        <div className="mt-8 p-4 border rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">Total cost:</h2>
          <p className="text-3xl font-bold">Rs {totalCost}</p>
        </div>
        {/* Book Now Button */}
        <button
          className="w-full mt-4 py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-dark mb-4"
          onClick={() => setIsBookingModalOpen(true)}
        >
          BOOK NOW
        </button>
      </div>
      <Footer />

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <BookingForm
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}
    </div>
  );
};
export default MyPlans;
