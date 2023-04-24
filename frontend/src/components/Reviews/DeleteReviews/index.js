import { useDispatch } from 'react-redux';
import React from "react";
import { deleteReviewThunk } from '../../../store/reviews';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../../context/Modal";

const DeleteReviewConfirmation = ({ reviewId, spotId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const deletePostHandler = async (e) => {
        e.preventDefault();
        await dispatch(deleteReviewThunk(reviewId));
        closeModal();
        history.push(`/spots/${spotId}`);
    };

    const cancelHandler = () => {
        closeModal();
    }

    return (
        <div className='delete-post-confirmation-container'>
            <h2 className='delete-post-title'>Delete review?</h2>
            <h5 className='delete-post-body'>Are you sure you want to permanently remove this review?</h5>
            <div className='delete-post-buttons-container'>
                <button className='delete-post-cancel-button' onClick={cancelHandler}>Cancel</button>
                <button className='delete-post-confirmation-button' onClick={deletePostHandler}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteReviewConfirmation;
