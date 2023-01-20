// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <form onSubmit={handleSubmit} className='log-in-form-container'>
      <h3 className="log-in-form-header">Log In</h3>
      <h2 className="log-in-form-title">Welcome to HomeBnB</h2>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <input
        className="log-in-form-inputs"
        type="text"
        placeholder="Username/Email"
        value={credential}
        onChange={(e) => setCredential(e.target.value)}
        required
      />
      <input
        className="log-in-form-inputs"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="log-in-submit-button-container">
        <button className="log-in-submit-button" type="submit">Log In</button>
      </div>
    </form>
  );
}

export default LoginFormModal;
