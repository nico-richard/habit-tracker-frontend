import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Record } from './models/record';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { Graph, Graphs } from './models/graph';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  constructor(private http: HttpClient) {}
  endPoint = 'https://pixe.la/v1';
  user = 'nicorichard';
  graph = 'velo';

  headers = new HttpHeaders().set('X-USER-TOKEN', environment.xUserToken);

  createGraph(
    id: string,
    name: string,
    unit: string,
    type: string,
    color: string
  ) {
    const url = `${this.endPoint}/users/${this.user}/graphs`;
    return this.http.post(
      url,
      {
        id: id,
        name: name,
        unit: unit,
        type: type,
        color: color,
      },
      { headers: this.headers }
    );
  }

  getGraphs() {
    const url = `${this.endPoint}/users/${this.user}/graphs`;
    return this.http.get(url, { headers: this.headers });
  }

  recordActivity(data: Record) {
    const url = `${this.endPoint}/users/${this.user}/graphs/${this.graph}`;
    return this.http.post(
      url,
      { date: data.date, quantity: data.quantity.toString() },
      { headers: this.headers }
    );
  }
}
