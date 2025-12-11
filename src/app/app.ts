import { Component } from '@angular/core';
import { ClockComponent } from './clock/clock';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClockComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'clock-app';
}
