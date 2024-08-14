import React from 'react';
import { NavLink } from 'react-router-dom';
import "./FooterNav.css";
function FooterNav() {
  return ( 
    <>
      <div className="footer-nav">
        <div className="container">
          <div className="row py-1">
            <div className="col-6 d-flex justify-content-center">
              <h3>
                <NavLink to="/" className="nav-link footer-nav-link" activeClassName="selected" exact>
                  Home
                </NavLink>
              </h3>
            </div>
            {/* <div className="col-4 d-flex justify-content-center">
              <h3>
                <NavLink to="/classes/reminders" className="nav-link footer-nav-link" activeClassName="selected" exact>
                  Reminders
                </NavLink>
              </h3>
            </div> */}
            <div className="col-6 d-flex justify-content-center">
              <h3>
              <NavLink to="/browse" className="nav-link footer-nav-link" activeClassName="selected" >
                  Browse
                </NavLink>
              <NavLink to="/courses" className="nav-link footer-nav-link" activeClassName="selected" >
                  Courses
                </NavLink>
                <NavLink to="/resources" className="nav-link footer-nav-link" activeClassName="selected" >
                  Resources
                </NavLink>
                <NavLink to="/forum" className="nav-link footer-nav-link" activeClassName="selected" >
                  Discussion
                </NavLink>
                <NavLink to="/classes" className="nav-link footer-nav-link" activeClassName="selected" >
                  Classes
                </NavLink>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
   );
}

export default FooterNav;