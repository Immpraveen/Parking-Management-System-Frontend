import React, { useState } from "react";
import Cookies from "js-cookie";
import { Button, Form, Container } from "react-bootstrap";

function AddVehicle() {
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [validVehicleNumber, setValidVehicleNumber] = useState(true);

  const handleAddVehicle = async (event) => {
    const empId = JSON.parse(localStorage.getItem("userData")).empId;
    const token = Cookies.get("token");
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/vehicles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          vehicleType,
          vehicleNumber,
        }),
      });
      if(response.status===200){
      alert("Successfully added vehicle!");
      window.location.reload();
      }
      else alert("Invalid request!")
      setVehicleType("");
      setVehicleNumber("");
      setValidVehicleNumber(true);
      
    } catch (error) {
      console.log(error);
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
    <div>
      <Container className="my-3">
        <h2 className="text-dark my-3">Add Vehicle Form</h2>

        <Form onSubmit={handleAddVehicle}>
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

          <Button variant="primary" type="submit" className="my-2">
            Add Vehicle
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddVehicle;
