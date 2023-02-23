import { Component, OnInit } from '@angular/core';
import { GraphService } from '../graph.service';
import { Graphs } from '../models/graph';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-graph-list',
  templateUrl: './graph-list.component.html',
  styleUrls: ['./graph-list.component.sass'],
})
export class GraphListComponent implements OnInit {
  constructor(private graphService: GraphService) {}

  graphList: Graphs;
  graphCount: number;

  ngOnInit(): void {
    this.graphService.graphList.subscribe((data: Graphs) => {
      this.graphCount = data.graphs.length;
      this.graphList = data;
    });

    this.graphService
      .getGraphs()
      .pipe(
        catchError((err: Graphs) => {
          window.location.reload();
          throw err;
        })
      )
      .subscribe((graphList: Graphs) => {
        this.graphList = graphList;
        this.graphService.graphList.next(this.graphList);
      });
  }

  onDelete(index: string) {
    console.log(`Delete graph : ${index}`);
    this.graphService.deleteGraph(index).subscribe((response) => {
      console.log(response.message);
    });
    setTimeout(() => {
      this.graphService
        .getGraphs()
        .pipe(
          catchError((err: Graphs) => {
            window.location.reload();
            throw err;
          })
        )
        .subscribe((data: Graphs) => {
          this.graphService.graphList.next(data);
        });
    }, 1000);
  }
}
