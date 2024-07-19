import { prepareMap } from "./dom";
import { setDefaultMap, setupCurrentLocationMap } from "./map";
import "./style.css";

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
setupUserLocationPermission();
