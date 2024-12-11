import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICity } from '../models/weather.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  searchCities(city: string) {
    return this.http.get<ICity>(
      `${environment.URL}/data/2.5/find?q=${city}&appid=${environment.APIKEY}&units=metric`
    );
    // return this.http.get<ICity>(
    //   `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${environment.APIKEY}&units=metric`
    // );
  }
}
