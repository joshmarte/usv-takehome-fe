import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import UpdateConfirmedModal from "./UpdateConfirmedModal.js";

// UTIL
import interval from "../../util/timeInterval.js";
import setTimeforAPI from "../../util/setTimeforAPI.js";
import difference from "../../util/difference.js";

const API = process.env.REACT_APP_API_URL;

export default function UpdateReservation({
    item,
    show,
    setUpdateShow,
    open,
    close,
}) {
    // MODAL CLOSE
    const handleUpdateClose = () => {
        setUpdateShow(false);
    };
    // USED TO FILL NUM OF GUEST DROPDOWN
    const largestTableSize = Array(8).fill();
    // STATE FOR TIME SELECT OPTIONS
    const [times, setTimes] = useState([]);
    // USED fr-CA to get yyyy-mm-dd FORMAT
    const today = new Date().toLocaleDateString("fr-CA");

    // STATE FOR SINGLE RESERVATION BEING PASSED TRU COMPONENTS
    const [singleRes, setSingleRes] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        time: "",
        numGuests: "",
    });

    // HANDLE CHANGE FOR FORM
    const handleChange = (event) => {
        setSingleRes({ ...singleRes, [event.target.id]: event.target.value });
    };

    // SET INITIAL FORM VALUES
    useEffect(() => {
        setSingleRes(item);
    }, [item]);

    // SEPERATE STATE FOR DATE AND TIME
    const [formDateTime, setFormDateTime] = useState({
        date: "",
        time: "",
    });

    // SETTING INITIAL DATE AND TIME FOR FORM FROM DATA
    useEffect(() => {
        setFormDateTime(standardTime(item.time));
    }, [item]);

    // DATE TIME FORM CHANGE
    const handleChangeDT = (event) => {
        setFormDateTime({
            ...formDateTime,
            [event.target.id]: event.target.value,
        });
    };

    // USING UTIL FUNCTION TO GET TIME SLOTS FROM OPEN TO CLOSE TIMES
    useEffect(() => {
        if (formDateTime.date <= today) {
            setTimes(interval(open, close, true));
        } else {
            setTimes(interval(open, close, false));
        }
    }, [open, close, formDateTime.date]);

    //FORMATING FORM TIME WITH BOTH INPUTS (DATE AND TIME) IN CORRECT FORMAT
    useEffect(() => {
        setSingleRes({
            ...singleRes,
            ["time"]: setTimeforAPI(formDateTime.date, formDateTime.time),
        });
    }, [formDateTime.date, formDateTime.time]);

    // HANDLE SUBMIT FOR FORM
    const handleSubmit = (event) => {
        event.preventDefault();
        const objDifference = difference(item, singleRes);
        const postRequestSuccess = HandleUpdate(objDifference);

        handleUpdateClose();
        setConfirmedShow(true);
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

            fetch(`${API}/reservations/${item.id}`, requestOptions);
        }
        updateData();
    };

    // UPDATE CONFIRMED MODAL
    const [confirmedShow, setConfirmedShow] = useState(false);

    return (
        <div className="update-container">
            <Modal
                show={show}
                onHide={handleUpdateClose}
                backdrop="static"
                keyboard={false}
                scrollable={true}
                centered
                style={{ marginTop: "50px" }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Reservation</Modal.Title>
                </Modal.Header>
                <Modal.Body autoFocus>
                    <Form validated>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="firstName"
                                    >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={singleRes.firstName}
                                            onChange={handleChange}
                                            disabled
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="lastName"
                                    >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={singleRes.lastName}
                                            onChange={handleChange}
                                            disabled
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
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            value={singleRes.phoneNumber}
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
                                <Col>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="email"
                                    >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={
                                                singleRes.email
                                                    ? singleRes.email
                                                    : ""
                                            }
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
                                            value={singleRes.numGuests}
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
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleUpdateClose}>
                        Close
                    </Button>
                    <Button
                        style={{
                            backgroundColor: "orange",
                            border: "2px solid orange",
                        }}
                        type="submit"
                        onClick={handleSubmit}
                        // disabled={}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            <UpdateConfirmedModal
                confirmedShow={confirmedShow}
                setConfirmedShow={setConfirmedShow}
                item={item}
            />
        </div>
    );
}

function standardTime(stringTime) {
    let date = new Date(stringTime);
    let obj = {};
    let options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };
    let timeString = date.toLocaleString("en-US", options);
    let dateString = date.toLocaleDateString("fr-CA");

    obj.time = timeString;
    obj.date = dateString;
    return obj;
}
