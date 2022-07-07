// DEPENDENCIES
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

//STYLE
import "../Styles/Detail.css";
//COMPONENTS
import ResaurantDetails from "../Components/RestaurantDetails/RestaurantDetails";

const API = process.env.REACT_APP_API_URL;

export default function SingleDetail() {
    // PARAMAS
    let { id } = useParams();

    // STATE FOR INDIVIDUAL RESTAURANT
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
                paddingBottom: "100px",
            }}
        >
            {restaurant ? (
                <ResaurantDetails restaurant={restaurant} />
            ) : (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
        </div>
    );
}
