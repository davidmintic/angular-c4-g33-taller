import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestBackendService {
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getData(entity: string): Observable<any> {
    return this.http.get(this.url + entity);
  }

  getDataFilter(
    entity: string,
    data: string,
    keyName: string
  ): Observable<any> {
    const field: any = {};
    field[keyName] = { like: data, options: 'i' };

    const filter = {
      where: field,
    };

    const params = new HttpParams().append('filter', JSON.stringify(filter));

    // const headers = new HttpHeaders({
    //   'Content-type': 'application/json',
    // });

    const httOptions = {
      // headers,
      params,
    };

    return this.http.get(this.url + entity, httOptions);
  }

  postData(entity: string, datos: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const httpOptions = {
      headers,
    };

    return this.http.post(this.url + entity, datos, httpOptions);
  }

  deleteData(entity: string, code: string): Observable<any> {
    return this.http.delete(this.url + entity + '/' + code);
  }

  updateData(entity: string, code: string, datos: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const httpOptions = {
      headers,
    };

    return this.http.put(this.url + entity + '/' + code, datos, httpOptions);
  }
}
