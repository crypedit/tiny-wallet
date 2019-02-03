import { ApiProvider } from '../../providers/api/api';
import { Component } from '@angular/core';
import * as Ethers from 'ethers';

class Transaction {
    constructor(public hash: string,
        public value: string,
        public from: string,
        public to: string,
    ) {}
}

@Component({
  selector: 'transactions-page',
  templateUrl: './page.html'
})
export class TransactionPage {
  page: Transaction[];
  constructor(private api: ApiProvider) {}
  ngOnInit() {
    this.api.queryTxsByAddress('0x5c47e30dc7f82167de8865aac3914ce927c15918')
      .subscribe((data) =>
          this.page = data.result.map((v) =>
              new Transaction(
                  v.hash,
                  Ethers.utils.formatEther(Ethers.utils.bigNumberify(v.value)),
                  v.from,
                  v.to,
              )
          )
      );
  }
}
