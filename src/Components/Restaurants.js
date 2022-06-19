// DEPENDENCIES
import Restaurant from "./Restaurant";

// FUNCATIONAL COMPONENT
export default function Restaurants(props) {
    return (
        <div className="restaurants-container">
            {props.restaurants.map((item) => {
                return <Restaurant key={item.id} data={item} />;
            })}
        </div>
    );
}
