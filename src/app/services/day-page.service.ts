import { Injectable } from '@angular/core';
import { IDay } from '../models/IDay';
import { IMark } from '../models/IMark';

@Injectable({
  providedIn: 'root'
})
export class DayPageService {

  constructor() { }

  dayData: IMark[];
}
