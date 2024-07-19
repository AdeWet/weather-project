import { LeafletMouseEvent } from "leaflet";
import { getWeather } from "./api";
import { cities } from "./consts";
import {
  createAndRenderCity,
  createAndRenderCitySkeleton,
  createAndRenderWeatherWeeklySkeleton,
  displayWeeklyWeather,
  prepareMap,
} from "./dom";
import { map, setDefaultMap, setMarker, setupCurrentLocationMap } from "./map";
import "./style.css";
import { Coordinates } from "./types";

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

function getCitiesWeather() {
  for (let i = 0; i < cities.length; i++) {
    createAndRenderCitySkeleton(i);
  }
  for (let i = 0; i < cities.length; i++) {
    getWeather(cities[i].coordinates).then((weather) => {
      createAndRenderCity(cities[i], i, weather);
    });
  }
}

map.on("click", onMapClick);

setupUserLocationPermission();
getCitiesWeather();
