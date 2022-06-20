import { Route, Routes } from "react-router-dom";
import ViewRestaurants from "./Pages/ViewRestaurants";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <main className="App">
            <Routes>
                <Route path="/restaurants" element={<ViewRestaurants />} />
            </Routes>
        </main>
    );
}

export default App;
