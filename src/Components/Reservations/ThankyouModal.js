// DEPENDENCIES
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ThanyouModal({
    thankyouShow,
    setThankyouShow,
    reservation,
}) {
    // NAVIGATE
    let navigate = useNavigate();

    // MODAL
    const handleClose = () => {
        setThankyouShow(false);
        navigate("/restaurants");
    };

    return (
        <div className="thankyou-modal">
            <Modal
                show={thankyouShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Thank You for Your Reservation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {reservation.firstName} you have been confirmed for a
                        reservation.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
