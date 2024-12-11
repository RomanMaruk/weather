import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICity, ICityList } from '../models/weather.interfaces';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardsService {
  private apiService = inject(ApiService);

  private cityNames = new BehaviorSubject<string[]>([]);
  public cityNames$ = this.cityNames.asObservable();

  public weatherLists = new BehaviorSubject<ICityList[]>([]);
  public weatherLists$ = this.weatherLists.asObservable();

  set setWeatherList(list: ICityList) {
    const lists = this.weatherLists.getValue().slice();
    const exist = lists.findIndex((l) => l.name === list.name);
    if (exist < 0) {
      this.weatherLists.next([...lists, list]);
      this.saveNameCity(list.name);
    }
  }

  private saveNameCity(name: string) {
    const json = localStorage.getItem(namesLocalCities);
    if (json) {
      const local: string[] = JSON.parse(json);
      const exist = local.indexOf(name) < 0;
      if (exist)
        localStorage.setItem(
          namesLocalCities,
          JSON.stringify([...local, name])
        );
    } else {
      localStorage.setItem(namesLocalCities, JSON.stringify([name]));
    }
  }

  getNamesCities(): string[] {
    const json = localStorage.getItem(namesLocalCities);
    if (json) {
      const local: string[] = JSON.parse(json);
      return local;
    } else {
      return [];
    }
  }

  getListsByNames(): Observable<ICity>[] {
    const cities = this.getNamesCities();
    if (cities.length) {
      const requests = cities.map((name) => this.apiService.searchCities(name));
      return requests;
    } else {
      return [];
    }
  }

  private saveNamesCity(names: string[]) {
    const json = JSON.stringify(names);
    localStorage.setItem(namesLocalCities, json);
  }

  removeList(name: string) {
    const lists = this.weatherLists.getValue();
    const filtered = lists.filter((l) => l.name !== name);
    const filteredNames = this.getNamesCities().filter((n) => n !== name);
    this.saveNamesCity(filteredNames);
    this.weatherLists.next(filtered);
  }
}

const namesLocalCities = 'cities';
