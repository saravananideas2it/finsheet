import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PivotComponent } from '../app/pivot/pivot.component';
import { PivotGridComponent } from './pivot-grid/pivot-grid.component'

const routes: Routes = [
//  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'pivot', component: PivotComponent },
  { path: 'pivot-grid', component: PivotGridComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
