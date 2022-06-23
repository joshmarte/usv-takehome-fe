// DEPENDENCIES
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";

//UTIL
import dateTime from "../../util/dateTime.js";
//COMPONENT
import ReservationModal from "../Reservations/ReservationModal";
import DeleteRestaurants from "./DeleteRestaurant.js";

export default function ResaurantDetails({ restaurant }) {
    // DELETE MODAL
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // JSX
    return (
        <div className="restaurant-details">
            <img
                variant="top"
                src="https://media.timeout.com/images/105556144/750/422/image.jpg"
                alt="Restaurant Logo"
                style={{
                    width: "75vw",
                    height: "500px",
                    marginBottom: "60px",
                }}
            />
            <Card style={{ width: "75vw", display: "flex" }}>
                <Card.Body>
                    <Card.Title as="h1">{restaurant.name}</Card.Title>
                    <Card.Subtitle
                        as="h5"
                        style={{
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                            border: "1px dashed orange",
                            padding: "10px",
                        }}
                    >
                        <i className="fa-solid fa-location-dot"></i>
                        {restaurant.location}

                        <i className="fa-regular fa-clock"></i>
                        {`${dateTime(restaurant.openingTime)} - ${dateTime(
                            restaurant.closingTime
                        )}`}

                        <i className="fa-solid fa-sack-dollar"></i>
                        {restaurant.price}
                    </Card.Subtitle>
                    <Card.Text>{restaurant.description}</Card.Text>
                    <div
                        className="details-buttons"
                        style={{ display: "flex" }}
                    >
                        <ReservationModal restaurant={restaurant} />
                        <Button
                            variant="primary"
                            style={{ marginRight: "5px" }}
                        >
                            Update
                        </Button>
                        <Button variant="danger" onClick={handleShow}>
                            Delete
                        </Button>
                    </div>
                    <DeleteRestaurants handleClose={handleClose} show={show} />
                </Card.Body>
            </Card>
        </div>
    );
}
