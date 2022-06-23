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
                <Card.Title style={{ marginBottom: "3px" }}>
                    <Card.Img
                        src={logo}
                        alt="Hungry Humans"
                        style={{ width: "3vw", heigh: "auto" }}
                    />
                    Hungy Humans
                </Card.Title>
                <Card.Text>
                    <ul>
                        <li>
                            <a href="/">About</a>
                        </li>
                        <li>
                            <a href="/">Support</a>
                        </li>
                        <li>
                            <a href="/">Careers</a>
                        </li>
                        <li>
                            <a>Terms</a>
                        </li>
                        <li>
                            <a href="/">Privacy</a>
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
