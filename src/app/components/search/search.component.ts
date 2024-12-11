import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
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

  cities$ = this.city.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    map((value) => (typeof value === 'object' ? value.name : value)),
    filter((value) => !!value),
    switchMap((value) => this.apiService.searchCities(value))
  );

  ngOnInit() {
    this.apiService
      .searchCities('ivano-frankivsk')
      .subscribe((r) => console.log(r));
  }

  selection(event: MatOptionSelectionChange) {
    console.log(event.source.value);
    this.dashboardService.setWeatherList = event.source.value;
    this.city.setValue('');
  }
}
