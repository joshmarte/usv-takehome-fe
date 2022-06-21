// DEPENDENCIES
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//STYLE
import "../Styles/Detail.css";
//COMPONENTS
import ResaurantDetails from "../Components/RestaurantDetails/RestaurantDetails";
import ReservationCard from "../Components/RestaurantDetails/ReservationCard";

const API = process.env.REACT_APP_API_URL;

export default function SingleDetail() {
    // STATE AND PARAMAS
    let { id } = useParams();
    const [restaurant, setRestaurant] = useState({});

    // FETCH SPECIFIC RESTAURANT DATA
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

    // NOT SURE WHY ON LOAD WILL NOT BE ON TOP
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div
            className="singledetails-container"
            style={{
                width: "75vw",
                margin: "0 auto",
                marginTop: "100px",
                position: "relative",
            }}
        >
            <ResaurantDetails restaurant={restaurant} />
            <ReservationCard restaurant={restaurant} />
        </div>
    );
}
