export interface ICity {
  message: string;
  cod: number;
  count: number;
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
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
}
