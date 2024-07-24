import * as L from "leaflet";
import { City, Coordinates } from "./types";

export const map = L.map("map");
export let customLocationMarker = new L.Marker([300, 300]);

export function setupCurrentLocationMap(): L.Map {
  map.locate({ setView: true });
  navigator.geolocation.getCurrentPosition(showCurrentMarker);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"></a>',
  }).addTo(map);
  return map;
}

export function setDefaultMap(): L.Map {
  map.setView([-26.2, 28.03], 12);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"></a>',
  }).addTo(map);
  return map;
}

function showCurrentMarker(position: GeolocationPosition) {
  map.locate({ setView: true });
  if (position.coords.latitude && position.coords.longitude) {
    customLocationMarker = L.marker([
      position.coords.latitude,
      position.coords.longitude,
    ]).addTo(map);
  }
}

export function prepareMap() {
  const map = document.querySelector<HTMLDivElement>("#map-content");
  if (map) {
    map.innerHTML = "";
    map.remove;
  }
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
