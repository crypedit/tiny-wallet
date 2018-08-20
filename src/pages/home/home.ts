import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { QueryPage } from '../query/query';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hash: string;

  constructor(public navCtrl: NavController, private api: ApiProvider) {}

  submit() {
    this.api.queryTXOrAddress(this.hash);
  }

  goTo() {
    this.navCtrl.push(QueryPage);
  }
}
