import * as L from "leaflet";

export const map = L.map("map");
export let customLocationMarker = new L.Marker([300, 300]);

export function setupMap(): L.Map {
  map.locate({ setView: true });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"></a>',
  }).addTo(map);
  return map;
}
