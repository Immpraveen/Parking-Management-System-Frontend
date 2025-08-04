import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function SecurityIncidentAdmin() {
  const [description, setDescription] = useState("");
  const [vehicleNumber,setVehicleNumber]= useState("");
  const [spotID,setSpotID]= useState("");

  const dataString = localStorage.getItem('userData');
  const data = JSON.parse(dataString);
  const handleAddIncident = async (event) => {
    event.preventDefault();
    try {

      const response = await fetch(`http://localhost:8080/securityincidents/report?empId=${data.empId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          vehicleNumber,
          spotID
        }),
      });
      if(response.status===201){
      setDescription("");
      setVehicleNumber("");
      setSpotID("");
      }
    } catch (error) {
      console.log(error);
    }
    alert("Successfully raised incident.")
  };

  return (
    <div>
      <div className="container mt-5 border border-light rounded">
        <h2 className="text-dark">Report a Security Incident</h2>
        <Form onSubmit={handleAddIncident}>
          <Form.Group controlId="formDescription">
            <Form.Label className="text my-2">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formVehicleNumber">
            <Form.Label className="text my-2">Vehicle Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter vehicle number"
              value={vehicleNumber}
              onChange={(event) => setVehicleNumber(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formSpotID">
            <Form.Label className="text my-2">Spot ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter spot ID"
              value={spotID}
              onChange={(event) => setSpotID(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="my-4">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SecurityIncidentAdmin;