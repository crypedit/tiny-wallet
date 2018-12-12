import { Component } from '@angular/core';
import keythereum from 'keythereum';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface AddressDetail {
  status: string;
  message: string;
  result: string;
}

@IonicPage({
  name: 'import',
  segment: 'import'
})
@Component({
  selector: 'import-query',
  templateUrl: 'import.html'
})
export class ImportPage {
  keyObject: string = ""
  password: string = ""
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImportPage');
  }

  importKeyObject() {
    if(this.password.trim() == "" || this.keyObject.trim() == "") {
      return;
    }
    const jsonKeyObject = JSON.parse(this.keyObject)
    const privateKey = keythereum.recover(this.password, jsonKeyObject);
    console.log(privateKey.toString())

    this.navCtrl.popToRoot()
  }
}
