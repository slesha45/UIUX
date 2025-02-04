import React, { useState } from 'react';
import { FaLock } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUserApi } from '../../../apis/Api';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Initialize navigate
  const navigate = useNavigate();

  // Validation function
  const validation = () => {
    let isValid = true;

    if (email.trim() === '' || !email.includes('@')) {
      setEmailError("Email is empty or invalid");
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError("Password is empty");
      isValid = false;
    }
    return isValid;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    // Validation
    if (!validation()) {
      return;
    }

    // Make a JSON object
    const data = {
      "email": email,
      "password": password
    }

    // Make an API request
    loginUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error("Login failed. Please try again.");
        } else {
          toast.success("User logged in successfully!");

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          const convertedUser = JSON.stringify(res.data.userData);
          localStorage.setItem("user", convertedUser);

          if (res.data.userData.isAdmin) {
            window.location.href = "/admin/dashboard";
          } else {
            window.location.href = "/";
          }
        }
      })
      .catch((error) => {
        toast.error("Password incorrect. Please try again.");
      });
  };


  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex h-full">
        <div className="w-1/2">
          <img
            src="auth.jpg"
            className="h-[80%] w-full pt-10 pl-32"
          />
        </div>

        <div className="w-1/2 flex items-start justify-center bg-white">
          <div className="w-3/4 max-w-md mt-40">
            <h1 className="text-5xl text-gray-800 mb-4 font-jacques">Welcome back!</h1>
            <p className="text-gray-500 mb-4 font-poppins text-base">Fill the details to continue</p>

            <form>
              <div className="mb-4 font-poppins text-sm">
                <label className="flex items-center border border-gray-300 rounded-s px-3 py-2">
                  <FiMail className="text-gray-400 mr-2" />
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email address"
                    className="flex-1 border-none focus:outline-none focus:ring-0 text-gray-600"
                  />
                  {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                </label>

              </div>
              <div className="mb-4 font-poppins text-sm">
                <label className="flex items-center border border-gray-300 rounded-s px-3 py-2">
                  <FaLock className="text-gray-400 mr-2" />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter password"
                    className="flex-1 border-none focus:outline-none focus:ring-0 text-gray-600"
                  />
                  {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                </label>

              </div>
              <div className="flex justify-end mb-4 font-poppins text-sm">
                {/* <a href="#" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </a> */}
              </div>
              <button onClick={handleLogin} className="w-full bg-primary text-white py-2 rounded-s text-base hover:bg-blue-400 transition duration-300 font-poppins">
                Login
              </button>
            </form>

            <p className="text-start text-gray-600 mt-4 font-poppins text-sm">
              Don't have an account?{" "}
              <a href="/register" className="text-primary font-medium">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
