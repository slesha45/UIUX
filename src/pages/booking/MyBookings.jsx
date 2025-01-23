import React, { useEffect, useState } from 'react';
import { getUserBookings } from '../../apis/Api';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await getUserBookings();
      setBookings(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (isoDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  }

  // Debugging to check if bookings are updated
  useEffect(() => {
    console.log('Updated bookings:', bookings);
  }, [bookings]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h1 className="text-5xl font-jacques mb-6">My Bookings</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse shadow-md rounded-lg overflow-hidden mb-20">
            <thead>
              <tr className="bg-primary text-white">
                <th className="p-3">Event Name</th>
                <th className="p-3">Event Price</th>
                <th className="p-3">Event Date</th>
                <th className="p-3">Event Time</th>
                <th className="p-3">Status</th>
                <th className="p-3">Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((data) => (
                <tr
                  key={data._id}>
                  <td className="px-4 py-2">{data.eventType}</td>
                  <td className="px-4 py-2">Rs {data.totalPrice}</td>
                  <td className="px-4 py-2">{formatDate(data.date)}</td>
                  <td className="px-4 py-2">{data.time}</td>
                  <td className="px-4 py-2">{data.status}</td>
                  <td className="px-4 py-2">
                    {data.paymentMethod ? (
                      <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition">
                        {data.paymentMethod}
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyBookings;