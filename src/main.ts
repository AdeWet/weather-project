import { LeafletMouseEvent } from "leaflet";
import { getWeather } from "./api";
import {
  createAndRenderWeatherWeeklySkeleton,
  displayWeeklyWeather,
  prepareMap,
} from "./dom";
import { map, setDefaultMap, setMarker, setupCurrentLocationMap } from "./map";
import "./style.css";
import { Coordinates } from "./utils";

export function setupUserLocationPermission() {
  const yesButton = document.querySelector<HTMLButtonElement>("#yes-location");
  const noButton = document.querySelector<HTMLButtonElement>("#no-location");

  if (yesButton) {
    yesButton.addEventListener("click", yesClicked);
  }
  if (noButton) {
    noButton.addEventListener("click", noClicked);
  }
}

function yesClicked() {
  prepareMap();
  setupCurrentLocationMap();
}

function noClicked() {
  prepareMap();
  setDefaultMap();
}

function onMapClick(clickEvent: LeafletMouseEvent) {
  createAndRenderWeatherWeeklySkeleton();
  const coordinates: Coordinates = clickEvent.latlng;
  getWeather(coordinates).then((weather) => {
    displayWeeklyWeather("Unknown", weather);
  });
  setMarker(coordinates);
}

map.on("click", onMapClick);

setupUserLocationPermission();
