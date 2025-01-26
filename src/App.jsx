import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminDashboard from './pages/admin/AdminDashboard';
import ContactMessages from './pages/admin/ContactMessages';
import ManageBookings from './pages/admin/ManageBookings';
import ManageDecorations from './pages/admin/ManageDecorations';
import ManageUsers from './pages/admin/ManageUsers';
import UpdateEvent from './pages/admin/UpdateEvent';
import Login from './pages/authentication/login/Login';
import Register from './pages/authentication/register/Register';
import MyBookings from './pages/booking/MyBookings';
import ContactUs from './pages/contact/ContactUs';
import DetailsPage from './pages/details/DetailsPage';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import Homepage from './pages/homepage/Homepage';
import HowItWorks from './pages/howItWorks/HowItWorks';
import Package from './pages/packagepage/Package';
import MyPlans from './pages/plans/MyPlans';
import MyProfile from './pages/profile/MyProfile';
import MyWishlist from './pages/wishlist/MyWishlist';
import AdminRoute from './protected_routes/AdminRoute';
function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/packages' element={<Package />} />
          <Route path='/plans' element={<MyPlans />} />
          <Route path='/bookings' element={<MyBookings />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/works' element={<HowItWorks />} />
          <Route path='/wishlist' element={<MyWishlist />} />
          <Route path='/profile' element={<MyProfile />} />
          <Route path='/details/:id' element={<DetailsPage />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/dashboard/update/:id' element={<UpdateEvent />} />
            <Route path='/admin/bookings' element={<ManageBookings />} />
            <Route path='/admin/users' element={<ManageUsers />} />
            <Route path='/admin/contact' element={<ContactMessages />} />
            <Route path='/admin/decorations' element={<ManageDecorations />} />
          </Route>
        </Routes>
      </Router>

      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        pauseOnHover
      />
    </React.Fragment>
  )
}

export default App;