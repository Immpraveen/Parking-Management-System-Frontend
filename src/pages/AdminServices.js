import React, { useState } from "react";
import { Tab, Tabs, Form, Button, Container } from "react-bootstrap";
import AdminNavbar from "../components/AdminNavbar";
import DisplayTable from "../components/DisplayTable";
import AddReservation from "../components/AddReservation";
import DownloadReport from "../components/DownloadReport";
import DisplayParking from "../components/DisplayParking";
import SecurityIncidentsTable from "../components/SecurityIncidentsTable";
import ResolveSecurityIncident from "../components/ResolveSecurityIncident";

function AdminServices() {
  const [key, setKey] = useState("display");
  const [spotId, setSpotId] = useState("");
  const [empId, setEmpId] = useState("");

  const handleUpdateEntry = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/Admin/isoccupiedtrue?empId=${empId}&spotId=${spotId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (response.status === 200)
        alert("Record updated successfully!")
      else alert("Details mismatch, Please enter correct details")
      setSpotId("");
      setEmpId("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateExit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/Admin/isoccupiedfalse?empId=${empId}&spotId=${spotId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (response.status === 200)
        alert("Record updated successfully!")
      else alert("Details mismatch, Please enter correct details")
      setSpotId("")
      setEmpId("")
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelReservation = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/Admin/cancel?empId=${empId}&spotId=${spotId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (response.status===500 || response.status===200){
        alert("Ticket cancelled successfully")
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-5 border border-light rounded shadow">
        <h1 className="text-center my-3">Welcome to Admin Service Page</h1>
        <Tabs
          activeKey={key}
          onSelect={(k) => {
            setKey(k);
          }}
        >
          <Tab eventKey="display" title="Display Records">
            <DisplayTable />
          </Tab>
          <Tab eventKey="entry" title="Update Entry Record">
            <Container className="my-3">
              <h2 className="text-dark my-3">Update Entry Record Form</h2>
              <Form onSubmit={handleUpdateEntry}>
                <Form.Group controlId="formUpdateEntry">
                  <Form.Label className="text my-2">Spot ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter spot ID"
                    value={spotId}
                    onChange={(event) => setSpotId(event.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formUpdateEntry">
                  <Form.Label className="text my-2">Employee ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter employee ID"
                    value={empId}
                    onChange={(event) => setEmpId(event.target.value)}
                  />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Form>
            </Container>
          </Tab>
          <Tab eventKey="exit" title="Update Exit Record">
            <Container className="my-3">
              <h2 className="text-dark my-3">Update Exit Record Form</h2>
              <Form onSubmit={handleUpdateExit}>
                <Form.Group controlId="formSpotId">
                  <Form.Label className="text my-2">Spot ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter spot ID"
                    value={spotId}
                    onChange={(event) => setSpotId(event.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formEmpId">
                  <Form.Label className="text my-2">Employee ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter employee ID"
                    value={empId}
                    onChange={(event) => setEmpId(event.target.value)}
                  />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Form>
            </Container>
          </Tab>
          <Tab eventKey="add" title="Add Reservation">
            <AddReservation />
          </Tab>
          <Tab eventKey="cancel" title="Cancel Reservation">
            <Container className="my-3">
              <h2 className="text-dark my-3">Cancel Reservation Form</h2>
              <Form onSubmit={handleCancelReservation}>
                <Form.Group controlId="formSpotId">
                  <Form.Label className="text my-2">Spot ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter spot ID"
                    value={spotId}
                    onChange={(event) => setSpotId(event.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formSpotId">
                  <Form.Label className="text my-2">Employee ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter employee ID"
                    value={empId}
                    onChange={(event) => setEmpId(event.target.value)}
                  />
                </Form.Group>
                <br />
                <Button id=" " variant="danger" type="submit">
                  Cancel
                </Button>
              </Form>
            </Container>
          </Tab>
          <Tab eventKey="display1" title="Parking Lot">
            <DisplayParking />
          </Tab>
          <Tab eventKey="download" title="Download Report">
            <DownloadReport />
          </Tab>
          <Tab eventKey="UpdateIncident" title="Update Security Incident">
            <ResolveSecurityIncident />
          </Tab>
          <Tab eventKey="Security Incident Table" title="Security Incidents Table">
            <SecurityIncidentsTable />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
export default AdminServices;