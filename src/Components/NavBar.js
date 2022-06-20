// DEPENDENCIES
import Nav from "react-bootstrap/Nav";
export default function NavBar() {
    return (
        <div className="NavBar">
            <Nav activeKey="/home" navbarScroll={true}>
                <Nav.Item>
                    <Nav.Link href="/">Hungry Humans</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/restaurants">Restaurants</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/newRestaurant">Add a Restaurant</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/reservations"> Reservations</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}
