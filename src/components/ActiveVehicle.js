import React,{useState,useEffect} from "react";
import Cookies from "js-cookie";
import { Table, Button } from "react-bootstrap";

function ActiveVehicle(){
    const [vehicles, setVehicles] = useState([]);
    const token = Cookies.get("token");
    const handleDeleteVehicle = async (vehicleId) => {
        try {
            await fetch(`http://localhost:8080/api/vehicles/${vehicleId}`, {
                method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
            });
            fetchVehicles();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchVehicles();
    }, []);
    const fetchVehicles = async () => {

        const token = Cookies.get("token");

        try {
            const response = await fetch(`http://localhost:8080/api/vehicles/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setVehicles(data);
        } catch (error) {
            console.log(error);
        }
    };
    return(
        <>
        {vehicles.length > 0 ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Vehicle Type</th>
                                        <th>Vehicle Number</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicles.map((vehicle, index) => (
                                        <tr key={vehicle.id}>
                                            <td>{index + 1}</td>
                                            <td>{vehicle.vehicleType}</td>
                                            <td>{vehicle.vehicleNumber}</td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleDeleteVehicle(vehicle.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <h2 className="text text-center my-3">No Active Vehicles!!</h2>
                        )}
        </>

    )
}
export default ActiveVehicle;
