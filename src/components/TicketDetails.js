import React, { useState, useEffect } from "react";

function TicketDetails() {

    const [ticketdata, setTicketData] = useState([]);

    // Helper function to get cookie by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    useEffect(() => {
        const token = getCookie('token'); // Assuming token cookie name is 'token'
        fetch(`http://localhost:8080/tickets/current`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setTicketData(data))
            .catch(error => console.error(error));
    }, []);

    async function handleCancel(formData) {
        const dataString = localStorage.getItem('userData');
        const data = JSON.parse(dataString);
        const token = getCookie('token'); // Get token from cookies

        try {
            if (data.empId) {
                const response = await fetch(`http://localhost:8080/tickets/cancel?spotId=${ticketdata.spotId}`, {
                    method: "PUT",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData,
                });
                const result = await response.json();
                console.log("Success:", result);
            }
        } catch (error) {
            console.error("Error:", error);
        }
        alert("Ticket cancelled!");
        window.location.reload();
    }

    return (
        <div>
            {(ticketdata.spotId) ? <div>
                <ul className="list-group">
                    <li className="list-group-item text-center"><h2 className="text-dark">Ticket Details</h2></li>
                    <li className="list-group-item fs-5">{`Ticket ID : ${ticketdata.id}`}</li>
                    <li className="list-group-item fs-5">{`Booking Date : ${ticketdata.date}`}</li>
                    <li className="list-group-item fs-5">{`Booking Time : ${ticketdata.time}`}</li>
                    <li className="list-group-item fs-5">{`Spot ID : ${ticketdata.spotId}`}</li>
                    <li className="list-group-item fs-5">{`Vehicle Number : ${ticketdata.vehicleNumber}`}</li>
                    <li className="list-group-item fs-5">{`Vehicle Type : ${ticketdata.vehicleType}`}</li>

                    <div className="d-flex justify-content-center mt-4 w-20">
                        <div className="ticket-details-button">
                            <ul className="list-group list-group-horizontal">
                                <li className="list-group-item">
                                    <button className="btn btn-danger w-20" onClick={handleCancel}>
                                        Cancel
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </ul>
            </div> : <h2 className="text text-center my-3">No Active booking!!</h2>
            }
        </div>
    )
}
export default TicketDetails;
