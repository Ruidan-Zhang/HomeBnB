import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSpotThunk } from "../../store/spots";

function CreateSpotForm() {
  const dispatch = useDispatch();

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSpot = {
        city,
        state,
        country,
        name,
        description,
        price
    };
    dispatch(createSpotThunk(newSpot));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        city
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
        description
        <input
          type="text"
          value={description}
          onChange={(e) => description(e.target.value)}
          required
        />
      </label>
      <label>
      price
        <input
          type="text"
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
