import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import RestaurantResModal from "../Components/Reservations/RestaurantResModal";

export default function SingleReservation({ reservations }) {
    //
    const [dates, setDates] = useState();

    // RES MODAL
    const [resShow, setResShow] = useState(false);

    const handleResShow = () => setResShow(true);

    //GET ALL RESERVATION DATES
    useEffect(() => {
        if (!!reservations) {
            if (!!reservations[0] === null) {
            } else {
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
            />
        </div>
    );
}
