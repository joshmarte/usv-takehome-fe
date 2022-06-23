// DEPENDENCIES
import { Route, Routes } from "react-router-dom";
// STYLES
import "bootstrap/dist/css/bootstrap.min.css";

// COMPONENETS
import Navigation from "./Components/Navigation";
import ViewRestaurants from "./Pages/ViewRestaurants";
import SingleDetail from "./Pages/SingleDetail";
import Footer from "./Components/Footer";
import Home from "./Components/Home";

function App() {
    return (
        <main className="App">
            <div id="content-wrap">
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/restaurants" element={<ViewRestaurants />} />
                    <Route path="/restaurants/:id" element={<SingleDetail />} />
                </Routes>
            </div>
            <Footer />
        </main>
    );
}

export default App;
