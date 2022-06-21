// DEPENDENCIES
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// COMPONENETS
import Navigation from "./Components/Navigation";
import ViewRestaurants from "./Pages/ViewRestaurants";
import ResaurantDetails from "./Components/RestaurantDetails";

function App() {
    return (
        <main className="App">
            <Navigation />
            <Routes>
                <Route path="/restaurants" element={<ViewRestaurants />} />
                <Route path="/restaurants/:id" element={<ResaurantDetails />} />
            </Routes>
        </main>
    );
}

export default App;
