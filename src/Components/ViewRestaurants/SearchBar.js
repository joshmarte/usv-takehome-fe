// DEPENDENCIES
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function SearchBar({ searchTerm, setSearchTerm }) {
    // SEARCH TEXT CHANGE HANDLER
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // JSX
    return (
        <Form
            style={{
                width: "50vw",
                margin: "0 auto",
                padding: "5px",
            }}
        >
            <Form.Group>
                <InputGroup>
                    <InputGroup.Text>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </InputGroup.Text>
                    <Form.Control
                        onChange={handleChange}
                        type="text"
                        placeholder="Search restaurants, location or cuisine..."
                        name="search"
                        id="searchTerm"
                        value={searchTerm}
                        style={{ border: "1px solid orange" }}
                    />
                </InputGroup>
            </Form.Group>
        </Form>
    );
}
