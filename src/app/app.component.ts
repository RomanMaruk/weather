import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { take } from 'rxjs';
import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';
import { DashboardsService } from './services/dashboards.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchComponent, CardComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  dashboard = inject(DashboardsService);
  cityLists$ = this.dashboard.weatherLists$;

  ngOnInit() {
    this.dashboard.getListsByNames().forEach((list) => {
      list
        .pipe(take(1))
        .subscribe((list) => (this.dashboard.setWeatherList = list.list[0]));
    });
  }
}
