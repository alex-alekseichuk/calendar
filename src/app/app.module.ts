import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { BrowserModule }  from '@angular/platform-browser'

import { AppComponent } from './app.component'
import './styles/main.styl'
import {DayComponent} from './day/day.component'
import {DayDialogComponent} from "./day-dialog/dialog.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  declarations: [
    AppComponent, DayComponent, DayDialogComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
