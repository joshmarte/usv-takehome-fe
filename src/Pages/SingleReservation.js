// DEPENDENCIES
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
// COMPONENTS
import RestaurantResModal from "../Components/Reservations/RestaurantResModal";
import UpdateReservation from "../Components/Reservations/UpdateReservation";

export default function SingleReservation({ reservations, open, close }) {
    // SINGLE RESERVATION ID TO PASS TO UPDATE
    const [singleResID, setSingleResID] = useState("");

    // DATES
    const [dates, setDates] = useState();

    // RES MODAL
    const [resShow, setResShow] = useState(false);
    const handleResShow = () => setResShow(true);

    // UPDATE MODAL
    const [updateShow, setUpdateShow] = useState(false);
    const handleUpdateShow = () => setUpdateShow(true);

    //GET ALL RESERVATION DATES
    useEffect(() => {
        if (!!reservations) {
            if (!reservations[0] === null) {
                let times = reservations.map((items) => {
                    return new Date(items.time).toLocaleDateString("en-US");
                });
                times.push("Historical");
                setDates(times);
            }
        }
    }, [reservations]);

    // HANDLE VIEW RESERVATIONS BUTTON
    const handleClick = () => {
        handleResShow();
    };

    return (
        <div className="single-reservation-container">
            <Button
                variant="primary"
                onClick={handleClick}
                disabled={
                    !!reservations ? (reservations[0] ? false : true) : true
                }
            >
                View Reservations
            </Button>
            <RestaurantResModal
                resShow={resShow}
                setResShow={setResShow}
                handleResShow={handleResShow}
                dates={dates}
                reservations={reservations}
                setSingleResID={setSingleResID}
                handleUpdateShow={handleUpdateShow}
            />
            <UpdateReservation
                item={singleResID}
                show={updateShow}
                setUpdateShow={setUpdateShow}
                open={open}
                close={close}
            />
        </div>
    );
}
