// DEPENDENCIES
import { useState } from "react";

export default function Search(props) {
    // STATE VARIBILES
    const [visible, setVisible] = useState({
        cuisine: false,
        location: false,
        price: false,
    });

    // SEARCH TEXT CHANGE
    const handleChange = (event) => {
        props.setSearchTerm(event.target.value);
    };

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
        } else {
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
        setVisible({
            ...setVisible,
            [event.target.value]: !visible[event.target.value],
        });
    };

    // DROP DOWN ON CLICK
    const handleDropDownClick = (event) => {
        setVisible({
            ...visible,
            [event.target.id]: !visible[event.target.id],
        });
    };

    // JSX
    return (
        <div>
            <div className="search-div">
                <form className="search-bar">
                    <label htmlFor="search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </label>
                    <input
                        onChange={handleChange}
                        type="text"
                        placeholder="Search restaurants, location or cuisine"
                        name="search"
                        id="searchTerm"
                        value={props.searchTerm}
                    />
                    <input type="submit" />
                </form>
            </div>

            <div className="cuisineDropDown">
                <div
                    id="list1"
                    className={
                        visible.cuisine || props.userFilters.cuisine.length > 0
                            ? "dropdown-check-list visible"
                            : "dropdown-check-list"
                    }
                    tabIndex="100"
                >
                    <span
                        className="anchor"
                        onClick={handleDropDownClick}
                        id="cuisine"
                    >
                        Select Cuisines
                    </span>
                    <ul className="items">
                        {props.cuisine.map((item, index) => {
                            return (
                                <li key={index}>
                                    <input
                                        type="checkbox"
                                        id="cuisine"
                                        value={item}
                                        onChange={handleCheckboxChange}
                                    />
                                    {item}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <div className="locationDropDown">
                <div
                    id="list1"
                    className={
                        visible.location ||
                        props.userFilters.location.length > 0
                            ? "dropdown-check-list visible"
                            : "dropdown-check-list"
                    }
                    tabIndex="100"
                >
                    <span
                        className="anchor"
                        onClick={handleDropDownClick}
                        id="location"
                    >
                        Select Locations
                    </span>
                    <ul className="items">
                        {props.location.map((item, index) => {
                            return (
                                <li key={index}>
                                    <input
                                        type="checkbox"
                                        id="location"
                                        value={item}
                                        onChange={handleCheckboxChange}
                                    />
                                    {item}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <fieldset
                className="price-radio"
                onChange={(event) => {
                    if (event.target.value) {
                        props.setUserFilters({
                            ...props.userFilters,
                            [event.target.name]: [event.target.value],
                        });
                    } else {
                        props.setUserFilters({
                            ...props.userFilters,
                            [event.target.name]: [],
                        });
                    }
                }}
            >
                <legend>Select a Price Range: </legend>
                {props.price.map((item) => {
                    return (
                        <div>
                            <input
                                type="radio"
                                id={`price-${item}`}
                                name="price"
                                value={item}
                            />
                            <label htmlFor="price">{item}</label>
                        </div>
                    );
                })}
                <div>
                    <input type="radio" id="price-none" name="price" value="" />
                    <label htmlFor="price">Any</label>
                </div>
            </fieldset>
            {/* <button
                onClick={props.setUserFilters({
                    location: [],
                    cuisine: [],
                    price: [],
                })}
            >
                Clear Filters
            </button> */}
        </div>
    );
}
