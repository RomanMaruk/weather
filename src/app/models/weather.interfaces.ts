export interface ICity {
  message?: string;
  cod?: number;
  count?: number;
  list: ICityList[];
}

export interface ICityData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface IWind {
  speed: number;
  deg: number;
}

export interface ICoordinate {
  lat: number;
  lon: number;
}

export interface ICityList {
  id: number;
  name: string;
  coord: ICoordinate;
  main: ICityData;
  dt: number;
  wind: IWind;
  sys: {
    country: string;
  };
  rain: null | string;
  snow: {
    // '1h': 0.39;
    [key: string]: number;
  };
  clouds: {
    // all: 100;
    all: number;
  };
  weather: IWeather[];
}

//
export interface IDailyResponse {
  city: ICityInformation;
  cod: string;
  message: number;
  cnt: number;
  list: IWeatherData[];
}

export interface ICityInformation {
  id: number;
  name: string;
  coord: ICoordinate;
  country: string;
  population: number;
  timezone: number;
}

export interface IWeatherData {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: ITemperature;
  feels_like: IFeelsLike;
  pressure: number;
  humidity: number;
  weather: IWeather[];
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
  rain?: number; // Optional since it is not always present
}

export interface ITemperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface IFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
