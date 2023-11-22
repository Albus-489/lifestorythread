import { Component, EventEmitter, Input, Output } from '@angular/core';
import { format, getDay } from 'date-fns';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent {

  @Input() currentMonthYearFormatted: string = ''
  @Output() dateChanged: EventEmitter<string> = new EventEmitter<string>();
  nextMonthYearFormatted: string = ''

  ngOnInit() {

  }

  nextMonth() {
    this.currentMonthYearFormatted = this.switchMonth('next', new Date(this.currentMonthYearFormatted))
    this.dateChanged.emit(this.currentMonthYearFormatted);

  }

  prevMonth() {
    this.currentMonthYearFormatted = this.switchMonth('prev', new Date(this.currentMonthYearFormatted))
    this.dateChanged.emit(this.currentMonthYearFormatted);
  }

  switchMonth(direction: 'next' | 'prev', currentDate: Date): string {

    const monthDate = new Date(currentDate);
    switch (direction) {

      case 'next':
        monthDate.setMonth(monthDate.getMonth() + 1);
        if (monthDate.getMonth() !== (currentDate.getMonth() + 1) % 12) {
          monthDate.setFullYear(monthDate.getFullYear() + 1);
        }
        break;

      case 'prev':
        monthDate.setMonth(monthDate.getMonth() - 1);
        if (monthDate.getMonth() !== (currentDate.getMonth() - 1 + 12) % 12) {
          monthDate.setFullYear(monthDate.getFullYear() - 1);
        }
    }
    return format(monthDate, 'MMMM yyyy')
  }

}
