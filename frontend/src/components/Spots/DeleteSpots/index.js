import { useDispatch } from 'react-redux';
import React from "react";
import { deleteSpotThunk } from '../../../store/spots';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../../context/Modal";

const DeleteSpotConfirmation = ({ spotId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const deletePostHandler = async (e) => {
        e.preventDefault();
        await dispatch(deleteSpotThunk(spotId));
        closeModal();
        history.push('/');
    };

    const cancelHandler = () => {
        closeModal();
    }

    return (
        <div className='delete-post-confirmation-container'>
            <h2 className='delete-post-title'>Delete spot?</h2>
            <h5 className='delete-post-body'>Are you sure you want to permanently remove this spot from HomeBnB?</h5>
            <div className='delete-post-buttons-container'>
                <button className='delete-post-cancel-button' onClick={cancelHandler}>Cancel</button>
                <button className='delete-post-confirmation-button' onClick={deletePostHandler}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteSpotConfirmation;
