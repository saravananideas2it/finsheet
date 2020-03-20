import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { SpreadsheetComponent, SelectEventArgs, MenuSelectArgs } from '@syncfusion/ej2-angular-spreadsheet';
import { IDataOptions, IDataSet, PivotView, FieldListService } from '@syncfusion/ej2-angular-pivotview';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import * as XLSX from 'xlsx';
import { DataModel } from './data.model';
import { Router } from '@angular/router';
import { FileuploadService } from './service/fileupload.service';
import { ApiService } from './service/api.service';
import { DataManager, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
 // providers: [ FileuploadService, ApiService ]
 encapsulation: ViewEncapsulation.None
})


export class AppComponent {
  public data: Object[] = [{

    OrderID: 10248,
    CustomerID: 'VINET',
    EmployeeID: 5,
    ShipName: 'Vins et alcools Chevalier',
    ShipCity: 'Reims',
    ShipAddress: '59 rue de lAbbaye'
  },
  {
    OrderID: 10249,
    CustomerID: 'TOMSP',
    EmployeeID: 6,
    ShipName: 'Toms Spezialitäten',
    ShipCity: 'Münster',
    ShipAddress: 'Luisenstr. 48'
  },
  {
    OrderID: 10250,
    CustomerID: 'HANAR',
    EmployeeID: 4,
    ShipName: 'Hanari Carnes',
    ShipCity: 'Rio de Janeiro',
    ShipAddress: 'Rua do Paço, 67'
  },
  {
    OrderID: 10251,
    CustomerID: 'VICTE',
    EmployeeID: 3,
    ShipName: 'Victuailles en stock',
    ShipCity: 'Lyon',
    ShipAddress: '2, rue du Commerce'
  },
  {
    OrderID: 10252,
    CustomerID: 'SUPRD',
    EmployeeID: 4,
    ShipName: 'Suprêmes délices',
    ShipCity: 'Charleroi',
    ShipAddress: 'Boulevard Tirou, 255'
  }];
  public showSpreadsheet: boolean = false;
  public remoteData: DataManager = new DataManager();
  public dataSource: any[];
  public width;
  public dataSourceSettings: IDataOptions;
  public apiCall = false;
  uploadedFiles: File = null ;

  constructor(private dataModel: DataModel, public router: Router,
              private fileuploadService: FileuploadService) { }
  @ViewChild('spreadsheet') public spreadsheetObj: SpreadsheetComponent;

  ngOnInit(): void {
    // this.getExcelData();
  }
    public actionBegin(args) {
      this.onFileChange(args.args);
    }

    onFileChange(ev) {
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      const file = ev.eventArgs.file;
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        console.log(workBook);
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.data = jsonData.Sheet1;
        this.dataSource = jsonData.Sheet1.slice(0, this.data.length > 100 ? 100 : this.data.length - 1);
        if (jsonData.Sheet1.length >= 500000) {
          const datasource = jsonData.Sheet1.slice(0, this.data.length / 2);
          this.uploadFile(datasource);
          this.dataModel.setJOSNData(this.dataSource);
          this.apiCall = true;
        } else {
          this.uploadFile(this.data);
        }
      };
      reader.onerror = (event) => {
        console.error("File could not be read! Code " + event.target.error.code);
      };

      reader.readAsBinaryString(file);
    }

    private uploadFile(datasource) {
      this.fileuploadService.uploadData(datasource, (data) => {
        if (this.apiCall) {
          const source = this.data.slice((this.data.length / 2) + 1, this.data.length - 1);
          this.uploadFile(source);
          this.apiCall = false;
        }
        if (!this.apiCall) {
          this.getExcelData();
        }
      }, (error) => {
        console.log('error', error);
      });
    }

    public getExcelData() {
      this.fileuploadService.getExcelData((data) => {
        this.remoteData.dataSource = data.products;
        console.log('this.remoteData.dataSource', this.remoteData.dataSource);
        // this.spreadsheetObj.refresh();
      }, (error) => {
        console.log('error', error);
      });
    }

    public dataBound() {
      if (this.spreadsheetObj.activeSheetTab === 1) {
      this.spreadsheetObj.cellFormat({ fontWeight: 'bold' }, 'A1:F1');
    }
    }

    public showPivot() {
        this.dataModel.setJOSNData(this.dataSource);
        this.router.navigate(['pivot']);
    }
}
