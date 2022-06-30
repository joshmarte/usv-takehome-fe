// DEPENDENCIES
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function UpdateConfirmedModal({
    confirmedShow,
    setConfirmedShow,
    item,
}) {
    // NAVIGATE
    let navigate = useNavigate();

    // MODAL
    const handleClose = () => {
        setConfirmedShow(false);
        navigate("/restaurants");
    };

    return (
        <div className="thankyou-modal">
            <Modal
                show={confirmedShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Thank You for Your Updates to your Reservation{" "}
                        {item.firstName}!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
