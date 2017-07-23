import {Component, EventEmitter, Input, Output} from '@angular/core'
import {truncate} from '../../misc';
import {Day} from "../../domain/day";

@Component({
    selector: 'calendar-day',
    templateUrl: './day.component.pug',
    styles: [require('./day.component.styl').toString()]
})
export class DayComponent {
    private _day:Day;

    @Input()
    set day(_day:Day) {
        this._day = _day;
    }

    @Input() index:number;

    @Output() daySelected: EventEmitter<Day> = new EventEmitter<Day>();

    get date() {
        if (this.index < 7)
            return this._day.date.format('dddd, DD');
        return this._day.date.format('DD');
    }

    get title() {
        if (!this._day.title)
            return;
        return truncate(this._day.title, 15);
    }

    get description() {
        if (!this._day.description)
            return;
        return truncate(this._day.description, 90);
    }

    get isHidden() : boolean  {
        return this._day.hidden;
    }

    get isFiltered() : boolean {
        return this._day.filtered;
    }

    get isToday() : boolean  {
        return this._day.isToday;
    }

    openDay() {
        this.daySelected.emit(this._day);
    }

}
