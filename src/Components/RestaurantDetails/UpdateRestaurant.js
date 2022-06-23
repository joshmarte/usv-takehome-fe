//DEPENDENCIES
import { useParams } from "react-router-dom";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { details } from "../../util/cusineandlocation.js";
import { FormGroup } from "react-bootstrap";

const API = process.env.REACT_APP_API_URL;

export default function UpdateRestaurant({ handleClose, show, restaurant }) {
    // PARAMS
    let { id } = useParams();

    // STATE FOR UPDATES
    const [updateRestaurant, setUpdateRestaurant] = useState({
        name: restaurant.name,
        description: restaurant.description,
        phoneNumber: restaurant.phoneNumber,
        openingTime: restaurant.openingTime,
        closingTime: restaurant.closingTime,
        location: restaurant.location,
        cuisine: restaurant.cuisine,
        price: restaurant.price,
        diningRestriction: restaurant.diningRestriction,
        tables: restaurant.tables,
    });

    // HANDLE CHANGE
    const handleChange = (event) => {};

    // HANDLE SUBMIT
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    // HANDLE UPDATE
    const HandleUpdate = () => {
        async function updateData() {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({});

            let requestOptions = {
                method: "PATCH",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch(`${API}/reservations/${id}`, requestOptions);
        }
    };

    return (
        <div className="update-container">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{`Update ${restaurant.name}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body autoFocus>
                    <Form onSubmit={handleSubmit}>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="name"
                                    >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Restaurant Name"
                                            value={restaurant.name}
                                            onChange={handleChange}
                                            disabled
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="phoneNumber"
                                    >
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder="Restaurant Tel"
                                            value={restaurant.phoneNumber}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Group
                                    className="mb-3"
                                    controlId="description"
                                >
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Restaurant Description"
                                        value={restaurant.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="location"
                                    >
                                        <Form.Label>Location</Form.Label>
                                        <Form.Select
                                            value={restaurant.description}
                                            onChange={handleChange}
                                        >
                                            {details.location.map(
                                                (index, item) => {
                                                    return (
                                                        <option
                                                            key={item}
                                                            value={index}
                                                        >
                                                            {index}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="cuisine"
                                    >
                                        <Form.Label>Cuisine</Form.Label>
                                        <Form.Select
                                            value={restaurant.description}
                                            onChange={handleChange}
                                        >
                                            {details.cuisine.map(
                                                (index, item) => {
                                                    return (
                                                        <option
                                                            key={item}
                                                            value={index}
                                                        >
                                                            {index}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="price"
                                    >
                                        <Form.Label>Price</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            value={restaurant.price}
                                            onChange={handleChange}
                                        >
                                            <option value="$">$</option>
                                            <option value="$$">$$</option>
                                            <option value="$$$">$$$</option>
                                            <option value="$$$$">$$$$</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Form.Label>Open Time</Form.Label>
                                        <Form.Control
                                            type="time"
                                            value={restaurant.openingTime}
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        style={{
                            backgroundColor: "orange",
                            border: "2px solid orange",
                        }}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
