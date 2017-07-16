import * as moment from 'moment';
import {Injectable} from '@angular/core';

export class Record {
    date: moment.Moment;
    title: string;
}

export class Day {
    date: moment.Moment;
    records: Record[];
}

@Injectable()
export class CalendarService {
    private _startOfMonth: moment.Moment = moment().startOf('month');
    private _year:number = this._startOfMonth.year();
    private _month:number = this._startOfMonth.month(); // 0 based

    constructor() {
        // this.now = moment();
        // this._year = now.year();
        // this._month = now.month();
        this._getDays();
    }

    private _days:Day[] = [];

    private _getDays() {
        // TODO: get data from localStorage
        this._days = [];
        for (var d = moment(this._startOfMonth), endOfMonth = moment(this._startOfMonth).endOf('month');
             !d.isAfter(endOfMonth); d.add(1, 'd')) {
            if (d.date() === 1 + this._month) {
                this._days.push({date: d, records: [{date: d, title: `Test record ${this.monthStr}`}]});
            } else {
                this._days.push({date: d, records: []});
            }
        }
    }

    get year() {
        return this._startOfMonth.year();
    }
    get month() {
        return this._startOfMonth.month();
    }
    get monthStr() {
        return this._startOfMonth.format('MMMM');
    }

    nextMonth() {
        this._startOfMonth.add(1,'M');
        this._getDays();
    }

    prevMonth() {
        this._startOfMonth.subtract(1,'M');
        this._getDays();
    }

    get days() {
        return this._days;
    }
}
