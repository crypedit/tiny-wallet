import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  constructor(public http: HttpClient) {}

  queryTXOrAddress(hash: string): Observable<any> {
    return this.http.get(`/api/query/${hash}`);
  }
}
