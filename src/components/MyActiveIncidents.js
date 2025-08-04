import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Cookies from "js-cookie";

function MyActiveIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [incidentsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = Cookies.get("token");
  const empId = JSON.parse(localStorage.getItem("userData"))?.empId;

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch("http://localhost:8080/securityincidents/activeincident", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          setIncidents(data);
        } else if (Array.isArray(data.incidents)) {
          setIncidents(data.incidents);
        } else {
          console.error("Unexpected response:", data);
          setIncidents([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch incidents");
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, [empId, token]);

  // Pagination logic
  const indexOfLastIncident = currentPage * incidentsPerPage;
  const indexOfFirstIncident = indexOfLastIncident - incidentsPerPage;
  const currentIncidents = Array.isArray(incidents)
    ? incidents.slice(indexOfFirstIncident, indexOfLastIncident)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((incidents?.length || 0) / incidentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <h3 className="my-3">My Active Incidents</h3>

      {loading && <p>Loading incidents...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && incidents.length === 0 && (
        <p>No Incident Reported!</p>
      )}

      {!loading && !error && incidents.length > 0 && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Description</th>
                <th>Spot ID</th>
                <th>Vehicle Number</th>
                <th>Reporting Date</th>
                <th>Reporting Time</th>
                <th>Entry Time</th>
                <th>Exit Time</th>
                <th>Incident Date</th>
                <th>Incident Status</th>
                <th>Admin Comments</th>
              </tr>
            </thead>
            <tbody>
              {currentIncidents.map((incident, index) => (
                <tr key={incident.id}>
                  <td>{indexOfFirstIncident + index + 1}</td>
                  <td>{incident.description}</td>
                  <td>{incident.spotId}</td>
                  <td>{incident.vehicleNumber}</td>
                  <td>{incident.date}</td>
                  <td>{incident.time}</td>
                  <td>{incident.entryTime}</td>
                  <td>{incident.exitTime}</td>
                  <td>{incident.incidentDate}</td>
                  <td>{incident.status ? 'Closed' : 'Open'}</td>
                  <td>{incident.comments}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {pageNumbers.length > 1 && (
            <Pagination>
              {pageNumbers.map((number) => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => paginate(number)}
                >
                  {number}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </>
      )}
    </>
  );
}

export default MyActiveIncidents;
