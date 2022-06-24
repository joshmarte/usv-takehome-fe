// DEPENDENCIES
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
const API = process.env.REACT_APP_API_URL;

export default function CreateRestaurant() {
    // POST CALL
    const handleSubmit = () => {};

    return (
        <div className="createRestaurant-container">
            {/* <Form onSubmit={handleSubmit}>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="name">
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
                        <Form.Group className="mb-3" controlId="description">
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
                            <Form.Group className="mb-3" controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Select
                                    value={restaurant.description}
                                    onChange={handleChange}
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
                                    value={restaurant.description}
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
                            <FormGroup className="mb-3" controlId="openingTime">
                                <Form.Label>Open Time</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    value={openTime}
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
                                    value={closeTime}
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
                    </Row>

                    <Row>
                        <div>Tables:</div>
                        <Col>
                            <Form.Group className="mb-3" controlId="tables">
                                <Form.Label>Two Person</Form.Label>
                                <Form.Control
                                    as="input"
                                    value={tables ? tables.twoPersonTables : 0}
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
                                    value={tables ? tables.fourPersonTables : 0}
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
                                        tables ? tables.eightPersonTables : 0
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
            </Form> */}
        </div>
    );
}
