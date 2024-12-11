import { AsyncPipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { ApiService } from '../../services/api.service';
import { GetIconPipe } from '../../pipes/get-icon.pipe';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [TitleCasePipe, DecimalPipe, AsyncPipe, FormatDatePipe, GetIconPipe],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.scss',
})
export class DailyComponent {
  private apiService = inject(ApiService);
  private activateRouter = inject(ActivatedRoute);

  public nameCity$ = this.activateRouter.params.pipe(map((p) => p['id']));

  public weatherData$: Observable<any> = this.activateRouter.queryParams.pipe(
    switchMap(({ lat, lon }) => {
      return this.apiService.dayly({ lat, lon });
    })
  );
}
