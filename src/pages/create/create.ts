import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { MnenomicPage } from '../mnenomic/mnenomic';

import bip39 from 'bip39'
import hdkey from 'ethereumjs-wallet/hdkey'
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
  private wallet: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthenticationProvider,
    private formBuilder: FormBuilder,
    private storage: Storage) {
    this.wallet = this.formBuilder.group({
      walletName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPass: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      hint: [''],
      termsAndCondition: [false, Validators.requiredTrue]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let password = group.controls.password.value;
    let confirmPass = group.controls.confirmPass.value;
    return password === confirmPass ? null : { notSame: true }
  }

  createWallet() {
    const mnemonic = bip39.generateMnemonic()

    const seed = bip39.mnemonicToSeed(mnemonic)
    var hdWallet = hdkey.fromMasterSeed(seed)
    var childHDWallet = hdWallet.derivePath("m/44'/60'/0'/0/0")
    var address = util.pubToAddress(childHDWallet._hdkey._publicKey, true)
    var checksumedAddress = util.toChecksumAddress(address.toString('hex'))
    
    this.auth.walletName = this.wallet.get('walletName').value
    this.auth.acountAddress = checksumedAddress
    var keyObject = childHDWallet.getWallet().toV3(this.wallet.get('password').value)
    this.storage.set(this.auth.walletName, keyObject)

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
