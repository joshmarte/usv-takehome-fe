import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useState } from "react";

export default function UpdateReservation({
    data,
    show,
    handleUpdateShow,
    setUpdateShow,
}) {
    // HANDLE CHANGE FOR FORM
    const handleChange = (event) => {};

    // HANDLE SUBMIT
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="update-container">
            <Modal
                show={show}
                onHide={setUpdateShow(false)}
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
                                            value={data.firstName}
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
                                            value={data.lastName}
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
                                            value={data.phoneNumber}
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
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        {/* <Form.Control.Feedback type="invalid">
                                            Ten digits no space, dashes or
                                            parenthesis, (ex: 1234567890){" "}
                                        </Form.Control.Feedback> */}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row></Row>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
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
            {/* <ThanyouModal
                name={restaurant.name}
                thankyouShow={thankyouShow}
                setThankyouShow={setThankyouShow}
            /> */}
        </div>
    );
}
