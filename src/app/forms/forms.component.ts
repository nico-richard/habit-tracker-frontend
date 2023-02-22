import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GraphService } from '../graph.service';
import { GraphList } from '../models/graph';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.sass'],
})
export class FormsComponent implements OnInit {
  constructor(private graphService: GraphService) {}

  graphList: GraphList;

  ngOnInit() {}

  recordForm = new FormGroup({
    date: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    quantity: new FormControl(0, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    graphName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  createGraphForm = new FormGroup({
    id: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    name: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    unit: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    type: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    color: new FormControl('shibafu', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  onCreateGraph() {
    console.log(this.createGraphForm.getRawValue());
    this.graphService
      .createGraph(
        this.createGraphForm.getRawValue().id,
        this.createGraphForm.getRawValue().name,
        this.createGraphForm.getRawValue().unit,
        this.createGraphForm.getRawValue().type,
        this.createGraphForm.getRawValue().color
      )
      .subscribe((data) => console.log(`onCreateGraph : ${data}`));
    setTimeout(() => {
      this.graphService.getGraphs().subscribe((graphList) => {
        this.graphService.graphCount.next(graphList.graphs.length);
      });
    }, 1000);
  }

  onRecordSubmit() {
    this.graphService
      .recordActivity(
        {
          date: this.recordForm.getRawValue().date,
          quantity: this.recordForm.getRawValue().quantity,
        },
        this.recordForm.getRawValue().graphName
      )
      .subscribe((data) => {
        console.log(`onRecordSubmit : ${data}`);
      });
  }
}
