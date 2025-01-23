import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

const config = {
    headers: {
        'authorization': `bearer ${localStorage.getItem('token')}`
    }
}

export const registerUserApi = (data) => Api.post('/api/user/create', data)

//Login API
export const loginUserApi = (data) => Api.post('/api/user/login', data)

export const getAllUsers = () => Api.get("/api/user/all", config);


//create event API
export const createEventApi = (data) => Api.post('/api/event/create', data)

//get all event api
export const getAllEvent = () => Api.get('/api/event/get_all_event', config)

//get single event
export const getSingleEvent = (id) => Api.get(`/api/event/get_single_event/${id}`, config)

//delete event
export const deleteEvent = (id) => Api.delete(`/api/event/delete_event/${id}`, config)

//update event
export const updateEvent = (id, data) => Api.put(`/api/event/update_event/${id}`, data, config)

//Get user profile Api
export const getUserProfileApi = () => Api.get('/api/user/profile', config)
export const updateUserProfileApi = (updateData) => Api.put('/api/user/profile', updateData, config)

// pagination
export const eventPagination = (
  page,
  limit,
  searchQuery = "",
  sortOrder = "asc"
) => {
  const query = `?page=${page}&limit=${limit}&q=${searchQuery}&sort=${sortOrder}`;
  return Api.get(`/api/event/pagination${query}`);
};

// get event count
export const getEventCount = () => Api.get("/api/event/get_event_count");

//wishlist
export const getUserWishlistApi = () => Api.get('api/wishlist/all', config);
export const addToWishlistApi = (eventId) => {
  return Api.post(`/api/wishlist/add`, { eventId }, config);
};
export const removeFromWishlistApi = (eventId) => Api.delete( `api/wishlist/remove/${eventId}`, config);

//bookings
export const getAllBookings = () => Api.get('/api/booking/all-bookings', config)
export const createBooking = (bookingData) => Api.post('/api/booking/create', bookingData, config);
export const updateBookingStatus = (updateData) => Api.put('/api/booking/bookings-status', updateData, config)
export const getUserBookings = () => Api.get('/api/booking/mybookings', config); 
export const updatePaymentMethod = (paymentData) => Api.put('/api/booking/update-payment', paymentData, config)

export const createContact = (data) => Api.post('/api/contact/contact', data, config);
export const getAllContacts = () => Api.get('/api/contact/all', config);

export const addReviewApi = (eventId, reviewData) => Api.post(`/api/review/add`,{ eventId, ...reviewData }, config);
export const getReviewsApi = (eventId) => Api.get(`/api/review/event/${eventId}`);

export const addToPlansApi = (eventId) => Api.post('/api/plan/add', { eventId }, config);
export const getPlansApi = () => Api.get('/api/plan/all', config);
export const removeFromPlansApi = (eventId) => Api.delete(`/api/plan/remove/${eventId}`, config);

export const createPackageApi = (data) => Api.post('/api/package/create', data)
export const getAllPackage = () => Api.get('/api/package/get_all_package', config)
export const deletePackage = (id) => Api.delete(`/api/pacakge/delete_package/${id}`, config)