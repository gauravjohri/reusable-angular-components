import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatCheckboxChange } from '@angular/material/checkbox';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() data: any = [];
  @Input() loading: any;
  @Input() filter: any;
  @Input() actions: any;
  @Input() cols: any = [{}];
  @Output() selectedChecks = new EventEmitter();
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filterInput: string = '';
  @Input() isActions: number = 0;
  @Input() isCheckboxRequired: number = 0;
  selected: any[] = [];
  @Output() selectedAction = new EventEmitter();
  selectedAll: boolean = false;
  constructor() { }
  doFilter = (event: any) => {
    this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
  }
  resetFilter = () => {
    this.filterInput = '';
    this.dataSource.filter = '';
  }
  ngOnInit(): void {
    if (this.isCheckboxRequired == 1)
      this.displayedColumns.push("check");
    this.cols.forEach((element: any) => {
      this.displayedColumns.push(element.name);
    });
    if (this.isActions == 1)
      this.displayedColumns.push("action");
  }
  pageChange(ev: any) {
    this.selectedAll = false;
    this.selected = [];

  }
  selectedCheckboxes = (event: MatCheckboxChange) => {
    if (event.checked) {
      if (!this.selected.includes(event.source.value))
        this.selected.push(event.source.value);
    }
    else {
      const index = this.selected.indexOf(event.source.value);
      if (index > -1) {
        if (this.selected.includes(event.source.value))
          this.selected.splice(index, 1);
      }
    }
    this.selectedChecks.emit(this.selected);
  }
  getSelectedAction(ev: any, action: any) {
    this.selectedAction.emit({ id: ev, action: action });
  }
  selectedAllCheckboxes(event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedAll = true;
      let start = ((this.paginator.pageIndex) * (this.paginator.pageSize));
      let end = ((this.paginator.pageIndex + 1) * (this.paginator.pageSize));
      this.dataSource.filteredData.slice(start, end).forEach((element: any) => {
        if (!this.selected.includes(element.id.toString()))
          this.selected.push(element.id.toString());
      });
    } else {
      this.selectedAll = false;
      this.selected = [];
    }
    this.selectedChecks.emit(this.selected);
  }
  ngOnChanges(da: SimpleChanges) {
    let dat: SimpleChange = da.loading;
    if (dat.currentValue === 1) {
      this.dataSource.data = this.data;
    }


  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
