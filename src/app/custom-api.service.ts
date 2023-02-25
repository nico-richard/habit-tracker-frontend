import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Graph } from './models/graph';
import { Message } from './models/message';

@Injectable({
  providedIn: 'root',
})
export class CustomApiService {
  constructor(private http: HttpClient) {}

  endpoint = '/api/graph';

  getAllGraphs() {
    return this.http.get<Message>(this.endpoint);
  }
  getGraph(id: number) {
    return this.http.get<Message>(`${this.endpoint}/${id}`);
  }
  createGraph(graph: Graph) {
    return this.http.post<Message>(this.endpoint, {
      id: graph.id,
      name: graph.name,
    });
  }
  deleteGraph(id: number) {
    return this.http.delete<Message>(`${this.endpoint}/${id}`);
  }
}
