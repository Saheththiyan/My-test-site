import { Component, OnDestroy, OnInit, signal, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TimeService } from './time';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './clock.html',
  styleUrl: './clock.css'
})
export class ClockComponent implements OnInit, OnDestroy {
  currentTime = signal<Date>(new Date());
  private timeService = inject(TimeService);
  private intervalId: any;
  private sub: Subscription | null = null;

  ngOnInit(): void {
    // Fetch initial time from API
    this.sub = this.timeService.getTime().subscribe({
      next: (time: Date) => {
        this.currentTime.set(time);
        this.startClock();
      },
      error: (err: any) => {
        console.error('Failed to fetch time', err);
        // Fallback to local time if API fails
        this.currentTime.set(new Date());
        this.startClock();
      }
    });
  }

  private startClock() {
    this.intervalId = setInterval(() => {
      // Increment time by 1 second
      this.currentTime.update(time => new Date(time.getTime() + 1000));
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
