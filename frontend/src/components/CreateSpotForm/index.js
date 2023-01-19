import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpotThunk } from "../../store/spots";
import './CreateSpotForm.css';

function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState(true);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSpot = {
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

    const {createdSpot} = await dispatch(createSpotThunk(newSpot, url, preview));
    history.push(`/spots/${createdSpot.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className='create-spot-form'>
      <h2>Create your own spot!</h2>
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
        Image: {' '}
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </label>
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
      <button type="submit">Create Spot</button>
    </form>
  );
}

export default CreateSpotForm;
