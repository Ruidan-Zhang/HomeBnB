import { useDispatch } from 'react-redux';
import React from "react";
import { deleteBookingThunk } from '../../../store/bookings';
import { getMyBookingsThunk } from '../../../store/bookings';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../../context/Modal";

const DeleteBookingConfirmation = ({ booking }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const deletePostHandler = async (e) => {
        e.preventDefault();
        await dispatch(deleteBookingThunk(booking.id));
        closeModal();
        await dispatch(getMyBookingsThunk());
        history.push('/my-bookings');
    };

    const cancelHandler = () => {
        closeModal();
    }

    return (
        <div className='delete-post-confirmation-container'>
            <h2 className='delete-post-title'>Delete booking?</h2>
            <h5 className='delete-post-body'>Are you sure you want to permanently cancel this booking?</h5>
            <div className='delete-post-buttons-container'>
                <button className='delete-post-cancel-button' onClick={cancelHandler}>Cancel</button>
                <button className='delete-post-confirmation-button' onClick={deletePostHandler}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteBookingConfirmation;
