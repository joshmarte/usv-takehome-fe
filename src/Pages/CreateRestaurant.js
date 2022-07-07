// DEPENDENCIES
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

//FUNCTIONS
import { details } from "../util/cusineandlocation.js";
import interval from "../util/timeInterval.js";
import militaryTime from "../util/military.js";

const API = process.env.REACT_APP_API_URL;

export default function CreateRestaurant() {
    // NAVIGATE
    let navigate = useNavigate();

    // FORM STATE
    const [newRestaurant, setNewRestaurant] = useState({
        name: "",
        description: "",
        phoneNumber: "",
        openingTime: "12:00 PM",
        closingTime: "10:30 PM",
        price: "",
        cuisine: "",
        location: "",
        diningRestriction: "Delivery Only",
        tables: {
            twoPersonTables: 0,
            fourPersonTables: 0,
            eightPersonTables: 0,
        },
    });

    // STATE FOR FORM VALIDATION
    const [validated, setValidated] = useState(false);

    // STATE FOR TIME INTERVAL DROPDOWN
    const [intervals, setInterval] = useState(
        interval("00:00:00", "24:00:00", false)
    );

    // HANDLE CHANGE...NESTED?
    const handleChange = (event) => {
        if (event.target.id === "tables") {
            setNewRestaurant({
                ...newRestaurant,
                ["tables"]: {
                    ...newRestaurant.tables,
                    [event.target.name]: +event.target.value,
                },
            });
        } else {
            setNewRestaurant({
                ...newRestaurant,
                [event.target.id]: event.target.value,
            });
        }
    };

    // POST CALL
    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            let open = militaryTime(newRestaurant.openingTime);
            let close = militaryTime(newRestaurant.closingTime);

            setNewRestaurant((newRestaurant) => ({
                ...newRestaurant,
                ["openingTime"]: open,
            }));
            setNewRestaurant((newRestaurant) => ({
                ...newRestaurant,
                ["closingTime"]: close,
            }));

            async function createRestaurant() {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify(newRestaurant);

                var requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };

                let postRestaurant = await fetch(
                    `${API}/restaurants`,
                    requestOptions
                );
                let postData = await postRestaurant.json();
            }
            createRestaurant();
            navigate("/");
        }

        setValidated(true);
    };

    return (
        <div className="createRestaurant-container">
            <h3 style={{ paddingLeft: "10px" }}>Create a Restaurant Form:</h3>
            <br></br>
            <Form validated={validated} onSubmit={handleSubmit}>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Restaurant Name"
                                    value={newRestaurant.name}
                                    onChange={handleChange}
                                    required
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
                                    value={newRestaurant.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    minLength="10"
                                    maxLength="10"
                                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ten digits no space, dashes or parenthesis,
                                    (ex: 1234567890){" "}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Restaurant Description"
                                value={newRestaurant.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Row className="createForm-singleRow">
                        <Col>
                            <Form.Group className="mb-3" controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Select
                                    value={newRestaurant.location}
                                    onChange={handleChange}
                                    required
                                >
                                    {details.location.map((index, item) => {
                                        return (
                                            <option key={item} value={index}>
                                                {index}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="cuisine">
                                <Form.Label>Cuisine</Form.Label>
                                <Form.Select
                                    value={newRestaurant.cuisine}
                                    onChange={handleChange}
                                >
                                    {details.cuisine.map((index, item) => {
                                        return (
                                            <option key={item} value={index}>
                                                {index}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    value={newRestaurant.price}
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

                    <Row className="createForm-singleRow">
                        <Col>
                            <FormGroup className="mb-3" controlId="openingTime">
                                <Form.Label>Open Time</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    value={newRestaurant.openingTime}
                                    onChange={handleChange}
                                >
                                    {intervals.map((item, index) => {
                                        return (
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup className="mb-3" controlId="closingTime">
                                <Form.Label>Close Time</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    value={newRestaurant.closingTime}
                                    onChange={handleChange}
                                >
                                    {intervals.map((item, index) => {
                                        return (
                                            <option value={item} key={index}>
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
                                controlId="diningRestriction"
                                value={newRestaurant.diningRestriction}
                                required
                            >
                                <Form.Label>Dining Restriction</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    value={newRestaurant.diningRestriction}
                                    onChange={handleChange}
                                >
                                    <option value="Delivery Only">
                                        Delivery Only
                                    </option>
                                    <option value="Takeout Only">
                                        Takeout Only
                                    </option>
                                </Form.Select>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row className="createForm-singleRow">
                        <div>Tables:</div>

                        <Col>
                            <Form.Group className="mb-3" controlId="tables">
                                <Form.Label>Two Person</Form.Label>
                                <Form.Control
                                    as="input"
                                    value={
                                        newRestaurant.tables &&
                                        newRestaurant.tables.twoPersonTables
                                            ? newRestaurant.tables
                                                  .twoPersonTables
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
                            <Form.Group className="mb-3" controlId="tables">
                                <Form.Label>Four Person</Form.Label>
                                <Form.Control
                                    as="input"
                                    value={
                                        newRestaurant.tables &&
                                        newRestaurant.tables.fourPersonTables
                                            ? newRestaurant.tables
                                                  .fourPersonTables
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
                            <Form.Group className="mb-3" controlId="tables">
                                <Form.Label>Eight Person</Form.Label>
                                <Form.Control
                                    as="input"
                                    value={
                                        newRestaurant.tables &&
                                        newRestaurant.tables.eightPersonTables
                                            ? newRestaurant.tables
                                                  .eightPersonTables
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
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        type="submit"
                        style={{ margin: "0 auto" }}
                    >
                        Submit
                    </Button>
                </Container>
            </Form>
        </div>
    );
}
