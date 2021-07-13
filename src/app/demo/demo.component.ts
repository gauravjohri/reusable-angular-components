import { HttpClient } from '@angular/common/http';

import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  pdata: any = [];
  cdata: any = [];
  pcols = [
    { name: 'id', label: 'ID' },
    { name: 'title', label: 'Title' },
    { name: 'body', label: 'Body' },
  ]
  pactions = [
    { label: 'Alert', action: 'alert' },
    { label: 'Alert2', action: 'alert2' },
  ];
  ccols = [
    { name: 'id', label: 'ID' },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
    { name: 'body', label: 'Body' },
  ]


  formFields = [
    { name: 'fname', type: 'text', label: 'First Name', value: '', validators: [Validators.required] },
    { name: 'lname', type: 'text', label: 'Last Name', value: '', validators: [Validators.required] },
    { name: 'email', type: 'email', label: 'Email', value: '' },
    { name: 'mobile', type: 'text', label: 'Mobile', value: '' },
    { name: 'img', type: 'file', label: 'Image', value: '', multi: true },
  ];

  popoupData: any;
  loading = 0;
  cloading = 0;
  fsubmitted = false;
  floading = false;
  fstatus: any;
  selectedVals = [];
  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe((data: any) => {
      setTimeout(() => {
        this.pdata = data;
        this.loading = 1;
      }, 3000);
    })

    this.http.get("https://jsonplaceholder.typicode.com/comments").subscribe((data: any) => {
      setTimeout(() => {
        this.cdata = data;
        this.cloading = 1;
      }, 1000);

    })
  }
  test(ev: any) {
    console.log(ev);
    this.popoupData = ev.row;
    this.dialog.open(this.secondDialog);
  }
  demo(ev: any) {
    console.log(ev);
    this.selectedVals = ev;;
  }
  g() {
    console.log(this.selectedVals);

  }

  formStatus(ev: any) {
    console.log(ev);
    this.fstatus = ev;
  }
  formData(ev: any) {
    this.fsubmitted = true;
    console.log(ev.fname, ev.lname, ev);
    if (this.fstatus == 'VALID') {
      this.floading = true;
      setTimeout(() => {
        this.fsubmitted = false;
        this.floading = false;
      }, 2000);
    }
  }
  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
}
