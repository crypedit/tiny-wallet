import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const API_KEY = 'UK1C9AYRMU7BG3ZA2F87MZZ4P3F84VKEXG';

export interface AddressDetail {
  status: string;
  message: string;
  result: string;
}

@IonicPage({
  name: 'query',
  segment: 'query'
})
@Component({
  selector: 'page-query',
  templateUrl: 'query.html'
})
export class QueryPage {
  address: string;
  addressDetail: AddressDetail;
  transaction: string;
  transactionDetail: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad QueryPage');
  }

  query(event) {
    const queryStr = event.target.value;
    if (this.isAddress(queryStr)) {
      this.http
        .get(
          `https://api.etherscan.io/api?module=account&action=balance&address=${queryStr}&tag=latest&apikey=${API_KEY}`
        )
        .subscribe(data => {
          this.address = queryStr;
          this.addressDetail = data as AddressDetail;
        });
    }
    if (this.ifTransaction(queryStr)) {
      this.http
        .get(
          `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${queryStr}&apikey=${API_KEY}`
        )
        .subscribe((data: any) => {
          this.transaction = queryStr;
          this.transactionDetail = data.result;
          this.transactionDetail.blockNumber = parseInt(
            this.transactionDetail.blockNumber,
            16
          );
          this.transactionDetail.value =
            parseInt(this.transactionDetail.value, 16) / 1000000000000000000;
        });
    }
  }

  isAddress(str: string): boolean {
    const addressStructure = RegExp('^0x[a-zA-Z0-9]{40}$');
    return addressStructure.test(str);
  }

  ifTransaction(str: string): boolean {
    const transactionStructure = RegExp('^0x[a-zA-Z0-9]{64}$');
    return transactionStructure.test(str);
  }
}
