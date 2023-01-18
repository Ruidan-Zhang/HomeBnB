import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = 'spots/LOAD';
const CREATE_SPOT = 'spot/CREATE';

//action creators
export const loadAllSpotsAction = (spots) => {
    return {
        type: LOAD_ALL_SPOTS,
        spots
    }
};

export const createSpotAction = (newSpot) => {
    return {
        type: CREATE_SPOT,
        newSpot
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

export const createSpotThunk = (spot) => async dispatch => {
    const { city, state, country, name, description, price } = spot;
    const response = await csrfFetch("/api/spots", {
      method: "POST",
      body: JSON.stringify({
        city,
        state,
        country,
        name,
        description,
        price
      }),
    });
    const data = await response.json();
    dispatch(createSpotAction(data.spot));
    return response;
};

//spots reducer
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
};

export default spotsReducer;
