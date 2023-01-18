// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navigation-bar'>
      <NavLink exact to="/">Home</NavLink>
      <button>Create your spot</button>
      {isLoaded && (
        <ProfileButton user={sessionUser} />
      )}
    </div>
  );
}

export default Navigation;
