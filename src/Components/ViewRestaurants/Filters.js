// DEPENDENCIES
import { useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Filters(props) {

    // CHECKBOX CHANGE
    const handleCheckboxChange = (event) => {
        let check = event.target.checked;
        if (check) {
            props.setUserFilters({
                ...props.userFilters,
                [event.target.id]: [
                    ...props.userFilters[event.target.id],
                    event.target.value,
                ],
            });
        }
        // HANDLE UNCHECKING SELECTION REMOVING ITEM FROM STATE AND API CALL
        else {
            let index = props.userFilters[event.target.id].indexOf(
                event.target.value
            );
            let temp = [...props.userFilters[event.target.id]];

            if (index > -1) {
                temp.splice(index, 1);
                props.setUserFilters({
                    ...props.userFilters,
                    [event.target.id]: temp,
                });
            }
        }
      
    }
 

    // HANDLE RESET
    const handleReset = (event) => {
        event.preventDefault();
        props.setSearchTerm("");
        props.setUserFilters({
            location: [],
            cuisine: [],
            price: [],
        });
    };

    return (
        <div className="filters-section">
            <div className="cuisineDropDown">
                <DropdownButton
                    id="dropdown-button-dark-example2"
                    variant="secondary"
                    menuVariant="dark"
                    title="Select Cuisine"
                >
                    {props.cuisine.map((item, index) => {
                        return (
                            <Dropdown.ItemText key={index}>
                                <Form>
                                    <Form.Check
                                        type="checkbox"
                                        id="cuisine"
                                        label={item}
                                        onChange={handleCheckboxChange}
                                        value={item}
                                    />
                                </Form>
                            </Dropdown.ItemText>
                        );
                    })}
                </DropdownButton>
            </div>

            <div className="locationDropDown">
                <DropdownButton
                    id="dropdown-button-dark-example2"
                    variant="secondary"
                    menuVariant="dark"
                    title="Select Location"
                >
                    {props.location.map((item, index) => {
                        return (
                            <Dropdown.ItemText key={index}>
                                <Form>
                                    <Form.Check
                                        type="checkbox"
                                        id="location"
                                        label={item}
                                        onChange={handleCheckboxChange}
                                        value={item}
                                    />
                                </Form>
                            </Dropdown.ItemText>
                        );
                    })}
                </DropdownButton>
            </div>

            <div className="priceDropDown">
                <DropdownButton
                    id="dropdown-button-dark-example2"
                    variant="secondary"
                    menuVariant="dark"
                    title="Select Price"
                >
                    <Dropdown.ItemText>
                        <Form
                            onChange={(event) => {
                                if (event.target.value) {
                                    props.setUserFilters({
                                        ...props.userFilters,
                                        [event.target.id]: [event.target.value],
                                    });
                                } else {
                                    props.setUserFilters({
                                        ...props.userFilters,
                                        [event.target.id]: [],
                                    });
                                }
                            }}
                        >
                            {props.price.map((item, index) => {
                                return (
                                    <Form.Check
                                        key={index}
                                        type="radio"
                                        id="price"
                                        label={item}
                                        value={item === 'Any' ? "" : item}
                                        name="price-group"
                                    />
                                );
                            })}
                        </Form>
                    </Dropdown.ItemText>
                </DropdownButton>
            </div>
            <Button
                variant="outline-*"
                onClick={handleReset}
                style={{ backgroundColor: "orange", color:"white"}}
            >
                Reset
            </Button>
        </div>
    );
}
