import { AsyncPipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, finalize, map, switchMap, tap } from 'rxjs';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { ApiService } from '../../services/api.service';
import { GetIconPipe } from '../../pipes/get-icon.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IDailyResponse } from '../../models/weather.interfaces';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [
    TitleCasePipe,
    DecimalPipe,
    AsyncPipe,
    FormatDatePipe,
    GetIconPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.scss',
})
export class DailyComponent {
  private apiService = inject(ApiService);
  private activateRouter = inject(ActivatedRoute);

  public loading = false;

  public nameCity$ = this.activateRouter.params.pipe(map((p) => p['id']));

  public weatherData$: Observable<IDailyResponse> =
    this.activateRouter.queryParams.pipe(
      tap(() => (this.loading = true)),
      switchMap(({ lat, lon }) => {
        return this.apiService
          .dayly({ lat, lon })
          .pipe(finalize(() => (this.loading = false)));
      })
    );
}
