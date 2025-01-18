import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleEvent, updateEvent } from "../../apis/Api";
import Sidebar from "../../components/Sidebar";

const UpdateEvent = () => {
    const { id } = useParams();

    const [eventTitle, setEventTitle] = useState("");
    const [eventPrice, setEventPrice] = useState("");
    const [eventCategory, setEventCategory] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventNewImage, setEventNewImage] = useState("");
    const [previewNewImage, setPreviewNewImage] = useState("");
    const [oldImage, setOldImage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getSingleEvent(id)
            .then((res) => {
                console.log("API Response:", res.data);

                if (res.data && res.data.Event) {
                    const event = res.data.Event;
                    setEventTitle(event.eventTitle || "");
                    setEventPrice(event.eventPrice || "");
                    setEventCategory(event.eventCategory || "");
                    setEventDescription(event.eventDescription || "");
                    setOldImage(event.eventImage || "");
                } else {
                    toast.error("Event data is missing in the response.");
                }
            })
            .catch((error) => {
                console.error("Error fetching event data:", error);
                toast.error("Failed to fetch event data.");
            })
            .finally(() => setLoading(false));
    }, [id]);

    console.log("Updating event with ID:", id);


    const handleImage = (event) => {
        const file = event.target.files[0];
        setEventNewImage(file);
        setPreviewNewImage(URL.createObjectURL(file));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("eventTitle", eventTitle);
        formData.append("eventPrice", eventPrice);
        formData.append("eventCategory", eventCategory);
        formData.append("eventDescription", eventDescription);

        if (eventNewImage) {
            formData.append("eventImage", eventNewImage);
        }

        updateEvent(id, formData)
            .then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
                }
            })
            .catch((error) => {
                const errorMessage =
                    error.response?.data?.message || "Something went wrong!";
                toast.error(errorMessage);
            });
    };

    if (loading) {
        return <div className="p-6">Loading event data...</div>;
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-100">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-6">
                <h2 className="text-2xl font-bold mb-6">
                    Update Event Decoration for{" "}
                    <span className="text-red-600">{eventTitle}</span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Form */}
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">Event Title</label>
                            <input
                                value={eventTitle}
                                onChange={(e) => setEventTitle(e.target.value)} // <-- Corrected
                                className="form-control w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Event Price</label>
                            <input
                                value={eventPrice}
                                onChange={(e) => setEventPrice(e.target.value)} // <-- Corrected
                                className="form-control w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Event Description</label>
                            <textarea
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)} // <-- Corrected
                                className="form-control w-full p-2 border rounded"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Event Category</label>
                            <select
                                value={eventCategory}
                                onChange={(e) => setEventCategory(e.target.value)}
                                className="form-control w-full p-2 border rounded"
                            >
                                <option value="Balloon">Balloon</option>
                                <option value="Entrance">Entrance</option>
                                <option value="Mandap">Mandap</option>
                                <option value="Passage">Passage</option>
                                <option value="Stage">Stage</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                Choose Event Image
                            </label>
                            <input
                                onChange={handleImage}
                                type="file"
                                className="form-control w-full p-2 border rounded"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary bg-blue-500 text-white p-2 rounded w-full"
                        >
                            Save Changes
                        </button>
                    </form>

                    {/* Image Section */}
                    <div className="space-y-4">
                        <div>
                            <h6 className="font-medium">Old Image:</h6>
                            <img
                                className="h-40 w-40 object-cover border"
                                src={`http://localhost:5000/eventMain/${oldImage}`}
                                alt="Old Event"
                            />
                        </div>

                        {previewNewImage && (
                            <div>
                                <h6 className="font-medium">New Image:</h6>
                                <img
                                    className="h-40 w-40 object-cover border"
                                    src={previewNewImage}
                                    alt="New Event Preview"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateEvent;