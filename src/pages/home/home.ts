import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { TransactionIndex } from '../transaction/index';
import * as Ethers from 'ethers';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  balance: Observable<number>;
  address: string;

  constructor(
    public navCtrl: NavController,
    private api: ApiProvider,
    private auth: AuthenticationProvider) {
    this.subscribeObservable();
  }

  goToTransactions() {
    this.navCtrl.push(TransactionIndex);
  }

  goToQueryPage() {
    this.navCtrl.push('query');
  }

  importKeyObject() {
    this.navCtrl.push('import')
  }

  subscribeObservable() {
    this.balance = this.api
      .queryBalanceByAddress('0x5c47e30dc7f82167de8865aac3914ce927c15918')
      .map(v => Ethers.utils.formatEther(Ethers.utils.bigNumberify(v.result)));

    this.address = this.auth.acountAddress;
  }
}
