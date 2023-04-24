// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateSpotForm from '../Spots/CreateSpotForm';
import OpenModalButton from '../OpenModalButton';
import homeLogo from '../../assets/logo.png';
import './Navigation.css';

function Navigation({ isLoaded }){
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navigation-bar'>
      <NavLink exact to="/" style={{ textDecoration: 'none' }}>
        <div className='home-page-logo-container'>
          <img className='home-logo' src={homeLogo} alt="home-logo"/>
          <h2 className='home-logo-name'>Homebnb</h2>
        </div>
      </NavLink>
      <div className='nav-bar-buttons'>
        {sessionUser ? (
          <div className='nav-bar-create-spot-button-container'>
            <OpenModalButton
              buttonText='Create A Spot'
              modalComponent={<CreateSpotForm />}
              className='nav-bar-create-spot-button'
            />
          </div>
        ) : (
          <h4>Log in to create a spot</h4>
        )}
        <div className='nav-bar-menu-container'>
          {isLoaded && (
            <ProfileButton user={sessionUser} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
