import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { format, getDay } from 'date-fns';
import { Subscription } from 'rxjs';
import { IDay } from 'src/app/models/IDay';
import { IMark } from 'src/app/models/IMark';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})

export class MonthComponent {

  constructor(private apiService: ApiService) { }
  private phrases: string[] = ["Скучно..", "Хто ти, воїн?", "Шо ти?", "Ех..", "Пум-пурум..", "Фокус-покус..", "ИиииИии ааа еее..", "ФУС РО ДА", "А, ну да.."];
  private subscription: Subscription;

  currentMonthYear: string = '';
  currentMonthYearFormatted: string = '';
  currentYear: number = 0;
  currentMonth: number = 0;
  daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  weeks: { days: IDay[] }[] = [];
  currentDate: any = ''
  monthData: { _id: string, marks: IMark[], day: string }[] = []
  emptyDay: IDay = { num: 0, name: '', grade: 0 }
  isLoading: boolean = true
  randomPhrase: string = "Loading...";



  ngOnInit() {
    // this.initCurrentDate('2024-09-01');
    this.initCurrentDate('2023-06');
    this.calculateWeeksAndDays()
    this.initMonth()
    const lastWeekIndex = this.weeks.length - 1;
    const lastWeekLength = this.weeks[lastWeekIndex].days.length;
    if (lastWeekLength !== 7) {
      this.correctLastWeek(lastWeekIndex, lastWeekLength)
    }

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initMonth() {
    this.apiService.getCurrentMonth(this.currentMonthYear).subscribe({
      next: (data) => {
        this.monthData = data;
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
      complete: () => {
        setTimeout(() => {
          this.setMarks();
          this.randomPhrase = this.getRandomPhrase();
          this.isLoading = false;
        }, 400);
      }
    });
  }

  setMarks() {
    for (const week of this.weeks) {
      for (const day of week.days) {
        if (day.num > 0) {
          const m = this.currentMonth < 10 ? '0' + this.currentMonth : this.currentMonth;
          const d = day.num < 10 ? '0' + day.num : day.num;

          const matchingDayDB = this.monthData.find((dbDay) => dbDay.day === `${this.currentYear}-${m}-${d}`);

          if (matchingDayDB) {
            // Устанавливаем оценку, если существует соответствующий тип в marks
            const rateMark = matchingDayDB.marks.find((mark) => mark.type?.endsWith('RateMark'));
            if (rateMark) {
              day.grade = rateMark.grade || 0;
            }
          }
        }
      }
    }
    console.log(this.weeks[0].days);

  }

  initCurrentDate(date: string = ''): void {
    this.currentDate = date ? new Date(date) : new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth() + 1; // JavaScript months are zero-based

    // Formatting month with leading zero if month < 10
    const formattedMonth = this.currentMonth < 10 ? `0${this.currentMonth}` : `${this.currentMonth}`;

    this.currentMonthYear = `${this.currentYear}-${formattedMonth}`;

    // Date formatting "MonthName YYYY"
    this.currentMonthYearFormatted = format(this.currentDate, 'MMMM yyyy');
  }

  calculateWeeksAndDays() {
    this.weeks = [];
    let firstDayOfWeek = getDay(new Date(this.currentYear, this.currentMonth - 1, 0));
    const daysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

    let currentDay = 1;
    for (let week = 0; currentDay <= daysInMonth; week++) {
      const days: IDay[] = [];

      // Empty days before the first day of the month
      for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(this.emptyDay);
      }

      // Adding days to the week
      for (let i = firstDayOfWeek; i < 7 && currentDay <= daysInMonth; i++) {
        const dayNumber = currentDay;
        const dayOfWeek = getDay(new Date(this.currentYear, this.currentMonth - 1, dayNumber));
        const dayName = this.getDayName(dayOfWeek);
        days.push({ num: dayNumber, name: dayName, grade: 0 });
        currentDay++;
      }
      this.weeks.push({ days });
      firstDayOfWeek = 0; // Reset first day of the week for the next week
    }

    const emptyDaysCount = 7 - (this.weeks.length - 1);
    const emptyDays: IDay[] = Array.from({ length: emptyDaysCount }, () => (this.emptyDay));

    this.weeks[this.weeks.length - 1].days.push(...emptyDays);
  }

  switchMonth(newDate: string): void {
    this.initCurrentDate(newDate);
    this.calculateWeeksAndDays();
    const lastWeekIndex = this.weeks.length - 1;
    const lastWeekLength = this.weeks[lastWeekIndex].days.length;

    if (lastWeekLength !== 7) {
      this.correctLastWeek(lastWeekIndex, lastWeekLength)
    }
    this.isLoading = true;
    this.initMonth();
  }

  correctLastWeek(lastWeekIndex: number, lastWeekLength: number): void {
    let newWeeks = [...this.weeks];

    if (lastWeekLength > 7) {
      const amountForRemove = lastWeekLength - 7
      const newLastWeek = { days: [...this.weeks[lastWeekIndex].days] };
      newLastWeek.days.splice(-amountForRemove, amountForRemove);
      newWeeks[lastWeekIndex] = newLastWeek;
      this.weeks = newWeeks;
    } else if (lastWeekLength < 7) {
      const amountToAdd = 7 - lastWeekLength;
      for (let i = 0; i < amountToAdd; i++) {
        this.weeks[lastWeekIndex].days.push(this.emptyDay);
      }
    }
  }

  getDayName(dayOfWeek: number): string {
    return this.daysOfWeek[dayOfWeek];
  }
  getRandomPhrase(): string {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomIndex];
  }
}
