import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const HowItWorks = () => {
  const faqs = [
    {
      question: "How do I add more decorations in 'My Plans'?",
      answer:
        " When you go to My Plans page, you will see the 'Add more' button. Clicking on 'Add more' allows you to add additional decorations to your plan.",
    },
    {
      question: "Can I cancel a booking?",
      answer:
        "You can cancel your booking by contacting the team.",
    },
  ];


  const troubleshootingIssues = [
    {
      issue: "I can’t log in.",
      solution:
        "Ensure your email and password are correct. Click “Forgot Password” if needed.",
    },
    {
      issue: "My booking isn’t showing in 'My Bookings'.",
      solution: "Refresh the page or contact support for assistance.",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h1 className="text-5xl mb-6 font-jacques">How the system works?</h1>

        <div className="mt-4 mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-poppins">
          <div className="group flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 border border-gray-300 hover:bg-primary hover:text-white transition duration-300">
            <img
              src="easy-authentication-icon.png"
              alt="auth"
              className="w-16 h-16" />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-white">
              Easy Authentication
            </h3>
            <p className="text-black-500 text-center group-hover:text-white">
              Quick and secure authentication
            </p>
          </div>

          <div className="group flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 border border-gray-300 hover:bg-primary hover:text-white transition duration-300">
            <img
              src="navigate-homepage-icon.png"
              alt="navigate"
              className="w-16 h-16" />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-white">
              Navigate to Homepage
            </h3>
            <p className="text-black-500 text-center group-hover:text-white">
              Easy navigation to the homepage for event decorations.
            </p>
          </div>

          <div className="group flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 border border-gray-300 hover:bg-primary hover:text-white transition duration-300">
            <img
              src="add-decorations-icon.png"
              alt="add decorations"
              className="w-16 h-16" />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-white">
              Add Decorations to "My Plans"
            </h3>
            <p className="text-black-500 text-center group-hover:text-white">
              Include the desired decorations in your plan.
            </p>
          </div>

        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl mb-4 font-jacques font-bold text-gray-700 text-center">Frequently Asked Questions (FAQs)
          <div className="w-96 h-1 bg-primary mx-auto mt-2"></div>
        </h2>
        <div className="space-y-6 mb-6 font-poppins">
        {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border-l-4 border-green-500"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {faq.question}
              </h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        
        </div>

        {/* Troubleshooting Section */}
         <h2 className="text-2xl mb-6 font-jacques font-bold text-gray-700 text-center">
          Troubleshooting Common Issues
          <div className="w-80 h-1 bg-red-500 mx-auto mt-2"></div>
        </h2>
        <div className="space-y-6 font-poppins mb-4">
          {troubleshootingIssues.map((issue, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border-l-4 border-red-500"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Issue: {issue.issue}
              </h3>
              <p className="text-gray-600">Solution: {issue.solution}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;
