// DEPENDENCIES
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const API = process.env.REACT_APP_API_URL;

export default function DeleteRestaurants({ handleClose, show }) {
    // PARAMS
    let { id } = useParams();

    // HANDLE DELETE
    const HandleDelte = () => {
        async function deleteData() {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let requestOptions = {
                method: "DELETE",
                headers: myHeaders,
                redirect: "follow",
            };

            fetch(`${API}/reservations/${id}`, requestOptions);
        }
    };

    return (
        <div className="delete-container">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body autoFocus>
                    This Action can not be undone! Click Understood to delete
                    this Reastaurant.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
