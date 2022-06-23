// DEPENDENCIES
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";

//UTIL
import dateTime from "../../util/dateTime.js";
//COMPONENT
import ReservationModal from "../Reservations/ReservationModal";
import DeleteRestaurants from "./DeleteRestaurant.js";
import UpdateRestaurant from "./UpdateRestaurant.js";

export default function ResaurantDetails({ restaurant }) {
    // DELETE MODAL
    const [deleteShow, setDeleteShow] = useState(false);

    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);

    // UPDATE MODAL
    const [updateShow, setUpdateShow] = useState(false);

    const handleUpdateClose = () => setUpdateShow(false);
    const handleUpdateShow = () => setUpdateShow(true);

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
                    <div
                        style={{
                            display: "flex",
                            alignContent: "end",
                            width: "100%",
                            justifyContent: "space-between",
                        }}
                    >
                        <Card.Title as="h1">{restaurant.name}</Card.Title>
                        <DropdownButton
                            id="dropdown-item-button"
                            variant="secondary"
                            size="sm"
                            title=""
                        >
                            <Dropdown.Item
                                as="button"
                                onClick={handleUpdateShow}
                            >
                                Update
                            </Dropdown.Item>
                            <Dropdown.Item
                                as="button"
                                onClick={handleDeleteShow}
                            >
                                Delete
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
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
                    </div>
                    <DeleteRestaurants
                        handleClose={handleDeleteClose}
                        show={deleteShow}
                        name={restaurant.name}
                    />
                    <UpdateRestaurant
                        handleClose={handleUpdateClose}
                        show={updateShow}
                        restaurant={restaurant}
                    />
                </Card.Body>
            </Card>
        </div>
    );
}
