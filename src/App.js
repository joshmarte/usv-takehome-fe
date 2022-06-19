import { Route, Routes } from "react-router-dom";
import ViewRestaurants from "./Pages/ViewRestaurants";

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
