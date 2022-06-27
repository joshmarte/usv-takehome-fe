// DEPENDENCIES
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
//ASSETS
import logo from "../../Assets/logo.png";
//UTIL
import dateTime from "../../util/dateTime.js";

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
                alt="Restaurant Logo"
                style={{
                    maxWidth: "200px",
                    height: "auto",
                    border: "1px dashed lightgrey",
                    borderRadius: "10px",
                }}
            />
            <Card style={{ maxWidth: "700px", minWidth: "50vw" }}>
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
                        <i className="fa-solid fa-location-dot"></i>
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
