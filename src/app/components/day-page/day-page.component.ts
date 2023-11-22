import { Component } from '@angular/core';
import { IMark } from 'src/app/models/IMark';
import { DayPageService } from 'src/app/services/day-page.service';

@Component({
  selector: 'app-day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss']
})
export class DayPageComponent {

  constructor(private dayPageService: DayPageService) { }

  marks: IMark[] = [];

  ngOnInit(): void {
    this.marks = this.dayPageService.dayData;
  }
}
