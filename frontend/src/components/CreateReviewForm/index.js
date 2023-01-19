import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReviewThunk } from "../../store/reviews";
import './CreateReviewForm.css';

function CreateReviewForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { spotId } = useParams();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
        review,
        stars
    };

    await dispatch(createReviewThunk(spotId, newReview));
    history.push(`/spots/${spotId}`);
  };

  return (
    <form onSubmit={handleSubmit} className='create-review-form'>
      <h2>Leave a review for this spot!</h2>
      <label>
        Stars: {' '}
        <input
          type="number"
          min="1"
          max="5"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
        />
      </label>
      <label>
        Reviews: {' '}
        <input
          type="text"
          placeholder="How did you like this place?"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateReviewForm;
