import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  ICity,
  ICoordinate,
  IDailyResponse,
} from '../models/weather.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  searchCities(city: string) {
    return this.http.get<ICity>(
      `${environment.URL}/data/2.5/find?q=${city}&appid=${environment.APIKEY}&units=metric`
    );
  }

  // days - min 1 max 16
  dayly({ lat, lon }: ICoordinate, days: number = 7) {
    return this.http.get<IDailyResponse>(
      `${environment.URL}/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${days}&appid=${environment.APIKEY}`
    );
  }
}
