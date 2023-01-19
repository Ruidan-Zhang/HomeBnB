// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateSpotForm from '../CreateSpotForm';
import './Navigation.css';

function Navigation({ isLoaded }){
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const createFormDirection = (e) => {
    e.preventDefault();
    history.push('/create-spot');
  }

  return (
    <div className='navigation-bar'>
      <NavLink exact to="/">Home</NavLink>
      <div className='nav-bar-buttons'>
        <button onClick={createFormDirection}>Create A Spot</button>
        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}
      </div>
    </div>
  );
}

export default Navigation;
