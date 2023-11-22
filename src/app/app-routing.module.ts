import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthComponent } from './components/month/month.component';
import { DayComponent } from './components/day/day.component';
import { DayPageComponent } from './components/day-page/day-page.component';

const routes: Routes = [
  { path: '', component: MonthComponent },
  { path: 'day', component: DayPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
