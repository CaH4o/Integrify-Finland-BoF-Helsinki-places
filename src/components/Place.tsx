import React from "react";
import Map from "react-map-gl";

import { useAppSelector } from "../app/hooks";
import { dataState } from "../types/placesTypes";

export default function Place(): JSX.Element {
  const result: dataState = useAppSelector(function (state) {
    return state.data;
  });

  return (
    <div>
      <p>Place</p>
      <div>{result.data.length && "getData"}</div>
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
}
