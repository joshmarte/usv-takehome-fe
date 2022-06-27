// DEPENDENCIES
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ThanyouModal({ thankyouShow, setThankyouShow, name }) {
    // NAVIGATE
    let navigate = useNavigate();

    // MODAL
    const handleClose = () => {
        setThankyouShow(false);
        navigate("/");
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
                        Your Updates to {name} have been completed
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
