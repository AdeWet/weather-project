import { WeatherObject } from "./utils";

export function prepareMap() {
  const map = document.querySelector<HTMLDivElement>("#map-content");
  if (map) {
    map.innerHTML = "";
  }
}

export function createAndRenderWeatherWeeklySkeleton() {
  const skeleton = document.querySelector<HTMLDivElement>("#week-weather");

  if (skeleton) {
    skeleton.innerHTML = "";
    skeleton.className =
      "col-span-full bg-white lg:col-span-1 h-full px-4 py-2 grid grid-rows-4 items-center animate-pulse";

    const bodySkeletonType1 = document.createElement("div");
    bodySkeletonType1.className = "h-2/5 w-1/2 bg-primary rounded-full";
    skeleton.append(bodySkeletonType1);

    const bodySkeletonType2 = document.createElement("div");
    bodySkeletonType2.className = "h-2/5 w-full bg-primary rounded-full";
    skeleton.append(bodySkeletonType2);
    skeleton.append(bodySkeletonType2.cloneNode());
    skeleton.append(bodySkeletonType2.cloneNode());
  }
}

export function displayWeeklyWeather(city: string, weather: WeatherObject[]) {
  const weeklyContainer =
    document.querySelector<HTMLDivElement>("#week-weather");
  if (weeklyContainer) {
    weeklyContainer.innerHTML = "";
    weeklyContainer.className =
      "col-span-2 grid grid-rows-4 grid-cols-7 justify-items-center items-center bg-white lg:col-span-1";
    const location = document.createElement("div");
    location.className =
      "px-2 col-span-full w-full justify-self-start border-b-2 border-secondary font-light text-lg lg:text-2xl";
    location.innerHTML = city;
    weeklyContainer.append(location);

    for (const dayWeather of weather) {
      const day = document.createElement("div");
      day.className = "text-sm font-light lg:text-lg";
      day.innerHTML = dayWeather.day;
      weeklyContainer.append(day);
    }

    for (const dayWeather of weather) {
      const temperature = document.createElement("div");
      temperature.className = "font-semibold lg:text-2xl";
      temperature.innerHTML = dayWeather.temperature;
      weeklyContainer.append(temperature);
    }

    for (const dayWeather of weather) {
      const weatherType = document.createElement("div");
      weatherType.className = "text-xs font-light lg:text-lg";
      weatherType.innerHTML = dayWeather.weatherType;
      weeklyContainer.append(weatherType);
    }
  }
}
