import React, { useState, useEffect, useCallback } from "react";
import { Table, Container, Form, Button } from "react-bootstrap";
import Cookies from "js-cookie";

function DisplayTable() {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("desc");

  const filterEntries = useCallback(() => {
    let filtered = [...entries];
    if (searchType && searchValue) {
      filtered = filtered.filter((entry) => {
        const value = entry[searchType];
        return value && value.toString().toLowerCase().includes(searchValue.toLowerCase());
      });
    }
    setFilteredEntries(filtered);
    setCurrentPage(1);
  }, [searchType, searchValue, entries]);

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/tickets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setEntries(data);
      setFilteredEntries(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterEntries();
  }, [filterEntries]);

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handlePerPageChange = (event) => {
    setEntriesPerPage(parseInt(event.target.value));
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredEntries.length / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  const sortEntries = () => {
    const sorted = [...filteredEntries].sort((a, b) => {
      return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    });
    setFilteredEntries(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Container className="my-3">
      <h2 className="text-dark my-3">Entry Record Table</h2>
      <Form className="my-3">
        <div className="row">
          <div className="col-md-6">
            <Form.Group controlId="search">
              <Form.Label>Search By</Form.Label>
              <Form.Control as="select" value={searchType} onChange={handleSearchTypeChange}>
                <option value="">Select</option>
                <option value="id">ID</option>
                <option value="date">Date</option>
                <option value="empId">Employee ID</option>
                <option value="spotId">Spot ID</option>
                <option value="vehicleNumber">Vehicle Number</option>
                <option value="vehicleType">Vehicle Type</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="searchValue">
              <Form.Label>Search Value</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search By"
                value={searchValue}
                onChange={handleSearchValueChange}
              />
            </Form.Group>
          </div>
        </div>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              Ticket ID
              <Button className="mx-2" variant="outline-dark" size="sm" onClick={sortEntries}>
                {sortOrder === "asc" ? "▲" : "▼"}
              </Button>
            </th>
            <th>Date</th>
            <th>Employee ID</th>
            <th>Cancelled</th>
            <th>Spot ID</th>
            <th>Reservation Time</th>
            <th>Entry Time</th>
            <th>Exit Time</th>
            <th>Vehicle Number</th>
            <th>Vehicle Type</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.date}</td>
              <td>{entry.empId}</td>
              <td>{entry.cancelled ? "Yes" : "No"}</td>
              <td>{entry.spotId}</td>
              <td>{entry.time}</td>
              <td>{entry.entryTime}</td>
              <td>{entry.exitTime}</td>
              <td>{entry.vehicleNumber}</td>
              <td>{entry.vehicleType}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center">
        <Form.Group controlId="perPage">
          <Form.Label>Entries Per Page</Form.Label>
          <Form.Control as="select" value={entriesPerPage} onChange={handlePerPageChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </Form.Control>
        </Form.Group>

        <div>
          <p>
            Page {currentPage} of {Math.ceil(filteredEntries.length / entriesPerPage)}
          </p>
          <nav>
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                  <Button
                    className={`page-link ${number === currentPage ? "active" : ""}`}
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </Container>
  );
}

export default DisplayTable;
