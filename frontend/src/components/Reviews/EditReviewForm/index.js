import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editReviewThunk } from "../../../store/reviews";
import { loadAllReviewsThunk } from "../../../store/reviews";
import { useModal } from "../../../context/Modal";

function EditReviewForm({ spotId, reviewId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  let foundReview = useSelector(state => state.reviews[reviewId]);

  const [review, setReview] = useState(foundReview.review);
  const [stars, setStars] = useState(foundReview.stars);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const newErrors = [];

    if (stars && stars < 1) newErrors.push('Star must be greater than 1.');
    if (stars && stars > 5) newErrors.push('Star must be less than 5.');
    if (stars && !Number.isInteger(+stars)) newErrors.push('Star must be an integer.');

    setErrors(newErrors);
  }, [stars]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    foundReview = {
        ...foundReview,
        review,
        stars
    };

    await dispatch(editReviewThunk(foundReview));
    await dispatch(loadAllReviewsThunk(spotId));

    closeModal();
    history.push(`/spots/${spotId}`);
  };

  return (
    <form onSubmit={handleSubmit} className='create-review-form'>
      <h2>Write a review</h2>
      Star:
      <input
        className="create-review-form-star-input"
        type="number"
        min="1"
        max="5"
        value={stars}
        placeholder="1-5"
        onChange={(e) => setStars(e.target.value)}
        required
      />
      <div className="create-review-form-review-container">
        Reviews:
        <input
          className="create-review-form-review-input"
          type="text"
          placeholder="How did you like this place?"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
      </div>
      <div className="create-review-form-errors">
        {errors.map((error) => (
          <div>
            <i className="fa-solid fa-ban"></i>{' '}
            {error}
          </div>
        ))}
      </div>
      <div className="create-review-submit-button-container">
        {errors.length === 0 ? (
          <button className="create-review-submit-button" type="submit">Submit</button>
        ) : (
          <button className="create-review-submit-button-disabled" type="submit" disabled={true}>Submit</button>
        )}
      </div>
    </form>
  );
}

export default EditReviewForm;
