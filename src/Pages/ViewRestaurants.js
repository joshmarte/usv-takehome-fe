// DEPENDENCIES
import "../Styles/View.css";
import { useState, useEffect } from "react";
import Search from "../Components/Search";
import Restaurants from "../Components/Restaurants";
const API = process.env.REACT_APP_API_URL;

export default function ViewRestaurants() {
    // STATE VARIABLES

    //API DATA TO DISPLAY
    const [restaurants, setRestaurants] = useState([]);

    // FORM DATA TO DISPLAY FROM API
    const [cuisine, setCuisine] = useState([]);
    const [location, setLocation] = useState([]);
    const [price, setPrice] = useState(["$", "$$", "$$$", "$$$$"]);

    // USER SELECTIONS: SEARCH & FILTERS TERMS
    const [searchTerm, setSearchTerm] = useState([]);
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

                setRestaurants(apiData.restaurants);
            }
            fetchDataResuturants();
        } catch (error) {
            console.log(error);
        }
    }, [userFilters, searchTerm]);

    // JSX
    return (
        <div>
            <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                cuisine={cuisine}
                setCuisine={setCuisine}
                location={location}
                setLocation={setLocation}
                price={price}
                setPrice={setPrice}
                userFilters={userFilters}
                setUserFilters={setUserFilters}
            />
            <Restaurants restaurants={restaurants} />
        </div>
    );
}

// HELPER FUNCTION TO GET UNIQUE KEYS FROM API DATA
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
const getParamsString = (filters) => {
    let paramString = [];

    for (let [key, value] of Object.entries(filters)) {
        if (value.length > 0) {
            value.forEach((item) => {
                paramString.push(`filters[${key}]=${item}`);
            });
        }
    }

    return paramString.join("&");
};
