import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PackageCard from '../../components/PackageCard';
import { getAllPackage } from '../../apis/Api';

const Package = () => {
  const [packages, setPackages] = useState([]);

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
  
  return (
    <div>
      <Navbar />
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
                backgroundColor={backgroundColors[index % backgroundColors.length]} // Dynamic background color
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No packages available at the moment.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Package;
