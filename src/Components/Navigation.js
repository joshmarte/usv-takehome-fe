// DEPENDENCIES
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../Assets/food.png";

export default function Navigation() {
    return (
        <div className="NavBar">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand
                        href="/"
                        style={{
                            fontSize: "larger",
                            border: "1px solid orange",
                            borderRadius: " 5px",
                            padding: "5px",
                        }}
                    >
                        <img
                            alt="Hungry Human Logo"
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{" "}
                        Hungry Humans
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <Nav.Link href="/restaurants">Restaurants</Nav.Link>
                            <Nav.Link href="/reservations">
                                Reservations
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
