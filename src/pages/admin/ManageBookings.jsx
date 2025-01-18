import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getAllBookings, updateBookingStatus } from "../../apis/Api";
import { toast } from "react-toastify";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getAllBookings();
        console.log(response.data);
        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleApprove = async (bookingId) => {
    try {
      await updateBookingStatus({ bookingId, status: "approved" });
      const updatedBookings = bookings.map((booking) =>
        booking._id === bookingId ? { ...booking, status: "approved" } : booking
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error approving booking:", error);
      toast.error("Failed to approve booking.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-64 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Manage Bookings
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading bookings...</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded shadow-md">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-2 border border-gray-300">User</th>
                  <th className="px-4 py-2 border border-gray-300">Event</th>
                  <th className="px-4 py-2 border border-gray-300">Date</th>
                  <th className="px-4 py-2 border border-gray-300">Time</th>
                  <th className="px-4 py-2 border border-gray-300">Status</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Payment Method
                  </th>
                  <th className="px-4 py-2 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="even:bg-gray-100 odd:bg-white"
                    >
                      <td className="px-4 py-2 border border-gray-300">
                        {booking.user?.fullName}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {booking.event?.eventTitle}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {booking.time}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {booking.status}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {booking.paymentMethod}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        {booking.status === "pending" && (
                          <button
                            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                            onClick={() => handleApprove(booking._id)}
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-4 text-gray-500 border border-gray-300"
                    >
                      No bookings available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
