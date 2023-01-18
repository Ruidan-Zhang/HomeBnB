import { csrfFetch } from "./csrf";

const LOAD_ALL_REVIEWS = 'reviews/LOAD';
const CREATE_REVIEW = 'review/CREATE';
const DELETE_REVIEW = 'review/DELETE';

//action creators
export const loadAllReviewsAction = (reviews, spotId) => {
    return {
        type: LOAD_ALL_REVIEWS,
        reviews,
        spotId
    }
};

export const createReviewAction = (spotId, newReview) => {
    return {
        type: CREATE_REVIEW,
        spotId,
        newReview
    }
};

export const deleteReviewAction = (badReviewId) => {
    return {
        type: DELETE_REVIEW,
        badReviewId
    }
};

//thunks
export const loadAllReviewsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/spots/${spotId}/reviews`);

    if (response.ok) {
        const allReviews = await response.json();
        dispatch(loadAllReviewsAction(spotId, allReviews));
        return allReviews;
    }
};

export const createReviewThunk = (spotId, newReview) => async dispatch => {
    const { review, stars } = newReview;
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        review,
        stars
      }),
    });

    if (response.ok) {
        const createdReview = await response.json();
        dispatch(createReviewAction(spotId, createdReview));
        return createdReview;
    }
};

export const deleteReviewThunk = (badReviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${badReviewId}`, {
      method: "DELETE"
    });

    if (response.ok) {
        const badReview = await response.json();
        dispatch(deleteReviewAction(badReviewId));
        return badReview;
    }
};

//spots reducer
const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_REVIEWS: {
            const newState = { ...state };
            action.reviews.forEach(review => {
                newState[review.id] = review;
            });
            return newState;
        };
        case CREATE_REVIEW: {
            const newState = { ...state };
            newState[action.newReview.id] = action.newReview;
            return newState;
        };
        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.badReviewId];
            return newState;
        };
        default:
            return state;
    }
};

export default reviewsReducer;
