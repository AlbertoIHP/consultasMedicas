import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';

@Component({
  selector: 'app-agregarcita',
  templateUrl: './agregarcita.component.html',
  styleUrls: ['./agregarcita.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
    .cal-day-selected,
    .cal-day-selected:hover {
      background-color: deeppink !important;
    }
  `
  ],
  encapsulation: ViewEncapsulation.None

})
export class AgregarcitaComponent {

  viewDate: Date = new Date();

  selectedDay: CalendarMonthViewDay;

  events: CalendarEvent[] = [];

  dayClicked(day: CalendarMonthViewDay): void {
    if (this.selectedDay) {
      delete this.selectedDay.cssClass;
    }
    day.cssClass = 'cal-day-selected';
    this.selectedDay = day;
    console.log(this.selectedDay)
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (
        this.selectedDay &&
        day.date.getTime() === this.selectedDay.date.getTime()
      ) {
        day.cssClass = 'cal-day-selected';
        this.selectedDay = day;
      }
    });
  }
}
