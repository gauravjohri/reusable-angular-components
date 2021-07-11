import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  data: any = [];
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
  loading = 0;
  cloading = 0;
  selectedVals = [];
  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe((data: any) => {
      setTimeout(() => {
        this.data = data;
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
