import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { Range } from 'react-range';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getAllEvent } from '../../apis/Api'; 
import EventCard from '../../components/EventCard';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const STEP = 10;
const MIN = 10;
const MAX = 140000;

const Homepage = () => {
  const [values, setValues] = useState([10, 140000]);
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


      {/* Carousel Section */}
      <div className="relative">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          interval={3000}
          className="w-full"
        >
          <div>
            <img
              src="carou3.jpeg"
              alt="Decoration 1"
              className="object-cover w-full h-56 sm:h-72 md:h-96 lg:h-[500px]"
            />
          </div>
          <div>
            <img
              src="carou2.jpg"
              alt="Decoration 2"
              className="object-cover w-full h-56 sm:h-72 md:h-96 lg:h-[500px]"
            />
          </div>
          <div>
            <img
              src="caro1.jpg"
              alt="Decoration 3"
              className="object-cover w-full h-56 sm:h-72 md:h-96 lg:h-[500px]"
            />
          </div>
        </Carousel>
      </div>

      {/* Search and Filter Section */}
      <div className="mt-8 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-jacques sm:text-3xl font-bold mb-4">Decorations</h2>
        <div className="bg-darkBlue p-4 rounded-lg flex flex-wrap gap-4 justify-between items-center shadow-lg">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[200px]">
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search decorations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-md pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Price Range Filter */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="text-sm text-primary bg-white px-4 py-2 rounded-lg shadow text-center">
              Min Price
              <br />
              <span className="font-semibold text-lg">NPR {values[0].toLocaleString()}</span>
            </div>

            <div className="w-64 max-w-full">
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
                      background: `linear-gradient(to right, #FFD699 ${((values[0] - MIN) / (MAX - MIN)) * 100}%, #6699CE
 ${((values[0] - MIN) / (MAX - MIN)) * 100}% ${((values[1] - MIN) / (MAX - MIN)) * 100}%, #FFD699 ${((values[1] - MIN) / (MAX - MIN)) * 100}%)`,
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

            <div className="text-sm text-primary bg-white px-4 py-2 rounded-lg shadow text-center">
              Max Price
              <br />
              <span className="font-semibold text-lg">NPR {values[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Event Cards Section */}
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
