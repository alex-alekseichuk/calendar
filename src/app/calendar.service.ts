import * as moment from 'moment';
import {Injectable} from '@angular/core';

/**
 * Day is a cell of the month table.
 */
export class Day {
    title: string = '';
    description: string = '';

    hidden: boolean = false; // day of another month
    filtered: boolean = false; // day found by filter/search function

    constructor(private _date: moment.Moment) {}

    get date():moment.Moment {
        return this._date;
    }
    get isToday():boolean {
        return this.date.isSame(moment(), 'day');
    }
}

@Injectable()
export class CalendarService {
    constructor() {
        this._refreshCurrentMonth();
    }

    get year():number {
        return this._startOfMonth.year();
    }
    get month():number {
        return this._startOfMonth.month();
    }
    get monthStr():string {
        return this._startOfMonth.format('MMMM');
    }

    nextMonth():void {
        this._startOfMonth.add(1,'M');
        this._refreshCurrentMonth();
    }
    prevMonth():void {
        this._startOfMonth.subtract(1,'M');
        this._refreshCurrentMonth();
    }

    /**
     * If that's another month then just go to the month of today.
     * If there is current month open edit dialog for today.
     * @returns {Day} | null
     */
    today():Day {
        // TODO: move this logic to component level
        let startOfMonth = moment().startOf('month');
        if (startOfMonth.isSame(this._startOfMonth, 'day')) {
            return this._days.find(day => day.isToday);
        } else {
            this._startOfMonth = startOfMonth;
            this._refreshCurrentMonth();
            return null;
        }
    }

    get days():Day[] {
        return this._days;
    }

    public loadDay(day:Day):void {
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
    public saveDay(day:Day):void {
        let key:string = day.date.format('YYYY-MM-DD');
        let json = JSON.stringify({
            title: day.title,
            description: day.description
        });
        localStorage[key] = json;
    }
    public deleteDay(day:Day):void {
        let key:string = day.date.format('YYYY-MM-DD');
        day.title = null;
        day.description = null;
        delete localStorage[key];
    }

    private _startOfMonth: moment.Moment = moment().startOf('month');
    private _days:Day[] = [];

    private _addDay(day:Day):void {
        this._days.push(day);
    }

    private _addHiddenDay(date:moment.Moment):void {
        let day = new Day(moment(date));
        day.hidden = true;
        this._addDay(day);
    }

    private _refreshCurrentMonth():void {
        this._days = [];
        let d, endOfMonth;

        // add hidden days of prev. month
        const emptyDaysNum = (this._startOfMonth.day() + 6) % 7;
        d = moment(this._startOfMonth).subtract(emptyDaysNum, 'd');
        for (let i = 0; i < emptyDaysNum; i++, d.add(1, 'd')) {
            this._addHiddenDay(d);
        }

        // add days of actual month
        for (endOfMonth = moment(this._startOfMonth).endOf('month');
             !d.isAfter(endOfMonth); d.add(1, 'd')) {
            let day = new Day(moment(d));
            this.loadDay(day);
            this._addDay(day);
        }

        // add more hidden days of next month
        const daysInMonth = this._startOfMonth.daysInMonth() + emptyDaysNum;
        if (daysInMonth % 7) {
            for (let i = 0, n = 7 - (daysInMonth % 7); i < n; i++, d.add(1, 'd'))
                this._addHiddenDay(d);
        }

        this.filter();
    }

    private _query:string = '';
    private filter(query:string = null):void {
        if (query !== null)
            this._query = query;
        if (!this._query) {
            this._days.forEach(day => day.filtered = false);
        } else {
            this._days.forEach(day => day.filtered = (
                false
                // this._query =
            ));
        }
    }

}
