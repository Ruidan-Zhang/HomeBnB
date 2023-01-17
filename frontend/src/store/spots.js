import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = 'spots/LOAD';

//action creators
export const loadAllSpotsAction = (spots) => {
    return {
        type: LOAD_ALL_SPOTS,
        spots
    }
};

//thunks
export const getAllSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const allSpots = await response.json();
        dispatch(loadAllSpotsAction(allSpots));
        return allSpots;
    }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_SPOTS: {
            const newState = { ...state };
            action.spots.Spots.forEach(spot => {
                newState[spot.id] = spot;
            });
            return newState;
        };
        default:
            return state;
    }
}

export default spotsReducer;
