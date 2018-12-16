import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  walletName: string;
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

  createNewWallet() {
    this.navCtrl.push('create')
  }

  subscribeObservable() {
    this.walletName = this.auth.walletName || '我的钱包';
    this.address = this.auth.acountAddress || '0x5c47e30dc7f82167de8865aac3914ce927c15918';
    this.balance = this.api
      .queryBalanceByAddress(this.address)
      .map(v => Ethers.utils.formatEther(Ethers.utils.bigNumberify(v.result)));
  }
}
