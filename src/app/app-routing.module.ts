import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: "dash", component: TableComponent },
  { path: "", component: DemoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
