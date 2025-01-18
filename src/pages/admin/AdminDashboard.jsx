import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createEventApi, deleteEvent, getAllBookings, getAllEvent } from "../../apis/Api";
import Sidebar from "../../components/Sidebar";

const AdminDashboard = () => {
  const [event, setEvent] = useState([]);
  const [listedEventsCount, setListedEventsCount] = useState(0);
  const [deletedEventsCount, setDeletedEventsCount] = useState(0);
  const [bookedEventsCount, setBookedEventsCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [eventTitle, setEventTitle] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    getAllEvent()
      .then((res) => {
        setEvent(res.data.Event);
        setListedEventsCount(res.data.Event.length);
      })
      .catch((error) => {
        console.error(error);
      });

    getAllBookings()
      .then((res) => {
        setBookedEventsCount(res.data.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleImage = (event) => {
    const file = event.target.files[0];
    setEventImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("eventTitle", eventTitle);
    formData.append("eventPrice", eventPrice);
    formData.append("eventCategory", eventCategory);
    formData.append("eventDescription", eventDescription);
    formData.append("eventImage", eventImage);

    createEventApi(formData)
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
            toast.error("Something went wrong!");
          }
        } else {
          toast.error("Something went wrong!");
        }
      });
  };

  const handleDelete = (id) => {
    const confirmDialog = window.confirm("Are you sure you want to delete this event?");
    if (confirmDialog) {
      deleteEvent(id)
        .then((res) => {
          if (res.status === 201) {
            toast.success(res.data.message);
            setDeletedEventsCount(deletedEventsCount + 1);
            setListedEventsCount(listedEventsCount - 1);
            setEvent(event.filter((event) => event._id !== id));
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            toast.error(error.response.data.message);
          }
        });
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg shadow-md"
          >
            Add Decoration
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-700 text-white rounded-lg p-4">
            <h5 className="font-semibold">Decorations listed:</h5>
            <p>{listedEventsCount}</p>
          </div>
          <div className="bg-gray-500 text-white rounded-lg p-4">
            <h5 className="font-semibold">Events booked:</h5>
            <p>{bookedEventsCount}</p>
          </div>
          <div className="bg-gray-600 text-white rounded-lg p-4">
            <h5 className="font-semibold">Events deleted:</h5>
            <p>{deletedEventsCount}</p>
          </div>
        </div>

        {/* Table */}
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 p-2">Event Image</th>
              <th className="border border-gray-200 p-2">Event Title</th>
              <th className="border border-gray-200 p-2">Event Price</th>
              <th className="border border-gray-200 p-2">Event Category</th>
              <th className="border border-gray-200 p-2">Event Description</th>
              <th className="border border-gray-200 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {event.map((singleEvent) => (
              <tr key={singleEvent._id} className="text-center">
                <td className="border border-gray-200 p-2">
                  <img
                    width="40"
                    height="40"
                    src={`http://localhost:5000/eventMain/${singleEvent.eventImage}`}
                    alt=""
                  />
                </td>
                <td className="border border-gray-200 p-2">{singleEvent.eventTitle}</td>
                <td className="border border-gray-200 p-2">{singleEvent.eventPrice}</td>
                <td className="border border-gray-200 p-2">{singleEvent.eventCategory}</td>
                <td className="border border-gray-200 p-2">{singleEvent.eventDescription}</td>

                <td className="border border-gray-200 p-2">
                  <Link to={`/admin/dashboard/update/${singleEvent._id}`} className="bg-primary text-white px-4 py-1 rounded-md mr-2">Edit</Link>
                  <button
                    onClick={() => handleDelete(singleEvent._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md"
                  >
                    {console.log(singleEvent._id)}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Add Decoration</h2>
              </div>
              <form className="mt-4 space-y-4">
                {/* Form Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Decoration Title</label>
                  <input
                    onChange={(e) => setEventTitle(e.target.value)}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Decoration Price</label>
                  <input
                    onChange={(e) => setEventPrice(e.target.value)}
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    onChange={(e) => setEventCategory(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="Balloon">Balloon</option>
                    <option value="Entrance">Entrance</option>
                    <option value="Mandap">Mandap</option>
                    <option value="Passage">Passage</option>
                    <option value="Stage">Stage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    onChange={(e) => setEventDescription(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Decoration Image</label>
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
  );
};

export default AdminDashboard;
