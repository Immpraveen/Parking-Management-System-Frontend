import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SecurityIncident() {
  const [description, setDescription] = useState("");
  const [incidentdate, setIncidentDate] = useState("");
  const dataString = localStorage.getItem('userData');
  const [incidentType,setIncidentType] = useState("")
  const data = JSON.parse(dataString);

  const handleAddIncident = async (event) => {
    event.preventDefault();
    try {
      // Convert the selected date to the user's time zone
      const date = new Date(incidentdate);
      const timeZoneOffset = date.getTimezoneOffset() * 60000;
      const formattedDate = new Date(date.getTime() - timeZoneOffset).toISOString().slice(0, 10);

      const response = await fetch(`http://localhost:8080/securityincidents/report?empId=${data.empId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "incidentType": incidentType,
          "description": description,
          "incidentDate": formattedDate,
        }),
      });
      if (response.ok) {
        setDescription("");
        setIncidentDate("");
        alert("Successfully raised incident.");
        window.location.reload();

      } else {
        if (response.status === 404 || response.status === 500) {
          alert("Incident raise failed!")
          throw new Error("Failed to submit incident.");

        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mt-2 border border-light rounded">
        <h2 className="text-dark">Report a Security Incident</h2>
        <Form onSubmit={handleAddIncident}>

        <Form.Group controlId="formIncidentType">
            <Form.Label className="text my-2">Incident Type</Form.Label>
            <Form.Control
              as="select"
              value={incidentType}
              onChange={(event) => setIncidentType(event.target.value)}
            >
              <option value="">Select Incident type</option>
              <option value="THEFT">THEFT</option>
              <option value="DAMAGE">DAMAGE</option>
              <option value="QUERY">QUERY</option>
              <option value="OTHER">OTHER</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label className="text my-2">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description only upto 1000 characters"
              value={description}
              maxLength={1000}
              onChange={(event) => {
                const input = event.target.value;
                const alphanumeric = /^[a-zA-Z0-9\s]+$/;
                if (input.length <= 1000 && alphanumeric.test(input)) {
                  setDescription(input);
                }
              }}
            />
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label className="text my-2">Incident Date</Form.Label>
            <DatePicker
              selected={incidentdate}
              onChange={(date) => setIncidentDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select date"
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

export default SecurityIncident;

