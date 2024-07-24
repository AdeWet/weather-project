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
import {
  map,
  setMarker,
  setPremadeListOfCities,
  setupLocationMap,
} from "./map";
import "./style.css";
import { Coordinates } from "./types";

export function setupUserLocationPermission() {
  const yesButton = document.querySelector<HTMLButtonElement>("#yes-location");
  const noButton = document.querySelector<HTMLButtonElement>("#no-location");

  if (yesButton) {
    yesButton.addEventListener("click", handleYesButtonClick);
  }
  if (noButton) {
    noButton.addEventListener("click", handleNoButtonClick);
  }
}

function handleYesButtonClick() {
  prepareMap();
  navigator.geolocation.getCurrentPosition(showWeekWeather);
  navigator.geolocation.getCurrentPosition(setupLocationMap);
}

function showWeekWeather(position: GeolocationPosition) {
  const coordinates: Coordinates = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  getWeather(coordinates)
    .then((weather) => {
      displayWeeklyWeather(
        `Unknown:${Math.round(coordinates.lat * 10) / 10}, ${
          Math.round(coordinates.lng * 10) / 10
        }`,
        weather
      );
    })
    .catch(console.error);
}

function handleNoButtonClick() {
  prepareMap();
  setupLocationMap();
}

function onMapClick(clickEvent: LeafletMouseEvent) {
  createAndRenderWeatherWeeklySkeleton();
  const coordinates: Coordinates = clickEvent.latlng;
  getWeather(coordinates)
    .then((weather) => {
      displayWeeklyWeather(
        `Unknown:${Math.round(coordinates.lat * 10) / 10}, ${
          Math.round(coordinates.lng * 10) / 10
        }`,
        weather
      );
    })
    .catch(console.error);
  setMarker(coordinates);
}

function getCitiesWeather() {
  for (let i = 0; i < cities.length; i++) {
    createAndRenderCitySkeleton(i);
    setPremadeListOfCities(cities);
  }
  for (let i = 0; i < cities.length; i++) {
    getWeather(cities[i].coordinates)
      .then((weather) => {
        createAndRenderCity(cities[i], i, weather);
      })
      .catch(console.error);
  }
}

map.on("click", onMapClick);

setupUserLocationPermission();
getCitiesWeather();
