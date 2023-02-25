import { Component, OnInit } from '@angular/core';
import { PixelaService } from '../pixela.service';
import { Graphs } from '../models/graph';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-graph-list',
  templateUrl: './graph-list.component.html',
  styleUrls: ['./graph-list.component.sass'],
})
export class GraphListComponent implements OnInit {
  constructor(private pixelaService: PixelaService) {}

  graphList: Graphs;
  graphCount: number;
  displayedColumns = ['id', 'name', 'unit', 'type', 'color'];

  ngOnInit(): void {
    this.pixelaService.graphList.subscribe((data: Graphs) => {
      this.graphCount = data.graphs.length;
      this.graphList = data;
    });

    this.pixelaService.getGraphs().subscribe((graphList: Graphs) => {
      this.graphList = graphList;
      this.pixelaService.graphList.next(this.graphList);
    });
  }

  onDelete(index: string) {
    console.log(`Delete graph : ${index}`);
    this.pixelaService.deleteGraph(index).subscribe((response) => {
      console.log(response.message);
    });
    this.pixelaService.getGraphs().subscribe((data: Graphs) => {
      this.pixelaService.graphList.next(data);
    });
  }
}
