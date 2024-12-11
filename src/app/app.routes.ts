import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DailyComponent } from './pages/daily/daily.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: ':id', component: DailyComponent },
];
