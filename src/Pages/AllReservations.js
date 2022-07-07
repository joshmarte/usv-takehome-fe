// DEPENDENCIES
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

const API = process.env.REACT_APP_API_URL;

export default function AllReservations() {
    // STATE FOR RESERVATION DATA / FETCH COMPLETED / RESTUARNT NAME
    const [reservations, setReservations] = useState([]);
    const [dataRecieved, setDataRecieved] = useState(false);
    const [restaurantName, setRestaurantName] = useState({});

    // GET API RESERVATION DATA
    useEffect(() => {
        async function reservationFetch() {
            const response = await fetch(`${API}/reservations`);
            const responseData = await response.json();
            setReservations(responseData.reservations);
            setDataRecieved(true);
        }
        reservationFetch();
    }, []);

    // FUNCTION TO GET RESTAURANT NAMES
    useEffect(() => {
        async function restaurantName(id) {
            const response = await fetch(`${API}/restaurants/${id}`);
            const responseData = await response.json();

            return responseData.name;
        }

        if (dataRecieved) {
            reservations.map(async (item) => {
                restaurantName[item.restaurantId] = await restaurantName(
                    item.restaurantId
                );
                setRestaurantName({ ...restaurantName });
            });
        }
    }, [dataRecieved]);

    return (
        <div className="allrestaurants-container">
            {dataRecieved ? (
                <Table striped bordered hover responsive variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            {/* <th>Phone Number</th>
                            <th>Email</th> */}
                            <th>Time</th>
                            <th>Guests</th>
                            <th>Restaurant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    {/* <td>{item.phoneNumber}</td>
                                    <td>{item.email}</td> */}
                                    <td>{formatTime(item.time)}</td>
                                    <td>{item.numGuests}</td>
                                    <td>
                                        {dataRecieved
                                            ? restaurantName[item.restaurantId]
                                            : ""}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            ) : (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
        </div>
    );
}

/**
 * RETURNS A READABLE DAY AND TIME STRING
 * @param {string} timeString - day and time formated from DB
 * @returns {string}
 */
function formatTime(timeString) {
    const date = new Date(timeString);
    return (
        date.toDateString("en-US") +
        " " +
        date.toLocaleTimeString("en-US", {
            timeZone: "UTC",
            hour: "numeric",
            minute: "numeric",
        })
    );
}
