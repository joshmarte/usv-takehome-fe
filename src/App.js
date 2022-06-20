// DEPENDENCIES
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// COMPONENETS
import NavBar from "./Components/NavBar";
import ViewRestaurants from "./Pages/ViewRestaurants";
import ResaurantDetails from "./Components/RestaurantDetails";

function App() {
    return (
        <main className="App">
            <NavBar />
            <Routes>
                <Route path="/restaurants" element={<ViewRestaurants />} />
                <Route path="/restaurants/:id" element={<ResaurantDetails />} />
            </Routes>
        </main>
    );
}

export default App;
