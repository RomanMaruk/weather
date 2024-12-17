import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Observable,
  catchError,
  concatMap,
  from,
  map,
  of,
  scan,
  shareReplay,
  switchMap,
  take,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { CardComponent } from '../../components/card/card.component';
import { SearchComponent } from '../../components/search/search.component';
import { LoadingDirective } from '../../directives/loading.directive';
import { ICityList } from '../../models/weather.interfaces';
import { DashboardsService } from '../../services/dashboards.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SearchComponent, CardComponent, AsyncPipe, LoadingDirective],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-20px)' }),
            stagger('200ms', [
              animate(
                '500ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class MainComponent {
  dashboard = inject(DashboardsService);
  loading = true;
  error: { message: string } | null = null;
  cityLists$: Observable<ICityList[]> = this.dashboard.weatherLists$.pipe(
    switchMap((cities: ICityList[]) =>
      from(cities).pipe(
        // Convert the array into an observable stream of cities
        concatMap((city) => timer(200).pipe(map(() => city))), // Emit one city every 200ms
        scan((acc: ICityList[], city) => [...acc, city], []) // Accumulate cities into an array
      )
    ),
    tap(() => (this.loading = false)),
    shareReplay() // Replay the accumulated array to all subscribers
  );

  ngOnInit() {
    this.dashboard.getListsByNames().forEach((list) => {
      list
        .pipe(
          take(1),
          catchError((e: { message: string }) => {
            this.loading = false;
            this.error = e;
            return throwError(e);
          })
        )
        .subscribe((list) => (this.dashboard.setWeatherList = list.list[0]));
    });
  }
}
