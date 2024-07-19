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

export enum Day {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

function weatherType(type: number): string {
  switch (type) {
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
  const currentDate = new Date();
  let currentHour = `${currentDate.getHours()}:00`;
  if (currentHour.length === 4) {
    currentHour = "0" + currentHour;
  }
  for (let i = 0; i < weather.hourly.time.length; i++) {
    if (weather.hourly.time[i].endsWith(currentHour)) {
      const day = new Date(weather.hourly.time[i]);
      const currentWeather: WeatherObject = {
        day: Day[day.getDay()],
        temperature: formatTemperature(weather.hourly.temperature_2m[i]),
        weatherType: weatherType(weather.hourly.weather_code[i]),
      };
      weeklyWeather.push(currentWeather);
    }
  }
  return weeklyWeather;
}

function formatTemperature(temperature: number): string {
  return `${Math.round(temperature)}\xB0`;
}
