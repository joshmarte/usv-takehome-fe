// DEPENDENCIES
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
//COMPONENTS
import SearchBar from "../Components/ViewRestaurants/SearchBar";
import Filters from "../Components/ViewRestaurants/Filters";
import Restaurants from "../Components/ViewRestaurants/Restaurants";
//STYLES
import "../Styles/View.css";

const API = process.env.REACT_APP_API_URL;

export default function ViewRestaurants() {
    // STATE VARIABLES FOR GETTING API DATA WITH CORRESPONDING BOOLEAN FLAG
    const [restaurants, setRestaurants] = useState([]);
    const [receivedData, setReceivedData] = useState(false);

    // FILTER DATA TO DISPLAY ~ FROM API
    const [cuisine, setCuisine] = useState([]);
    const [location, setLocation] = useState([]);
    const [price, setPrice] = useState(["$", "$$", "$$$", "$$$$", "Any"]);

    // USER SELECTIONS: SEARCH & FILTERS TERMS FROM USER
    const [searchTerm, setSearchTerm] = useState("");
    const [userFilters, setUserFilters] = useState({
        location: [],
        cuisine: [],
        price: [],
    });

    // SET UNIQUE FILTER VARAIBALES
    useEffect(() => {
        async function fetchDataInputs() {
            try {
                // WOULD PREFER A SEPERATE FETCH TO DB FOR UNIQUE VALUES INSTEAD OF JS MAP AND FILTER VIA getUniqueKeyValues
                let response = await fetch(`${API}/restaurants`);
                let apiData = await response.json();

                let selectCuisine = await getUniqueKeyValues(
                    apiData.restaurants,
                    "cuisine"
                );
                setCuisine(selectCuisine);

                let selectLocation = await getUniqueKeyValues(
                    apiData.restaurants,
                    "location"
                );
                setLocation(selectLocation);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDataInputs();
    }, [restaurants]);

    // GET APPLICABLE RESTURANTS
    useEffect(() => {
        try {
            async function fetchDataResuturants() {
                const queryFilters = await getParamsString(userFilters);

                let response = await fetch(
                    `${API}/restaurants${
                        queryFilters || searchTerm.length ? "?" : ""
                    }${queryFilters}${
                        searchTerm.length ? `&searchTerm=${searchTerm}` : ""
                    }`
                );
                let apiData = await response.json();
                // let sortedRestaurants = apiData.restaurants.sort((a, b) => {
                //     if (a.name > b.name) {
                //         return 1;
                //     } else {
                //         return -1;
                //     }
                // });
                setRestaurants(apiData.restaurants);

                setReceivedData(true);
            }

            fetchDataResuturants();
        } catch (error) {
            console.log(error);
        }
    }, [userFilters, searchTerm]);

    // JSX
    return (
        <div className="viewRestaurants-container">
            <div className="search-filter">
                <h3>Find your reservation for any occasion</h3>
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <Filters
                    cuisine={cuisine}
                    setCuisine={setCuisine}
                    location={location}
                    setLocation={setLocation}
                    price={price}
                    setPrice={setPrice}
                    userFilters={userFilters}
                    setUserFilters={setUserFilters}
                    setSearchTerm={setSearchTerm}
                    restaurants={restaurants}
                    setRestaurants={setRestaurants}
                />
                {!receivedData ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    <Restaurants restaurants={restaurants} />
                )}
                {receivedData && restaurants < 1 ? (
                    <h3>No Applicable Restaurants</h3>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

// HELPER FUNCTION TO GET UNIQUE KEYS FROM API DATA
/**
 *
 * @param {Object} data - represents each Restaurant item
 * @param {String} key - represents key we want to extract values from
 * @returns {Array} - Distinict values
 */
const getUniqueKeyValues = (data, key) => {
    let all = data.map((item) => {
        return item[key];
    });
    let select = all.filter((item, index, self) => {
        return index === self.indexOf(item);
    });
    return select;
};

// HELPER FUNCTION TO SET UP QUERY PARAMS (WASNT NOT ABLE TO GET PARAMS FILTER WORKING AS AN OBJECT...)
/**
 *
 * @param {Object} filters - Object containing keys representing the filter dropdown corresponding to the metadata for each Restaurant, and the value an array with the selected user dropdown values.
 * @returns {String} - formated as a query param
 */
const getParamsString = (filters) => {
    let paramString = [];

    for (let [key, value] of Object.entries(filters)) {
        if (value[0] !== "") {
            value.forEach((item) => {
                paramString.push(`filters[${key}]=${item}`);
            });
        }
    }

    return paramString.join("&");
};

// let topRestaurants = apiData.restaurants
//     .map((item) => {
//         return {
//             ...item,
//             ["reservationCount"]: item.reservations.length,
//         };
//     })
//     .sort((a, b) => {
//         return b.reservationCount - a.reservationCount;
//     })
//     .slice(0, 3);
