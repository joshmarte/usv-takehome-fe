// DEPENDENCIES
import { useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Filters(props) {
    // Radio Checked?
    const [radioValue, setRadioValue] = useState();

    // CHECKBOX CHANGE
    const handleCheckboxChange = (event) => {
        let check = event.target.checked;
        if (check) {
            props.setUserFilters({
                ...props.userFilters,
                [event.target.name]: [
                    ...props.userFilters[event.target.name],
                    event.target.id,
                ],
            });
        }

        // HANDLE UNCHECKING SELECTION REMOVING ITEM FROM STATE AND API CALL
        else {
            let index = props.userFilters[event.target.name].indexOf(
                event.target.id
            );
            let temp = [...props.userFilters[event.target.name]];

            if (index > -1) {
                temp.splice(index, 1);
                props.setUserFilters({
                    ...props.userFilters,
                    [event.target.name]: temp,
                });
            }
        }
    };

    // HANDLE RADIO
    const handleRadio = (event) => {
        console.log(event.target);
        setRadioValue(event.target.value === "" ? "Any" : event.target.value);
        if (event.target.checked) {
            props.setUserFilters({
                ...props.userFilters,
                [event.target.name]: [event.target.value],
            });
        } else {
            props.setUserFilters({
                ...props.userFilters,
                [event.target.value]: [],
            });
        }
    };

    // HANDLE RESETING ALL FILTERS
    const handleReset = (event) => {
        event.preventDefault();
        props.setSearchTerm("");
        setRadioValue("");
        props.setUserFilters({
            location: [],
            cuisine: [],
            price: [],
        });
    };

    // HANDLE SORT BUTTON
    const handleSort = (event) => {
        let sortedRestaurants = props.restaurants.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            } else {
                return -1;
            }
        });
        props.setRestaurants([...sortedRestaurants]);
        console.log(props.restaurants);
    };

    return (
        <div className="filters-container">
            <div className="cuisineDropDown">
                <DropdownButton
                    id="dropdown-button-dark-example2"
                    variant="secondary"
                    menuVariant="dark"
                    title="Select Cuisine"
                >
                    <Form.Group
                        className="mb-3"
                        controlId="cuisine"
                        onChange={handleCheckboxChange}
                    >
                        <Form style={{ paddingLeft: "15px" }}>
                            {props.cuisine.map((item, index) => {
                                return (
                                    <Form.Check
                                        key={index}
                                        type="checkbox"
                                        id={item}
                                        label={item}
                                        name="cuisine"
                                        style={{ marginBottom: "5px" }}
                                    />
                                );
                            })}
                        </Form>
                    </Form.Group>
                </DropdownButton>
            </div>

            <div className="locationDropDown">
                <DropdownButton
                    id="dropdown-button-dark-example2"
                    variant="secondary"
                    menuVariant="dark"
                    title="Select Location"
                >
                    <Form.Group
                        className="mb-3"
                        controlId="location"
                        onChange={handleCheckboxChange}
                    >
                        <Form style={{ paddingLeft: "15px" }}>
                            {props.location.map((item, index) => {
                                return (
                                    <Form.Check
                                        key={index}
                                        type="checkbox"
                                        id={item}
                                        label={item}
                                        name="location"
                                        style={{ marginBottom: "5px" }}
                                    />
                                );
                            })}
                        </Form>
                    </Form.Group>
                </DropdownButton>
            </div>

            <div className="priceDropDown">
                <DropdownButton
                    id="dropdown-button-dark-example2"
                    variant="secondary"
                    menuVariant="dark"
                    title="Select Price"
                >
                    <Form.Group className="mb-3" controlId="price">
                        <Form style={{ paddingLeft: "15px" }}>
                            {props.price.map((item, index) => {
                                return (
                                    <Form.Check
                                        key={index}
                                        type="radio"
                                        value={item === "Any" ? "" : item}
                                        label={item}
                                        name="price"
                                        id={item}
                                        style={{ marginBottom: "5px" }}
                                        checked={radioValue === item}
                                        onChange={handleRadio}
                                    />
                                );
                            })}
                        </Form>
                    </Form.Group>
                </DropdownButton>
                <Button onClick={handleSort}>Sort Me</Button>
            </div>
            <div className="reset-button">
                <Button
                    variant="outline-*"
                    onClick={handleReset}
                    style={{ backgroundColor: "orange", color: "white" }}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
}
