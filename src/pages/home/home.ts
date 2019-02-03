import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable'
import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { ApiProvider } from '../../providers/api/api'
import { TransactionIndex } from '../transaction/index'
import * as Ethers from 'ethers'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  balance: Observable<number>

  constructor(public navCtrl: NavController, private api: ApiProvider) {
    this.subscribeObservable()
  }

  goToTransactions() {
    this.navCtrl.push(TransactionIndex)
  }

  goToQueryPage() {
    this.navCtrl.push('query')
  }

  goToTxPage() {
    this.navCtrl.push('tx')
  }

  subscribeObservable() {
    this.balance = this.api
      .queryBalanceByAddress('0x5c47e30dc7f82167de8865aac3914ce927c15918')
      .map(v => Ethers.utils.formatEther(Ethers.utils.bigNumberify(v.result)))
  }
}
