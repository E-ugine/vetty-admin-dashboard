import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/tb";
import Input from '../common/Input.jsx';
import Profile from '../common/Profile.jsx';
import ProfileImg from '../../images/users/user_3.webp';

const Navbar = () => {
  const [user] = useState({
    username: "admin",
    email: "vetty@email.com", 
  });

  return (
    <div className="navbar">
      <div className="navbar_wrapper">
        <div className="container">
          <div className="navbar_main">
           
            <div className="navbar_icons">

              <Profile
                name={user.username}
                slogan={user.email}
                className="admin_profile"
              
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;