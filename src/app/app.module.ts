import { NgModule } from '@angular/core'
import { BrowserModule }  from '@angular/platform-browser'

import { AppComponent } from './app.component'

import './styles/main.styl'
import {DayComponent} from './day/day.component'

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent, DayComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
