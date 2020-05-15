import React from "react";
import "./header.scss";

import { Link } from "react-router-dom";
import Logo from "assets/images/netflix-logo.png";

export const Header = () => {
  return (
    <div className="header">
      <div className="header-wrap container">
        <div className="header-logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};
