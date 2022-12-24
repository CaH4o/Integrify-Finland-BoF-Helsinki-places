import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useAppSelector } from "../app/hooks";
import { dataState } from "../types/placesTypes";

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
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const result: dataState = useAppSelector(function (state) {
    return state.data;
  });

  const [pos, setPos] = useState<tPos>({
    lng: 24.93859365199683,
    lat: 60.17197106567035,
    zoom: 12,
  });

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
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

  useEffect(() => {
    if (!map.current) return;

    const newPos: tPos = {
      lng: Number(map.current.getCenter().lng.toFixed(12)),
      lat: Number(map.current.getCenter().lat.toFixed(12)),
      zoom: Number(map.current.getZoom().toFixed(2)),
    };

    map.current.on("move", () => {
      setPos(newPos);
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
