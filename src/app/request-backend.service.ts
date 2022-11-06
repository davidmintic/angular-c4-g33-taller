import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RequestBackendService {
  constructor(private http: HttpClient) {}

  getData(entidad: string): Observable<any> {
    return this.http.get("http://localhost:3000/" + entidad);
  }
}
