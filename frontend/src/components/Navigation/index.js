// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import homeLogo from '../../assets/title.png';

function Navigation({ isLoaded }){
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const createFormDirection = (e) => {
    e.preventDefault();
    history.push('/create-spot');
  }

  return (
    <div className='navigation-bar'>
      <NavLink exact to="/">
        <img className='home-logo' src={homeLogo} alt="home-logo"/>
      </NavLink>
      <div className='nav-bar-buttons'>
        {sessionUser ? (
          <div className='nav-bar-create-spot-button'>
            <button onClick={createFormDirection}>Create A Spot</button>
          </div>
        ) : (
          <h4>Log in to create a spot</h4>
        )}
        <div className='nav-bar-session-buttons'>
          {isLoaded && (
            <ProfileButton user={sessionUser} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
