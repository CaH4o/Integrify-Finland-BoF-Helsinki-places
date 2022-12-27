import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { IPlace, IPlacesState } from "../types/placesTypes";
import { useAppSelector } from "../app/hooks";

type tPos = {
  lng: number;
  lat: number;
  zoom: number;
};

type tPopup = mapboxgl.Popup;
type tMap = mapboxgl.Map;

export default function Place(): JSX.Element {
  const mapContainer = useRef<any>(null);
  const map = useRef<tMap | null>(null);
  const [markers, setMarkers] = useState<string[]>([]);

  const placesState: IPlacesState = useAppSelector(function (state) {
    return state.places;
  });
  const places: IPlace[] = placesState.present;

  const [pos, setPos] = useState<tPos>({
    lng: 24.93859365199683,
    lat: 60.17197106567035,
    zoom: 10,
  });

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/cah4o/clc4qtbf3007214s1pmwa8xle",
      center: [pos.lng, pos.lat],
      zoom: pos.zoom,
    })
      .addControl(new mapboxgl.FullscreenControl(), "top-right")
      .addControl(new mapboxgl.NavigationControl(), "bottom-right");
  }, []);

  useEffect(
    function () {
      if (!map.current || !places.length) return;

      places.forEach(function (place: IPlace) {
        if (!markers.includes(place.id)) {
          const el: HTMLDivElement = document.createElement("div");
          el.id = place.id;
          el.className = "marker";
          el.addEventListener("click", function () {
            this.classList.add("clicked");
          });

          const popup: tPopup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            '<div class="popup">'
              .concat(
                place.description.images.length
                  ? '<img src="' + place.description.images[0].url + '" >'
                  : ""
              )
              .concat("<h3>" + place.name.en + "</h3>")
              .concat(
                "<p>" +
                  place.location.address.locality +
                  ", " +
                  place.location.address.street_address +
                  " (" +
                  place.location.address.postal_code +
                  ")</p>"
              )
              .concat("<p>" + place.description.intro + "</p>")
              .concat(
                '<a href="' +
                  place.info_url +
                  '" target="_blank">Link to site</a>'
              )
              .concat("</div>")
          );

          new mapboxgl.Marker(el)
            .setLngLat({ lon: place.location.lon, lat: place.location.lat })
            .setPopup(popup)
            .addTo(map.current!);
        }

        const removeMarkers: string[] = markers;
        const addMarkers: string[] = places.map(function (p: IPlace) {
          return p.id;
        });

        removeMarkers.forEach(function (id: string) {
          const el: HTMLElement | null = document.getElementById(id);
          el?.remove();
        });
        setMarkers(addMarkers);
      });
    },
    [places, map.current]
  );

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
        Longitude: {pos.lng} <br />
        Latitude:&nbsp; {pos.lat} <br />
        Zoom: &nbsp;&nbsp;&nbsp;&nbsp; {pos.zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
