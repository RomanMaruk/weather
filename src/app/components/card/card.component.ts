import { DatePipe } from '@angular/common';
import { Component, InputSignal, inject, input } from '@angular/core';
import { ICityList } from '../../models/weather.interfaces';
import { DashboardsService } from '../../services/dashboards.service';
import { Router } from '@angular/router';
import { GetIconPipe } from '../../pipes/get-icon.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DatePipe, GetIconPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  list: InputSignal<ICityList> = input.required({ alias: 'cityList' });
  dashboard = inject(DashboardsService);
  router = inject(Router);

  getWeatherIconUrl(icon: any): string {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  }

  onRemoveClick(event: MouseEvent, name: string) {
    event.stopPropagation();
    this.dashboard.removeList(name);
  }

  navigate() {
    const { lat, lon } = this.list().coord;
    const nameCity = this.list().name;
    this.router.navigate([nameCity], { queryParams: { lat, lon } });
  }
}
