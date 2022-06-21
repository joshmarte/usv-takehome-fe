// DEPENDENCIES
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

// UTIL
import interval from "../../util/timeInterval.js";

export default function CreateReservation({ restaurant }) {
    // USED TO FILL NUMOFGUEST DROPDOWN
    const largestTableSize = Array(8).fill();
    // USED fr-CA to get yyyy-mm-dd FORMAT
    const today = new Date().toLocaleDateString("fr-CA");

    // STATE FOR TIME SELECT OPTIONS
    const [times, setTimes] = useState([]);

    // STATE FOR RESERVATION POST REQUEST
    const [reservation, setReservation] = useState({
        date: today,
        time: "5:00 PM",
        numGuests: 2,
    });

    //FORM ON CHANGE
    const handleChange = (event) => {
        setReservation({
            ...reservation,
            [event.target.id]: event.target.value,
        });
    };

    //
    useEffect(() => {
        setTimes(interval(restaurant.openingTime, restaurant.closingTime));
    }, [restaurant]);

    return (
        <div className="reservation-card">
            <Card>
                <Card.Header>Make a reservation</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Form>
                            <Form.Group className="mb-3" controlId="numGuests">
                                <Form.Label>Party Size</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    required
                                    onChange={handleChange}
                                    value={reservation.numGuests}
                                >
                                    {largestTableSize.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={index + 1}
                                            >{`${index + 1} guests`}</option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    min={today}
                                    value={reservation.date}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="time">
                                <Form.Label>Time</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    htmlSize="1"
                                    onChange={handleChange}
                                    value={reservation.time}
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

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}
