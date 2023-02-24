import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Record } from './models/record';
import { environment } from 'src/environment/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Graphs } from './models/graph';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  graphList = new BehaviorSubject<Graphs>({ graphs: [] });

  constructor(private http: HttpClient) {}

  endPoint = 'https://pixe.la/v1';
  user = 'nicorichard';

  headers = new HttpHeaders().set('X-USER-TOKEN', environment.xUserToken);

  createGraph(
    id: string,
    name: string,
    unit: string,
    type: string,
    color: string
  ) {
    console.log('Create graph from service called');
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

  getGraphs(): Observable<Graphs> {
    const url = `${this.endPoint}/users/${this.user}/graphs`;
    return this.http.get<Graphs>(url, { headers: this.headers });
  }

  recordActivity(data: Record, graphName: string) {
    const url = `${this.endPoint}/users/${this.user}/graphs/${graphName}`;
    return this.http.post(
      url,
      { date: data.date, quantity: data.quantity.toString() },
      { headers: this.headers }
    );
  }

  deleteGraph(
    graphId: string
  ): Observable<{ message: string; isSuccess: string }> {
    const url = `${this.endPoint}/users/${this.user}/graphs/${graphId}`;
    return this.http.delete<{ message: string; isSuccess: string }>(url, {
      headers: this.headers,
    });
  }
}
