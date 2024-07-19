import * as L from "leaflet";

export const map = L.map("map");
export let customLocationMarker = new L.Marker([300, 300]);

export function setupMap(): L.Map {
  navigator.geolocation.getCurrentPosition(showCurrentMarker);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"></a>',
  }).addTo(map);
  return map;
}

function showCurrentMarker(position: GeolocationPosition) {
  map.locate({ setView: true });
  if (map.hasLayer(customLocationMarker)) {
    map.removeLayer(customLocationMarker);
  }
  if (position.coords.latitude && position.coords.longitude) {
    customLocationMarker = L.marker([
      position.coords.latitude,
      position.coords.longitude,
    ]).addTo(map);
  }
}
