import React from "react"
import { Link, useNavigate } from 'react-router-dom';
import logo from "../images/logo.jpg"


function AdminNavbar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }
  

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <img src={logo} alt="logo" className="logo" />
      <Link className="navbar-brand mx-4" to="/"><h3>ParKing</h3></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <ul className='ms-auto navbar-nav px-3'>
        <li className=" nav-item ">
          <button type="button" class="btn btn-light fs-5" ><a
            href="http://localhost:8080/securityincidents/download"
            download
          ><small>Generate Security Incident Report</small>
          </a></button>
        </li>
      </ul>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className='ms-auto navbar-nav px-3'>
          <li className=" nav-item ">
            <button type="button" class="btn btn-light fs-5" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
      <div>

      </div>
    </nav>
  )
}
export default AdminNavbar;