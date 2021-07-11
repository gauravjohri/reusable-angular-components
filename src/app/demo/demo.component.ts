import { HttpClient } from '@angular/common/http';

import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  popoupData: any;
  loading = 0;
  cloading = 0;
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
      }, 1000);
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
  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
}
