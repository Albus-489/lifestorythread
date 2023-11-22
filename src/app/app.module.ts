import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { DayComponent } from './components/day/day.component';
import { MonthComponent } from './components/month/month.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { SwitcherComponent } from './components/switcher/switcher.component';
import { DayPageComponent } from './components/day-page/day-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    MonthComponent,
    AddCommentComponent,
    SwitcherComponent,
    DayPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
