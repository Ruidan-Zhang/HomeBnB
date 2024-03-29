import { csrfFetch } from "./csrf";

const LOAD_ALL_REVIEWS = 'reviews/LOAD';
const CREATE_REVIEW = 'review/CREATE';
const EDIT_REVIEW = 'review/EDIT';
const DELETE_REVIEW = 'review/DELETE';
const CLEAN_UP_REVIEWS = 'reviews/CLEANUP';

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

export const editReviewAction = (updatedReview) => {
    return {
        type: EDIT_REVIEW,
        updatedReview
    }
};

export const deleteReviewAction = (badReviewId) => {
    return {
        type: DELETE_REVIEW,
        badReviewId
    }
};

export const cleanUpReviewsAction = () => {
    return {
        type: CLEAN_UP_REVIEWS
    }
};

//thunks
export const loadAllReviewsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

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

export const editReviewThunk = (review) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(review),
    });

    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(editReviewAction(updatedReview));
        return updatedReview;
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

//reviews reducer
const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_REVIEWS: {
            const newState = { ...state };
            action.spotId.Reviews.forEach(review => {
                newState[review.id] = review;
            });
            return newState;
        };
        case CREATE_REVIEW: {
            const newState = { ...state };
            newState[action.newReview.id] = action.newReview;
            return newState;
        };
        case EDIT_REVIEW: {
            const newState = { ...state };
            newState[action.updatedReview.id] = action.updatedReview;
            return newState;
        };
        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.badReviewId];
            return newState;
        };
        case CLEAN_UP_REVIEWS: {
            const newState = { ...initialState };
            return newState;
        }
        default:
            return state;
    }
};

export default reviewsReducer;
