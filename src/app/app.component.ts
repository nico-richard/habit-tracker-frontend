import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RecordService } from './record.service';
import { Graph, Graphs } from './models/graph';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnDestroy, OnInit {
  constructor(private recordService: RecordService) {}

  title = 'Habit tracker';
  graphs: any;
  graphName = '';

  ngOnInit(): void {
    this.recordService.getGraphs().subscribe((data) => {
      this.graphs = data;
      this.graphName = this.graphs['graphs'][0].name;
    });
  }
  ngOnDestroy(): void {}

  recordForm = new FormGroup({
    date: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    quantity: new FormControl(0, {
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
    this.recordService
      .createGraph(
        this.createGraphForm.getRawValue().id,
        this.createGraphForm.getRawValue().name,
        this.createGraphForm.getRawValue().unit,
        this.createGraphForm.getRawValue().type,
        this.createGraphForm.getRawValue().color
      )
      .subscribe((data) => console.log(data));
  }

  onRecordSubmit() {
    this.recordService
      .recordActivity(this.recordForm.getRawValue())
      .subscribe((data) => {
        console.log(data);
      });
  }
}
