// DEPENDENCIES
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";

// COMPONENTS
import ResItems from "./ResItems";

export default function RestaurantResModal({
    resShow,
    setResShow,
    dates,
    reservations,
    setSingleResID,
    handleUpdateShow,
}) {
    // MODAL
    const handleResClose = () => {
        setSelectedDates();
        setResShow(false);
    };
    // STATE FOR DROPDOWN SELECT
    const [selectedDates, setSelectedDates] = useState();

    // ON SELECT DROPDOWN
    const handleSelect = (event) => {
        setSelectedDates(event);
    };

    // HANDLE FILLING DROPDOWN WITH CURRENT DATES
    const handleFillDropDown = () => {
        let today = new Date().toLocaleDateString("en-US");
        if (dates) {
            return dates
                .filter((item, index) => {
                    // ONLY SHOW DATES AFTER TODAY
                    return item >= today;
                })
                .map((item, index) => {
                    return (
                        <Dropdown.Item eventKey={item} key={index}>
                            {item}
                        </Dropdown.Item>
                    );
                });
        }
    };

    // HANDLE FILTER FOR AVAILABLE RESERVATIONS ? DEFAULT TO ALL IN PRESENT ? HISTORICAL
    const handleReservationItems = () => {
        if (!!reservations) {
            if (reservations[0]) {
                let today = new Date();
                today = today.toLocaleDateString("en-US");
                if (!selectedDates) {
                    return reservations.map((item, index) => {
                        return (
                            <ResItems
                                item={item}
                                key={index}
                                handleResClose={handleResClose}
                                setSingleResID={setSingleResID}
                                handleUpdateShow={handleUpdateShow}
                            />
                        );
                    });
                } else if (selectedDates === "Historical") {
                    return reservations
                        .filter((item) => {
                            return resTimes(item.time) < today;
                        })
                        .map((item, index) => {
                            return (
                                <ResItems
                                    item={item}
                                    key={index}
                                    handleResClose={handleResClose}
                                    setSingleResID={setSingleResID}
                                    handleUpdateShow={handleUpdateShow}
                                />
                            );
                        });
                } else {
                    return reservations
                        .filter((item) => {
                            return resTimes(item.time) === selectedDates;
                        })
                        .map((item, index) => {
                            return (
                                <ResItems
                                    item={item}
                                    key={index}
                                    handleResClose={handleResClose}
                                    setSingleResID={setSingleResID}
                                    handleUpdateShow={handleUpdateShow}
                                />
                            );
                        });
                }
            }
        }
    };

    return (
        <div className="RestaurantResModal-container">
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={resShow}
                scrollable
            >
                <Modal.Header>
                    <Modal.Title>Select Reservation</Modal.Title>
                </Modal.Header>
                <Dropdown onSelect={handleSelect} style={{ padding: "10px" }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select Date
                    </Dropdown.Toggle>

                    <Dropdown.Menu>{handleFillDropDown()}</Dropdown.Menu>
                </Dropdown>
                <Modal.Body>
                    <ListGroup as="ol" numbered>
                        {handleReservationItems()}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleResClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

//
function resTimes(time) {
    let resTime = new Date(time);
    resTime = resTime.toLocaleDateString("en-US");

    return resTime;
}
