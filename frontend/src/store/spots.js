import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = 'spots/LOAD';
const CREATE_SPOT = 'spot/CREATE';
const EDIT_SPOT = 'spot/EDIT';
const DELETE_SPOT = 'spot/DELETE';
const ADD_SPOT_IMAGE = 'spot-image/ADD';

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

export const editSpotAction = (updatedSpot) => {
    return {
        type: EDIT_SPOT,
        updatedSpot
    }
};

export const deleteSpotAction = (badSpotId) => {
    return {
        type: DELETE_SPOT,
        badSpotId
    }
};

export const addSpotImageAction = (spotId, url, preview) => {
    return {
        type: ADD_SPOT_IMAGE,
        spotId,
        url,
        preview
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

export const createSpotThunk = (spot, url, preview) => async dispatch => {
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
        const createdSpot = await response.json();
        console.log("created spot:", createdSpot)

        const response2 = await csrfFetch(`/api/spots/${createdSpot.id}/images`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            url,
            preview
            }),
        });
        console.log("response2:", response2)


        if (response2.ok) {
            const addedImage = await response2.json();
            console.log("added image:", addedImage)
            dispatch(createSpotAction(createdSpot));
            dispatch(addSpotImageAction(addedImage))
            return {createdSpot, addedImage};
        }
    }
};

export const editSpotThunk = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(spot),
    });

    if (response.ok) {
        const updatedSpot = await response.json();
        dispatch(editSpotAction(updatedSpot));
        return updatedSpot;
    }
};

export const deleteSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE"
    });

    if (response.ok) {
        const message = await response.json();
        dispatch(deleteSpotAction(spotId));
        return message;
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
        };
        case EDIT_SPOT: {
            const newState = { ...state };
            newState[action.updatedSpot.id] = action.updatedSpot;
            return newState;
        };
        case DELETE_SPOT: {
            const newState = { ...state };
            delete newState[action.badSpotId];
            return newState;
        };
        default:
            return state;
    }
};

export default spotsReducer;
