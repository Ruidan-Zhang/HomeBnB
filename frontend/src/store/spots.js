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
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    const response = await csrfFetch("/api/spots", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createSpotAction(data));
        return data;
    }
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
        case CREATE_SPOT: {
            const newState = { ...state };
            newState[action.newSpot.id] = action.newSpot;
            return newState;
        }
        default:
            return state;
    }
};

export default spotsReducer;
