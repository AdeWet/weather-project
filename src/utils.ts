import { Day } from "./consts";
import { Weather, WeatherObject } from "./types";

function weatherType(type: number): string {
  switch (type) {
    case -1:
      return "N/A";
    case 0:
      return "Clear";
    case 1:
    case 2:
    case 3:
      return "OVC";
    case 45:
    case 48:
      return "Fog";
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return "Drizzle";
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return "Rain";
    case 71:
    case 73:
    case 75:
    case 77:
      return "Snow";
    case 80:
    case 81:
    case 82:
    case 85:
    case 86:
      return "Shower";
    case 95:
    case 96:
    case 99:
      return "Storm";
    default:
      return "N/A";
  }
}

export function weeklyWeather(weather: Weather): WeatherObject[] {
  const weeklyWeather: WeatherObject[] = [];

  if (
    !weather.hourly.time.length ||
    !weather.hourly.temperature_2m.length ||
    !weather.hourly.weather_code.length
  ) {
    return weeklyWeather;
  }

  const currentDate = new Date();
  let currentHour = `${currentDate.getHours()}:00`;
  if (currentHour.length === 4) {
    currentHour = "0" + currentHour;
  }

  for (let i = 0; i < weather.hourly.time.length; i++) {
    weather.hourly.time[i] ??= "";
    if (weather.hourly.time[i].endsWith(currentHour)) {
      const dayNumber = new Date(weather.hourly.time[i]);
      let day: string = Day[dayNumber.getDay()];
      day ??= "N/A";
      weather.hourly.weather_code[i] ??= -1;
      weather.hourly.temperature_2m[i] ??= -2000;
      const currentWeather: WeatherObject = {
        day: day,
        temperature: formatTemperature(weather.hourly.temperature_2m[i]),
        weatherType: weatherType(weather.hourly.weather_code[i]),
      };
      weeklyWeather.push(currentWeather);
    }
  }
  return weeklyWeather;
}

function formatTemperature(temperature: number): string {
  if (temperature === -2000) {
    return "N/A";
  }
  return `${Math.round(temperature)}\xB0`;
}
