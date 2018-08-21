import { Component } from '@angular/core';
import { ApiProvider } from '../../providers/api/api';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'page-transations',
  templateUrl: './index.html'
})
export class TransactionsPage {
  txs: Observable<Object>;
  constructor(private api: ApiProvider) {
    this.load();
  }
  load() {
      this.txs = this.api.queryTxsByAddress('0x5c47e30dc7f82167de8865aac3914ce927c15918')
  }
}
