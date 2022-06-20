// DEPENDENCIES
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/Details.css";
const API = process.env.REACT_APP_API_URL;

export default function ResaurantDetails() {
    let { id } = useParams();
    const [restaurant, setRestaurant] = useState({});

    useEffect(() => {
        async function fetchRestaurant() {
            try {
                let response = await fetch(`${API}/restaurants/${id}`);
                let apiData = await response.json();

                setRestaurant(apiData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRestaurant();
    }, [id]);

    return <div className="restaurant-details">{restaurant.name}</div>;
}
