import { csrfFetch } from "./csrf";

const LOAD_MY_BOOKINGS = 'myBookings/LOAD';
const CREATE_BOOKING = 'booking/CREATE';
const EDIT_BOOKING = 'booking/EDIT';
const DELETE_BOOKING = 'booking/DELETE';

//action creators
export const loadMyBookingsAction = (bookings) => {
    return {
        type: LOAD_MY_BOOKINGS,
        bookings
    }
};

export const createBookingAction = (spotId, newBooking) => {
    return {
        type: CREATE_BOOKING,
        spotId,
        newBooking
    }
};

export const editBookingAction = (updatedBooking) => {
    return {
        type: EDIT_BOOKING,
        updatedBooking
    }
};

export const deleteBookingAction = (badBookingId) => {
    return {
        type: DELETE_BOOKING,
        badBookingId
    }
};

//thunks
export const getMyBookingsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/bookings/current');

    if (response.ok) {
        const allMyBookings = await response.json();
        dispatch(loadMyBookingsAction(allMyBookings));
        return allMyBookings;
    }
};

export const createBookingThunk = (spotId, newBooking) => async dispatch => {
    const { startDate, endDate } = newBooking;
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        startDate,
        endDate
      }),
    });

    if (response.ok) {
        const createdBooking = await response.json();
        dispatch(createBookingAction(spotId, createdBooking));
        return createdBooking;
    }
};

export const editBookingThunk = (booking) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${booking.id}`, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(booking),
    });

    if (response.ok) {
        const updatedBooking = await response.json();
        dispatch(editBookingAction(updatedBooking));
        return updatedBooking;
    }
};

export const deleteBookingThunk = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
      method: "DELETE"
    });

    if (response.ok) {
        const badBooking = await response.json();
        dispatch(deleteBookingAction(badBooking.id));
        return badBooking;
    }
};

//bookings reducer
const initialState = {
    userBookings: {},
    spotBookings: {}
};

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MY_BOOKINGS: {
            const newState = { ...state };
            action.bookings.Bookings.forEach(booking => {
                newState.userBookings[booking.id] = booking;
            });
            return newState;
        };
        case CREATE_BOOKING: {
            const newState = { ...state };
            newState.userBookings[action.newBooking.id] = action.newBooking;
            console.log(action)
            return newState;
        };
        case EDIT_BOOKING: {
            const newState = { ...state };
            newState.userBookings[action.updatedBooking.id] = action.updatedBooking;
            return newState;
        };
        case DELETE_BOOKING: {
            const newState = { ...state };
            delete newState.userBookings[action.badBookingId];
            return newState;
        };
        default:
            return state;
    }
};

export default bookingsReducer;
