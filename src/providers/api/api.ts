import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  apikey: string;
  constructor(public http: HttpClient) {
      this.apikey = 'ZZ75IX34XTAYAA21P6669BCBXX5V3TQZM1'
  }

  queryBalanceByAddress(address: string): Observable<any> {
      return this.http.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${this.apikey}/`);
  }

  queryTxsByAddress(address: string): Observable<any> {
      return this.http.get(`http://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${this.apikey}/`);
  }
}
