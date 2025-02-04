import React, { useEffect, useRef, useState } from "react";
import { CiHeart, CiUser } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { getUserNotificationsApi } from "../apis/Api";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Refs to detect outside clicks
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  // Listen for clicks outside of either dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close Notification dropdown if click is outside of its container
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotificationDropdown(false);
      }

      // Close Profile dropdown if click is outside of its container
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await getUserNotificationsApi();
      setNotifications(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  // Count how many are unread
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    window.dispatchEvent(new Event("storage"));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const toggleProfileDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isActive = (path) => window.location.pathname === path;

  return (
    <div className="sticky top-0 z-[60] w-full font-poppins text-base">
      <nav className="bg-white border-b border-gray-200 shadow-sm h-24">
        <div className="flex items-center justify-between px-4 md:px-8 py-2 max-w-full">
          {/* Logo */}
          <div className="text-lg md:text-xl font-bold flex-shrink-0 ml-2">
            <Link to="/" className="text-black hover:text-gray-600">
              <img src="logo.png" className="h-20 w-20" alt="Logo" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl flex-shrink-0"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Menu Items */}
          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute top-full left-0 w-full bg-white md:static md:flex md:flex-1 md:justify-center`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0 text-gray-700">
              {[
                { path: "/", label: "Home" },
                { path: "/packages", label: "Packages" },
                { path: "/plans", label: "My Plans" },
                { path: "/bookings", label: "My Bookings" },
                { path: "/contact", label: "Contact" },
                { path: "/works", label: "How it works" },
              ].map((item, index) => (
                <li key={index} className="text-sm">
                  <Link
                    to={item.path}
                    className={`block px-2 py-2 md:p-0 text-center ${
                      isActive(item.path)
                        ? "border-b-2 border-black text-black"
                        : "text-gray-600 hover:text-black"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side Icons/Login/Register */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            {/* Notifications */}
            {user && (
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={toggleNotificationDropdown}
                  className="relative text-gray-600 hover:text-black"
                >
                  <IoIosNotificationsOutline className="text-xl" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotificationDropdown && (
                  <div className="absolute top-10 right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-2 z-50 max-h-80 overflow-auto">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        No notifications
                      </p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif._id}
                          className={`p-2 mb-1 rounded hover:bg-gray-100 cursor-pointer ${
                            notif.read ? "text-gray-600" : "font-light"
                          }`}
                        >
                          {notif.message}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist */}
            <Link to="/wishlist">
              <button className="text-gray-600 hover:text-black">
                <CiHeart className="text-xl" />
              </button>
            </Link>

            {/* User Profile */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  className="text-gray-600 hover:text-black"
                  onClick={toggleProfileDropdown}
                >
                  <CiUser className="text-xl" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                    <ul>
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        >
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
