import React, { useEffect, useState } from "react";
import { getUserBookings, updatePaymentMethod } from "../../apis/Api";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import KhaltiCheckout from "khalti-checkout-web"; // <--- Import Khalti SDK

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
      setError("Failed to fetch bookings");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (isoDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  };

  const handlePaymentMethod = async (bookingId, method) => {
    try {
      await updatePaymentMethod({ bookingId, paymentMethod: method });
      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b._id === bookingId ? { ...b, paymentMethod: method } : b
        )
      );
    } catch (error) {
      console.error("Error updating payment method:", error);
    }
  };

  // ------------------------------------------------
  // 2. KHALTI INTEGRATION
  // ------------------------------------------------
  // Sample config — adjust to your keys/needs
  const khaltiConfig = {
    // For demonstration, using a sample test key;
    // Replace with your actual key from environment if needed.
    publicKey: "test_public_key_0e1cf205988d4124b151e7a0288cefa4",
    productIdentity: "1234567890", // you can set dynamic ID if needed
    productName: "Event Booking",
    productUrl: window.location.href, // or your booking page URL
    eventHandler: {
      onSuccess(payload) {
        console.log("Khalti Payment Success:", payload);
        alert("Payment successful!");
        // You can add more logic here, e.g., calling your backend to finalize the booking
      },
      onError(error) {
        console.log("Khalti Payment Error:", error);
        alert("Payment failed. Please try again.");
      },
      onClose() {
        console.log("Khalti widget is closing.");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  // This function opens the Khalti widget for a specific booking
  const handleKhaltiPayment = (bookingData) => {
    // 1) Optionally set paymentMethod in your DB:
    handlePaymentMethod(bookingData._id, "khalti");

    // 2) Show Khalti widget
    let checkout = new KhaltiCheckout(khaltiConfig);

    // The Khalti SDK requires the amount in **paisa**.
    // If bookingData.totalPrice is in rupees, multiply by 100.
    const amountInPaisa = bookingData.totalPrice * 100;

    checkout.show({ amount: amountInPaisa });
  };
  // ------------------------------------------------

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>

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
                <tr key={data._id}>
                  <td className="px-4 py-2">{data.eventType}</td>
                  <td className="px-4 py-2">Rs {data.totalPrice}</td>
                  <td className="px-4 py-2">{formatDate(data.date)}</td>
                  <td className="px-4 py-2">{data.time}</td>
                  <td className="px-4 py-2">{data.status}</td>
                  <td className="px-4 py-2">
                    {data.paymentMethod ? (
                      // If already chosen, display the chosen payment method
                      <p className=" text-gray-700 px-4 py-2 rounded-md">
                        {data.paymentMethod}
                      </p>
                    ) : (
                      // If not chosen yet, allow user to pick
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handlePaymentMethod(data._id, "cod")
                          }
                          className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition"
                        >
                          Pay on Arrival
                        </button>

                        {/* KHALTI PAYMENT BUTTON */}
                        <button
                          onClick={() => handleKhaltiPayment(data)}
                          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
                        >
                          Khalti Payment
                        </button>
                        {/* END KHALTI PAYMENT BUTTON */}
                      </div>
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
