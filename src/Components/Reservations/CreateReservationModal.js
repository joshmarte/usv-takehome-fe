// DEPENDENCIES
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

// COMPONENTS
import ThanyouModal from "./ThankyouModal.js";

// UTIL
import interval from "../../util/timeInterval.js";
import setTimeforAPI from "../../util/setTimeforAPI.js";

const API = process.env.REACT_APP_API_URL;

export default function CreateReservation({ restaurant }) {
    // PARAMS
    let { id } = useParams();

    // MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // THANK YOU MODAL
    const [thankyouShow, setThankyouShow] = useState(false);

    // USED fr-CA to get yyyy-mm-dd FORMAT
    const today = new Date().toLocaleDateString("fr-CA");

    // STATE FOR RESERVATION POST REQUEST
    const [reservation, setReservation] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        numGuests: 2,
        restaurantId: id,
        time: "",
    });

    //SEPERATE STATE FOR DATE AND TIME
    const [formDateTime, setFormDateTime] = useState({
        date: today,
        time: "5:00 PM",
    });

    // USED TO FILL NUMOFGUEST DROPDOWN
    const largestTableSize = Array(8).fill();
    // STATE FOR TIME SELECT OPTIONS
    const [times, setTimes] = useState([]);

    //FORM ON CHANGE
    const handleChange = (event) => {
        setReservation({
            ...reservation,
            [event.target.id]: event.target.value,
        });
    };

    // DATE TIME FORM CHANGE
    const handleChangeDT = (event) => {
        setFormDateTime({
            ...formDateTime,
            [event.target.id]: event.target.value,
        });
    };
    //FORM SUBMISSION
    const handleSubmit = (event) => {
        event.preventDefault();
        async function postReservation() {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            let requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(reservation),
                redirect: "follow",
            };
            try {
                let response = await fetch(
                    `${API}/reservations`,
                    requestOptions
                );
                let apiData = await response.json();
            } catch (error) {
                console.log(error);
            }
        }
        postReservation();
        handleClose();
        setThankyouShow(true);
    };

    // USING UTIL FUNCTION TO GET TIME SLOTS FROM OPEN TO CLOSE TIMES
    useEffect(() => {
        if (formDateTime.date <= today) {
            setTimes(
                interval(restaurant.openingTime, restaurant.closingTime, true)
            );
        } else {
            setTimes(
                interval(restaurant.openingTime, restaurant.closingTime, false)
            );
        }
    }, [restaurant.openingTime, restaurant.closingTime, formDateTime.date]);

    //FORMAT DATE FOR PATCH FORM
    useEffect(() => {
        setReservation({
            ...reservation,
            ["time"]: setTimeforAPI(formDateTime.date, formDateTime.time),
        });
    }, [formDateTime.date, formDateTime.time]);

    return (
        <div className="reservation-modal">
            <Button
                variant="primary"
                onClick={handleShow}
                style={{ marginRight: "5px" }}
            >
                Make a reservation!{" "}
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ margin: "0 auto" }}>
                        Make a reservation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="firstName"
                                    >
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="First Name"
                                            value={reservation.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="lastName"
                                    >
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Last Name"
                                            value={reservation.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="phoneNumber"
                                    >
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder="Phone number"
                                            value={reservation.phoneNumber}
                                            onChange={handleChange}
                                            required
                                            minLength="10"
                                            maxLength="10"
                                            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="email"
                                    >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            value={reservation.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="date"
                                    >
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            min={today}
                                            value={formDateTime.date}
                                            onChange={handleChangeDT}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="time"
                                    >
                                        <Form.Label>Time</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            htmlSize="1"
                                            onChange={handleChangeDT}
                                            value={formDateTime.time}
                                            required
                                            disabled={times ? false : true}
                                        >
                                            {times
                                                ? times.map((item, index) => {
                                                      return (
                                                          <option
                                                              key={index}
                                                              value={item}
                                                          >
                                                              {item}
                                                          </option>
                                                      );
                                                  })
                                                : 0}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {" "}
                                    <Form.Group
                                        className="mb-3"
                                        controlId="numGuests"
                                    >
                                        <Form.Label>Party Size</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            required
                                            onChange={handleChange}
                                            value={reservation.numGuests}
                                        >
                                            {largestTableSize.map(
                                                (item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={index + 1}
                                                        >{`${
                                                            index + 1
                                                        } guests`}</option>
                                                    );
                                                }
                                            )}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
            <ThanyouModal
                thankyouShow={thankyouShow}
                setThankyouShow={setThankyouShow}
                reservation={reservation}
            />
        </div>
    );
}
