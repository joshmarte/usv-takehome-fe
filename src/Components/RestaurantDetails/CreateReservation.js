// DEPENDENCIES
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

export default function CreateReservation() {
    return (
        <div className="reservation-card">
            <Card>
                <Card.Header>Make a reservation</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Party Size</ListGroup.Item>
                    <ListGroup.Item>Date</ListGroup.Item>
                    <ListGroup.Item>Time</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}
