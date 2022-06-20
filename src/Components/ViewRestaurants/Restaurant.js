// DEPENDENCIES
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Restaurant({ data }) {
    let navigate = useNavigate();
    // HANDLE VIEW RESERVATIONS
    const handleClick = (event, id) => {
        navigate(`./${id}`);
    };

    return (
        <div className="restaurant" style={{ display: "flex" }}>
            <Card.Img
                variant="left"
                src={logo}
                style={{
                    maxWidth: "200px",
                    height: "auto",
                    border: "1px dashed lightgrey",
                    borderRadius: "10px",
                }}
            />
            <Card style={{ maxWidth: "700px" }}>
                <Card.Body>
                    <Card.Title>
                        {`${data.name} | `}
                        <i>{data.cuisine}</i>
                    </Card.Title>
                    <Card.Subtitle
                        style={{
                            display: "flex",
                            gap: "5px",
                            paddingLeft: "10px",
                        }}
                    >
                        <i class="fa-solid fa-location-dot"></i>
                        {`${data.location} (${dateTime(
                            data.openingTime
                        )} - ${dateTime(data.closingTime)})`}
                    </Card.Subtitle>
                    <Card.Text style={{ paddingLeft: "10px" }}>
                        {data.description.length > 150
                            ? data.description
                                  .split(" ")
                                  .filter((item, index) => {
                                      return index < 20;
                                  })
                                  .join(" ") + "..."
                            : data.description}
                    </Card.Text>
                    <Button
                        variant="primary"
                        onClick={(event) => handleClick(event, data.id)}
                    >
                        View Reservations
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}

function dateTime(timeString) {
    let timeString12hr = new Date(
        "2022-01-01T" + timeString + "Z"
    ).toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
    });
    return timeString12hr;
}
