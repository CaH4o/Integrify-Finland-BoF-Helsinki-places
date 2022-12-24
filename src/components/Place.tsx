import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useAppSelector } from "../app/hooks";
import { dataState, IResult } from "../types/placesTypes";

type tPos = {
  lng: number;
  lat: number;
  zoom: number;
};

const data = [
  {
    location: "location 1",
    coordinate: {
      lng: 25.0,
      lat: 60.2,
    },
    address: "address 1",
  },
  {
    location: "location 2",
    coordinate: {
      lng: 25.1,
      lat: 60.1,
    },
    address: "address 2",
  },
  {
    location: "location 3",
    coordinate: {
      lng: 24.9,
      lat: 60.0,
    },
    address: "address 3",
  },
];

export default function Place(): JSX.Element {
  const result: dataState = useAppSelector(function (state) {
    return state.data;
  });
  const [pos, setPos] = useState<tPos>({
    lng: 24.947108117393643,
    lat: 60.18337277411394,
    zoom: 12,
  });

  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      center: [pos.lng, pos.lat],
      zoom: pos.zoom,
    })
      .addControl(new mapboxgl.FullscreenControl(), "top-right")
      .addControl(new mapboxgl.NavigationControl(), "bottom-right");

    const markerHel = new mapboxgl.Marker()
      .setLngLat([24.947108117393643, 60.18337277411394])
      .setPopup(
        new mapboxgl.Popup({ offset: 30 }).setHTML(
          "<h4>" + "Helsinki" + "</h4>"
        )
      )
      .addTo(map.current);

    data.forEach(function (place) {
      const marker = new mapboxgl.Marker()
        .setLngLat(place.coordinate)
        .setPopup(
          new mapboxgl.Popup({ offset: 30 }).setHTML(
            ""
              .concat("<h4>" + place.location + "</h4>")
              .concat("<p>" + place.address + "</p>")
          )
        )
        .addTo(map.current!);
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {pos.lng} | Latitude: {pos.lat} | Zoom: {pos.zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
