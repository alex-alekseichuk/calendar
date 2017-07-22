import * as moment from 'moment';
import {Injectable} from '@angular/core';

// a day on the calendar
export class Day {
    index: number;
    title: string;
    description: string;
    hidden: boolean = false;

    constructor(
        public date: moment.Moment
    ) {}

    get isFirstRow() {
        return this.index < 7;
    }
    get isToday() {
        return this.date.isSame(moment(), 'day');
    }
}

@Injectable()
export class CalendarService {
    private _startOfMonth: moment.Moment = moment().startOf('month');

    constructor() {
        this._getDays();
    }

    private _days:Day[] = [];

    private _addDay(day:Day) {
        day.index = this._days.length;
        this._days.push(day);
    }

    private _addEmptyDay(date:moment.Moment) {
        let day = new Day(moment(date));
        day.hidden = true;
        this._addDay(day);
    }

    private _getDays() {
        this._days = [];
        let d, endOfMonth;

        const emptyDaysNum = (this._startOfMonth.day() + 6) % 7;
        d = moment(this._startOfMonth).subtract(emptyDaysNum, 'd');
        for (let i = 0; i < emptyDaysNum; i++, d.add(1, 'd')) {
            this._addEmptyDay(d);
        }

        for (endOfMonth = moment(this._startOfMonth).endOf('month');
             !d.isAfter(endOfMonth); d.add(1, 'd')) {
            let day = new Day(moment(d));
            this._loadDay(day);
            this._addDay(day);
        }

        // add more empty days
        const daysInMonth = this._startOfMonth.daysInMonth() + emptyDaysNum;
        if (daysInMonth % 7) {
            for (let i = 0, n = 7 - (daysInMonth % 7); i < n; i++, d.add(1, 'd'))
                this._addEmptyDay(d);
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

    get days():Day[] {
        return this._days;
    }

    private _loadDay(day:Day):void {
        let key:string = day.date.format('YYYY-MM-DD');
        let json = localStorage[key];
        if (!json)
            return;
        try {
            let data = JSON.parse(json);
            day.title = data.title;
            day.description = data.description;
        } catch (e) {
            console.log(e);
        }
    }
    private _saveDay(day:Day):void {
        let key:string = day.date.format('YYYY-MM-DD');
        let json = JSON.stringify({
            title: day.title,
            description: day.description
        });
        localStorage[key] = json;
    }

}
