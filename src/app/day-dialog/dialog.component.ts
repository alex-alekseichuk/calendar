import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import {Day} from '../calendar.service'

@Component({
    selector: 'calendar-day-dialog',
    templateUrl: './dialog.component.pug',
    styles: [require('./dialog.component.styl').toString()],
    animations: [
        trigger('dialog', [
            transition('void => *', [
                style({ transform: 'scale3d(.3, .3, .3)' }),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
            ])
        ])
    ]
})
export class DayDialogComponent {
    @Input() closable = true;

    visible:boolean = false;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() save: EventEmitter<Day> = new EventEmitter<Day>();
    @Output() delete: EventEmitter<Day> = new EventEmitter<Day>();

    day:Day;

    private title:string;
    private description:string;

    open(day:Day):void {
        this.day = day;

        this.title = day.title || '';
        this.description = day.description || '';

        this.visible = true;
        this.visibleChange.emit(this.visible);
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    onSave():void {
        this.day.title = this.title;
        this.day.description = this.description;

        this.save.emit(this.day);
        this.close();
    }
    onDelete():void {
        this.delete.emit(this.day);
        this.close();
    }
}
