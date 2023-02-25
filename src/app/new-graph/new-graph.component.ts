import { Component, OnInit } from '@angular/core';
import { CustomApiService } from '../custom-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Graph } from '../models/graph';

@Component({
  selector: 'app-new-graph',
  templateUrl: './new-graph.component.html',
  styleUrls: ['./new-graph.component.sass'],
})
export class NewGraphComponent implements OnInit {
  createGraphForm = new FormGroup({
    id: new FormControl(0, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(private graphService: CustomApiService) {}
  graphList: Graph[];

  ngOnInit(): void {
    this.graphService.getAllGraphs().subscribe((data) => {
      this.graphList = data.data;
    });
  }

  onAllGraph() {
    this.graphService.getAllGraphs().subscribe((data) => console.log(data));
  }
  onCreateGraph() {
    console.log(`value : ${JSON.stringify(this.createGraphForm.value)}`);
    console.log(
      `getRawValue() : ${JSON.stringify(this.createGraphForm.getRawValue())}`
    );
    this.graphService
      .createGraph(this.createGraphForm.getRawValue())
      .subscribe((data) => (this.graphList = data.data));
  }

  onDelete(index: number) {
    this.graphService
      .deleteGraph(index)
      .subscribe((data) => (this.graphList = data.data));
  }
}
