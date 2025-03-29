import React, { useState } from 'react';
import './Header.css';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {

    const [show, setShow] = useState(false)
    const handleLogout = () => {

        console.log("hi");

        localStorage.removeItem("user");
        window.location.href = "/";
    }
    return (
        <div className='header'>
            <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix logo" />

            {/* Avatar with Dropdown */}
            <div className="avatar-container">
                <img className='avatar' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Avatar" onClick={(e) => {
                    e.preventDefault()
                    setShow(!show)
                }} />

                {/* Dropdown Menu */}
                {
                    show ? <ul className="dropdown-menu">
                        <span onClick={handleLogout}>
                            <LogoutIcon sx={{ color: "white" }} />
                            <li>Logout</li>
                        </span>
                    </ul>
                        : ""
                }

            </div>
        </div >
    );
}

export default Header;
