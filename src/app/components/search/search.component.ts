import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { ICity } from '../../models/weather.interfaces';
import { ApiService } from '../../services/api.service';
import { DashboardsService } from '../../services/dashboards.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AsyncPipe,
    MatSelectModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private apiService = inject(ApiService);
  private dashboardService = inject(DashboardsService);

  public city = new FormControl();

  public selectedSity = new FormControl([]);

  error = '';
  cities$: Observable<ICity> = this.city.valueChanges.pipe(
    tap(() => (this.error = '')),
    debounceTime(500),
    distinctUntilChanged(),
    map((value) => (typeof value === 'object' ? value.name : value)),
    filter((value) => !!value),
    switchMap((value) =>
      this.apiService.searchCities(value).pipe(
        catchError((e: HttpErrorResponse) => {
          this.error = e.message;
          return of({ list: [] });
        })
      )
    ),
    shareReplay()
  );

  selection(event: MatOptionSelectionChange) {
    console.log(event.source.value);
    this.dashboardService.setWeatherList = event.source.value;
    this.city.setValue('');
  }
}
