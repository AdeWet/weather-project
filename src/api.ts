import { Coordinates, Weather, WeatherObject, weeklyWeather } from "./utils";

export async function getWeather(
  coordinates: Coordinates
): Promise<WeatherObject[]> {
  const api = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lng}&hourly=temperature_2m,weather_code`;
  const weatherResponse = await fetch(api);
  const weather: Weather = await weatherResponse.json();
  return weeklyWeather(weather);
}
