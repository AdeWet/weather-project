export type Weather = {
  latitude: number;
  longitude: number;
  hourly: Hourly;
};

type Hourly = {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
};

export type WeatherObject = {
  day: string;
  temperature: string;
  weatherType: string;
};

export type City = {
  name: string;
  coordinates: Coordinates;
};

export type Coordinates = {
  lat: number;
  lng: number;
};
