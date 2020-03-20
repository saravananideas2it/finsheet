import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FileuploadService {

  constructor(private api: ApiService) { }

  uploadData(data, success, fail) {
    const url = 'upload';
    this.api.post(url, data).subscribe(response => {
        response.error ? fail(response.error) : success(response.entity);
    }, error => {
        fail(error);
    });
  }

  getExcelData(success, fail) {
    const url = 'exceldata';
    this.api.get(url).subscribe(response => {
        success(response);
    }, error => {
        fail(error);
    });
  }

}
