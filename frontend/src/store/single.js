import { csrfFetch } from "./csrf";

const LOAD_SINGLE_SPOT = 'single-spot/LOAD';

//action creators
export const loadSingleSpotAction = (spot) => {
    return {
        type: LOAD_SINGLE_SPOT,
        spot
    }
};

//thunks
export const loadSingleSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const foundSpot = await response.json();
        dispatch(loadSingleSpotAction(foundSpot));
        return foundSpot;
    }
};

//single spot reducer
const initialState = {};

const singleSpotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SINGLE_SPOT: {
            const newState = { ...state };
            newState[action.spot.id] = action.spot
            const foundSpot = newState[action.spot.id];
            return foundSpot;
        }
        default:
            return state;
    }
}

export default singleSpotReducer;
