import {Component, Input} from '@angular/core'
import {Day} from '../calendar.service'

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

    get date() {
        return this._day.date.format('DD');
    }
}
