import * as L from "leaflet";
import { defaultCoordinates } from "./consts";
import { City, Coordinates } from "./types";

export const map = L.map("map");
export let customLocationMarker = new L.Marker([45, 45]).addTo(map);

export function setupLocationMap(position?: GeolocationPosition): L.Map {
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"></a>',
  }).addTo(map);

  let coordinates: Coordinates;

  if (position?.coords.latitude && position?.coords.longitude) {
    coordinates = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  } else {
    coordinates = defaultCoordinates;
  }

  map.setView([coordinates.lat, coordinates.lng], 12);
  setMarker(coordinates);

  return map;
}

export function setMarker(coordinates: Coordinates) {
  customLocationMarker.setLatLng(coordinates);
  map.flyTo(coordinates);
}

export function setPremadeListOfCities(cities: City[]) {
  for (const city of cities) {
    const marker = new L.Marker([city.coordinates.lat, city.coordinates.lng]);
    marker.addTo(map);
  }
}
