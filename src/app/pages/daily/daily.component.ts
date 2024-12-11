import { Component, inject } from '@angular/core';
import { DashboardsService } from '../../services/dashboards.service';
import { ApiService } from '../../services/api.service';
import { DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [TitleCasePipe, DecimalPipe],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.scss',
})
export class DailyComponent {
  private apiService = inject(ApiService);
  private dashboardService = inject(DashboardsService);

  public weatherData: any;

  formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  }

  getIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  ngOnInit() {
    setTimeout(() => {
      const list = this.dashboardService.weatherLists.getValue()[0];
      console.log('List ', list);

      this.apiService.dayly(list.coord).subscribe((r) => {
        this.weatherData = r;
        console.log(r);
      });
    }, 1000);
  }
}
