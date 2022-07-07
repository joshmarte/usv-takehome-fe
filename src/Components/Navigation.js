// DEPENDENCIES
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
// ASSETS
import logo from "../Assets/food.png";

export default function Navigation() {
    return (
        <Navbar expand="md" bg="dark" variant="dark">
            <Container
                fluid
                style={{ marginLeft: "0px", padding: " 0px 2rem" }}
            >
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
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                            Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav>
                            <Nav.Link href="/restaurants">Restaurants</Nav.Link>
                            <Nav.Link href="/reservations">
                                Reservations
                            </Nav.Link>
                            <Nav.Link href="/newRestaurant">
                                Create Restaurant
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}
