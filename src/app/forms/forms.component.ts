import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PixelaService } from '../pixela.service';
import { Graphs } from '../models/graph';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.sass'],
})
export class FormsComponent implements OnInit {
  constructor(private pixelaService: PixelaService) {}

  graphList: Graphs;

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
    this.pixelaService
      .createGraph(
        this.createGraphForm.getRawValue().id,
        this.createGraphForm.getRawValue().name,
        this.createGraphForm.getRawValue().unit,
        this.createGraphForm.getRawValue().type,
        this.createGraphForm.getRawValue().color
      )
      .subscribe((data) => console.log(`onCreateGraph: ${data}`));
    setTimeout(() => {
      this.pixelaService
        .getGraphs()
        .pipe(
          catchError((err: Error) => {
            window.location.reload();
            throw err;
          })
        )
        .subscribe((data: Graphs) => {
          console.log(data);
          this.pixelaService.graphList.next(data);
        });
    }, 1000);
  }

  onRecordSubmit() {
    this.pixelaService
      .recordActivity(
        {
          date: this.recordForm.getRawValue().date,
          quantity: this.recordForm.getRawValue().quantity,
        },
        this.recordForm.getRawValue().graphName
      )
      .pipe(
        catchError((err: Error) => {
          window.location.reload();
          throw err;
        })
      )
      .subscribe((data) => {
        console.log(`onRecordSubmit : ${data}`);
      });
  }
}
