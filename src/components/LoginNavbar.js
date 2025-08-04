import React from "react"
import { Link } from 'react-router-dom';
import logo from "../images/logo.jpg"
function LoginNavbar(){
return(

    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
        <img src = {logo} alt="logo" className="logo"/>
    <Link className="navbar-brand mx-4" to="/"><h3>ParKing</h3></Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item fs-5">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
      </ul>
    </div>
  </nav>
)
}
export default LoginNavbar;