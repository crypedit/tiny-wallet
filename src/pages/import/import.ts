import { Component } from '@angular/core';
import keythereum from 'keythereum';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { HomePage } from '../home/home';

/**
 * Generated class for the QueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    public navParams: NavParams,
    public auth: AuthenticationProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImportPage');
  }

  importKeyObject() {
    if(this.password.trim() == "" || this.keyObject.trim() == "") {
      return;
    }
    const jsonKeyObject = JSON.parse(this.keyObject)
    this.auth.acountAddress = '0x'+jsonKeyObject.address
    const privateKey = keythereum.recover(this.password, jsonKeyObject);

    this.navCtrl.setRoot(HomePage)
    this.navCtrl.popToRoot()
  }
}
