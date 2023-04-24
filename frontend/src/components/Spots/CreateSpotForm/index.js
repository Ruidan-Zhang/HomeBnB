import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpotThunk } from "../../../store/spots";
import { useModal } from "../../../context/Modal";
import './CreateSpotForm.css';

function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

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

    if (name.length > 49) newErrors.push('Name is too long.');
    if (price && price < 0) newErrors.push('Price must be greater than $0.');

    setErrors(newErrors);
  }, [name, price]);

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

    closeModal();
    history.push(`/spots/${createdSpot.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className='create-spot-form'>
      <h2>Create your own spot</h2>
      <input
        className="create-spot-inputs"
        type="text"
        placeholder="Spot Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="create-spot-inputs"
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input
        className="create-spot-inputs"
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
      />
      <input
        className="create-spot-inputs"
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      />
      <input
        type="text"
        className="create-spot-inputs"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        className="create-spot-inputs"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        className="create-spot-inputs"
        type="url"
        placeholder="Image"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        className="create-spot-inputs"
        type="number"
        placeholder="Price per night"
        min='0'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <div className="create-spot-form-errors">
        {errors.map((error) => (
          <div>
            <i className="fa-solid fa-ban"></i>{' '}
            {error}
          </div>
        ))}
      </div>
      <div className="create-spot-submit-button-container">
        <button className="create-spot-submit-button" type="submit">Create Spot</button>
      </div>
    </form>
  );
}

export default CreateSpotForm;
