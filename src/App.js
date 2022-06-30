// DEPENDENCIES
import { Route, Routes } from "react-router-dom";
// STYLES
import "bootstrap/dist/css/bootstrap.min.css";

// COMPONENETS
import Navigation from "./Components/Navigation";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import ViewRestaurants from "./Pages/ViewRestaurants";
import SingleDetail from "./Pages/SingleDetail";
import CreateRestaurant from "./Pages/CreateRestaurant";
import AllReservations from "./Pages/AllReservations";

function App() {
    return (
        <main className="App">
            <div id="content-wrap">
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/restaurants" element={<ViewRestaurants />} />
                    <Route path="/restaurants/:id" element={<SingleDetail />} />
                    <Route
                        path="/newRestaurant"
                        element={<CreateRestaurant />}
                    />
                    <Route path="/reservations" element={<AllReservations />} />
                </Routes>
            </div>
            <Footer />
        </main>
    );
}

export default App;
