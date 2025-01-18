import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CiSearch } from "react-icons/ci";
import EventCard from '../../components/EventCard';
import { Range } from 'react-range';
import { getAllEvent } from '../../apis/Api'; // Ensure the API is imported

const STEP = 1000;
const MIN = 1000;
const MAX = 140000;

const Homepage = () => {
  const [values, setValues] = useState([1000, 140000]);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch all events from the backend
    getAllEvent()
      .then((res) => {
        setEvents(res.data.Event); // Assuming this is the format returned by the API
      })
      .catch((err) => console.error('Error fetching events:', err));
  }, []);

  const handleChange = (values) => {
    setValues(values);
  };

  // Filter events based on price range and search term
  const filteredEvents = events.filter(
    (event) =>
      event.eventPrice >= values[0] &&
      event.eventPrice <= values[1] &&
      event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      {/* Carousel Section */}
      <div className="mt-4">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          interval={3000}
          className="w-full max-w-7xl mx-auto"
        >
          <div>
            <img
              src="path_to_your_image1.jpg"
              alt="Decoration 1"
              className="rounded-s object-cover h-1/2 w-full"
            />
          </div>
          <div>
            <img
              src="path_to_your_image2.jpg"
              alt="Decoration 2"
              className="rounded-s object-cover h-1/2 w-full"
            />
          </div>
          <div>
            <img
              src="path_to_your_image3.jpg"
              alt="Decoration 3"
              className="rounded-s object-cover h-1/2 w-full"
            />
          </div>
        </Carousel>
      </div>

      {/* Search and Filter Section */}
      <div className="mt-8 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-jacques mb-4">Decorations</h2>
        <div className="bg-darkBlue p-4 rounded-lg flex justify-between items-center gap-4 shadow-lg">
          {/* Search Bar */}
          <div className="relative w-1/2">
            <CiSearch className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400" />
            <input
              type="text"
              placeholder="Search decorations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-md pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center">
            {/* Min Price */}
            <div className="text-sm text-primary bg-white px-4 py-2 rounded-lg shadow mr-4 text-center">
              Min Price
              <br />
              <span className="font-semibold text-lg">NPR {values[0].toLocaleString()}</span>
            </div>

            {/* Range Slider */}
            <div className="w-64">
              <Range
                step={STEP}
                min={MIN}
                max={MAX}
                values={values}
                onChange={handleChange}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="h-1 bg-gray-300 rounded relative"
                    style={{
                      background: `linear-gradient(to right, #FFD699 ${((values[0] - MIN) / (MAX - MIN)) * 100}%, #1CB822 ${((values[0] - MIN) / (MAX - MIN)) * 100}% ${((values[1] - MIN) / (MAX - MIN)) * 100}%, #FFD699 ${((values[1] - MIN) / (MAX - MIN)) * 100}%)`,
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="h-3 w-3 bg-white border border-primary rounded-full shadow"
                  />
                )}
              />
            </div>

            {/* Max Price */}
            <div className="text-sm text-primary bg-white px-4 py-2 rounded-lg shadow ml-4 text-center">
              Max Price
              <br />
              <span className="font-semibold text-lg">NPR {values[1].toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No events found matching your criteria.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
