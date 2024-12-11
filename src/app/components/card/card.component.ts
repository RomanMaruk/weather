import { DatePipe } from '@angular/common';
import { Component, InputSignal, inject, input } from '@angular/core';
import { ICityList } from '../../models/weather.interfaces';
import { DashboardsService } from '../../services/dashboards.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  list: InputSignal<ICityList> = input.required({ alias: 'cityList' });
  dashboard = inject(DashboardsService);

  getWeatherIconUrl(icon: any): string {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  }

  onRemoveClick(name: string) {
    this.dashboard.removeList(name);
  }
}
