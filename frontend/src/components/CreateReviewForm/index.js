import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const newErrors = [];

    if (!stars) newErrors.push('Star is required.');
    if (stars && stars % 2 !== 0) newErrors.push('Star must be an integer.');
    if (stars && stars < 1) newErrors.push('Star must be greater than 1.');
    if (stars && stars > 5) newErrors.push('Star must be less than 5.');
    if (review.length === 0) newErrors.push('Please leave a review for this spot.');

    setErrors(newErrors);
  }, [review, stars]);

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
      {errors.length && (
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
      )}
      Star:
      <input
        type="number"
        min="1"
        max="5"
        value={stars}
        placeholder="1-5"
        onChange={(e) => setStars(e.target.value)}
        required
      />
      Reviews:
      <input
        type="text"
        placeholder="How did you like this place?"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <div className="create-review-submit-button">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default CreateReviewForm;
