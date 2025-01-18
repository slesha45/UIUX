import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { MdDelete } from "react-icons/md";


const MyPlans = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([
    {
      title: 'Royal red and white stage',
      price: 9000,
      imageUrl: 'https://i.pinimg.com/736x/7a/94/54/7a945491ea6a631f5d68f302cc3bdc60.jpg',
      rating: 5,
    },
    {
      title: 'Elegant floral backdrop',
      price: 12000,
      imageUrl: 'https://i.pinimg.com/736x/7a/94/54/7a945491ea6a631f5d68f302cc3bdc60.jpg',
      rating: 4,
    },
    {
      title: 'Elegant floral backdrop',
      price: 12000,
      imageUrl: 'https://i.pinimg.com/736x/7a/94/54/7a945491ea6a631f5d68f302cc3bdc60.jpg',
      rating: 4,
    },
    {
      title: 'Elegant floral backdrop',
      price: 12000,
      imageUrl: 'https://i.pinimg.com/736x/7a/94/54/7a945491ea6a631f5d68f302cc3bdc60.jpg',
      rating: 4,
    },
    {
      title: 'Elegant floral backdrop',
      price: 12000,
      imageUrl: 'https://i.pinimg.com/736x/7a/94/54/7a945491ea6a631f5d68f302cc3bdc60.jpg',
      rating: 4,
    },
  ]);

  const totalCost = plans.reduce((sum, plan) => sum + plan.price, 0);

  // Delete plan function
  const deletePlan = (index) => {
    setPlans((prevPlans) => prevPlans.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h1 className="text-5xl font-jacques mb-6">My Plans</h1>
        {/* Plans Section */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 font-poppins">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md overflow-hidden relative"
            >
              {/* Image */}
              <img
                src={plan.imageUrl}
                alt={plan.title}
                className="w-full h-48 object-cover"
              />
              {/* Details */}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{plan.title}</h2>
                <p className="text-primary font-bold mb-2">Rs {plan.price}</p>
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {Array.from({ length: plan.rating }, (_, i) => (
                    <span key={i} className="text-yellow-500">&#9733;</span>
                  ))}
                </div>
                {/* Delete Button */}
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => deletePlan(index)}
                >
                  <MdDelete/>
                </button>
              </div>
            </div>
          ))}
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
        <button className="w-full mt-4 py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-dark mb-4">
          BOOK NOW
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default MyPlans;
