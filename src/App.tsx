import mapboxgl from "mapbox-gl";
import { HomePage } from "./pages/HomePage";

import "./App.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN!;

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
