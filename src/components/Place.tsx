import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import * as MapBX from "react-map-gl";


import { useAppSelector } from "../app/hooks";
import { dataState, IResult } from "../types/placesTypes";

type tPos = {
  lng: number;
  lat: number;
  zoom: number;
};

export default function Place(): JSX.Element {
  const result: dataState = useAppSelector(function (state) {
    return state.data;
  });
  const [pos, setPos] = useState<tPos>({
    lng: 24.947108117393643,
    lat: 60.18337277411394,
    zoom: 14,
  });

  const mapContainer = useRef<any>(null);
  //const map = useRef<MapBX.MapboxMap | null>(null);

  useEffect(() => {
    //if (map.current) return; // initialize map only once
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [pos.lng, pos.lat],
      zoom: pos.zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
    
  });

  return (
    <div>
      <p>Place</p>
      <div ref={mapContainer} className="map-container"></div>
      {result.data.length && (
        <>
          (
          {result.data[0].results.map(function (obj: IResult) {
            return <div key={obj.id}>{obj.address.fi}</div>;
          })}
          )
        </>
      )}
    </div>
  );
}
