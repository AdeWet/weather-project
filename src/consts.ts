import { City, Coordinates } from "./types";

const Durban: City = {
  name: "Durban",
  coordinates: { lat: -29.85, lng: 31.02 },
};

const Johannesburg: City = {
  name: "Johannesburg",
  coordinates: { lat: -26.2, lng: 28.03 },
};

const CapeTown: City = {
  name: "Cape Town",
  coordinates: { lat: -33.92, lng: 18.42 },
};

const PortElizabeth: City = {
  name: "Port Elizabeth",
  coordinates: { lat: -33.91, lng: 25.58 },
};

export const cities: City[] = [Durban, Johannesburg, CapeTown, PortElizabeth];

export enum Day {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

export const defaultCoordinates: Coordinates = {
  lat: -26.2,
  lng: 28.03,
};
