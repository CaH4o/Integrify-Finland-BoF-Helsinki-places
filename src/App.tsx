import mapboxgl from "mapbox-gl";

import "./App.css";
import { MAPBOX_TOKEN } from "./app/tokens";
import { HomePage } from "./pages/HomePage";

mapboxgl.accessToken = MAPBOX_TOKEN;

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
