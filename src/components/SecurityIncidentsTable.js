
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function SecurityIncidentsTable() {
  const [incidents, setIncidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetch('http://localhost:8080/securityincidents/show-ticket')
      .then((response) => response.json())
      .then((data) => setIncidents(data))
      .catch((error) => console.error(error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = incidents.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(incidents.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number} className={currentPage === number ? 'active' : null}>
       <button className='btn btn-primary' type='button'> <a href="#" className='text-white' onClick={() => setCurrentPage(number)}>
          {number}
        </a></button>
      </li>
    );
  });

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Description</th>
            <th>Incident Type</th>
            <th>Spot ID</th>
            <th>Vehicle Number</th>
            <th>Reporting Date</th>
            <th>Reporting Time</th>
            <th>Incident Date</th>
            <th>Entry Time</th>
            <th>Exit Time</th>
            
            <th>Incident Status</th>
            <th>Admin Comments</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((incident, index) => (
            <tr key={incident.id}>
              <td>{index + 1}</td>
              <td>{incident.description}</td>
              <td>{incident.incidentType}</td>
              <td>{incident.spotId}</td>
              <td>{incident.vehicleNumber}</td>
              <td>{incident.date}</td>
              <td>{incident.time}</td>
              <td>{incident.incidentDate}</td>
              <td>{incident.entryTime}</td>
              <td>{incident.exitTime}</td>
              <td>{incident.status ? 'Closed' : 'Open'}</td>
              <td>{incident.comments}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ul className="pagination">
        {renderPageNumbers}
      </ul>
    </>
  );
}

export default SecurityIncidentsTable;