import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { createPackageApi, deletePackage, getAllPackage } from '../../apis/Api';
import { toast } from 'react-toastify';


const ManageDecorations = () => {
  const [packages, setPackages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const[packageTitle, setPackageTitle] = useState("");
  const[packagePrice, setPackagePrice] = useState("");
  const[packageDescription, setPackageDescription] = useState("");
  const[packageImage, setPackageImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    getAllPackage()
    .then((res) => {
      setPackages(res.data.Package);
    })
    .catch((error) => {
      console.error(error) 
    })
  }, []);

  const handleImage = (event) => {
    const file = event.target.files[0];
    setPackageImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("packageTitle", packageTitle);
    formData.append("packagePrice", packagePrice);
    formData.append("packageDescription", packageDescription);
    formData.append("packageImage", packageImage);

    createPackageApi(formData)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            toast.warning(error.response.data.message);
          } else if (error.response.status === 500) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Someting went wrong!");
          }
      } else {
        toast.error("Someting went wrong!");
      }
    });
  }

  const handleDelete = (id) => {
    const confirmDialog = window.confirm("Are you sure you want to delete this package?");
    if (confirmDialog) {
      deletePackage(id)
        .then((res) => {
          if (res.status === 201) {
            toast.success(res.data.message);
            setPackages(packages.filter((packages) => packages._id !== id));
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            toast.error(error.response.data.message);
          }
        });
    }
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-6 ml-64 bg-gray-100'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Decorations</h1>
          <button
          onClick={() => setShowModal(true)}
            className='bg-primary text-white py-2 px-4 rounded-lg shadow-md'
          >
            Add Package
          </button>
        </div>

        <table className='w-full table-auto border-collapse border border-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border border-gray-200 p-2'>Package Image</th>
              <th className='border border-gray-200 p-2'>Package Title</th>
              <th className='border border-gray-200 p-2'>Package Price</th>
              <th className='border border-gray-200 p-2'>Package Description</th>
              <th className='border border-gray-200 p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((singlePackage) => (
              <tr key={singlePackage._id} className='text-center'>
                <td className='border border-gray-200 p-2'>
                  <img 
                  width="40"
                  height="40"
                  src={`http://localhost:5000/packageMain/${singlePackage.packageImage}`}
                  alt=''
                  />
                </td>
                <td className='border border-gray-200 p-2'>{singlePackage.packageTitle}</td>
                <td className='border border-gray-200 p-2'>{singlePackage.packagePrice}</td>
                <td className="border border-gray-200 p-2">
                  {expandedDescriptions[singlePackage._id]
                    ? singlePackage.packageDescription
                    : `${singlePackage.packageDescription.slice(0, 50)}...`}
                  {singlePackage.packageDescription.length > 50 && (
                    <button
                      onClick={() => toggleDescription(singlePackage._id)}
                      className="text-blue-500 underline ml-2"
                    >
                      {expandedDescriptions[singlePackage._id] ? 'See Less' : 'See More'}
                    </button>
                  )}
                </td>

                <td className='border border-gray-200 p-2'>
                  <button
                  onClick={() => handleDelete(singlePackage._id)}
                  className='bg-red-500 text-white px-4 py-1 rounded-md'
                  >
                    {console.log(singlePackage._id)}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white rounded-lg p-6 w-full max-w-md'>
              <div className='flex justify-between items-center'>
                <h2 className='text-lg font-semibold'>Add Package</h2>
              </div>
              <form className="mt-4 space-y-4">
                {/* Form Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Package Title</label>
                  <input
                    onChange={(e) => setPackageTitle(e.target.value)}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Package Price</label>
                  <input
                    onChange={(e) => setPackagePrice(e.target.value)}
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Package Description</label>
                  <textarea
                    onChange={(e) => setPackageDescription(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Package Image</label>
                  <input
                    onChange={handleImage}
                    type="file"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="preview"
                      className="mt-2 w-full h-40 object-cover rounded-lg"
                    />
                  )}
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="bg-primary text-white rounded-lg px-4 py-2"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageDecorations
