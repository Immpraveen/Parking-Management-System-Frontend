import React, { useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import LoginNavbar from "../components/LoginNavbar";

import Cookies from "js-cookie";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleForgotPassword() {
    navigate('/resetpassword')
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: userName, password: password }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          // Store JWT token in cookies
          Cookies.set("token", data.token, { expires: 1 }); // expires in 1 day
          const dataString = JSON.stringify(data);
          localStorage.setItem("userData", dataString);
          if (data.type === "ADMIN") navigate("/adminservices");
          else navigate("/services");
        } else if (response.status === 401) {
          alert("Invalid credentials");
          setUserName("");
          setPassword("");
        } else {
          alert("An error occurred while logging in");
          setUserName("");
          setPassword("");
        }
      })
      .catch((error) => {
        alert("An error occurred while logging in");
        setUserName("");
        setPassword("");
      });
  };

  return (
    <div>
      <LoginNavbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h4 className="text-center">Login</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="email"
                      className="form-control"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      pattern="^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
                      title="Password must be alphanumeric with at least one special symbol and minimum length of 8 characters."
                      maxLength={16}
                    />
                  </div>
                  {/* <div>
                    <p className="text-plain">
                      <a href="/resetpassword" onClick={handleForgotPassword}>
                        Forgotten password?
                      </a>
                    </p>
                  </div> */}
                  <br/>
                  <button
                    type="submit"
                    className="btn btn-outline-primary btn-block "
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
}

export default Login;
