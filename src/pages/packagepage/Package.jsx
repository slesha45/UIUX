import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PackageCard from '../../components/PackageCard';
import { getAllPackage } from '../../apis/Api';
import { toast } from 'react-toastify';
import BookingForm from '../../components/BookingForm';

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const backgroundColors = [
    '#B8719B', 
    '#C26767', 
    '#7367B0', 
    '#57998A', 
    '#D8A62E', 
    '#4B7240', 
    '#D36C5C', 
  ];

  useEffect(()=> {
    getAllPackage()
    .then((res) => {
      setPackages(res.data.Package);
    })
    .catch((error) => {
      console.error("Error fetching packages:", error); 
    })
  }, [])

  const handleBookPackage = (pkg) => {
    setSelectedPackage(pkg);
    setShowBookingForm(true);
  };

  const handleBookingCreated = (newBooking) => {
    toast.success("Your package booking was created!");
    setShowBookingForm(false);
  };
  
  return (
    <div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h1 className="text-5xl font-jacques mb-6">Packages</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-4">
        {packages.length > 0 ? (
            packages.map((pkg, index) => (
              <PackageCard
                key={pkg._id} 
                title={pkg.packageTitle}
                description={pkg.packageDescription}
                price={`Rs ${pkg.packagePrice}`}
                imageUrl={`http://localhost:5000/public/packageMain/${pkg.packageImage}`}
                backgroundColor={backgroundColors[index % backgroundColors.length]} 
                onBook={()=> handleBookPackage(pkg)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No packages available at the moment.
            </p>
          )}
        </div>
      </div>
      {showBookingForm && selectedPackage && (
        <BookingForm
          onClose={() => setShowBookingForm(false)}
          initialData={{
            price: selectedPackage.packagePrice,
            packageId: selectedPackage._id, // We'll pass packageId here
          }}
          onBookingCreated={handleBookingCreated}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Package;
