import React, { useState, useEffect } from "react";
import { Form, Button, Container } from 'react-bootstrap';
import Cookies from "js-cookie";

function NewBookingEmployee() {
  const [vehicleList, setVehicleList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');

  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchVehicleList = async () => {
      try {
        if (!userData.empId) {
          console.error("empId missing in localStorage");
          return;
        }

        const response = await fetch(`http://localhost:8080/api/vehicles/${userData.empId}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const text = await response.text();
          const data = text ? JSON.parse(text) : [];
          setVehicleList(data);
        } else {
          console.error("Failed to fetch vehicle list:", response.status);
        }
      } catch (error) {
        console.error("Error fetching vehicle list:", error);
      }
    };

    fetchVehicleList();
  }, [token, userData.empId]);

  const fetchVehicleDetails = async (vehicleId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/vehicles/vehicleid/${vehicleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setVehicleType(data.vehicleType || "");
        setVehicleNumber(data.vehicleNumber || "");
      } else {
        console.error("Failed to fetch vehicle details:", response.status);
      }
    } catch (error) {
      console.log("Error fetching vehicle details:", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedVehicle) {
      alert("Please select a vehicle.");
      return;
    }

    await fetchVehicleDetails(selectedVehicle);

    try {
      const response = await fetch('http://localhost:8080/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          empId: userData.empId,
          vehicleType,
          vehicleNumber,
          spotType: userData.type
        }),
      });

      if (response.ok) {
        alert("Ticket Booked Successfully!");
        window.location.reload();
      } else {
        alert("Request Failed!");
        console.error("Booking failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error booking ticket:", error);
    }
  };

  return (
    <Container className="my-3">
      <h2 className="text-dark my-3">Reservation Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formVehicleType">
          <Form.Label className="text my-2">Select vehicle</Form.Label>
          <Form.Control
            as="select"
            value={selectedVehicle}
            onChange={(event) => setSelectedVehicle(event.target.value)}
          >
            <option value="">Select vehicle</option>
            {vehicleList.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.vehicleNumber} ({vehicle.vehicleType})
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <br />
        <Button id="book-button" variant="primary" type="submit">
          Book
        </Button>
      </Form>
    </Container>
  );
}

export default NewBookingEmployee;
