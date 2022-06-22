// DEPENDENCIES
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

// UTIL
import interval from "../../util/timeInterval.js";
// import setTimeforAPI from "../../util/setTimeforAPI.js";
import { useNavigate } from "react-router-dom";

export default function CreateReservation({ restaurant, onHide }) {
    // NAVIGATE
    let navigate = useNavigate();

    // USED TO FILL NUMOFGUEST DROPDOWN
    const largestTableSize = Array(8).fill();

    // USED fr-CA to get yyyy-mm-dd FORMAT
    const today = new Date().toLocaleDateString("fr-CA");

    // STATE FOR TIME SELECT OPTIONS
    const [times, setTimes] = useState();

    // STATE FOR RESERVATION POST REQUEST
    const [reservation, setReservation] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        time: "5:00 PM",
        date: today,
        numGuests: 2,
        restaurantId: restaurant.id,
    });

    // MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //FORM ON CHANGE
    const handleChange = (event) => {
        setReservation({
            ...reservation,
            [event.target.id]: event.target.value,
        });
    };

    //FORM SUBMISSION
    const handleSubmit = (event) => {
        event.preventDefault();

        navigate("/restaurants");
    };

    // USING UTIL FUNCTION TO GET TIME SLOTS FROM OPEN TO CLOSE TIMES
    useEffect(() => {
        setTimes(interval(restaurant.openingTime, restaurant.closingTime));
    }, [reservation]);

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
                style={{ marginTop: "50px" }}
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
                                <Col></Col>
                                <Col></Col>
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
                                            value={reservation.date}
                                            onChange={handleChange}
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
                                            onChange={handleChange}
                                            value={reservation.time}
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
        </div>
    );
}
