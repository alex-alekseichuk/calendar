import { Component } from '@angular/core';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'calendar-app',
  templateUrl: './app.component.pug',
  providers: [CalendarService],
  styles: [require('./app.component.styl').toString()]
})
export class AppComponent {
  constructor(private _calendarService: CalendarService) {}
  get year() {
    return this._calendarService.year;
  }
  get month() {
    return this._calendarService.monthStr;
  }
  get days() {
    return this._calendarService.days;
  }
  get day1() {
    return this._calendarService.days[0];
  }
  get day2() {
    return this._calendarService.days[1];
  }
  onPrev() {
    this._calendarService.prevMonth();
  }
  onNext() {
    this._calendarService.nextMonth();
  }
}
