import React, { useState, useEffect } from "react";
import { Table, Container, Form, Row, Col } from "react-bootstrap";
import Cookies from "js-cookie";

function DisplayParking() {
    const [entries, setEntries] = useState([]);
    const [isBooked, setIsBooked] = useState(null);
    const [isCancelled, setIsCancelled] = useState(null);
    const [spotType, setSpotType] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    useEffect(() => {
    const fetchData = async () => {
        const token = Cookies.get("token");
        const response = await fetch("http://localhost:8080/parking-lots", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            setEntries(data);
        } else {
            console.error("Failed to fetch parking lots:", response.status);
        }
    };

    fetchData();
}, []);

    const handleSpotTypeChange = (event) => {
        setSpotType(event.target.value);
        setCurrentPage(1);
    };

    const handleVehicleTypeChange = (event) => {
        setVehicleType(event.target.value);
        setCurrentPage(1);
    };

    const filteredEntries = entries.filter((entry) => {
        return (
            (isBooked === null || entry.isBooked === isBooked) &&
            (isCancelled === null || entry.isCancelled === isCancelled) &&
            (spotType === "" || entry.spotType === spotType) &&
            (vehicleType === "" || entry.vehicleType === vehicleType)
        );

    });

    const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);

    const renderTableRows = () => {
        return currentEntries.map((entry) => (
            <tr key={entry.id}>
                <td>{entry.spotId}</td>
                <td class={entry.booked ? 'text-success booking-status' : 'text-danger booking-status'}>{entry.booked ? 'Yes' : 'No'}</td>
                <td class={entry.occupied ? 'text-success booking-status' : 'text-danger booking-status'}>{entry.occupied ? 'Yes' : 'No'}</td>
                <td>{entry.spotType}</td>
                <td>{entry.vehicleType}</td>
            </tr>
        ));
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
                    <a className="page-link" href="#" onClick={() => setCurrentPage(i)}>
                        {i}
                    </a>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <Container className="my-3">
            <h2 className={filteredEntries.length === 0 ? "text-danger my-3" : "text-dark my-3"}>Parking Lot Data</h2>
            <Row className="my-3">
                <Col>
                    <Form.Label>Spot Type:</Form.Label>
                    <Form.Select onChange={handleSpotTypeChange} value={spotType}>
                        <option value="">All</option>
                        <option value="EMPLOYEE">EMPLOYEE</option>
                        <option value="SPECIALLY_ABLED">SPECIALLY_ABLED</option>
                        <option value="ADMIN">ADMIN</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Label>Vehicle Type:</Form.Label>
                    <Form.Select onChange={handleVehicleTypeChange} value={vehicleType}>
                        <option value="">All</option>
                        <option value="CAR">CAR</option>
                        <option value="BIKE">BIKE</option>
                    </Form.Select>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>SPOT ID</th>
                        <th>BOOKED</th>
                        <th>ARRIVED</th>
                        <th>SPOT TYPE</th>
                        <th>VEHICLE TYPE</th>
                    </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
            </Table>
            <nav aria-label="pagination">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <a className="page-link" href="#" onClick={() => setCurrentPage(currentPage - 1)}>
                            Previous
                        </a>
                    </li>
                    {renderPageNumbers()}
                    <li className={'page-item ${currentPage === totalPages ? "disabled" : ""}'}>
                        <a className="page-link" href="#" onClick={() => setCurrentPage(currentPage + 1)}>
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </Container>
    );
}

export default DisplayParking