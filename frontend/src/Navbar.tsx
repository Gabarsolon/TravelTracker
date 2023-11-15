// Navbar.tsx
import React, {useState} from 'react';
import './Navbar.css'; // Import your CSS file

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    
    const handleLogout = () => {
        console.log('Logging out...');
      };
    
      const handleChangePassword = () => {
        console.log('Changing password...');
      };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src ="/img/logo.png"
        className="logo"/>
        </div>
      <ul className="nav-links">
        <li><a href="/">BucketList</a></li>
        <li><a href="/chat">Chat</a></li>
        <li><a href="/map">Map</a></li>
      </ul>
      <div className="profile">
        <div className="profile-icon" onClick={toggleDropdown}>
        <img
          src ="/img/profile.png"
          className="profile-icon"
        />
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
