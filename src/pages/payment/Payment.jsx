// import React, { useEffect, useState } from "react";
// import { initializeKhaltiPayment } from "../../apis/Api"; // Your API function for initializing Khalti payment
// import { getAllProducts } from "../../apis/Api"; // API to fetch all products
// import ProductCard from "../../components/ProductCard"; // Component to display individual products
 
// const Payment = () => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
 
//   useEffect(() => {
//     fetchProducts();
//   }, []);
 
//   const fetchProducts = async () => {
//     try {
//       const res = await getAllProducts();
//       setProducts(res.data.products || []);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch products.");
//     }
//   };
 
//   const handlePayment = async (product) => {
//     const data = {
//       itemId: product._id,
//       totalPrice: product.productPrice * 100, // Khalti expects price in paisa
//       website_url: window.location.origin, // Base URL for redirection
//     };
 
//     try {
//       const res = await initializeKhaltiPayment(data);
//       if (res.data.success) {
//         // Redirect user to Khalti payment URL
//         window.location.href = res.data.payment_url;
//       } else {
//         alert("Failed to initialize payment: " + res.data.message);
//       }
//     } catch (err) {
//       console.error("Payment initialization error:", err);
//       alert(
//         err.response?.data?.message || "An error occurred while initializing payment."
//       );
//     }
//   };
 
//   return (
//     <div className="container">
//       <div className="container" style={{ marginLeft: "10rem" }}>
//         <div className="flex flex-col">
//           <h2 className="mt-10 text-2xl font-bold text-center">Available Products</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {error ? (
//               <h1>{error}</h1>
//             ) : (
//               products.map((product) => (
//                 <div key={product._id} className="col-md-4 mb-4">
//                   <ProductCard
//                     product={product}
//                     onPay={() => handlePayment(product)} // Pass product to handle payment
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default Payment;