import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse, HttpRequest, HttpEvent  } from '@angular/common/http';
import {of as observableOf,  Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiURL = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  post(url, parameters): Observable<any> {
    const httpheaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    url = this.apiURL + url;
    return this.http.post(url, parameters, {
      headers: httpheaders,
      withCredentials: false
    }).pipe(map((res: Response) => res),
      catchError((res: Response) => observableOf(res)),);
  }

  get(url): Observable<any> {
    const httpheaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    url = this.apiURL + url;
    return this.http.get(url, {
      headers: httpheaders,
      withCredentials: false
    }).pipe(map((res: Response) => res),
      catchError((res: Response) => observableOf(res)),);
  }

}
