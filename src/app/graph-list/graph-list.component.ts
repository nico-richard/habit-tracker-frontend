import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GraphService } from '../graph.service';
import { GraphList } from '../models/graph';

@Component({
  selector: 'app-graph-list',
  templateUrl: './graph-list.component.html',
  styleUrls: ['./graph-list.component.sass'],
})
export class GraphListComponent implements OnInit, OnChanges {
  constructor(private graphService: GraphService) {}

  graphList: GraphList;
  graphCount: number;

  ngOnInit(): void {
    this.graphService.graphCount.subscribe((count: number) => {
      this.graphCount = count;
    });

    this.graphService.getGraphs().subscribe((graphList: GraphList) => {
      this.graphList = graphList;
      this.graphService.graphCount.next(this.graphList.graphs.length);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`changes : ${changes}`);
    console.log(`changes : ${changes}`);
  }

  onDelete(index: string) {
    console.log(`Delete graph : ${index}`);
    this.graphService.deleteGraph(index).subscribe((response) => {
      console.log(response.message);
    });
    setTimeout(() => {
      this.graphService.getGraphs().subscribe((graphList) => {
        this.graphService.graphCount.next(graphList.graphs.length);
      });
    }, 1000);
  }
}
