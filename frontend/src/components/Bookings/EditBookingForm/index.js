import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editBookingThunk } from "../../../store/bookings";
import { getMyBookingsThunk } from "../../../store/bookings";
import { useModal } from "../../../context/Modal";
import { useEffect } from "react";
import './EditBookingForm.css';

function EditBookingForm({ booking, spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [startDate, setStartDate] = useState(booking.startDate);
    const [endDate, setEndDate] = useState(booking.endDate);
    const [errors, setErrors] = useState([]);

    const today = new Date().toISOString().split('T')[0];

    const avgRatingFormat = (rating) => {
        if (rating && typeof rating === 'number') return rating.toFixed(2);
        else if (!rating || typeof rating !== 'number') return "No ratings yet";
    };

    useEffect(() => {
        const newErrors = [];

        if (startDate < today) newErrors.push('Past bookings can NOT be modified.');

        setErrors(newErrors);
      }, [startDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors();

        const updatedBooking = {
            ...booking,
            startDate,
            endDate
        };

        const createdBooking = await dispatch(editBookingThunk(updatedBooking))
            .catch (async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors('Selected dates conflict with an existing booking.');
        })

        if (createdBooking) {
            dispatch(getMyBookingsThunk());
            closeModal();
            history.push('/my-bookings');
        }
    };
console.log('HEREEEEEEEE', booking)
    const nightCounter = (start, end) => {
        const difference = new Date(end).getTime() - new Date(start).getTime();

        if (!difference) {
            return 0;
        } else {
            return Math.round(difference / (1000 * 60 * 60 * 24));
        }
    };

    const feesCalculator = (start, end, price) => {
        const bookingFee = (price * nightCounter(start, end)).toFixed(2);
        const cleaningFee = (bookingFee * 0.15).toFixed(2);
        const serviceFee = (bookingFee * 0.1).toFixed(2);
        let total = 0;
        total = (+bookingFee + +cleaningFee + +serviceFee).toFixed(2);

        return {bookingFee, cleaningFee, serviceFee, total};
    };

    return (
        <form onSubmit={handleSubmit} className='edit-booking-form'>
            <div className="create-booking-form-header">
                <div className="create-booking-form-price-container">
                    <div className="create-booking-price">${Number(spot.price).toFixed(2)}</div>
                    <div>night</div>
                </div>
            </div>
            {errors && (
                <div className="create-booking-form-errors">{errors}</div>
            )}
            <div className="create-booking-form-inputs-container">
                <div className="create-booking-form-input">
                    <label htmlFor='startDate'>Check-in:</label>
                    <input
                        type="date"
                        className="create-booking-form-input-picker"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={today}
                        max={endDate}
                        required
                    />
                </div>
                <div className="create-booking-form-input">
                    <label htmlFor='startDate'>Check-out:</label>
                    <input
                        type="date"
                        className="create-booking-form-input-picker"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate}
                        required
                    />
                </div>
            </div>
            <button className="create-booking-submit-button" type="submit">Reserve</button>
            <div className="create-booking-form-disclaimer">Demo transaction. You won't be charged.</div>
            <div className="create-booking-form-footer-container">
                <div className="create-booking-form-footer">
                    <div>${Number(spot.price).toFixed(2)} x {nightCounter(startDate, endDate)} nights</div>
                    <div>${feesCalculator(startDate, endDate, spot.price).bookingFee}</div>
                </div>
                <div className="create-booking-form-footer">
                    <div>{'Cleaning fee (15%)'}</div>
                    <div>${feesCalculator(startDate, endDate, spot.price).cleaningFee}</div>
                </div>
                <div className="create-booking-form-footer">
                    <div>{'Service fee (10%)'}</div>
                    <div>${feesCalculator(startDate, endDate, spot.price).serviceFee}</div>
                </div>
                <div className="create-booking-form-footer-total">
                    <div className="total-price">Total</div>
                    <div className="total-price">${feesCalculator(startDate, endDate, spot.price).total}</div>
                </div>
            </div>
        </form>
    )
}

export default EditBookingForm;
