import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSpotThunk } from "../../store/spots";
import './EditSpotForm.css';

function EditSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { spotId } = useParams();
  let foundSpot = useSelector(state => state.spots[spotId]);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    foundSpot = {
      ...foundSpot,
      address,
      city,
      state,
      country,
      lat: 100,
      lng: 200,
      name,
      description,
      price
    };
    dispatch(editSpotThunk(foundSpot));
    history.push(`/spots/${spotId}`);
  };

  return (
    <form onSubmit={handleSubmit} className='edit-spot-form'>
      <h2>Edit this spot</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Describe this spot:"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <label>
      Price: $
        <input
          type="number"
          placeholder="Price per night"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditSpotForm;
