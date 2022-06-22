// DEPENDENCIES
import Card from "react-bootstrap/Card";
import logo from "../Assets/logo.png";

export default function Footer() {
    return (
        <div className="footer-container">
            <Card className="bg-dark text-white">
                <Card.Title>
                    <Card.Img
                        src={logo}
                        alt="Hungry Humans"
                        style={{ width: "5vw", heigh: "auto" }}
                    />
                    Hungy Humans
                </Card.Title>
                <Card.Text>
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
                </Card.Text>
                <Card.Text>
                    <ul>
                        <li>Josh Marte</li>
                        <li>© 2022</li>
                    </ul>
                </Card.Text>
            </Card>
        </div>
    );
}
