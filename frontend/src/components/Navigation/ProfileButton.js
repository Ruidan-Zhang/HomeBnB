// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const demoUserLogIn = () => {
    const credential = 'demo@user.io';
    const password = 'password';
    dispatch(sessionActions.login({ credential, password }))
  }

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const handleClick = () => {
    history.push(`/my-bookings`)
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="nav-bar-drop-down-menu-container">
      <button onClick={openMenu}  className='nav-bar-user-container'>
        <i className="fa-solid fa-bars"></i>
        <i className="fas fa-user-circle" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="hiddenContainer">
            <div>{user.firstName} {user.lastName}</div>
            <div onClick={handleClick} className='dropdown-menu-my-bookings-button'>My bookings</div>
            <div>
              <div className="menu-buttons-container">
                <button className="menu-button" onClick={logout}>Log Out</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="drop-down-menu">
            <div className="menu-buttons-container">
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
                className='menu-button-not-logged-in'
              />
            </div>
            <div className="menu-buttons-container">
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
                className='menu-button-not-logged-in'
              />
            </div>
            <div className="menu-buttons-container">
              <OpenModalButton
                buttonText="Demo User"
                onButtonClick={demoUserLogIn}
                className='menu-button-not-logged-in'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
