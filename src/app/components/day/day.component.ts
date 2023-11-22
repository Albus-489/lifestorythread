import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {

  constructor(private router: Router) {
  }

  @Input() day: number = 0;
  @Input() dayName: string = '';
  @Input() isDayOfWeek: boolean = false;
  @Input() isCurrentDay: boolean = false;
  @Input() currentDate: string = '';
  @Input() gradeMark: number = 0;

  realDate = new Date();

  isHidden: boolean = false;
  isWeekend: boolean = false;

  greatGrade: boolean = false
  goodGrade: boolean = false
  normalGrade: boolean = false
  badGrade: boolean = false
  terribleGrade: boolean = false

  ngOnInit(): void {
    this.hidden();
    this.weekend();
    if (!this.isDayOfWeek && !this.isHidden) {
      this.numDay();
      this.currentDay();
      this.setGrade();
    }

  }

  handleDayBoxClick() {
    this.router.navigate(['/day']);
  }

  setGrade() {
    console.log(this.gradeMark);

    switch (this.gradeMark) {
      case 3:
        this.greatGrade = !this.greatGrade;
        break;
      case 5:
        this.goodGrade = !this.goodGrade;
        break;
      case 2:
        this.normalGrade = !this.normalGrade;
        break;
      case 4:
        this.badGrade = !this.badGrade;
        break;
      case 1:
        this.terribleGrade = !this.terribleGrade;
    }
  }

  numDay() {
    if (this.day < 10) {
      this.currentDate = this.currentDate + "-" + "0" + this.day.toString()
    } else {
      this.currentDate = this.currentDate + "-" + this.day.toString()
    }
  }

  currentDay() {
    const realDate = format(new Date(), 'yyyy-MM-dd');
    const currentDateWithZero = format(new Date(this.currentDate), 'yyyy-MM-dd');
    if (realDate === currentDateWithZero) {
      this.isCurrentDay = !this.isCurrentDay
    }

  }

  hidden() {
    this.isHidden = this.day > 0 ? false : true;
  }

  weekend() {
    if (this.dayName === 'Sun' || this.dayName === 'Sat') {
      this.isWeekend = !this.isWeekend;
    }
  }
}
