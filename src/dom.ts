import { City, WeatherObject } from "./types";

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

export function createAndRenderCitySkeleton(id: number) {
  const skeletonContainer = document.querySelector<HTMLDivElement>("#cities");

  if (skeletonContainer) {
    const skeleton = document.createElement("div");
    skeleton.className =
      "h-full px-4 grid grid-rows-2 grid-cols-2 animate-pulse bg-white rounded-lg shadow";
    skeleton.id = `city${id}`;
    const bodySkeletonType1 = document.createElement("div");
    bodySkeletonType1.className =
      "col-span-full h-1/5 w-2/5 self-center bg-primary rounded-full";

    const bodySkeletonType2 = document.createElement("div");
    bodySkeletonType2.className = "h-1/5 bg-primary rounded-full";

    const bodySkeletonType3 = document.createElement("div");
    bodySkeletonType3.className =
      "h-1/5 w-4/5 bg-primary rounded-full justify-self-end";

    skeleton.append(bodySkeletonType1);
    skeleton.append(bodySkeletonType2);
    skeleton.append(bodySkeletonType3);
    skeletonContainer.append(skeleton);
  }
}

export function createAndRenderCity(
  city: City,
  id: number,
  weather: WeatherObject[]
) {
  const cities = document.querySelector<HTMLDivElement>("#cities");
  const cityContainer = document.querySelector<HTMLDivElement>(`#city${id}`);

  if (!cities || !cityContainer || !weather.length) {
    return;
  }

  cityContainer.innerHTML = "";
  cityContainer.className =
    "h-full px-4 grid grid-rows-2 grid-cols-2 bg-white rounded-lg shadow hover:bg-primary hover:text-white hover:cursor-pointer";

  const cityName = document.createElement("div");
  cityName.className =
    "col-span-full self-center font-light border-b-2 border-secondary text-lg lg:text-2xl";
  cityName.innerHTML = city.name;
  const temperature = document.createElement("div");
  temperature.className = "text-2xl font-semibold lg:text-3xl";
  weather[0].temperature ??= "N/A";
  temperature.innerHTML = weather[0].temperature;
  const weatherType = document.createElement("div");
  weatherType.className = "justify-self-end text-xl font-light lg:text-2xl";
  weather[0].weatherType ??= "N/A";
  weatherType.innerHTML = weather[0].weatherType;

  cityContainer.append(cityName);
  cityContainer.append(temperature);
  cityContainer.append(weatherType);

  cityContainer.addEventListener("click", () => {
    displayWeeklyWeather(city.name, weather);
  });

  cities.append(cityContainer);
}
