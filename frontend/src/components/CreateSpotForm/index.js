import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const newErrors = [];

    if (name.length === 0) newErrors.push('Please enter a name for this spot.');
    if (name.length > 49) newErrors.push('Name is too long.');
    if (city.length === 0) newErrors.push('City is required.');
    if (state.length === 0) newErrors.push('State is required.');
    if (country.length === 0) newErrors.push('Country is required.');
    if (address.length === 0) newErrors.push('Address is required.');
    if (description.length === 0) newErrors.push('Description is required.');
    if (url.length === 0) newErrors.push('Please provide an image for this spot.');
    if (!price) newErrors.push('Price is required.');
    if (price && price < 0) newErrors.push('Price must be greater than $0.');

    setErrors(newErrors);
  }, [name, city, state, country, address, description, url, price]);

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
      {errors.length && (
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
      )}
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
          min='0'
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
