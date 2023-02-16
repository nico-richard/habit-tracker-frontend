import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Record } from './models/record';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  constructor(private http: HttpClient) {}
  rootUrl = 'https://pixe.la/v1/users/nicorichard/graphs/velo';
  headers = new HttpHeaders().set('X-USER-TOKEN', 'azerty123');

  recordActivity(data: Record) {
    return this.http.post(
      this.rootUrl,
      { date: data.date, quantity: data.quantity.toString() },
      { headers: this.headers }
    );
  }
}
