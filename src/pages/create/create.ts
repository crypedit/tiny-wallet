import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { MnenomicPage } from '../mnenomic/mnenomic';

import bip39 from 'bip39'
import hdkey from 'ethereumjs-wallet/hdkey'
import ethWallet from 'ethereumjs-wallet'
import util from 'ethereumjs-util'

@IonicPage({
  name: 'create',
  segment: 'create'
})
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {
  walletName: string = ""
  password: string = ""
  repeatPassword: string = ""
  hint: string = ""
  condition: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthenticationProvider) {
  }

  createWallet() {
    if(this.walletName.trim() == '' || this.password.trim() == '' 
    || this.repeatPassword.trim() == '' || !this.condition) {
      return;
    } else if (this.password != this.password) {
      return;
    }

    const mnemonic = bip39.generateMnemonic()

    const seed = bip39.mnemonicToSeed(mnemonic)
    var hdWallet = hdkey.fromMasterSeed(seed)
    var key1 = hdWallet.derivePath("m/44'/60'/0'/0/0")
    var address1 = util.pubToAddress(key1._hdkey._publicKey, true)
    address1 = util.toChecksumAddress(address1.toString('hex'))
    console.log('address is', address1)
    this.auth.walletName = this.walletName
    this.auth.acountAddress = address1

    this.navCtrl.push(MnenomicPage, {
      data: mnemonic
    });
  }

  importWallet() {
    this.navCtrl.push('import')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }

}
