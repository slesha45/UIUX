// Sidebar.jsx
import React from 'react';
import {  CiLogout } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";
import { FaBook, FaUser } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { CgIfDesign } from "react-icons/cg";
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();



  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login')
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <img src="/logo2.png" alt="Logo" className="w-20 h-20 mx-auto mt-4" />
      <h2 className="text-2xl font-bold p-4">Admin Dashboard</h2>
      
      {/*Navigation links*/}
      <div className='mt-4'>
        <div className='p-4 hover:bg-gray-700 flex items-center'>
        <NavLink to="/admin/dashboard" activeClassName="bg-gray-700" className="flex items-center w-full">
            <IoMdHome className="mr-2 text-xl" />
            Dashboard
          </NavLink>
        </div>

        <div className='p-4 hover:bg-gray-700 flex items-center'>
        <NavLink to="/admin/bookings" activeClassName="bg-gray-700" className="flex items-center w-full">
            <FaBook className="mr-2 text-xl" />
            Bookings
          </NavLink>
        </div>

        <div className='p-4 hover:bg-gray-700 flex items-center'>
        <NavLink to="/admin/users" activeClassName="bg-gray-700" className="flex items-center w-full">
            <FaUser className="mr-2 text-xl" />
            Users
          </NavLink>
        </div>

        <div className='p-4 hover:bg-gray-700 flex items-center'>
        <NavLink to="/admin/contact" activeClassName="bg-gray-700" className="flex items-center w-full">
            <MdContactMail className="mr-2 text-xl" />
            Contact
          </NavLink>
        </div>

        <div className='p-4 hover:bg-gray-700 flex items-center'>
        <NavLink to="/admin/decorations" activeClassName="bg-gray-700" className="flex items-center w-full">
            <CgIfDesign className="mr-2 text-xl" />
            Decorations
          </NavLink>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="absolute bottom-0 w-full p-4 text-left bg-gray-800 hover:bg-gray-700 mt-4 flex items-center border-t-2 border-gray-700"
      >
        <CiLogout className="mr-2" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;