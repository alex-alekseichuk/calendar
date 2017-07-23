import {Component, Input, ViewChild} from '@angular/core';
import {CalendarService, Day} from './calendar.service';
import {DayDialogComponent} from "./day-dialog/dialog.component";

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

  onPrev() {
    this._calendarService.prevMonth();
  }
  onNext() {
    this._calendarService.nextMonth();
  }

  @ViewChild(DayDialogComponent) dlgDay:DayDialogComponent;

  onSelectDay(day:Day):void {
    this.dlgDay.open(day);
  }
  onSaveDay(day:Day):void {
    this._calendarService.saveDay(day);
  }
  onDeleteDay(day:Day):void {
    this._calendarService.deleteDay(day);
  }
  onToday(): void {
      let today:Day = this._calendarService.today();
      if (today)
          this.dlgDay.open(today);
  }

}
