import { Component } from '@angular/core';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'calendar-app',
  templateUrl: './app.component.pug',
  providers: [CalendarService]
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
  onPrev() {
    this._calendarService.prevMonth();
  }
  onNext() {
    this._calendarService.nextMonth();
  }
}
