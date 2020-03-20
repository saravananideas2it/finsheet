import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataModel {

    public jsonData = new Subject<any[]>();

    public setJOSNData(data: any[]) {
        this.jsonData.next(data);
    }

    public getJOSNData(): Observable<any[]> {
        return this.jsonData.asObservable();
    }
}
