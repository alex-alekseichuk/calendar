import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { BrowserModule }  from '@angular/platform-browser'

import { CalendarComponent } from './ui/app/app.component'
import './styles/main.styl'
import {DayComponent} from './ui/day/day.component'
import {DayDialogComponent} from "./ui/day-dialog/dialog.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  declarations: [
    CalendarComponent, DayComponent, DayDialogComponent
  ],
  bootstrap: [ CalendarComponent ]
})
export class CalendarModule { }
