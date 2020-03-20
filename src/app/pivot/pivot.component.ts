import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IDataOptions, IDataSet,  PivotView, FieldListService, PivotViewComponent, ToolbarService, ToolbarItems } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);
import { DataModel } from '../data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pivot',
  templateUrl: './pivot.component.html',
  styleUrls: ['./pivot.component.scss'],
  providers: [ToolbarService],
})
export class PivotComponent implements OnInit {

  @ViewChild('pivotview')
  public pivotGridObj: PivotViewComponent;
  public toolbarOptions: ToolbarItems[];

  public loadData: boolean;
  public widht: '500px';

  public dataSourceSettings: IDataOptions;
  public gridSettings: GridSettings;

  public subscription: Subscription;
  public pivotData: IDataSet[];
  public showGrid = false;

  constructor(private dataModel: DataModel) {
   }

   getPivotData() {
    this.dataSourceSettings = {
      enableSorting: true,
      dataSource: [],
      columns: [],
      values: [],
      rows: [],
      expandAll: false,
      filters: []
      };
    this.subscription = this.dataModel.getJOSNData().subscribe(
      (data) => {
        this.pivotData = data;
        
        this.getRows(data[0]);
      });
   }

   public getRows(data) {
     const row = Object.getOwnPropertyNames(data);
     row.shift();
     const reqData = [];
     let reqObj = {};
     this.dataSourceSettings.values = [{name: row[0]}, {name: row[1]}];
     this.dataSourceSettings.rows = [{name: row[2]}];
     row.shift();
     row.shift();
     row.shift();
     row.forEach((element: any) => {
      reqObj = {name : element};
      reqData.push(reqObj);
     });
     this.dataSourceSettings.columns = reqData;
     if (this.showGrid) {
      this.pivotGridObj.engineModule.fieldList = {};
      
      this.pivotGridObj.dataSourceSettings.dataSource = this.pivotData;
     } else {
      this.dataSourceSettings.dataSource = this.pivotData;
     }
     if (this.dataSourceSettings.dataSource || this.pivotGridObj.dataSourceSettings.dataSource) {
        this.showGrid = true;
      } else {
        this.showGrid = false;
      }
   }

    ngOnInit(): void {
      this.loadData = true;
      this.getPivotData();
       this.toolbarOptions = ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
            'Grid', 'Chart', 'Export', 'SubTotal', 'GrandTotal', 'ConditionalFormatting', 'FieldList'] as ToolbarItems[];
    }

    ngOnDestroy(): void {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }

}
