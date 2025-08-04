import React, { useState } from "react";

import { Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";

import RegisterNavbar from "../components/RegisterNavbar";

function Register() {

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [userType, setUserType] = useState("");

  const [vehicleType, setVehicleType] = useState("");

  const [vehicleNumber, setVehicleNumber] = useState("");

  const [validVehicleNumber, setValidVehicleNumber] = useState(true);

  const navigate = useNavigate();




  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("http://localhost:8080/registrations", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({ username, password, userType, vehicleType, vehicleNumber }),

      });

      if (response.status === 201) {

        // Handle successful registration here

        alert('Successfully Register!')

        setUsername("")

        setPassword("")

        setUserType("Select Type")

        navigate("/");

      } else {

        alert("Request Failed")

        navigate("/register");

      }

    } catch (error) {

      console.error(error);

      return null;

    }

  };




  const handleVehicleNumberChange = (event) => {

    const formattedValue = event.target.value.toUpperCase();

    const isValid = /^([A-Z]{2}-\d{1,2}-[A-Z]{1,2}\d{1,4})$/.test(formattedValue);

    if (isValid) {

      setVehicleNumber(formattedValue);

      setValidVehicleNumber(true);

    } else {

      setVehicleNumber(formattedValue);

      setValidVehicleNumber(false);

    }

  };




  return (

    <>

      <RegisterNavbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-md-6">

            <div className="card shadow">

              <div className="card-header bg-primary text-white text-white">

                <h4 className="text-center">Registration</h4>

              </div>

              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  <div className="form-group">

                    <label>Email</label>

                    <input

                      type="email"

                      className="form-control"

                      value={username}

                      onChange={(e) => setUsername(e.target.value)}

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

                    />

                  </div>

                  <div className="form-group">

                    <label>Type</label>

                    <select

                      className="form-control"

                      value={userType}

                      onChange={(e) => setUserType(e.target.value)}

                    >

                      <option value="">Select Type</option>

                      <option value="EMPLOYEE">Employee</option>

                      <option value="SPECIALLY_ABLED">Specially Abled Employee</option>

                    </select>

                  </div>



                  <Form.Group controlId="formVehicleType">

                    <Form.Label className="text my-2">Vehicle Type</Form.Label>

                    <Form.Control

                      as="select"

                      value={vehicleType}

                      onChange={(event) => setVehicleType(event.target.value)}

                    >

                      <option value="">Select vehicle type</option>

                      <option value="CAR">CAR</option>

                      <option value="BIKE">BIKE</option>

                    </Form.Control>

                  </Form.Group>



                  <Form.Group controlId="formVehicleNumber">

                    <Form.Label className="text my-2">Vehicle Number</Form.Label>

                    <Form.Control

                      type="text"

                      placeholder="Enter vehicle number (e.g. HR-26-DQ5551)"

                      value={vehicleNumber}

                      onChange={handleVehicleNumberChange}

                      isInvalid={!validVehicleNumber}

                    />

                    <Form.Control.Feedback type="invalid">

                      Please enter a valid vehicle number (e.g. HR-26-DQ5551).

                    </Form.Control.Feedback>

                  </Form.Group>




                  <br />

                  <button

                    type="submit"

                    className="btn btn-primary btn-block "

                  >

                    Register

                  </button>

                </form>

              </div>

            </div>

            <br />

            <Footer />

          </div>

        </div>

      </div>

    </>

  );

}




export default Register;
