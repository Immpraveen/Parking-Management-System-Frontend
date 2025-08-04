import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Cookies from "js-cookie";

function AddReservation() {
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [empId, setEmpId] = useState("");
    const [spotType, setSpotType] = useState("EMPLOYEE");
    const [validVehicleNumber, setValidVehicleNumber] = useState(true);
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

    const handleAddReservation = async (event) => {
        event.preventDefault();
        const token = Cookies.get("token");
        if (spotType === "EMPLOYEE")
            try {
                const response = await fetch("http://localhost:8080/Admin/employeeticket", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        empId,
                        vehicleType,
                        vehicleNumber,
                        spotType,
                    }),
                });
                if (response.status === 201) {
                    alert("Booked successfully!");
                    setEmpId("");
                    setVehicleType("");
                    setVehicleNumber("");
                    setSpotType("EMPLOYEE");
                    window.location.reload();
                } else if (response.status === 500) {
                    alert("Spot is not available.");
                } else {
                    alert("Booking failed.");
                }
            } catch (error) {
                console.log(error);
            }
        else if (spotType === "PARTNER")
            try {
                const token = Cookies.get("token");
                const response = await fetch("http://localhost:8080/Admin/partnerticket", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        empId,
                        vehicleType,
                        vehicleNumber,
                    }),
                });
                if (response.status === 201) {
                    alert("Booked successfully!");
                    setEmpId("");
                    setVehicleType("");
                    setVehicleNumber("");
                    setSpotType("EMPLOYEE");
                    window.location.reload();
                } else if (response.status === 500) {
                    alert("Spot is not available.");
                } else {
                    alert("Booking failed.");
                }
            } catch (error) {
                console.log(error);
            }
        else if (spotType === "SPECIAL_ABLED") {
            try {
                const token = Cookies.get("token");
                const response = await fetch("http://localhost:8080/Admin/speciallyabledticket", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        empId,
                        vehicleType,
                        vehicleNumber,
                        spotType
                    }),
                });
                if (response.status === 201) {
                    alert("Booked successfully!");
                    setEmpId("");
                    setVehicleType("");
                    setVehicleNumber("");
                    setSpotType("EMPLOYEE");
                    window.location.reload();
                } else if (response.status === 500) {
                    alert("Spot is not available.");
                } else {
                    alert("Booking failed.");
                }
            } catch (error) {
                console.log(error);
            }
        }
        else if (spotType === "CLIENT") {
            try {
                const token = Cookies.get("token");
                const response = await fetch("http://localhost:8080/Admin/clientticket", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        empId,
                        vehicleType,
                        vehicleNumber,
                    }),
                });
                if (response.status === 201) {
                    alert("Booked successfully!");
                    setEmpId("");
                    setVehicleType("");
                    setVehicleNumber("");
                    setSpotType("EMPLOYEE");
                    window.location.reload();
                } else if (response.status === 500) {
                    alert("Spot is not available.");
                } else {
                    alert("Booking failed.");
                }
            } catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                const token = Cookies.get("token");
                const response = await fetch("http://localhost:8080/Admin/otherticket", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        empId,
                        vehicleType,
                        vehicleNumber,
                    }),
                });
                if (response.status === 201) {
                    alert("Booked successfully!");
                    setEmpId("");
                    setVehicleType("");
                    setVehicleNumber("");
                    setSpotType("EMPLOYEE");
                    window.location.reload();
                } else if (response.status === 500) {
                    alert("Spot is not available.");
                } else {
                    alert("Booking failed.");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSpotTypeChange = (event) => {
        setSpotType(event.target.value);
    };

    const renderReservationForm = () => {
        switch (spotType) {
            case "EMPLOYEE":
            case "SPECIAL_ABLED":
            case "PARTNER":
                return (
                    <>
                        <Form.Group controlId="formEmpId">
                            <Form.Label className="text my-2">
                                Employee ID
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter employee ID"
                                value={empId}
                                onChange={(event) =>
                                    setEmpId(event.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formVehicleType">
                            <Form.Label className="text my-2">
                                Vehicle Type
                            </Form.Label>
                            <Form.Control
                                as="select"
                                value={vehicleType}
                                onChange={(event) => setVehicleType(event.target.value)}
                            >
                                <option value="">Select Vehicle Type</option>
                                <option value="BIKE">BIKE</option>
                                <option value="CAR">CAR</option>
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
                    </>
                );
            case "CLIENT":
                return (
                    <>
                        <Form.Group controlId="formClient">
                            <Form.Label className="text my-2">
                                Client ID
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter client ID"
                                value={empId}
                                onChange={(event) =>
                                    setEmpId(event.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formVehicleType">
                            <Form.Label className="text my-2">
                                Vehicle Type
                            </Form.Label>
                            <Form.Control
                                as="select"
                                value={vehicleType}
                                onChange={(event) => setVehicleType(event.target.value)}
                            >
                                <option value="">Select Vehicle Type</option>
                                <option value="BIKE">BIKE</option>
                                <option value="CAR">CAR</option>
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
                    </>
                )
            case "OTHER":
                return (
                    <>
                        <Form.Group controlId="formOther">
                            <Form.Label className="text my-2">
                                ID
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter ID"
                                value={empId}
                                onChange={(event) =>
                                    setEmpId(event.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="formVehicleType">
                            <Form.Label className="text my-2">
                                Vehicle Type
                            </Form.Label>
                            <Form.Control
                                as="select"
                                value={vehicleType}
                                onChange={(event) => setVehicleType(event.target.value)}
                            >
                                <option value="">Select Vehicle Type</option>
                                <option value="BIKE">BIKE</option>
                                <option value="CAR">CAR</option>
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
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <Container className="my-3">
                <h2 className="text-dark my-3">Add Reservation Form</h2>
                <Form onSubmit={handleAddReservation}>
                    <Form.Group controlId="formSpotType">
                        <Form.Label className="text my-2">
                            Spot Type
                        </Form.Label>
                        <Form.Control
                            as="select"
                            value={spotType}
                            onChange={handleSpotTypeChange}
                        >
                            <option value="EMPLOYEE">Employee</option>
                            <option value="SPECIAL_ABLED">
                                Specially Abled Employee
                            </option>
                            <option value="PARTNER">Partner</option>
                            <option value="CLIENT">Client</option>
                            <option value="OTHER">Other</option>
                        </Form.Control>
                    </Form.Group>
                    {renderReservationForm()}
                    <br />
                    <Button variant="primary" type="submit">
                        Add Reservation
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default AddReservation;
