import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleChangePassword = () => {
    console.log('Changing password...');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/img/logo.png" className="logo" />
      </div>
      <ul className="nav-links">
        <li>
          <a href="/main/{userId}">BucketList</a>
        </li>
        <li>
          <a href="/chat">Chat</a>
        </li>
        <li>
          <a href="/map">Map</a>
        </li>
      </ul>
      <div className="profile">
        <div className="profile-icon" onClick={toggleDropdown}>
          <img src="/img/profile.png" className="profile-icon" />
        </div>
        {dropdownVisible && (
          <div className="dropdown">
            <div className="dropdown-content">
              <a onClick={handleChangePassword}>Change Password</a>
              <a onClick={handleLogout}>Log Out</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
