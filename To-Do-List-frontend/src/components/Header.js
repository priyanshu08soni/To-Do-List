import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-bootstrap-typeahead/css/Typeahead.css";
const Header = () => {
  const navigate=useNavigate();
  const authState=useSelector(state=>state?.auth?.user);

  const firstLetter=authState?.firstname.charAt(0).toUpperCase();
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/login");
  };

  return (
    <>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 p-0">
              <div className="menu-bottom d-flex align-items-center gap-30 justify-content-between">
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-5">
                    <div>
                      <NavLink className="nav-button" to="/">
                        Home
                      </NavLink>
                      <NavLink className="nav-button" to="/login">
                        Login
                      </NavLink>
                      <NavLink className="nav-button" to="/signup">
                        Signup
                      </NavLink>
                      {
                        authState && 
                        <button
                          className="logout nav-button"
                          onClick={() => {
                            handleLogout();
                          }}
                        >
                          LOG-OUT
                        </button>
                      }
                    </div>
                  </div>
                </div>
                {
                  authState &&
                  <NavLink className="profile" to="/profile">
                    {firstLetter}
                  </NavLink>
                }
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
