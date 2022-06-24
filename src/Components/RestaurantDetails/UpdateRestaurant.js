/**
 * handling nested object
 * handling patch
 * handling time for patch
 */

//DEPENDENCIES
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { details } from "../../util/cusineandlocation.js";
import { FormGroup } from "react-bootstrap";
import interval from "../../util/timeInterval.js";

const API = process.env.REACT_APP_API_URL;

export default function UpdateRestaurant({ handleClose, show, restaurant }) {
    // PARAMS
    let { id } = useParams();

    // STATE FOR UPDATES
    const [updateRestaurant, setUpdateRestaurant] = useState({});

    // STATE FOR INTERVAL
    const [intervals, setInterval] = useState(interval("00:00:00", "24:00:00"));
    const [openTime, setOpenTime] = useState();
    const [closeTime, setCloseTime] = useState();
    const [tables, setTables] = useState({
        twoPersonTables: 0,
        fourPersonTables: 0,
        eightPersonTables: 0,
    });

    //
    useEffect(() => {
        setUpdateRestaurant(restaurant);
        setOpenTime(Time(restaurant.openingTime));
        setCloseTime(Time(restaurant.closingTime));
        setTables(restaurant.tables);
    }, [restaurant]);

    // HANDLE CHANGE...NESTED?
    const handleChange = (event) => {
        if (event.target.id === "tables") {
            setUpdateRestaurant({
                ...updateRestaurant,
                [event.target.id]: event.target.value,
            });
        } else {
            setUpdateRestaurant({
                ...updateRestaurant,
                [event.target.id]: event.target.value,
            });
        }
        console.log(updateRestaurant, event.target.value);
    };

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
                scrollable={true}
                centered
                style={{ marginTop: "50px" }}
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
                                            value={updateRestaurant.phoneNumber}
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
                                        value={updateRestaurant.description}
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
                                            value={updateRestaurant.location}
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
                                            value={updateRestaurant.cuisine}
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
                                            value={updateRestaurant.price}
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
                                    <FormGroup
                                        className="mb-3"
                                        controlId="openingTime"
                                    >
                                        <Form.Label>Open Time</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            value={openTime}
                                            onChange={handleChange}
                                        >
                                            {intervals.map((item, index) => {
                                                return (
                                                    <option
                                                        value={item}
                                                        key={index}
                                                    >
                                                        {item}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup
                                        className="mb-3"
                                        controlId="closingTime"
                                    >
                                        <Form.Label>Close Time</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            value={closeTime}
                                            onChange={handleChange}
                                        >
                                            {intervals.map((item, index) => {
                                                return (
                                                    <option
                                                        value={item}
                                                        key={index}
                                                    >
                                                        {item}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <div>Tables:</div>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="tables"
                                    >
                                        <Form.Label>Two Person</Form.Label>
                                        <Form.Control
                                            as="input"
                                            value={
                                                tables
                                                    ? tables.twoPersonTables
                                                    : 0
                                            }
                                            type="number"
                                            onChange={handleChange}
                                            min="0"
                                            name="twoPersonTables"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="tables"
                                    >
                                        <Form.Label>Four Person</Form.Label>
                                        <Form.Control
                                            as="input"
                                            value={
                                                tables
                                                    ? tables.fourPersonTables
                                                    : 0
                                            }
                                            type="number"
                                            onChange={handleChange}
                                            min="0"
                                            name="fourPersonTables"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="tables"
                                    >
                                        <Form.Label>Eight Person</Form.Label>
                                        <Form.Control
                                            as="input"
                                            value={
                                                tables
                                                    ? tables.eightPersonTables
                                                    : 0
                                            }
                                            type="number"
                                            onChange={handleChange}
                                            min="0"
                                            name="eightPersonTables"
                                        />
                                    </Form.Group>
                                </Col>
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

function Time(stringTime) {
    let date = new Date(`June 24, 2022 ${stringTime}`);
    let options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };
    let timeString = date.toLocaleString("en-US", options);
    return timeString;
}
