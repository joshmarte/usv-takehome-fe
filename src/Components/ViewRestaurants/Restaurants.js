// COMPONENTS
import Restaurant from "./Restaurant";

// FUNCATIONAL COMPONENT
export default function Restaurants({ restaurants }) {
    return (
        <div className="restaurants-container">
            {restaurants.map((item) => {
                return <Restaurant key={item.id} data={item} />;
            })}
        </div>
    );
}
