/**
 * handling nested object
 * handling patch
 * handling time for patch
 */

//DEPENDENCIES
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import FormGroup from "react-bootstrap/FormGroup";
import ThanyouModal from "./ThankyouModal.js";
//FUNCTIONS
import { details } from "../../util/cusineandlocation.js";
import interval from "../../util/timeInterval.js";
import militaryTime from "../../util/military.js";

const API = process.env.REACT_APP_API_URL;

export default function UpdateRestaurant({ handleClose, show, restaurant }) {
    // THANK YOU MODAL
    const [thankyouShow, setThankyouShow] = useState(false);

    // PARAMS
    let { id } = useParams();

    // NAVIGATE
    let navigate = useNavigate();

    // STATE FOR UPDATES
    const [updateRestaurant, setUpdateRestaurant] = useState(restaurant);

    // STATE FOR INTERVAL
    const [intervals, setInterval] = useState(
        interval("00:00:00", "24:00:00", false)
    );

    // GET AND FORMAT RESTURANT DATA FOR FORM
    useEffect(() => {
        setUpdateRestaurant(restaurant);
    }, [restaurant]);

    useEffect(() => {
        let open = standardTime(restaurant.openingTime, true);
        setUpdateRestaurant((updateRestaurant) => ({
            ...updateRestaurant,
            ["openingTime"]: open,
        }));
    }, [restaurant]);

    useEffect(() => {
        let close = standardTime(restaurant.closingTime, true);
        setUpdateRestaurant((updateRestaurant) => ({
            ...updateRestaurant,
            ["closingTime"]: close,
        }));
    }, [restaurant]);

    // HANDLE CHANGE...NESTED?
    const handleChange = (event) => {
        if (event.target.id === "tables") {
            setUpdateRestaurant({
                ...updateRestaurant,
                ["tables"]: {
                    ...updateRestaurant.tables,
                    [event.target.name]: +event.target.value,
                },
            });
        } else {
            setUpdateRestaurant({
                ...updateRestaurant,
                [event.target.id]: event.target.value,
            });
        }
    };

    // HANDLE SUBMIT
    const handleSubmit = (event) => {
        event.preventDefault();

        const objDifference = difference(restaurant, updateRestaurant);
        const postRequestSuccess = HandleUpdate(objDifference);

        if (postRequestSuccess) {
            handleClose();
            setThankyouShow(true);
            navigate("/");
        }
    };

    // HANDLE UPDATE
    const HandleUpdate = (data) => {
        async function updateData() {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(data);

            let requestOptions = {
                method: "PATCH",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch(`${API}/restaurants/${id}`, requestOptions);
        }
        updateData();
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
                    <Form validated>
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
                                            value={updateRestaurant.name}
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
                                            minLength="10"
                                            maxLength="10"
                                            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Ten digits no space, dashes or
                                            parenthesis, (ex: 1234567890){" "}
                                        </Form.Control.Feedback>
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

                            <Row className="update-time-container">
                                <Col>
                                    <FormGroup
                                        className="mb-3"
                                        controlId="openingTime"
                                    >
                                        <Form.Label>Open Time</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            value={updateRestaurant.openingTime}
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
                                            value={updateRestaurant.closingTime}
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

                            <Row className="update-tables-container">
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
                                                updateRestaurant.tables &&
                                                updateRestaurant.tables
                                                    .twoPersonTables
                                                    ? updateRestaurant.tables
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
                                    <Form.Group
                                        className="mb-3"
                                        controlId="tables"
                                    >
                                        <Form.Label>Four Person</Form.Label>
                                        <Form.Control
                                            as="input"
                                            value={
                                                updateRestaurant.tables &&
                                                updateRestaurant.tables
                                                    .fourPersonTables
                                                    ? updateRestaurant.tables
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
                                    <Form.Group
                                        className="mb-3"
                                        controlId="tables"
                                    >
                                        <Form.Label>Eight Person</Form.Label>
                                        <Form.Control
                                            as="input"
                                            value={
                                                updateRestaurant.tables &&
                                                updateRestaurant.tables
                                                    .eightPersonTables
                                                    ? updateRestaurant.tables
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
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            <ThanyouModal
                name={restaurant.name}
                thankyouShow={thankyouShow}
                setThankyouShow={setThankyouShow}
            />
        </div>
    );
}

/**
 * handles converting between 12 and 24 hours formats
 * @param {string} stringTime - string for time
 * @param {boolean} format - control the hour format true for  and flase for military
 */
function standardTime(stringTime, format) {
    let date = new Date(`June 24, 2022 ${stringTime}`);
    let options = {
        hour: "numeric",
        minute: "numeric",
        hour12: format,
    };
    let timeString = date.toLocaleString("en-US", options);
    return timeString;
}

/**
 * handles returing the difference in value between two objects
 * @param {object} obj1 - object one
 * @param {object} obj2 - object two

 */
const difference = (obj1, obj2) => {
    let answer = {};
    let keyFound = [];
    Object.keys(obj1).forEach((key) => {
        if (key === "openingTime" || key === "closingTime") {
            if (obj1[key] !== militaryTime(obj2[key])) {
                return keyFound.push(key);
            }
        } else {
            if (obj1[key] !== obj2[key]) {
                return keyFound.push(key);
            }
        }
    });

    if (keyFound.length > 0) {
        for (let item of keyFound) {
            if (item === "openingTime" || item === "closingTime") {
                answer[item] = militaryTime(obj2[item]);
            } else {
                answer[item] = obj2[item];
            }
        }
    }
    return answer;
};
