import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
import { PivotViewAllModule, PivotFieldListAllModule } from '@syncfusion/ej2-angular-pivotview';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { PivotGridComponent } from './pivot-grid/pivot-grid.component';
import { PivotComponent } from './pivot/pivot.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    PivotGridComponent,
    PivotComponent
    ],
  imports: [
    CommonModule,
    SpreadsheetAllModule,
    BrowserModule,
    AppRoutingModule,
    PivotViewAllModule,
    PivotFieldListAllModule,
    ButtonModule,
    DialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
