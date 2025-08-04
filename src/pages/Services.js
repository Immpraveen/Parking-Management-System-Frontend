import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ServiceNavbar from "../components/ServiceNavbar";
import TicketDetails from "../components/TicketDetails";
import NewBookingEmployee from "../components/NewBookingEmployee";
import ActiveVehicle from "../components/ActiveVehicle";
import AddVehicle from "../components/AddVehicle";
import SecurityIncident from "../components/SecurityIncident";
import MyActiveIncidents from "../components/MyActiveIncidents"
function Services() {
    const [key, setKey] = useState("active");
    
    

    return (
        <div>
            <ServiceNavbar />
            <div className="container mt-5 border border-light rounded shadow">
                <h1>Welcome</h1>
                <Tabs activeKey={key} onSelect={(k) => {
                    setKey(k);
                }}>
                    <Tab eventKey="active" title="Active Bookings">
                        <TicketDetails />
                    </Tab>
                    <Tab eventKey="new" title="New Booking">
                        <NewBookingEmployee />
                    </Tab>
                    <Tab eventKey="activevehicle" title="Active Vehicle">
                    <ActiveVehicle/>
                    </Tab>
                    <Tab eventKey="add" title="Add Vehicle">
                        <AddVehicle/>
                    </Tab>
                    <Tab eventKey="incident" title="Security Incident">
                        <SecurityIncident/>
                    </Tab>
                    <Tab eventKey="activeincident" title="My Incidents">
                        <MyActiveIncidents/>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default Services;
