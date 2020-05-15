import React from "react";
import "./footer.scss";
import Logo from "assets/images/netflix-logo.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-wrap container">
        <div className="row">
          <div style={{ marginBottom: `3rem` }} className="col-12">
            <Link onClick={() => window.scrollTo(0, 0)} to="/">
              <img src={Logo} alt="" />
            </Link>
          </div>

          <div className="footer-item col-lg-3 col-md-4 col-12">
            <ul>
              <li>
                <Link to="/">FAQ</Link>
              </li>
              <li>
                <Link to="/">Investor Relations</Link>
              </li>
              <li>
                <Link to="/">Privacy</Link>
              </li>
              <li>
                <Link to="/">Speed Test</Link>
              </li>
            </ul>
          </div>

          <div className="footer-item col-lg-3 col-md-4 col-12">
            <ul>
              <li>
                <Link to="/">Help Center</Link>
              </li>
              <li>
                <Link to="/">Jobs</Link>
              </li>
              <li>
                <Link to="/">Cookie Preferences</Link>
              </li>
              <li>
                <Link to="/">Legal Notices</Link>
              </li>
            </ul>
          </div>

          <div className="footer-item col-lg-3 col-md-4 col-12">
            <ul>
              <li>
                <Link to="/">Account</Link>
              </li>
              <li>
                <Link to="/">Ways to Watch</Link>
              </li>
              <li>
                <Link to="/">Corporate Information</Link>
              </li>
              <li>
                <Link to="/">Netflix Originals</Link>
              </li>
            </ul>
          </div>

          <div className="footer-item col-lg-3 col-md-4 col-12">
            <ul>
              <li>
                <Link to="/">Media Center</Link>
              </li>
              <li>
                <Link to="/">Terms of Use</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="line"></div>
          <div className="footer-bottom col-12">
            {" "}
            <span>Netflix </span> Vietnam
          </div>
        </div>
      </div>
    </div>
  );
};
