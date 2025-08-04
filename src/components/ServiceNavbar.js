import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import React from "react";
import logo from "../images/logo.jpg"

function ServiceNavbar() {
  const navigate = useNavigate();
  function handleLogout() {
    Cookies.remove("token");
    navigate("/");
  }
  // function handleBooking(){
  //   navigate('/services')
  // }

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container-fluid">
        <img src={logo} alt="logo" className="logo" />
        <Link className="navbar-brand mx-4" to="/"><h3>ParKing</h3></Link>
        <ul className="navbar-nav ms-auto d-flex align-items-center px-3 mb-2 mb-lg-0">
          <li className="nav-item">
            <button type="button" className="btn btn-light fs-5" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav >
  );
}

export default ServiceNavbar;


