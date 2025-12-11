import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getTime(): Observable<Date> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => new Date(response.datetime))
    );
  }
}
