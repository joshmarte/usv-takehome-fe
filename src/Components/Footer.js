// DEPENDENCIES
import Card from "react-bootstrap/Card";
import logo from "../Assets/logo.png";

export default function Footer() {
    return (
        <div className="footer-container">
            <Card
                className="bg-dark text-white card-container"
                style={{ borderRadius: "0" }}
            >
                <Card.Title style={{ margin: "5px 0px" }}>
                    <Card.Img
                        src={logo}
                        alt="Hungry Humans"
                        style={{ width: "3vw", heigh: "auto" }}
                    />
                    Hungry Humans
                </Card.Title>
                <Card.Body>
                    <ul>
                        <li>
                            <a>About</a>
                        </li>
                        <li>
                            <a>Support</a>
                        </li>
                        <li>
                            <a>Careers</a>
                        </li>
                        <li>
                            <a>Terms</a>
                        </li>
                        <li>
                            <a>Privacy</a>
                        </li>
                    </ul>
                </Card.Body>
                <Card.Body>
                    <ul>
                        <li>Josh Marte</li>
                        <li>© 2022</li>
                    </ul>
                </Card.Body>
            </Card>
        </div>
    );
}
