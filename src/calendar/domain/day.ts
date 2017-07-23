import * as moment from 'moment';

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
