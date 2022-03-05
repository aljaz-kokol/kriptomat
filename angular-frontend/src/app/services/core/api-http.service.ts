import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiHttpService {
  constructor(private _http: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this._http.get<T>(url);
  }

  public post<T>(url: string, data: any): Observable<T> {
    return this._http.post<T>(url, data);
  }

  public patch<T>(url: string, data: any): Observable<T> {
    return this._http.patch<T>(url, data);
  }

  public put<T>(url: string, data: any): Observable<T> {
    return this._http.put<T>(url, data);
  }

  public delete<T>(url: string): Observable<T> {
    return this._http.delete<T>(url);
  }
}
