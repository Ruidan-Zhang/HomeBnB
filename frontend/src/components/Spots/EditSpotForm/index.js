import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editSpotThunk } from "../../../store/spots";
import { loadSingleSpotThunk } from "../../../store/single";
import { useModal } from "../../../context/Modal";
import './EditSpotForm.css';

function EditSpotForm({ spotId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  let foundSpot = useSelector(state => state.single);

  const [address, setAddress] = useState(foundSpot.address);
  const [city, setCity] = useState(foundSpot.city);
  const [state, setState] = useState(foundSpot.state);
  const [country, setCountry] = useState(foundSpot.country);
  const [name, setName] = useState(foundSpot.name);
  const [description, setDescription] = useState(foundSpot.description);
  const [price, setPrice] = useState(foundSpot.price);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const newErrors = [];

    if (name.length > 49) newErrors.push('Name is too long.');
    if (price && price < 0) newErrors.push('Price must be greater than $0.');

    setErrors(newErrors);
  }, [name, price]);

  const handleSubmit = async (e) => {
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

    await dispatch(editSpotThunk(foundSpot));
    await dispatch(loadSingleSpotThunk(spotId));

    closeModal();
    history.push(`/spots/${spotId}`);
  };

  return (
    <form onSubmit={handleSubmit} className='edit-spot-form'>
      <h2>Edit this spot</h2>
      <input
        className="edit-spot-inputs"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="edit-spot-inputs"
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input
        className="edit-spot-inputs"
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
      />
      <input
        className="edit-spot-inputs"
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      />
      <input
        className="edit-spot-inputs"
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        className="edit-spot-inputs"
        type="text"
        placeholder="Describe this spot:"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        className="edit-spot-inputs"
        type="number"
        min='0'
        placeholder="Price per night"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <div className="edit-spot-form-errors">
        {errors.map((error) => (
          <div>
            <i className="fa-solid fa-ban"></i>{' '}
            {error}
          </div>
        ))}
      </div>
      <div className="edit-spot-submit-button-container">
        {errors.length === 0 ? (
          <button className="edit-spot-submit-button" type="submit">Save</button>
        ) : (
          <button className="edit-spot-submit-button-disabled" type="submit" disabled={true}>Save</button>
        )}
      </div>
    </form>
  );
}

export default EditSpotForm;
