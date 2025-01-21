import React from 'react'

const BookingForm = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative overflow-hidden"
        style={{ marginTop: "5rem" }}>
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={() => console.log("Close modal")}
        >
          &#x2715;
        </button>

        <h2 className="text-lg font-medium text-primary mb-2">Book your event</h2>

        <div className="text-right text-red-500 font-medium text-sm mb-4">
          Price:
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select event type</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Balloon">Balloon</option>
              <option value="Entrance">Entrance</option>
              <option value="Mandap">Mandap</option>
              <option value="Passage">Passage</option>
              <option value="Stage">Stage</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white rounded-md py-2 hover:bg-gray-800"
          >
            BOOK
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm
