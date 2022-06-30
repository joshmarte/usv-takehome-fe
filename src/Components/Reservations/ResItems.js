// DEPENDENCIES
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

export default function ResItems({
    item,
    handleResClose,
    setSingleResID,
    handleUpdateShow,
}) {
    // TIME FUNCTION
    let resTime = new Date(item.time);
    resTime.setHours(resTime.getHours() + 1);

    resTime = resTime.toLocaleDateString("en-US", {
        timeZone: "EST",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
    });

    // HANDLE UPDATE CLICK
    const handleUpdateClick = () => {
        handleResClose();
        handleUpdateShow();
        setSingleResID(item);
    };

    return (
        <div className="resitems-container">
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">
                        {`${item.firstName} ${item.lastName}`}
                    </div>
                    {`Number of Guests: ${item.numGuests}`}
                </div>
                <div
                    className="time-update-container"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "5px",
                    }}
                >
                    <Badge bg="success" pill>
                        {resTime}
                    </Badge>
                    <div style={{ display: "flex" }}>
                        <Badge
                            bg="Warning"
                            text="dark"
                            as="button"
                            onClick={handleUpdateClick}
                            disabled={
                                new Date(resTime) < new Date() ? true : false
                            }
                        >
                            Update
                        </Badge>
                    </div>
                </div>
            </ListGroup.Item>
        </div>
    );
}
