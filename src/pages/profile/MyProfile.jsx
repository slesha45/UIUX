import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getUserProfileApi, updateUserProfileApi } from '../../apis/Api';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getUserProfileApi()
        setFormData({
          name: response.data.fullName,
          email: response.data.email,
          currentPassword: '',
          newPassword: '',
        })
        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to fetch profile data');
        setIsLoading(false);
      }
    }
    fetchProfileData();
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleUpdateClick = async () => {
    try {
      const { name, email, currentPassword, newPassword } = formData;

      const updateData = { fullName: name, email };
      if (currentPassword && newPassword) {
        updateData.currentPassword = currentPassword;
        updateData.newPassword = newPassword;
      }

      const response = await updateUserProfileApi(updateData);
      if (response.data) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold">Loading Profile...</h1>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h1 className="text-5xl font-jacques mb-6">My Profile</h1>
        <div className="max-w-md mx-auto border rounded-lg shadow-md p-6 font-poppins mb-4">
          <h2 className="text-xl font-semibold mb-4">Personal Details:</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full border rounded px-3 py-2 ${isEditing ? '' : 'bg-gray-100 '
                  }`}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full border rounded px-3 py-2 ${isEditing ? '' : 'bg-gray-100 '
                  }`}
              />
            </div>
            {isEditing && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Current password:</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">New password:</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </>
            )}
          </form>
          <div className="flex justify-center items-center mt-4 space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdateClick}
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  onClick={handleCancelClick}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEditClick}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfile;
