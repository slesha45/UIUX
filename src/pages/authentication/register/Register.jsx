import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import { FiMail } from 'react-icons/fi'
import { FaLock, FaLockOpen, FaRegUser } from "react-icons/fa6";
import { registerUserApi } from '../../../apis/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate();

  const handleFullName = (e) => {
    setFullName(e.target.value);
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  let validate = () => {
    var isValid = true;

    if (fullName.trim() === '') {
      setFullNameError('Full name is required');
      isValid = false;
    }

    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm password is required');
      isValid = false;
    }

    return isValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    var isValidated = validate();
    if(!isValidated){
      return
    }

    const data = {
      "fullName": fullName,
      "email": email,
      "password": password,
      "confirmPassword": confirmPassword
    }
    registerUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error("User registration failed.");
      } else {
        toast.success("Account created successfully!");
        navigate("/login")
      }
    }).catch((error) => {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    })  
  }


  return (
    <div className="h-screen w-screen overflow-hidden">
      <Navbar />
      <div className="flex h-full">
        <div className="w-1/2">
          <img
            src="auth.jpg"
            className="h-[80%] w-full pt-10 pl-32"
          />
        </div>

        <div className="w-1/2 flex items-start justify-center bg-white">
          <div className="w-3/4 max-w-md mt-28">
            <h1 className="text-5xl text-gray-800 mb-4 font-jacques">Create an Account</h1>

            <form>
              
            <div className="mb-4 font-poppins text-sm">
                <label className="flex items-center border border-gray-300 rounded-s px-3 py-2">
                  <FaRegUser className="text-gray-400 mr-2" />
                  <input
                  onChange={handleFullName}
                    type='text'
                    placeholder="Enter full name"
                    className="flex-1 border-none focus:outline-none focus:ring-0 text-gray-600"
                  />
                  {fullNameError && <p className="text-red-500 text-xs mt-1">{fullNameError}</p>}
                </label>

              </div>
              <div className="mb-4 font-poppins text-sm">
                <label className="flex items-center border border-gray-300 rounded-s px-3 py-2">
                  <FiMail className="text-gray-400 mr-2" />
                  <input
                  onChange={handleEmail}
                    type="email"
                    placeholder="Enter email address"
                    className="flex-1 border-none focus:outline-none focus:ring-0 text-gray-600"
                  />
                  {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                </label>
              </div>
              <div className="mb-4 font-poppins text-sm">
                <label className="flex items-center border border-gray-300 rounded-s px-3 py-2">
                  <FaLockOpen className="text-gray-400 mr-2" />
                  <input
                  onChange={handlePassword}
                    type="password"
                    placeholder="Enter password"
                    className="flex-1 border-none focus:outline-none focus:ring-0 text-gray-600"
                  />
                  {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                </label>
              </div>
              <div className="mb-4 font-poppins text-sm">
                <label className="flex items-center border border-gray-300 rounded-s px-3 py-2">
                  <FaLock className="text-gray-400 mr-2" />
                  <input
                  onChange={handleConfirmPassword}
                    type="password"
                    placeholder="Confirm password"
                    className="flex-1 border-none focus:outline-none focus:ring-0 text-gray-600"
                  />
                  {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
                </label>
              </div>
              <button onClick={handleSubmit} className="w-full bg-primary text-white py-2 rounded-s text-base hover:bg-blue-400 transition duration-300 font-poppins">
                Signup
              </button>
            </form>

            <p className="text-start text-gray-600 mt-4 font-poppins text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-primary font-medium">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
