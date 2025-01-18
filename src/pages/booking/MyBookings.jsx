import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const MyBookings = () => {
  const bookings = [
    {
      eventName: 'Wedding',
      price: 9000,
      date: '15/02/2025',
      time: '10:00 AM',
      status: 'Pending',
      paymentMethod: 'Proceed to payment',
    },
    {
      eventName: 'Mehendi',
      price: 7000,
      date: '15/02/2025',
      time: '11:00 AM',
      status: 'Pending',
      paymentMethod: 'Proceed to payment',
    },
    {
      eventName: 'Birthday',
      price: 10000,
      date: '15/02/2024',
      time: '07:00 PM',
      status: 'Approved',
      paymentMethod: null,
    },
  ];

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
              {bookings.map((booking, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  } hover:bg-gray-200`}
                >
                  <td className="px-4 py-2">{booking.eventName}</td>
                  <td className="px-4 py-2">Rs {booking.price}</td>
                  <td className="px-4 py-2">{booking.date}</td>
                  <td className="px-4 py-2">{booking.time}</td>
                  <td className="px-4 py-2">{booking.status}</td>
                  <td className="px-4 py-2">
                    {booking.paymentMethod ? (
                      <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition">
                        {booking.paymentMethod}
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